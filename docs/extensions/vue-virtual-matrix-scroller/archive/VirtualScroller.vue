<template>
  <VirtualScrollerList
    class="icons"
    :content="filteredIcons"
    :x="limits.x"
    :y="limits.y"
  />
</template>

<script>
import { mapGetters } from 'vuex';

import VirtualScrollerLoading from './VirtualScrollerLoading';

const VirtualScrollerList = () => ({
  component: import('./VirtualScrollerList'),
  loading: {
    render: (h) => h(VirtualScrollerLoading, {
      props: {
        classes: {
          list: ['icons'],
          item: ['icon', 'icon_loading'],
        },
        item: {
          x: 100,
          y: 100,
        },
      },
    }),
  },
  delay: 0,
});

export default {
  name: 'VirtualScroller',
  components: {
    VirtualScrollerList,
  },
  data: () => ({
    content: [],
    limits: {},
  }),
  computed: {
    ...mapGetters({
      filteredIcons: 'GET_FILTERED_ICONS',
    }),
  },
  mounted() {
    this.limits = this.$el.VirtualScrollerLoading.limits;
  },
};
</script>
