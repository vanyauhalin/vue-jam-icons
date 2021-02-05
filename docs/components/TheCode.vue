<template>
  <highlightjs
    class="code container"
    :language="lang"
    :code="newCode"
  />
</template>

<script>
import gsap from 'gsap';

import { dr } from 'styles/variables';

export default {
  name: 'TheCode',
  data: () => ({
    firstMount: true,
  }),
  props: {
    lang: {
      type: String,
      default: 'js',
    },
    code: {
      type: String,
      required: true,
    },
  },
  computed: {
    newCode() {
      this.codeTransition();

      return this.code;
    },
  },
  mounted() {
    this.firstMount = false;
  },
  methods: {
    codeTransition() {
      if (this.firstMount) return;

      const code = this.$el;

      gsap.fromTo(code, {
        height: code.offsetHeight,
      }, {
        height: 'auto',
        duration: dr['08'],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.code {
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: var(--code_cl-background);

  &::-webkit-scrollbar {
    height: calc(#{$pd-12} / 2 + #{$bw-02});
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      to bottom,
      var(--code_cl-comment) $bw-02,
      transparent 0
    );
    background-clip: content-box;
    border-right: solid $pd-12 transparent;
    border-left: solid $pd-12 transparent;
  }
}
</style>
