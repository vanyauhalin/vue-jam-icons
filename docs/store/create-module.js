const template = (name, content, options) => {
  let object = {
    content,
    name: options.modifier ? options.modifier(name) : name,
  };

  if (options.extensions) {
    object = {
      ...object,
      ...options.extensions,
    };
  }

  return object;
};

/**
 * @param {Object} mod
 * @param {Object} mod.name – module name.
 * @param {String} mod.name.singular – singular name.
 * @param {String} mod.name.plural – plural name.
 * @param {String|Number} mod.main – main item containing all the others (rendered first).
 * @param {Array} mod.other – other items.
 *
 * @param {Object} options
 * @param {Function} options.nameModifier – item name render modifier.
 * @param {Object} options.templateExtensions – extensions for template.
 * @param {Array} options.mainContent – extension for main item content.
 * @param {Boolean} options.listSort – sort list items (numbers only) in ascending order.
 */
export default (mod, options = {}) => {
  const name = {
    singular: mod.name.singular.toUpperCase(),
    plural: mod.name.plural.toUpperCase(),
  };
  const templateOptions = {};
  const templateExtensions = {};

  if (Object.keys(options).length !== 0) {
    if (options.nameModifier) templateOptions.modifier = options.nameModifier;
    if (options.templateExtensions) {
      templateExtensions.main = {};
      templateExtensions.other = {};

      Object.entries(options.templateExtensions).forEach((entry) => {
        const [key, value] = entry;

        templateExtensions.main[key] = value.main;
        templateExtensions.other[key] = value.other;
      });
    }
  }

  const main = template(
    mod.main,
    options.mainContent ? mod.other.concat(options.mainContent) : mod.other,
    options.templateExtensions ? {
      ...templateOptions,
      extensions: templateExtensions.main,
    } : templateOptions,
  );
  const other = mod.other.map((item, index) => {
    const itemOptions = () => {
      if (options.templateExtensions) {
        const itemExtensions = {};

        Object.entries(templateExtensions.other).forEach((entry) => {
          const [key, value] = entry;
          itemExtensions[key] = value[index];
        });

        return {
          ...templateOptions,
          extensions: itemExtensions,
        };
      }

      return templateOptions;
    };

    return template(item, [item], itemOptions());
  });
  const list = [main].concat(other);

  const state = {
    main,
    list: options.listSort === true
      ? list.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name === b.name) return 0;
        if (a.name < b.name) return -1;

        return undefined;
      })
      : list,
    current: main,
  };
  const getters = {
    [`GET_LIST_OF_${name.plural}`]: () => state.list,
    [`GET_MAIN_${name.singular}`]: () => state.main,
    [`GET_CURRENT_${name.singular}`]: () => state.current,
  };
  const actions = {
    [`SET_${name.singular}`]({ state, dispatch }, item) {
      dispatch('SET_ICONS', {
        [name.plural.toLowerCase()]: item.content,
      }).then(() => {
        state.current = item;
      });
    },
  };

  return {
    state,
    getters,
    actions,
  };
};
