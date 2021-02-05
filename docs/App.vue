<template>
  <div id="app">
    <AppHeader />
    <AppMain />
    <!-- <AppFooter /> -->
  </div>
</template>

<script>
// import AppFooter from './components/app/AppFooter';
import AppHeader from './components/app/AppHeader';
import AppMain from './components/app/AppMain';

export default {
  name: 'App',
  components: {
    // AppFooter,
    AppHeader,
    AppMain,
  },
};
</script>
