<template>
  <nav class="navbar">
    <ul class="nav navbar__nav">
      <li
        class="nav__item"
        v-for="category in listOfCategories"
        :key="category.name"
      >
        <button
          class="btn btn_m"
          :class="isCurrentOption(currentCategory.name, category.name)"
          type="button"
          @click="setCategory(category)"
        >
          <span class="sr-only">
            Icon category
          </span>
          {{ category.name }}
        </button>
      </li>
    </ul>
    <ul class="nav navbar__container">
      <li
        class="nav__item"
        v-for="size in listOfSizes"
        :key="size.name"
      >
        <button
          class="btn btn_s"
          :class="isCurrentOption(currentSize.name, size.name)"
          type="button"
          @click="setSize(size)"
        >
          <span class="sr-only">
            Icon size
          </span>
          {{ size.name }}px
        </button>
      </li>
    </ul>
    <ul class="nav navbar__container">
      <li
        class="nav__item"
        v-for="type in listOfTypes"
        :key="type.name"
        @mouseover="showLabel(type.name)"
        @mouseleave="hideLabel"
      >
        <transition name="label_t">
          <div
            class="label label_s"
            v-show="isTypeVisible(type.name)"
          >
            <span class="label__content">
              {{ type.name }}
            </span>
          </div>
        </transition>
        <button
          class="btn btn_s"
          :class="isCurrentOption(currentType.name, type.name)"
          type="button"
          @click="setType(type)"
          @focusin="showLabel(type.name)"
          @focusout="hideLabel"
        >
          <span class="sr-only">
            Icon type
          </span>
          <JIcon
            :name="type.icon"
            width="12"
            height="12"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SectionsNavbar',
  data: () => ({
    current: {
      type: undefined,
    },
  }),
  computed: {
    ...mapGetters({
      listOfCategories: 'GET_LIST_OF_CATEGORIES',
      currentCategory: 'GET_CURRENT_CATEGORY',
      listOfSizes: 'GET_LIST_OF_SIZES',
      currentSize: 'GET_CURRENT_SIZE',
      listOfTypes: 'GET_LIST_OF_TYPES',
      currentType: 'GET_CURRENT_TYPE',
    }),
  },
  methods: {
    ...mapActions({
      setCategory: 'SET_CATEGORY',
      setSize: 'SET_SIZE',
      setType: 'SET_TYPE',
    }),
    showLabel(type) {
      this.current.type = type;
    },
    hideLabel() {
      this.current.type = undefined;
    },
    isTypeVisible(type) {
      return this.current.type === type;
    },
    isCurrentOption(current, name) {
      return current === name ? 'btn_active' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;

  margin-bottom: $mg-12;

  .navbar__nav {
    margin-right: auto;
  }

  .navbar__container {
    gap: $mg-10;
    margin-right: $mg-10;

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
