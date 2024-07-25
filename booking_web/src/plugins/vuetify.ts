/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import DayJsAdapter from '@date-io/dayjs'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { md2 } from 'vuetify/blueprints'


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  // date: {
  //   adapter: DayJsAdapter,
  // }
  blueprint: md2,
})
