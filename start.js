import inquirer from 'inquirer'
import { createServer } from 'vite'
import process from 'process'
import figlet from 'figlet'

const aTest = `a-test`
const bTest = `b-test`
const cTest = `c-test`
const dTest = `d-test`
const eTest = `e-test`
const fTest = `f-test`

const choices = [
  aTest,
  bTest,
  cTest,
  dTest,
  eTest,
  fTest
]

const apiUrls = {
  [aTest]: `https://api.a-test.com`,
  [bTest]: `https://api.b-test.com`,
  [cTest]: `https://api.c-test.com`,
  [dTest]: `https://api.d-test.com`,
  [eTest]: `https://api.e-test.com`,
  [fTest]: `https://api.f-test.com`
}

const greenColor = `\x1b[32m`

function logWithColor(text, colorCode = ``) {
  const resetColor = `\x1b[0m`
  const coloredText = `${colorCode}${text}${resetColor}`
  // eslint-disable-next-line
  console.log(coloredText);
}

async function run() {
  const figletTxt =
    figlet.textSync(`Vue Admin`, { font: `ANSI Shadow`, horizontalLayout: `full` })
  logWithColor(figletTxt, greenColor)

  const { country } = await inquirer.prompt([
    {
      type: `list`,
      name: `country`,
      message: `Choose the country:`,
      choices: choices
    }
  ])

  try {
    await startVite(country)
  } catch (error) {
    logWithColor(`Error: ${error.message}`)
  }
}

async function startVite(country) {
  try {
    process.env.VITE_COUNTRY = country
    process.env.VITE_API_BASE_URL_DEV_ONLY = apiUrls[country]

    const server = await createServer({
      server: {
        port: 5173,
        open: true
      }
    })

    await server.listen()
    logWithColor(`Server started with COUNTRY=${country}\n`)
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
