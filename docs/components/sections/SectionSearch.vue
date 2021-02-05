<template>
  <form class="search container">
    <input
      class="search__input"
      type="search"
      :placeholder="placeholder"
      v-model="current.search"
    >
    <h1 class="search__hd">
      {{ iconsNumber }} pixel-perfect icons
      <br>
      as Vue components
    </h1>
  </form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'SectionForm',
  data: () => ({
    current: {
      search: undefined,
    },
  }),
  computed: {
    ...mapGetters({
      iconsNumber: 'GET_NUMBER_OF_ICONS',
      categories: 'GET_LIST_OF_CATEGORIES',
      categoriesCurrent: 'GET_CURRENT_CATEGORY',
    }),
    placeholder() {
      return this.categoriesCurrent === this.categories[0]
        ? 'Search for icons'
        : `Search for ${this.categoriesCurrent.name.toLowerCase()} icons`;
    },
  },
  methods: {
    ...mapMutations({
      // setIcons: 'SET_ICONS',
      setSearch: 'SET_SEARCH',
    }),
  },
  watch: {
    current: {
      handler(value) {
        this.setSearch(value.search);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--cl-primary-02);
  // background: var(--cl-accent) url('~images/search-bg.png');
  background-size: cover;

  .search__input {
    width: 100%;
    margin-bottom: $mg-08;
    padding: $pd-08;
    color: var(--cl-neutral-08);
    border-radius: $br-04;
    box-shadow: 0 1px 3px 0 var(--cl-shadow-03), 0 1px 2px 0 var(--cl-shadow-02);
    transition: box-shadow $dr-05;

    &:focus {
      box-shadow: 0 10px 15px -3px var(--cl-shadow-03), 0 4px 6px -2px var(--cl-shadow-01);
    }

    &::placeholder {
      color: var(--cl-neutral-06);
    }
  }

  .search__hd {
    color: var(--cl-neutral-07);
    font-weight: 600;
    font-size: $fs-07;
    text-align: center;
  }
}
</style>
