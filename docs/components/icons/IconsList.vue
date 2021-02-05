<template>
  <ul
    class="icons"
    v-infinite-scroll
  >
    <IconsIcon
      v-for="icon in infiniteScroll.observed.content"
      :key="icon.name"
      :name="icon.name"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

import IconsIcon from './IconsIcon';

export default {
  name: 'SectionIcons',
  components: {
    IconsIcon,
  },
  data: () => ({
    infiniteScroll: {},
  }),
  computed: {
    ...mapGetters({
      filteredIcons: 'GET_FILTERED_ICONS',
      observedIconsLimit: 'GET_OBSERVED_ICONS_LIMIT',
    }),
  },
  created() {
    this.infiniteScroll = {
      content: this.filteredIcons,
      observed: {
        limits: {
          x: this.observedIconsLimit.x,
          y: this.observedIconsLimit.y,
        },
      },
    };
  },
  watch: {
    filteredIcons(newValue) {
      this.infiniteScroll.content = newValue;
    },
  },
};
</script>
