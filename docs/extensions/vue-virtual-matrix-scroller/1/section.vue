<template>
  <Scroller
    class="icons"
    :options="options"
    v-slot="{ content }"
  >
    <Item
      v-for="item in content"
      :key="item.name"
      :name="item.name"
    />
  </Scroller>
</template>

<script>
import Scroller from './scroller';
import ItemLoading from './item-loading';

const Item = () => ({
  component: import('./item'),
  loading: ItemLoading,
  delay: 0,
});

export default {
  name: 'Section',
  components: {
    Scroller,
    Item,
  },
  data: () => ({
    options: {
      content: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      item: {
        width: 100,
        height: 100,
      },
    },
  }),
};
</script>
