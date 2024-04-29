import { type ZodTypeAny, z } from 'zod'
import { ref, watch, toValue, type MaybeRefOrGetter, type Ref } from 'vue'

/* eslint-disable max-lines-per-function */
export default function <T extends ZodTypeAny>(
  schema: T,
  data: MaybeRefOrGetter<Record<string, unknown>>,
  options?: { mode: `eager` | `lazy` }
): {
    validate: () => Promise<Ref<Record<string, z.ZodIssue[]> | null>>,
    errors: Ref<Record<string, z.ZodIssue[]> | null>,
    isValid: Ref<boolean>,
    clearErrors: () => void,
    getError: (path: string) => string | null
} {
  const opts = Object.assign({}, { mode: `lazy` }, options)

  const isValid = ref(true)
  const errors = ref<Record<string, z.ZodIssue[]> | null>(null)

  const clearErrors = (): void => {
    errors.value = null
  }

  let unwatch: null | (() => void) = null
  const validationWatch = (): void => {
    if (unwatch !== null) {
      return
    }

    unwatch = watch(
      () => toValue(data),
      async () => {
        await validate()
      },
      { deep: true }
    )
  }

  const validate = async (): Promise<Ref<Record<string, z.ZodIssue[]> | null>> => {
    clearErrors()

    const result = await schema.safeParseAsync(toValue(data))

    isValid.value = result.success

    if (!result.success) {
      errors.value = groupErrorsByPath(result.error.issues)
      validationWatch()
    }

    return errors
  }

  const groupErrorsByPath = (issues: z.ZodIssue[]): Record<string, z.ZodIssue[]> => {
    const groupedErrors: Record<string, z.ZodIssue[]> = {}

    issues.forEach(issue => {
      const path = issue.path.join(`.`)
      groupedErrors[path] = groupedErrors[path] || []
      groupedErrors[path].push(issue)
    })

    return groupedErrors
  }

  const getError = (path: string): string | null => {
    const error = errors.value?.[path]?.[0]
    return error ? error.message : null
  }

  if (opts.mode === `eager`) {
    validationWatch()
  }

  return { validate, errors, isValid, clearErrors, getError }
}
