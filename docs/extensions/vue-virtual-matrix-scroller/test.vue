<template>
  <p>123</p>
</template>

<script>
import options from './options';

import test from './1/options';

console.log(test.item.validator({
  item: {
    width: 10,
    height: 10,
  },
}));

// console.log(test.content.validator({
//   content: [],
// }));

export default {
  name: 'Test',
  props: {
    /* eslint-disable-next-line vue/require-default-prop */
    classes: options.classes,
    /* eslint-disable-next-line vue/require-default-prop */
    item: options.item,
  },
  mounted() {
    console.log('Hello from Loading!', this.classes, this.item);
  },
};
</script>
