import { lowerCaseLetter, is } from './utils';

const options = {
  classes: {
    type: Object,
    required: true,
    keys: {
      list: {
        type: [Array, String],
        default: '',
      },
      item: {
        type: [Array, String],
        default: '',
      },
      loading: {
        type: [Array, String],
        default: '',
      },
    },
  },
  content: {
    type: Array,
    required: true,
  },
  item: {
    type: Object,
    required: true,
    keys: {
      width: {
        type: [Number, String],
        required: true,
      },
      height: {
        type: [Number, String],
        required: true,
      },
    },
  },
};

Object.entries(options).forEach(([key, value]) => {
  if (is(value.type).Object && value.keys) {
    Object.entries(value.keys).forEach(([k, v]) => {
      const checkType = (prop, type) => is(prop)[lowerCaseLetter(type)];
      const checkTypes = (prop) => v.type.some((type) => checkType(prop, type.name));

      const detectTypes = is(v.type).array
        ? (prop) => checkTypes(prop)
        : (prop) => checkType(prop, v.type.name);
      const validators = {
        type: (prop) => detectTypes(prop.k),
        required: v.required ? (prop) => prop.k : () => detectTypes(v.default),
      };

      options[key].keys[k].validator = (prop) => (
        validators.required(prop) && validators.type(prop)
      );
    });
  }
});

export default options;
