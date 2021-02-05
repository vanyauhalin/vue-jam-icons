<template>
  <!-- v-if="isIconsVisible" -->
  <!-- v-infinite-scroll="uploadObservedIcons" -->
  <ul
    class="icons"
    v-if="isIconsLoading"
  >
    <li
      class="icon icon_loading"
      v-for="icon in loading.icons"
      :key="icon"
    />
  </ul>
  <ul
    class="icons"
    v-else
  >
    <TheIcon
      v-for="icon in observedIcons"
      :key="icon.name"
      :name="icon.name"
    />
  </ul>
  <!-- <ul
    class="icons"
    v-infinite-scroll="uploadObservedIcons"
  >
    <button @click="setIconsLoading" />
    <template v-if="isIconsLoading">
      <li
        class="icon icon_loading"
        v-for="icon in loading.icons"
        :key="icon"
      />
    </template>
    <template v-else>
      <TheIcon
        v-for="icon in observedIcons"
        :key="icon.name"
        :name="icon.name"
      />
    </template>
  </ul> -->
  <!-- <ul
    class="icons"
    v-infinite-scroll="uploadObservedIcons"
  >
    <TheIcon
      v-for="icon in observedIcons"
      :key="icon.name"
      :name="icon.name"
    />
  </ul> -->
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

import TheIcon from '../TheIcon';

export default {
  name: 'SectionIcons',
  components: {
    TheIcon,
  },
  data: () => ({
    loading: {
      status: true,
      icons: [],
    },
  }),
  computed: {
    ...mapGetters({
      observedIcons: 'GET_OBSERVED_ICONS',
      observedIconsLimit: 'GET_OBSERVED_ICONS_LIMIT',
      // isIconsVisible: 'IS_ICONS_VISIBLE',
      isIconsLoading: 'IS_ICONS_LOADING',
    }),
  },
  created() {
    this.setIconsLoading();
    this.parseIcons();
  },
  mounted() {
    this.setObservedIconsLimit(this.$el).then(() => {
      for (let i = 0; i < this.observedIconsLimit; i += 1) this.loading.icons.push(i);

      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      delay(3000).then(() => this.setIcons());
    });
  },
  updated() {
    console.log('tyt');
  },
  methods: {
    ...mapActions({
      parseIcons: 'PARSE_ICONS',
      setIcons: 'SET_ICONS',
      setObservedIconsLimit: 'SET_OBSERVED_ICONS_LIMIT',
    }),
    ...mapMutations({
      uploadObservedIcons: 'UPLOAD_OBSERVED_ICONS',
      // changeIconsLoading: 'CHANGE_ICONS_LOADING',
      setIconsLoading: 'SET_ICONS_LOADING',
      reset: 'reset',
    }),
  },
};
</script>
