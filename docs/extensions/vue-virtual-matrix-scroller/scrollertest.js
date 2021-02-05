import Vue from 'vue';
import { NAMES } from './constants';

export default Vue.extend({
  name: NAMES.main,
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log('Hello from Scroller!', this);
  },
  render(h) {
    return h('ul', {
      class: 'test',
    }, this.$slots.default);
  },
});
