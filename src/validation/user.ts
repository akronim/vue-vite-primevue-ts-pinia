import { z } from 'zod'

const nameValidation = z.string().min(1, `Name is required`)
const emailValidation = z.string().email({ message: `Please enter a valid email` })
const descriptionValidation = z.string().min(1, `Description is required`)

const userDataSchema = z.object({
  name: nameValidation,
  email: emailValidation
})

const localizedDataSchema = z.record(z.object({
  description: descriptionValidation
}))

export const userSchema = userDataSchema.extend({
  description: descriptionValidation
})

export const userAllSchema = z.object({
  userData: z.object({
    name: nameValidation,
    email: emailValidation,
    localizedData: localizedDataSchema
  })
})
