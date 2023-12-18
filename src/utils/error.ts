import axios from "axios"

const logApiError = (error: unknown, info: Record<string, unknown> = {}): void => {
  const hasInfo = Object.keys(info).length > 0

  if (axios.isAxiosError(error)) {
    // eslint-disable-next-line
    console.log(`Axios error message: ${error.message}`, hasInfo ? info : undefined)
  } else {
    // eslint-disable-next-line
    console.log(`An unexpected error occurred ${error}`, hasInfo ? info : undefined)
  }
}


export {
  logApiError
}