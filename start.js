import { createServer } from 'vite'
import process from 'process'

function logWithColor(text, colorCode = `\x1b[32m`) {
  const resetColor = `\x1b[0m`
  const coloredText = `${colorCode}${text}${resetColor}`
  // eslint-disable-next-line
  console.log(coloredText);
}

async function run() {
  try {
    await startVite()
  } catch (error) {
    logWithColor(`Error: ${error.message}`)
  }
}

async function startVite() {
  try {
    const server = await createServer({
      server: {
        port: 5173,
        open: true
      }
    })

    await server.listen()
    logWithColor(`Server started...\n`)
    server.printUrls()

    process.on(`SIGINT`, () => {
      logWithColor(`\nStopping the process...`)
      process.exit(0)
    })
  } catch (error) {
    logWithColor(`Failed to start server: ${error.message}`)
  }
}

run()
