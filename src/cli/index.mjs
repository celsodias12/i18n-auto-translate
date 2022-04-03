#!/usr/bin/env node

import inquirer from 'inquirer'

import { targetLanguages } from '../constants/index.mjs'
import { runTranslateObject } from '../index.mjs'

inquirer
  .prompt([
    {
      type: 'editor',
      name: 'i18nObject',
      message: '*Please paste you i18n object here:',
      filter: value => {
        try {
          return JSON.parse(value)
        } catch (error) {
          throw new Error(`Invalid JSON > ${error}`)
        }
      },
    },
    {
      type: 'checkbox',
      name: 'languagesToTranslate',
      message: '*What languages do you want to translate to?:',
      choices: targetLanguages.map(language => ({
        name: language,
        type: 'choice',
      })),
      validate: value => {
        if (value.length < 1) {
          return 'Please choose at least one language'
        }

        return true
      },
    },
    {
      type: 'confirm',
      name: 'terms',
      message:
        '*This library needs google cloud platform service account and translate API credentials ok? (Your credentials will only be used to communicate with the "google cloud translation API"):',
      default: false,
    },
    {
      type: 'text',
      name: 'type',
      message: '*Please enter your Google Cloud Platform type 🔑:',
      when: answers => answers.terms,
    },
    {
      type: 'text',
      name: 'private_key',
      message: '*Please enter your Google Cloud Platform private_key 🔑:',
      when: answers => answers.terms,
    },
    {
      type: 'text',
      name: 'client_email',
      message: '*Please enter your Google Cloud Platform client_email 🔑:',
      when: answers => answers.terms,
    },
    {
      type: 'text',
      name: 'client_id',
      message: '*Please enter your Google Cloud Platform client_id 🔑:',
      when: answers => answers.terms,
    },
    {
      type: 'text',
      name: 'projectId',
      message: '*Please enter your Google Cloud Platform projectId 🔑:',
      when: answers => answers.terms,
    },
    {
      type: 'text',
      name: 'keyTranslateAPI',
      message: '*Please enter your Google Cloud Platform Translate API key 🔑:',
      when: answers => answers.terms,
    },
  ])
  .then(answers => {
    if (!answers.terms) {
      throw new Error(
        'To use this library it is required to allow the use of google cloud platform credentials'
      )
    }

    Object.values(answers).forEach(value => {
      if (!value) {
        throw new Error(`It is required to answer all questions`)
      }
    })

    const languagesToTranslateFormatted = answers.languagesToTranslate.map(
      language => language.split(' - ')[1]
    )

    runTranslateObject(
      answers.i18nObject,
      languagesToTranslateFormatted,
      answers
    )
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(error)
    } else {
      // Something else went wrong
      console.log(error)
    }
  })
