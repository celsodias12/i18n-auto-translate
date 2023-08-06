import { v2 } from '@google-cloud/translate'
import fs from 'fs'
import path from 'path'

async function iterableRecursivelyJson(json, callback) {
  const data = JSON.parse(JSON.stringify(json))

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      data[key] = await callback(data[key])
    } else if (typeof value === 'object') {
      data[key] = await iterableRecursivelyJson(value, callback)
    }
  }

  return data
}

export function runTranslateObject(
  jsonToTranslate,
  targetLanguages,
  translateCredentials
) {
  const translateAPI = new v2.Translate({
    credentials: {
      type: translateCredentials.type,
      private_key: translateCredentials.private_key,
      client_email: translateCredentials.client_email,
      client_id: translateCredentials.client_id,
    },
    projectId: translateCredentials.projectId,
    key: translateCredentials.keyTranslateAPI,
  })

  const basePath = path.join(process.cwd(), 'translations')

  for (const language of targetLanguages) {
    const translateText = async text => {
      const [textTranslated] = await translateAPI.translate(text, language)

      return textTranslated
    }

    console.log(`> started translation ${language}...`)

    iterableRecursivelyJson(jsonToTranslate, translateText)
      .then(data => {
        const pathToSave = path.join(basePath, `${language}.json`)

        if (!fs.existsSync(basePath)) {
          fs.mkdirSync(basePath)
        }

        fs.writeFileSync(pathToSave, JSON.stringify(data, null, 2))
      })
      .finally(() => {
        console.log(`> finished translation ${language}`)
      })
  }
}
