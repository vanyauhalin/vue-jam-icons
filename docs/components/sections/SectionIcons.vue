<template>
  <IconsList />
</template>

<script>
import IconsLoading from '../icons/IconsLoading';

const IconsList = () => ({
  component: import('../icons/IconsList'),
  loading: IconsLoading,
  delay: 0,
});

export default {
  name: 'SectionIcons',
  components: {
    IconsList,
  },
};
</script>
