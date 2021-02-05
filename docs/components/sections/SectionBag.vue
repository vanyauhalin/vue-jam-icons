<template>
  <transition name="bag_t">
    <section
      class="bag"
      v-if="isBagVisible"
    >
      <div class="bag__bar">
        <button
          class="bag__btn"
          type="button"
          @click="hideBag"
        >
          <JIcon name="close" />
        </button>
        <ul class="bag__icons">
          <li
            class="bag__icon"
            tabindex="0"
            v-for="icon in bagIcons"
            :key="icon"
          >
            <span class="bag__icon-icon">
              <JIcon :name="icon" />
            </span>
            <button
              class="bag__icon-btn"
              type="button"
              @click="removeFromBag(icon)"
            >
              <JIcon name="minus" />
            </button>
          </li>
        </ul>
        <button
          class="bag__btn"
          type="button"
          @click="changeUsageDisplay(bagIcons)"
        >
          <JIcon name="code" />
        </button>
      </div>
    </section>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SectionBag',
  computed: {
    ...mapGetters({
      bagIcons: 'GET_BAG_ICONS',
      isBagVisible: 'IS_BAG_VISIBLE',
    }),
  },
  methods: {
    ...mapActions({
      removeFromBag: 'REMOVE_FROM_BAG',
      changeUsageDisplay: 'CHANGE_USAGE_DISPLAY',
      hideBag: 'HIDE_BAG',
    }),
  },
};
</script>

<style lang="scss" scoped>
.bag {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  padding: 0 $pd-08 $pd-08 $pd-08;

  &.bag_t-enter-active {
    animation: bag_fade $dr-05;
  }

  &.bag_t-leave-active {
    animation: bag_fade $dr-05 reverse;
  }

  .bag__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $pd-06;
    background-color: var(--cl-primary-02);
    border-radius: $br-05;
  }

  .bag__btn {
    display: block;
    padding: $pd-02;
    background-color: transparent;
    border-radius: $br-04;
    cursor: pointer;
    transition: background-color $dr-05;

    &:hover,
    &:focus {
      background-color: var(--cl-primary-01);
    }
  }

  .bag__icons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(calc(20px + #{$pd-02} * 2), 1fr));
    gap: $mg-04;
    max-width: calc(100% - #{$pd-06} * 2 - #{$pd-02} * 4 - 20px * 2);

    .bag__icon {
      position: relative;

      &:hover,
      &:focus {
        .bag__icon-icon {
          background-color: var(--cl-accent-01);
        }

        .bag__icon-btn {
          display: block;
        }
      }
    }

    .bag__icon-icon {
      display: block;
      padding: $pd-02;
      border-radius: $br-04;
      opacity: 0.5;
      transition: background-color $dr-05;
    }

    .bag__icon-btn {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      display: none;
      padding: $pd-02;
      color: var(--cl-accent-02);
      background-color: transparent;
      border-radius: $br-04;
      cursor: pointer;
    }
  }

  @keyframes bag_fade {
    from {
      bottom: -100%;
      opacity: 0;
    }

    to {
      bottom: 0;
      opacity: 1;
    }
  }
}
</style>
