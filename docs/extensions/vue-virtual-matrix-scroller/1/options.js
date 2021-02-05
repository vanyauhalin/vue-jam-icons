import { lowerCaseLetter, is } from '../utils';

const options = {
  content: {
    type: Array,
    required: true,
  },
  item: {
    type: [Number, Object, String],
    default: 0,
    keys: {
      width: {
        type: [Number, String],
        default: 0,
      },
      height: {
        type: [Number, String],
        default: 0,
      },
    },
  },
};

const forEach = (obj, fn) => Object.entries(obj).forEach(([k, v]) => fn(k, v));
const every = (obj) => Object.values(obj).every((el) => el);

const check = {};

/**
 * @param {*} v – option value
 * @param {*} types
 * @param {*} k
 */
check.types = (k, v) => v.type.some((type) => check.type(k, v, type));

/**
 * @param {*} k – prop key
 * @param {*} v – option key value
 */
const detectTypes = (k, v) => (
  is(v.type).array ? check.types(k, v) : check.type(k, v, v.type)
);

/**
 * @param {*} k – prop key
 * @param {*} v – option value
 */
const valid = (k, v) => every({
  type: detectTypes(k, v),
  // required: v.required ? !is(k).undefined : detectTypes(v.default, v),
});

/**
 * @param {*} v – option value
 * @param {*} type
 * @param {*} k – prop key
 */
check.type = (k, v, type) => {
  // console.log('🚀 ~ type', type, is(type));
  // console.log('TYT', v, is(type), k);
  if (is(type).Object && is(k).object && v.keys) {
    // console.log('tyt!!!!!!!!!!!!!!!!!');

    // console.log(v.keys);
    forEach(v.keys, (kk, vv) => {
      /* eslint-disable-next-line no-param-reassign */
      v.keys[kk].validator = (prop) => valid(prop[kk], vv);
    });

    Object.values(v.keys)

    return console.log(v.keys, k);
  }

  return is(k)[lowerCaseLetter(type.name)];
};

// const setValidators = () => {
forEach(options, (k, v) => {
  options[k].validator = (prop) => valid(prop[k], v);
});

export default options;
