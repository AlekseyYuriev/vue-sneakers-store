import "./assets/main.css"

import { createApp } from "vue"
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"
import App from "./App.vue"
import { createPinia } from "pinia"

const app = createApp(App)

app.use(createPinia())

app.use(autoAnimatePlugin).mount("#app")
