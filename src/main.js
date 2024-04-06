import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './Store/store'



const  app=createApp(App)
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
  components,
  directives
})


app.use(store)
app.use(vuetify)
app.mount('#app')

