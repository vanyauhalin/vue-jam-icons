<template>
  <ul>
    <IconsIcon
      v-for="item in content"
      :key="item.name"
      :name="item.name"
    />
  </ul>
</template>

<script>
import IconsIcon from '../../icons/IconsIcon';

export default {
  name: 'InfiniteScrollList',
  components: {
    IconsIcon,
  },
  props: {
    content: {
      type: Array,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
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
