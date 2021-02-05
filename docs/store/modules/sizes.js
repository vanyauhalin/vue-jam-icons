import createModule from '../create-module';

export default createModule({
  name: {
    singular: 'size',
    plural: 'sizes',
  },
  main: 24,
  other: [16, 32],
}, {
  listSort: true,
});
