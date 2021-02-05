<template>
  <ul :class="parseClasses(classes.list)">
    <li
      :class="parseClasses(classes.item)"
      v-for="loadingItem in loadingContent"
      :key="loadingItem"
    />
  </ul>
</template>

<script>
export default {
  name: 'VirtualScrollerLoading',
  props: {
    classes: {
      type: Object,
      required: true,
      validator: (value) => value.list && value.item,
    },
    item: {
      type: Object,
      required: true,
      validator: (value) => value.x && value.y,
    },
  },
  data: () => ({
    limits: {},
    loadingContent: [],
    styles: {},
  }),
  mounted() {
    this.$el.VirtualScrollerLoading = {};

    this.setStyles();
    this.setLimits();
    this.setLoadingContent();
  },
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
      const { item, limits, styles } = this;
      const viewport = {
        x: styles.width,
        y: window.visualViewport.height,
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

      this.$el.VirtualScrollerLoading.limits = limits;
    },
    setLoadingContent() {
      for (let i = 0; i < this.limits.square; i += 1) this.loadingContent.push(i);
    },
  },
};
</script>
