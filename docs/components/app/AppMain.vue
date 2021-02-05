<template>
  <main class="main">
    <div class="main__inner">
      <SectionCover />
      <!-- <SectionTest /> -->
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
        <p>12фыв3</p>
      </Scroller>
      <SectionNavbar />
      <!-- <SectionIcons /> -->
      <SectionWarn />
      <SectionBag />
      <SectionUsage />
    </div>
  </main>
</template>

<script>
import Scroller from '../../extensions/vue-virtual-matrix-scroller/scroller';
import SectionBag from '../sections/SectionBag';
import SectionCover from '../sections/SectionCover';
// import SectionIcons from '../sections/SectionIcons';
import SectionNavbar from '../sections/SectionNavbar';
import SectionUsage from '../sections/SectionUsage';
import SectionWarn from '../sections/SectionWarn';

// import SectionTest from '../infiniteScroll/SectionTest';

export default {
  name: 'AppMain',
  components: {
    Scroller,
    SectionBag,
    SectionCover,
    // SectionIcons,
    SectionNavbar,
    SectionUsage,
    SectionWarn,
    // SectionTest,
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;

  .main__inner {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    max-width: $bp-04;
    margin: 0 auto;
    padding: 0 $pd-08;
  }
}
</style>
