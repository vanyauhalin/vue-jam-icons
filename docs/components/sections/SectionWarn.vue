<template>
  <div
    class="warn"
    v-if="!isIconsFound"
  >
    <p class="warn__pr">
      No icon found for that search.
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SectionWarn',
  computed: {
    ...mapGetters({
      isIconsFound: 'IS_ICONS_FOUND',
    }),
  },
  updated() {
    const warn = document.getElementsByClassName('warn')[0];

    if (warn === undefined || warn.getAttribute('style') !== null) return;

    const different = window.innerHeight - document.getElementById('app').offsetHeight;

    if (different > 0) {
      warn.setAttribute('style', `height: ${different + warn.offsetHeight}px`);
    } else {
      warn.removeAttribute('style');
    }
  },
};
</script>

<style lang="scss" scoped>
.warn {
  display: flex;
  align-items: center;
  justify-content: center;

  .warn__pr {
    color: var(--cl-neutral-05);
    font-weight: 600;
  }
}
</style>
