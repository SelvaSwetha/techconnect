import TextInput from './TextInput'
import type { TextInputProps } from './TextInput'

export default function EmailInput(props: Omit<TextInputProps, 'type'>) {
  return <TextInput type="email" autoComplete="email" {...props} />
}
