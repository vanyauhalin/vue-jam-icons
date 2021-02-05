/**
 * icon_loading::after position: absolute top/right/bottom/left: 0
 *
 * <Scroller>
 *   <Item />
 * </Scroller>
 *
 * В scroller передаются options.
 * Но перед тем, как отрендерить Item, нужно отрендерить Loading;
 */
import test from './test';

export default () => ({
  component: import('./scrollertest'),
  loading: {
    render(h) {
      const { classes, item } = this.$attrs.options;

      return h(test, {
        props: { classes, item },
      });
    },
  },
  delay: 0,
});
