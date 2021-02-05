<template>
  <ul v-infinite-scroll>

  </ul>
</template>

<script>
export default {
  name: 'InfiniteScroll',
  props: {
    content: {
      type: Array,
      required: true,
    },
    x: {
      type: Array,
      required: true,
    },
    y: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    infiniteScroll: {},
  }),
  created() {
    this.infiniteScroll = {
      content: this.content,
      observed: {
        limits: {
          x: this.x,
          y: this.y,
        },
      },
    };
  },
  watch: {
    content(newValue) {
      this.infiniteScroll.content = newValue;
    },
  },
};
</script>
