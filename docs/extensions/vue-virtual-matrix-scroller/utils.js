export const lowerCase = (str) => str.toLowerCase();
export const lowerCaseLetter = (str) => lowerCase(str.charAt(0)) + str.slice(1);

/**
 * @typedef {Object} is
 * @property {Boolean} Array
 * @property {Boolean} Boolean
 * @property {Boolean} Date
 * @property {Boolean} Error
 * @property {Boolean} Function
 * @property {Boolean} Number
 * @property {Boolean} Object
 * @property {Boolean} Promise
 * @property {Boolean} RegExp
 * @property {Boolean} String
 * @property {Boolean} Symbol
 * @property {Boolean} array
 * @property {Boolean} boolean
 * @property {Boolean} date
 * @property {Boolean} error
 * @property {Boolean} function
 * @property {Boolean} null
 * @property {Boolean} number
 * @property {Boolean} object
 * @property {Boolean} promise
 * @property {Boolean} regExp
 * @property {Boolean} string
 * @property {Boolean} symbol
 * @property {Boolean} undefined
 *
 * @param {*} value
 *
 * @return {is}
 */
export const is = (value) => {
  const check = {
    /* eslint-disable-next-line valid-typeof */
    type: (a, b) => typeof a === b,
    instance: (a, b) => a instanceof b,
    con: (a, b) => a.constructor === b,
  };
  const wraps = {
    type: (con) => check.type(value, lowerCase(con.name)),
    instance: (con) => check.instance(value, con),
    con: (con) => check.con(value, con),
  };

  const cons = [
    Array, Boolean, Date, Error, Function,
    Number, Object, Promise, RegExp, String, Symbol,
  ];

  return [
    // Array
    (con) => con.isArray(value),
    // Boolean
    (con) => wraps.type(con),
    // Date
    (con) => wraps.instance(con),
    // Error
    (con) => wraps.instance(con) && !check.type(value.message),
    // Function
    (con) => wraps.type(con) && !(cons.find((c) => c === value)),
    // Number
    (con) => wraps.type(con) && con.isFinite(value),
    // Object
    (con) => wraps.type(con) && wraps.con(con),
    // Promise
    (con) => wraps.instance(con),
    // RegExp
    (con) => wraps.type(cons[6]) && wraps.con(con),
    // String
    (con) => wraps.type(con) || wraps.instance(con),
    // Symbol
    (con) => wraps.type(con),
  ].reduce((acc, type, index) => {
    const con = cons[index];
    const { name } = con;

    return {
      ...acc,
      [name]: value === con,
      [lowerCaseLetter(name)]: type(con),
    };
  }, {
    null: value === null,
    undefined: check.type(value),
  });
};
