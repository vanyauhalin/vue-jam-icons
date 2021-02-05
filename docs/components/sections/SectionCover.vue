<template>
  <section class="cover">
    <SectionSearch />
    <SectionGuide />
  </section>
</template>

<script>
import SectionGuide from './SectionGuide';
import SectionSearch from './SectionSearch';

export default {
  name: 'SectionCover',
  components: {
    SectionGuide,
    SectionSearch,
  },
};
</script>

<style lang="scss" scoped>
.cover {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(calc((#{$bp-03} - #{$pd-08} * 2 - #{$mg-08}) / 2), 1fr));
  gap: $mg-08;
  margin-bottom: $mg-12;
}
</style>
