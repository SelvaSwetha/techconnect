import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

export type Validator = (value: string) => string | undefined
export type FormStatus = 'idle' | 'submitting' | 'success'

/** Optional real submission. Throw to show an error; the thrown `message` is shown to the user, `fieldErrors` mark fields. */
export interface SubmitOptions<K extends string, R> {
  /** `key` is a UUID that stays the same while the values stay the same (safe to retry), and changes when any value changes. */
  submit: (values: Record<K, string>, key: string, signal: AbortSignal) => Promise<R>
}

/** Common validators (frontend only). */
export const required = (msg: string): Validator => (v) => (v.trim() ? undefined : msg)
export const minLength = (n: number, msg: string): Validator => (v) => (v.trim().length >= n ? undefined : msg)
export const email = (msg: string): Validator => (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : msg)
export const phone = (msg: string): Validator => (v) => {
  const t = v.trim()
  const digits = t.replace(/\D/g, '')
  return /^\+?[\d\s\-().]+$/.test(t) && digits.length >= 7 && digits.length <= 15 ? undefined : msg
}
/** Runs validators in order and returns the first message. Empty optional values pass when `optional` is set. */
export const all = (...vs: Validator[]): Validator => (v) => {
  for (const f of vs) {
    const m = f(v)
    if (m) return m
  }
  return undefined
}
export const optional = (v: Validator): Validator => (val) => (val.trim() ? v(val) : undefined)

const PROCESSING_MS = 900 // forms that are not connected to the backend yet: "sending" is a short simulated delay

/** Generic controlled-form state with validation, touched tracking, double-submit guard and success state. */
export function useFormState<K extends string, R = void>(initial: Record<K, string>, validators: Record<K, Validator>, order: K[], options?: SubmitOptions<K, R>) {
  const [values, setValues] = useState<Record<K, string>>(initial)
  const [errors, setErrors] = useState<Partial<Record<K, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitError, setSubmitError] = useState<string>()
  const [receipt, setReceipt] = useState<R>()
  const busy = useRef(false)
  const timer = useRef<number | undefined>(undefined)
  const key = useRef(crypto.randomUUID())
  const abort = useRef<AbortController | undefined>(undefined)

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
      abort.current?.abort()
    },
    [],
  )

  const check = (name: K, value: string) =>
    setErrors((prev) => {
      const next = { ...prev }
      const m = validators[name](value)
      if (m) next[name] = m
      else delete next[name]
      return next
    })

  type El = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  const onChange = (e: ChangeEvent<El>) => {
    const name = e.target.name as K
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    key.current = crypto.randomUUID() // changed content is a new submission
    if (touched[name]) check(name, value)
  }
  const onBlur = (e: ChangeEvent<El>) => {
    const name = e.target.name as K
    setTouched((t) => ({ ...t, [name]: true }))
    check(name, e.target.value)
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (busy.current) return
    const found: Partial<Record<K, string>> = {}
    for (const n of order) {
      const m = validators[n](values[n])
      if (m) found[n] = m
    }
    setErrors(found)
    setTouched(Object.fromEntries(order.map((n) => [n, true])) as Partial<Record<K, boolean>>)
    const first = order.find((n) => found[n])
    if (first) {
      ;(e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }
    busy.current = true
    setSubmitError(undefined)
    setStatus('submitting')
    if (!options) {
      timer.current = window.setTimeout(() => {
        busy.current = false
        setStatus('success')
      }, PROCESSING_MS)
      return
    }
    const controller = new AbortController()
    abort.current = controller
    options.submit(values, key.current, controller.signal).then(
      (r) => {
        busy.current = false
        setReceipt(r)
        setStatus('success')
      },
      (err: unknown) => {
        busy.current = false
        if (controller.signal.aborted) return
        setStatus('idle')
        setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        const fe = (err as { fieldErrors?: Record<string, string> }).fieldErrors
        if (fe) setErrors((prev) => ({ ...prev, ...Object.fromEntries(order.filter((n) => fe[n]).map((n) => [n, fe[n]])) }))
      },
    )
  }
  const reset = () => {
    window.clearTimeout(timer.current)
    abort.current?.abort()
    busy.current = false
    key.current = crypto.randomUUID()
    setSubmitError(undefined)
    setReceipt(undefined)
    setValues(initial)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }
  /** call when something outside `values` (e.g. an attached file) changes: it is a different submission */
  const newSubmission = () => {
    key.current = crypto.randomUUID()
  }
  return { values, errors, status, submitError, receipt, onChange, onBlur, onSubmit, reset, newSubmission }
}
