<template>
  <svg
    class="jam-icon"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="width"
    :height="height"
    focusable="false"
    preserveAspectRatio="xMinYMin"
    role="presentation"
    :aria-label="label"
  >
    <g
      :fill="fill"
      v-html="content"
    />
  </svg>
</template>

<script>
export default {
  name: 'JIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: [String, Number],
      default: 24,
    },
    height: {
      type: [String, Number],
      default: 24,
    },
    fill: {
      type: String,
      default: 'currentColor',
    },
  },
  icons: [],
  add(icons) {
    if (Array.isArray(icons)) {
      this.icons = icons;
    } else {
      this.icons.push(icons);
    }
  },
  computed: {
    content() {
      return this.getIcon().content;
    },
    viewBox() {
      const view = this.getIcon().viewBox;

      if (!view) return `0 0 ${this.width} ${this.height}`;

      return view;
    },
    label() {
      return this.name.replace(/-/g, ' ');
    },
  },
  methods: {
    getIcon() {
      const icon = this.$options.icons.find((i) => i.name === this.name);

      if (icon) return icon;

      throw new Error(`Name of the ${this.name} icon is not correct.`);
    },
  },
};
</script>

<style scoped>
.jam-icon {
  display: block;
}
</style>
