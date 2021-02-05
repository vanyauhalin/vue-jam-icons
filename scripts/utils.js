const RX_HYPHENATE = /\B([A-Z])/g;
const RX_UN_KEBAB = /-(\w)/g;

const cases = {};
cases.capitalLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
cases.kebab = (str) => str.replace(RX_HYPHENATE, '-$1').toLowerCase();
cases.unKebab = (str, modifier) => (
  cases.capitalLetter(cases.kebab(str).replace(RX_UN_KEBAB, (_, c) => (c ? modifier(c) : '')))
);

// Converts PascalCase or camelCase to kebab-case.
export const kebabCase = (str) => cases.kebab(str);

// Converts a kebab-case or camelCase to PascalCase.
export const pascalCase = (str) => cases.unKebab(str, (c) => c.toUpperCase());

// Convert any case to Default string.
export const defaultString = (str) => cases.unKebab(str, (c) => ` ${c}`);

// Convert a kebab-case or camelCase to enumeration through a slash.
export const slashEnum = (str) => cases.unKebab(str, (c) => ` / ${c.toUpperCase()}`);
