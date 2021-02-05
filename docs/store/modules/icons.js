import * as customIcons from '@/data/custom-icons';
import * as defaultIcons from '@/data/icons';

export const state = {
  default: Object.values({ ...defaultIcons }),
  custom: Object.values({ ...customIcons }),
  parsed: {},
  filtered: {},
  observed: {},
};

export const getters = {
  GET_ICONS: (state) => state.default,
  GET_NUMBER_OF_ICONS: (state, getters) => getters.GET_ICONS.length,
  GET_ICONS_FILTERED: (state) => state.filtered,
  GET_FILTERED_ICONS: (state, getters) => getters.GET_ICONS_FILTERED.icons,
  GET_ICONS_OBSERVED: (state) => state.observed,
  GET_OBSERVED_ICONS: (state, getters) => getters.GET_ICONS_OBSERVED.icons,
  GET_OBSERVED_ICONS_LIMIT: (state, getters) => getters.GET_ICONS_OBSERVED.limit,
  IS_ICONS_FOUND: (state, getters) => {
    const icons = getters.GET_FILTERED_ICONS;

    return icons && icons.length > 0;
  },
};

export const mutations = {
  PREVIOUS_ICONS_PAGE(state) {
    state.observed.page -= 1;
  },
  NEXT_ICONS_PAGE(state) {
    state.observed.page += 1;
  },
  SET_OBSERVED_ICONS(state) {
    const { filtered, observed } = state;

    // !
    if (!filtered.icons) return;

    // Нужно увеличить диапазон.
    state.observed = {
      ...observed,
      icons: filtered.icons.slice(
        (observed.page - 1) * observed.limit.square, observed.page * observed.limit.square,
      ),
    };
  },
  RESET_OBSERVED_ICONS(state) {
    state.observed = {
      ...state.observed,
      icons: [],
      page: 0,
    };
  },
};

export const actions = {
  async PARSE_ICONS({ getters, state }) {
    return new Promise((resolve) => {
      const { parsed } = state;
      const categories = getters.GET_MAIN_CATEGORY.content;
      const temp = Object.assign([], state.default);

      categories.forEach((category) => {
        parsed[category] = {};

        temp.slice().reverse().forEach((icon, index, array) => {
          if (icon.category === category) {
            const { type } = icon;

            if (!parsed[category][type]) parsed[category][type] = [];

            parsed[category][type].push(icon);
            temp.splice(array.length - 1 - index, 1);
          }
        });

        Object.entries(parsed[category]).forEach((entry) => {
          const [type, icons] = entry;

          parsed[category][type] = icons.reverse();
        });
      });

      resolve();
    });
  },
  async SET_ICONS({ commit, getters, state }, {
    categories = getters.GET_CURRENT_CATEGORY.content,
    types = getters.GET_CURRENT_TYPE.content,
  } = {}) {
    return new Promise((resolve) => {
      const icons = [];

      const forEach = (option, handler) => option.forEach((item) => handler(item));
      const filter = (category) => {
        const push = (type) => Array.prototype.push.apply(
          icons,
          state.parsed[category][type],
        );

        forEach(types, push);
      };

      forEach(categories, filter);

      state.filtered = {
        icons,
        categories,
        types,
      };

      commit('RESET_OBSERVED_ICONS');
      commit('NEXT_ICONS_PAGE');
      commit('SET_OBSERVED_ICONS');
      resolve();
    });
  },
  async SET_OBSERVED_ICONS_LIMIT({ state }, el) {
    return new Promise((resolve) => {
      const style = {
        list: window.getComputedStyle(el),
      };
      style.width = parseFloat(style.list.width);
      style.gap = parseFloat(style.list.gap);

      const icon = {
        x: 100,
        y: 100,
      };
      const viewport = {
        x: style.width,
        y: window.visualViewport.height,
      };
      const limits = {};

      Object.keys(viewport).forEach((key) => {
        limits[key] = Math.floor(viewport[key] / icon[key]);
      });
      Object.keys(limits).forEach((key) => {
        for (
          limits[key];
          limits[key] * icon[key] + (limits[key] - 1) * style.gap > viewport[key];
          limits[key] -= 1
        );
      });

      state.observed.limit = {
        ...limits,
        square: Object.values(limits).reduce(
          ((product, current) => product * current),
        ),
      };

      resolve();
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
