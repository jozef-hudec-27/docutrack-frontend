export type RegisterFormState = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginFormState = {
  email: string
  password: string
}

export type NewDocumentFormState = {
  name: string
  tag: string
  description?: string
}
