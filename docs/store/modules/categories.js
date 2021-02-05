import { defaultString } from '@/../scripts/utils';

import createModule from '../create-module';

export default createModule({
  name: {
    singular: 'category',
    plural: 'categories',
  },
  main: 'All',
  other: ['web', 'arrows', 'player', 'text', 'social'],
}, {
  nameModifier: defaultString,
});
