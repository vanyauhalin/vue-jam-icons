<template>
  <InfiniteScroll
    class="icons"
    :content="filteredIcons"
    :x="observedIconsLimit.x"
    :y="observedIconsLimit.y"
    v-slot="{ content }"
  >
    <IconsIcon
      v-for="icon in content"
      :key="icon.name"
      :name="icon.name"
    />
  </InfiniteScroll>
</template>

<script>
import { mapGetters } from 'vuex';

import InfiniteScroll from './InfiniteScroll';
import IconsIcon from '../icons/IconsIcon';

export default {
  name: 'test',
  components: {
    InfiniteScroll,
    IconsIcon,
  },
  computed: {
    ...mapGetters({
      filteredIcons: 'GET_FILTERED_ICONS',
      observedIconsLimit: 'GET_OBSERVED_ICONS_LIMIT',
    }),
  },
};
</script>
