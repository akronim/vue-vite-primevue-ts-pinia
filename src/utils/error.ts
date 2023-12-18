import axios from "axios"

const logApiError = (error: unknown, info: Record<string, any> = {}) => {
  const hasInfo = Object.keys(info).length > 0

  if (axios.isAxiosError(error)) {
    console.log(`Axios error message: ${error.message}`, hasInfo ? info : undefined)
  } else {
    console.log(`An unexpected error occurred ${error}`, hasInfo ? info : undefined)
  }
}


export {
  logApiError
}