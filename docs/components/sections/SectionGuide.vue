<template>
  <div class="guide">
    <TheCode
      :lang="currentGuide.lang"
      :code="currentGuide.code"
    />
    <ul class="nav">
      <li
        class="nav__item"
        v-for="content in guidContents"
        :key="content.name"
        @mouseleave="hideSubcontents"
        @focusout="hideSubcontentsIfFocusOut"
      >
        <template v-if="content.contents">
          <span
            class="btn btn_m"
            :class="isContentCurrent(content)"
            tabindex="0"
            @mouseover="showSubcontents(content)"
            @focusin="showSubcontents(content)"
          >
            {{ content.name }}
          </span>
          <transition name="fade">
            <ul
              class="guide__subcontents"
              v-show="isSubcontentsVisible(content.name)"
            >
              <li
                class="guide__subcontent"
                v-for="subcontent in content.contents"
                :key="subcontent.name"
              >
                <button
                  class="btn btn_m"
                  :class="isContentCurrent(subcontent)"
                  type="button"
                  @click="showContent(subcontent)"
                >
                  {{ subcontent.name }}
                </button>
              </li>
            </ul>
          </transition>
        </template>
        <template v-else>
          <button
            class="btn btn_m"
            :class="isContentCurrent(content)"
            type="button"
            @click="showContent(content)"
            @focusin="hideSubcontents"
          >
            {{ content.name }}
          </button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import TheCode from '../TheCode';

export default {
  name: 'SectionGuide',
  components: {
    TheCode,
  },
  data: () => ({
    current: {
      content: undefined,
    },
  }),
  computed: {
    ...mapGetters({
      guidContents: 'GET_GUIDE_CONTENTS',
      currentGuide: 'GET_CURRENT_GUIDE',
    }),
  },
  created() {
    this.setGuideContent(this.guidContents[0]);
  },
  methods: {
    ...mapMutations({
      setGuideContent: 'SET_GUIDE_CONTENT',
    }),
    hideSubcontents() {
      this.current.content = undefined;
    },
    hideSubcontentsIfFocusOut(event) {
      if (event.relatedTarget === null) this.hideSubcontents();
    },
    showContent(content) {
      this.setGuideContent(content);
      this.hideSubcontents();
    },
    showSubcontents(content) {
      this.current.content = content.name;
    },
    isSubcontentsVisible(name) {
      return this.current.content === name;
    },
    isContentCurrent(content) {
      return (this.currentGuide === content
        || (content.contents
        && content.contents.find((subcontent) => subcontent === this.currentGuide))
      ) ? 'btn_active' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.guide {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: $mg-08;

  .guide__subcontents {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 100%;
    padding: $pd-08 $pd-08 calc(#{$mg-08} / 2) $pd-08;
    background-color: var(--cl-neutral-01);
    border-radius: $br-05 $br-05 0 0;
    transform: translateX(-50%);

    &::before,
    &::after {
      position: absolute;
      bottom: calc(#{$mg-08} - 1px);
      width: $br-05 + 1px;
      height: $br-05 + 1px;
      background: url('~images/dropdown_br.svg') no-repeat;
      background-size: contain;
      content: '';
    }

    &::before {
      left: - $br-05;
    }

    &::after {
      right: - $br-05;
      transform: rotate(90deg);
    }

    .guide__subcontent {
      margin-bottom: $mg-08 / 2;
      text-align: center;

      &:last-of-type {
        margin: 0;
      }
    }
  }
}
</style>
