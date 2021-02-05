import {
  Install,
  Mount,
  Usage,
} from '@/data/code';

export const state = {
  contents: [{
    name: 'Install',
    lang: 'plaintext',
    code: Install,
  }, {
    name: 'Global mount',
    contents: [{
      name: 'All icons',
      code: Mount.global.default,
    }, {
      name: 'Certain icons',
      code: Mount.global.certain(['github']),
    }, {
      name: 'Custom icons',
      code: Mount.global.custom,
    }, {
      name: 'Config',
      code: Mount.global.config,
    }],
  }, {
    name: 'Local mount',
    contents: [{
      name: 'All icons',
      code: Mount.local.default,
    }, {
      name: 'Certain icons',
      code: Mount.local.certain(['github']),
    }, {
      name: 'Custom icons',
      code: Mount.local.custom,
    }],
  }, {
    name: 'Usage',
    contents: [{
      name: 'Template',
      lang: 'html',
      code: Usage.template,
    }, {
      name: 'Props',
      lang: 'plaintext',
      code: Usage.props,
    }],
  }, {
    name: 'Nuxt',
    lang: 'html',
    code: Usage.template,
  }],
  current: {},
};

export const getters = {
  GET_GUIDE_CONTENTS: (state) => state.contents,
  GET_CURRENT_GUIDE: (state) => state.current,
};

export const mutations = {
  SET_GUIDE_CONTENT(state, content) {
    state.current = content;
  },
};

export default {
  state,
  getters,
  mutations,
};
