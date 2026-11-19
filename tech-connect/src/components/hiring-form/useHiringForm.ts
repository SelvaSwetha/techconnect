import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { EMPTY_VALUES, FIELD_ORDER, validateAll, validateField } from './validation'
import { submitHiringEnquiry } from '../../services/enquiries'
import type { EnquiryReceipt } from '../../services/enquiries'
import type { FieldName, FormErrors, FormValues } from './validation'

export type FormStatus = 'idle' | 'submitting' | 'success'

/**
 * The Homepage form's email integration is OFF until it is confirmed that this form should send emails
 * (the backend also refuses the "home" form unless ENQUIRY_FORMS_ENABLED lists it). With it off the form keeps its
 * UI and validation and behaves as before: nothing is sent. Enable with VITE_HOME_FORM_EMAIL=true.
 */
const HOME_EMAIL_ENABLED = import.meta.env.VITE_HOME_FORM_EMAIL === 'true'
const SIMULATED_MS = 900

export function useHiringForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitError, setSubmitError] = useState<string>()
  const [receipt, setReceipt] = useState<EnquiryReceipt>()
  const busy = useRef(false) // synchronous guard against double submits
  const key = useRef(crypto.randomUUID()) // same content = same submission (safe to retry); any edit = new key
  const abort = useRef<AbortController | undefined>(undefined)
  const timer = useRef<number | undefined>(undefined)

  const setError = (name: FieldName, value: string) =>
    setErrors((prev) => {
      const next = { ...prev }
      const msg = validateField(name, value)
      if (msg) next[name] = msg
      else delete next[name]
      return next
    })

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName
    const value = e.target.value
    setValues((v) => ({ ...v, [name]: value }))
    key.current = crypto.randomUUID()
    if (touched[name]) setError(name, value) // live re-validate once the field has been visited
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName
    setTouched((t) => ({ ...t, [name]: true }))
    setError(name, e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (busy.current) return
    const found = validateAll(values)
    setErrors(found)
    setTouched(Object.fromEntries(FIELD_ORDER.map((n) => [n, true])))
    const first = FIELD_ORDER.find((n) => found[n])
    if (first) {
      ;(e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }
    busy.current = true
    setSubmitError(undefined)
    setStatus('submitting')
    if (!HOME_EMAIL_ENABLED) {
      timer.current = window.setTimeout(() => {
        busy.current = false
        setStatus('success')
      }, SIMULATED_MS)
      return
    }
    const controller = new AbortController()
    abort.current = controller
    submitHiringEnquiry(
      {
        source: 'home',
        idempotencyKey: key.current,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        company: values.company,
        service: values.service,
        positions: values.positions,
        message: values.message,
      },
      controller.signal,
    ).then(
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
        if (fe) setErrors((prev) => ({ ...prev, ...Object.fromEntries(FIELD_ORDER.filter((n) => fe[n]).map((n) => [n, fe[n]])) }))
      },
    )
  }

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
      abort.current?.abort()
    },
    [],
  )

  const reset = () => {
    window.clearTimeout(timer.current)
    abort.current?.abort()
    busy.current = false
    key.current = crypto.randomUUID()
    setSubmitError(undefined)
    setReceipt(undefined)
    setValues(EMPTY_VALUES)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  return { values, errors, status, submitError, receipt, onChange, onBlur, onSubmit, reset }
}
