/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import db from '@adonisjs/lucid/services/db'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/about', () => {
  return 'This is the about page.'
})

router.get('/db-test', async () => {
  const result = await db.rawQuery('SELECT 1 + 1 AS result')
  return result[0]
})
