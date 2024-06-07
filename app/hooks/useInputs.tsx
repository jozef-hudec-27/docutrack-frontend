import type { ComponentPropsWithRef } from 'react'

type UseInputProps<T> = {
  inputs: ComponentPropsWithRef<'input'>[]
}

export default function useInputs<T>({ inputs }: UseInputProps<T>) {
  return inputs.map((inp) => <input {...inp} key={inp.placeholder} />)
}
