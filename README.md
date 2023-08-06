# Translate JSON

This project aims to translate JSON files into multiple languages using the Google Cloud translation API.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Usage

To use the project, import the `runTranslateObject` function from the `index.mjs` file and pass the following parameters:

- `jsonToTranslate`: the JSON object to be translated.
- `targetLanguages`: an array with the target languages for translation.
- `translateCredentials`: an object with the credentials to access the Google Cloud translation API.

Example:

```javascript
import { runTranslateObject } from './index.mjs'

const jsonToTranslate = {
  hello: 'Hello',
  world: 'World',
  nested: {
    key: 'Nested key',
  },
}

const targetLanguages = ['pt', 'es']

const translateCredentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  keyTranslateAPI: process.env.KEY_GOOGLE_TRANSLATE_API,
}

runTranslateObject(jsonToTranslate, targetLanguages, translateCredentials)
```

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
