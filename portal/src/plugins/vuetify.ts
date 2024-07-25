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
import { createVuetify, type ThemeDefinition } from 'vuetify'


const themeLight: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F7F7F9',
    'border-color': '#F7F7F9',
    surface: '#ffffff',
    primary: '#666cff',
    'primary-darken-1': '#5C61E6',
    secondary: '#03DAC6',
    'secondary-darken-1': '#03DAC6',
    error: '#FF4D49',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF4D49',
  },
  variables: {
    'page-bg': '#F7F7F9',
    'font-heading': '\'Inter\', sans-serif',
    'font-body': '\'Inter\', sans-serif',
    'font-menu': '\'Inter\', sans-serif',
    'font-size-p': '15px',
    'font-size-nav': '20px',
    'font-size-menu': '15px',
    'font-size-menu-divider': '13px',
    'font-size-form': '14px',
    'font-size-h1': '40px',
    'font-size-h2': '32px',
    'font-size-h3': '28px',
    'font-size-h4': '24px',
    'font-size-h5': '18px',
    'font-size-h6': '15px',
    'font-color-body': '#3B4056',
    'font-color-active-menu': '#FFFFFF',
    'font-color-heading-menu': '#ACAEB8',
    'hover-color': '59,64,86, 0.5',
    'nav-background-color': '#F7F7F9',
	'nav-border-color': '#FFFFFF',
    'nav-shadow': 'false',
    'nav-item-color': '#3B4056',
    'appbar-background': '#F7F7F9',
    'spacing-unit': '8px',
    'spacing-appbar-offset': '20px',
    'max-body-width': '1392px',
    'navbar-width': '260px',
    'standard-gutter': '16px',
    'standard-rounded': '6px',
    'standard-shadow': 'rgba(47, 43, 61, 0.14) 0px 3px 12px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px !important',
    'menu-entry-shadow': 'none',
	'menu-group-active': '#999999'
  }
}

const themeDark: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#282A42',
    'border-color': '#282A42',
    surface: '#31334F',
    primary: '#83d7bd',
    'primary-darken-1': '#5C61E6',
    secondary: '#03DAC6',
    'secondary-darken-1': '#03DAC6',
    error: '#ff4d49',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'page-bg': '#282A42',
    'font-heading': '\'Inter\', sans-serif',
    'font-body': '\'Inter\', sans-serif',
    'font-menu': '\'Inter\', sans-serif',
    'font-size-p': '15px',
    'font-size-nav': '20px',
    'font-size-menu': '15px',
    'font-size-menu-divider': '13px',
    'font-size-form': '14px',
    'font-size-h1': '40px',
    'font-size-h2': '32px',
    'font-size-h3': '28px',
    'font-size-h4': '24px',
    'font-size-h5': '18px',
    'font-size-h6': '15px',
    'font-color-body': '#D7D8ED',
    'font-color-active-menu': '#FFFFFF',
    'font-color-heading-menu': '#ACAEB8',
    'hover-color': '234, 234, 255, 0.08',
    'nav-background-color': '#282A42',
    'nav-border-color': '#282A42',
	'nav-shadow': 'false',
    'nav-item-color': '#D7D8ED',
    'appbar-background': '#282A42',
    'spacing-unit': '8px',
    'spacing-appbar-offset': '20px',
    'max-body-width': '1392px',
    'navbar-width': '260px',
    'standard-gutter': '16px',
    'standard-rounded': '6px',
    'standard-shadow': 'rgba(47, 43, 61, 0.14) 0px 3px 12px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px !important',
    'menu-entry-shadow': 'none'
  }
}

const themeSystem: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    'border-color': '#F7F7F9',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'page-bg': '#ff1234',
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
    'standard-gutter': '16px',
    'body-font-family': '\'Inter\', sans-serif'
  }
}

const themeCBA: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F4F4F4',
    'border-color': '#F7F7F9',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#FFCC00',
    'primary-darken-1': '#FFCC00',
    secondary: '#03DAC6',
    'secondary-darken-1': '#03DAC6',
    error: '#ff4d49',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'page-bg': '180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100px, rgba(225,225,225,1) 100px, rgba(225,225,225,1) 100%',
    'font-heading': '\'Inter\', sans-serif',
    'font-body': '\'Inter\', sans-serif',
    'font-menu': '\'Inter\', sans-serif',
    'font-size-p': '15px',
    'font-size-nav': '20px',
    'font-size-menu': '15px',
    'font-size-menu-divider': '13px',
    'font-size-form': '14px',
    'font-size-h1': '40px',
    'font-size-h2': '32px',
    'font-size-h3': '28px',
    'font-size-h4': '24px',
    'font-size-h5': '18px',
    'font-size-h6': '15px',
    'font-color-body': '#333333',
    'font-color-active-menu': '#000000',
    'font-color-heading-menu': '#ACAEB8',
    'hover-color': '234, 234, 255, 0.08',
    'nav-background-color': '#FFFFFF',
    'nav-border-color': '#FFFFFF',
	'nav-shadow': 'false',
    'nav-item-color': '#333333',
    'appbar-background': 'none',
    'spacing-unit': '8px',
    'spacing-appbar-offset': '70px',
    'max-body-width': '1392px',
    'navbar-width': '260px',
    'standard-gutter': '16px',
    'standard-rounded': '0px',
    'standard-shadow': 'rgba(47, 43, 61, 0.14) 0px 3px 12px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px !important',
    'menu-entry-shadow': 'none'
  }
}



// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  // date: {
  //   adapter: DayJsAdapter,
  // }
  theme: {
    defaultTheme: 'themeLight',
    themes: {
      themeLight,
      themeDark,
      themeSystem,
      themeCBA
    },
  },

  blueprint: md2,
})
