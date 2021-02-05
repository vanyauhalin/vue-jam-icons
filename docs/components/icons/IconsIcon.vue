<template>
  <li
    class="icon"
    tabindex="0"
    @mouseover="showMore(name)"
    @mouseleave="hideMore"
    @focusin="showMore(name)"
    @focusout="hideMore"
  >
    <transition name="label_t">
      <div
        class="label label_m"
        v-show="checkDisplay(name)"
      >
        <span class="label__content">
          {{ name }}
        </span>
      </div>
    </transition>
    <div class="icon__icon">
      <JIcon
        :name="name"
        :width="sizesCurrent.name"
        :height="sizesCurrent.name"
      />
    </div>
    <transition name="icon__events_t">
      <ul
        class="icon__events"
        v-show="checkDisplay(name)"
      >
        <li>
          <button
            class="icon__event-btn"
            type="button"
            v-if="bagIncludes(name)"
            @click="addBag(name)"
          >
            <JIcon name="plus" />
          </button>
          <button
            class="icon__event-btn"
            type="button"
            v-else
            @click="removeBag(name)"
          >
            <JIcon name="minus" />
          </button>
        </li>
        <li>
          <button
            class="icon__event-btn"
            type="button"
            @click="showUsage(name)"
          >
            <JIcon name="code" />
          </button>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'IconsIcon',
  data: () => ({
    current: {
      icon: undefined,
    },
  }),
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      sizesCurrent: 'GET_CURRENT_SIZE',
      bagIncludes: 'IS_IN_BAG',
    }),
  },
  methods: {
    ...mapMutations({
      addBag: 'ADD_TO_BAG',
      showUsage: 'SHOW_USAGE',
    }),
    ...mapActions({
      removeBag: 'REMOVE_FROM_BAG',
    }),
    showMore(name) {
      if (this.current.icon !== name) {
        this.current.icon = name;

        this.$el.classList.add('icon_active');
      }
    },
    hideMore(event) {
      const icon = this.$el;
      const rT = event.relatedTarget;

      if (!rT
        || rT === null
        || !rT.offsetParent
        || rT.offsetParent === null
        || (!rT.isEqualNode(icon) && !rT.offsetParent.isEqualNode(icon))) {
        icon.classList.remove('icon_active');

        this.current.icon = undefined;
      }
    },
    checkDisplay(name) {
      return this.current.icon === name;
    },
  },
};
</script>
