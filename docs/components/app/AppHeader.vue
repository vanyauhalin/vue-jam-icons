<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__logo">
        <TheLogo />
      </div>
      <ul class="header__resources">
        <li
          class="header__resource"
          v-for="resource in resources"
          :key="resource.name"
        >
          <a
            class="header__resource-link"
            :href="resource.link"
          >
            {{ resource.name }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import TheLogo from '../TheLogo';

export default {
  name: 'AppHeader',
  components: {
    TheLogo,
  },
  data: () => ({
    resources: [{
      name: 'svg',
      link: '',
    }, {
      name: 'npm',
      link: '',
    }, {
      name: 'Yarn',
      link: '',
    }, {
      name: 'GitHub',
      link: '',
    }],
  }),
};
</script>

<style lang="scss" scoped>
.header {
  padding: $pd-08 0;

  .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 $pd-08;
  }

  .header__resources {
    display: flex;

    .header__resource {
      margin-right: $mg-12;

      &:last-of-type {
        margin-right: 0;
      }

      .header__resource-link {
        color: var(--cl-neutral-08);
        font-weight: 500;
        transition: color $dr-05;

        &:hover,
        &:focus {
          color: var(--cl-primary-02);
        }
      }
    }
  }
}
</style>
