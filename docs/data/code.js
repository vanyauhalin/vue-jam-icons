import { pascalCase } from '@/../scripts/utils';

const parseIcons = (icons) => icons.map((icon) => `JIcon${pascalCase(icon)}`).join(', ');

const fileJs = '// main.js';
const fileVue = '// App.vue';

const importVue = "import Vue from 'vue';";
const importJIcon = {
  global: "import JIcon from 'vue-jam-icons';",
  local: "import JIcon from 'vue-jam-icons/JIcon.vue';",
};
const importIcons = {
  all: "import * as icons from 'vue-jam-icons/src/icons';",
  certain: (icons) => `import ${parseIcons(icons)} from 'vue-jam-icons/src/icons';`,
  custom: `// Recommended using a prefix to avoid coincidence with existing icons.
const myCustomIcon = {
  name: 'my-custom-icon',
  viewBox: '-4 -2 24 24',
  // Anything inside the SVG tag.
  content: '<path d="M8.991 17.692c3.68 0 6.673-2.972 ...',
};`,
};

const addIcons = {
  all: 'JIcon.add(Object.values({ ...icons }));',
  certain: (icons) => `JIcon.add(${parseIcons(icons)});`,
  custom: 'JIcon.add([myCustomIcon]);',
};
const useIcons = {
  default: 'Vue.use(JIcon);',
  config: `Vue.use(JIcon, {
  width: 16,
  height: 16,
  fill: 'red',
});`,
  configShort: (width) => `Vue.use(JIcon, {
  width: ${width},
  height: ${width},
});`,
  local: `export default {
  components: {
    JIcon,
  },
};`,
};

const MountCtx = {
  header: {
    global: `${fileJs}\n\n${importVue}\n${importJIcon.global}`,
    local: `${fileVue}\n\n${importJIcon.local}`,
  },
  default: `${importIcons.all}\n\n${addIcons.all}`,
  certain: (icons) => `${importIcons.certain(icons)}\n\n${addIcons.certain(icons)}`,
  custom: `\n${importIcons.custom}\n\n${addIcons.custom}`,
};

export const Install = "npm i --save 'vue-jam-icons'\nyarn ... 'vue-jam-icons'";

export const Mount = {
  global: {
    default: `${MountCtx.header.global}
${MountCtx.default}
${useIcons.default}`,
    certain: (icons, width) => (width
      ? `${MountCtx.header.global}
${MountCtx.certain(icons)}
${useIcons.configShort(width)}`
      : `${MountCtx.header.global}
${MountCtx.certain(icons)}
${useIcons.default}`),
    custom: `${MountCtx.header.global}
${MountCtx.custom}
${useIcons.default}`,
    config: `${MountCtx.header.global}
${MountCtx.default}
${useIcons.config}`,
  },
  local: {
    default: `${MountCtx.header.local}
${MountCtx.default}\n
${useIcons.local}`,
    certain: (icons) => `${MountCtx.header.local}
${MountCtx.certain(icons)}\n
${useIcons.local}`,
    custom: `${MountCtx.header.local}
${MountCtx.custom}\n
${useIcons.local}`,
  },
};

export const Usage = {
  template: `<template>
  <JIcon name="github" />
  <!-- or -->
  <j-icon name="github" />
</template>`,
  props: `-----------|-----------------|----------------------
Props      | Type            | Default
-----------|-----------------|----------------------
name       | String          | Required!
viewBox    | String / Number | 0 0 width height
width      | String / Number | 24
height     | String / Number | 24
aria-label | String          | Icon name without '-'
content    | String          | Required!
fill       | String          | currentColor         `,
};
