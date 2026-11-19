import TextInput from './TextInput'
import type { TextInputProps } from './TextInput'

export default function PhoneInput(props: Omit<TextInputProps, 'type'>) {
  return <TextInput type="tel" inputMode="tel" autoComplete="tel" {...props} />
}
