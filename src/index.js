import JIcon from './JIcon';

export default {
  install: (Vue, options = {}) => {
    Vue.component(JIcon.name, JIcon);

    Object.entries(options).forEach(([key, value]) => {
      if (JIcon.props[key]) JIcon.props[key].default = value;
    });
  },
  add: (icons) => JIcon.add(icons),
};
