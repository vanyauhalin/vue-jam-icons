<template>
  <transition name="fade">
    <section
      class="usage"
      v-if="isUsageVisible"
      @click.self="hideUsage"
    >
      <div class="usage__code">
        <TheCode :code="currentUsageCode" />
      </div>
      <ul class="nav">
        <li
          class="nav__item"
          v-for="content in usageContents"
          :key="content.name"
        >
          <button
            class="btn btn_m usage__btn"
            :class="isContentCurrent(content)"
            type="button"
            @click="setUsageContent(content)"
          >
            {{ content.name }}
          </button>
        </li>
      </ul>
    </section>
  </transition>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import TheCode from '../TheCode';

export default {
  name: 'SectionUsage',
  components: {
    TheCode,
  },
  computed: {
    ...mapGetters({
      isBagVisible: 'IS_BAG_VISIBLE',
      usageContents: 'GET_USAGE_CONTENTS',
      currentUsage: 'GET_CURRENT_USAGE',
      currentUsageCode: 'GET_CURRENT_USAGE_CODE',
      isUsageVisible: 'IS_USAGE_VISIBLE',
    }),
  },
  created() {
    this.setUsageContent(this.usageContents[0]);
  },
  updated() {
    if (this.isBagVisible && this.isUsageVisible) {
      const bag = document.getElementsByClassName('bag')[0];
      const hg = bag.offsetHeight;
      const usage = this.$el;
      const pd = parseFloat(window.getComputedStyle(usage).paddingBottom);

      if (pd !== hg) usage.setAttribute('style', `padding-bottom: ${hg}px`);
    }
  },
  methods: {
    ...mapMutations({
      setUsageContent: 'SET_USAGE_CONTENT',
      hideUsage: 'HIDE_USAGE',
    }),
    isContentCurrent(content) {
      return this.currentUsage.name === content.name ? 'usage__btn_active' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.usage {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  // max-width: calc((#{$bp-03} - #{$pd-08} * 2) / 2);
  padding: 0 $pd-08;
  background-color: var(--cl-shadow-04);

  .usage__code {
    margin-bottom: $mg-08;
  }

  .usage__btn {
    background-color: var(--cl-neutral-05);

    &:hover,
    &:focus,
    &.usage__btn_active {
      background-color: var(--cl-neutral-01);
    }

    &.usage__btn_active {
      &:hover,
      &:focus {
        background-color: var(--cl-neutral-04);
      }
    }
  }
}
</style>
