<template>
  <ul class="icons">
    <li
      class="icon icon_loading"
      v-for="icon in loadingIcons"
      :key="icon"
    />
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'IconsLoading',
  data: () => ({
    loadingIcons: [],
  }),
  computed: {
    ...mapGetters({
      observedIconsLimit: 'GET_OBSERVED_ICONS_LIMIT',
    }),
  },
  created() {
    this.parseIcons();
  },
  mounted() {
    this.setObservedIconsLimit(this.$el).then(() => {
      for (let i = 0; i < this.observedIconsLimit.square; i += 1) this.loadingIcons.push(i);

      this.setIcons();
    });
  },
  methods: {
    ...mapActions({
      parseIcons: 'PARSE_ICONS',
      setIcons: 'SET_ICONS',
      setObservedIconsLimit: 'SET_OBSERVED_ICONS_LIMIT',
    }),
  },
};
</script>
