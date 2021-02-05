import Vue from 'vue';

import JIcon from '@/../src';
import store from '@/store';

const { icons } = store.state;

JIcon.add(icons.default.concat(icons.custom));
Vue.use(JIcon, {
  width: 20,
  height: 20,
});
