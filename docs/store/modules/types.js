import { StrokeFill, Stroke, Fill } from '@/data/custom-icons';
import { slashEnum } from '@/../scripts/utils';

import createModule from '../create-module';

export default createModule({
  name: {
    singular: 'type',
    plural: 'types',
  },
  main: StrokeFill.name,
  other: [Stroke.name, Fill.name],
}, {
  nameModifier: slashEnum,
  templateExtensions: {
    icon: {
      main: StrokeFill.name,
      other: [Stroke.name, Fill.name],
    },
  },
  mainContent: ['normal'],
});
