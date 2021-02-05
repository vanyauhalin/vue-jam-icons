<template>
  <Scroller
    :options="{
      classes: {
        list: ['icons'],
        item: ['icon'],
        loading: ['icon_loading'],
      },
      content: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      item: {
        width: 100,
        height: 100,
      },
    }"
  >
    <p>123</p>
  </Scroller>
</template>

<script>
import ScrollerLoading from './scroller-loading';

const Scroller = () => ({
  component: import('./scroller'),
  loading: {
    render: (h) => h(ScrollerLoading, {
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
  name: 'ScrollerWrap',
  components: {
    Scroller,
  },
};
</script>
