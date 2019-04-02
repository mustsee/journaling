import Vue from 'vue';
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";
import './plugins/vuetify';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(FullCalendar);

new Vue({
  render: h => h(App),
}).$mount('#app');
