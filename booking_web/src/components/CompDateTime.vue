<template>
    <v-app id="inspire">
      <v-card class="mx-auto my-auto" max-width="400">
        <v-card-title>
          Vuetify DateTime Picker
        </v-card-title>
        <v-card-text>
          <t-date-time-field filled label="Published" v-model="published" append-icon="mdi-calendar" readonly></t-date-time-field>
          <v-text-field hide-details label="Raw value" v-model="published"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <span class="caption px-2">Set to</span>
          <v-btn depressed small @click="setToNull">null</v-btn>
          <v-btn depressed small @click="setToNow">now</v-btn>
          <v-btn depressed small @click="setToDate">date only</v-btn>
        </v-card-actions>
      </v-card>
    </v-app>
  </template>
  
  <script>
  import Vue from 'vue';
  import Vuetify from 'vuetify';
  import { DateTime } from 'luxon';
  
  export default {
    name: "DateTimePicker",
    data: () => ({
      published: DateTime.local().toISO()
    }),
    methods: {
      setToNull() {
        this.published = null;
      },
      setToNow() {
        this.published = DateTime.local().toISO();
      },
      setToDate() {
        this.published = '2021-03-04';
      }
    },
    components: {
      't-date-time-field': {
        // ... Paste the component definition here (same as the original one)
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom styles for the datetime picker */
  .t-datetime-picker {
    /* ... Paste the original CSS here */
  }
  </style>
  