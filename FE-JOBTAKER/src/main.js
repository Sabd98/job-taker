import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';
import store from './store/index.js';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import "./index.css"
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const app = createApp(App);

//Routes and mount app
app.use(router);
app.use(store);

app.component('base-card',BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

const vuetify = createVuetify({
  components,
  directives,
});


app.use(vuetify).mount('#app');
