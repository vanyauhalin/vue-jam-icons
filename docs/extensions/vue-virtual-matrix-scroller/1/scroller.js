import Vue from 'vue';

import options from '../options';

export default Vue.extend({
  name: 'Scroller',
  props: {
    options,
  },
  data: () => ({
    limits: {},
    styles: {},
  }),
  methods: {
    parseClasses(array) {
      return array.join(' ');
    },
    setStyles() {
      const styles = window.getComputedStyle(this.$el);
      this.styles.width = parseFloat(styles.width);
      this.styles.gap = parseFloat(styles.gap);
    },
    setLimits() {
      const { limits, styles } = this;
      const { item } = this.options;
      const viewport = {
        width: styles.width,
        height: window.visualViewport.height,
      };

      const forEach = (object, fn) => Object.keys(object).forEach((key) => fn(key));

      forEach(viewport, (key) => {
        limits[key] = Math.floor(viewport[key] / item[key]);
      });
      forEach(limits, (key) => {
        for (
          limits[key];
          limits[key] * item[key] + (limits[key] - 1) * styles.gap > viewport[key];
          limits[key] -= 1
        );
      });

      limits.square = Object.values(limits).reduce(
        ((product, current) => product * current),
      );
    },
  },
  mounted() {
    this.setStyles();
    this.setLimits();
  },
  render(h) {
    return h('ul', {
      class: this.slideClass,
    }, [
      this.$slots.default,
    ]);
  },
});
