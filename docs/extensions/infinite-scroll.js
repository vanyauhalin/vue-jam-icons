/**
 * # Algorithm visual representation
 *
 * | 1st step | 2nd step | 3rd step | 4th step | 5th step |
 * |:--------:|:--------:|:--------:|:--------:|:--------:|
 * |  │●●●●│  |  ┌●●●●┐  |   ○●●●   |   ○●●●   |   □□□□   |
 * |  │●●●●│  |  │●●●●│  |  │●●●●│  |  ┌●●●●┐  |   ○●●●   |
 * |  │●●●●│  |  │●●●●│  |  │●●●●│  |  │●●●●│  |  │●●●●│  |
 * |   ●●●○   |  └●●●○┘  |  │●●●●│  |  │●●●●│  |  │●●●●│  |
 * |   □□□□   |   □□□□   |   ●●●○   |  └●●●○┘  |  │●●●●│  |
 * |   □□□□   |   □□□□   |   □□□□   |   □□□□   |   ●●●○   |
 *
 * | Step | Page | Description                                          |
 * |:----:|:----:|:-----------------------------------------------------|
 * | 1st  | 1st  | Starting from the beginning.                         |
 * | 2nd  |      | Scroll down and touch the bottom bp.                 |
 * | 3rd  | 2nd  | Add a line at the bottom and reassign the bottom bp, |
 * |      |      | set the top bp.                                      |
 * | 4th  |      | Scroll down and touch the bottom bp.                 |
 * | 5th  | 3rd  | Add a line at the bottom and reassign the bottom bp, |
 * |      |      | remove a line at the top and reassign the top bp.    |
 * | P.S. |      | bp – breakpoint.                                     |
 *
 * | Symbol  | Description          | infiniteScroll          |
 * |:-------:|:---------------------|:------------------------|
 * | │...│   | Observed content     | –                       |
 * | ┌...┐ / | When we touch the bp | –                       |
 * | └...┘   | (top / bottom)       | –                       |
 * | ●       | –                    | observed.content        |
 * | ○       | –                    | breakpoints[top|bottom] |
 * | □       | Unobserved content   | –                       |
 */

import Vue from 'vue';

const getters = {};
const mutations = {};

/**
 * | Code | Description                                                  |
 * |:----:|:------------------------------------------------------------:|
 * | 0    | There is less content with extra lines than can be rendered. |
 * | 1    | We are in the beginning of the content.                      |
 * | 2    | We are in the middle of the content.                         |
 * | 3    | We are in the end of the content.                            |
 *
 * @returns {Number}
 */
getters.getPosition = (indexes) => {
  const { first, last } = indexes;

  const conditions = {
    first: () => first.current < first.default,
    last: () => last.current > last.default,
  };

  if (!(conditions.first) && !(conditions.last)) return 2;
  if (conditions.first) return 1;
  if (conditions.last) return 3;

  return 0;
};

/**
 * @typedef {Object} InfiniteScroll
 * @property {Array} content
 * @property {Object} observed
 * @property {Array} observed.content
 * @property {Object} observed.limits
 * @property {Number} observed.limits.x
 * @property {Number} observed.limits.y
 * @property {Number} observed.page
 * @property {Object} breakpoints
 * @property {Object} breakpoints.upper
 * @property {Object} breakpoints.upper.el
 * @property {Number} breakpoints.upper.index
 * @property {Object} breakpoints.upper.observer
 * @property {Object} breakpoints.lower
 * @property {Object} breakpoints.lower.el
 * @property {Number} breakpoints.lower.index
 * @property {Object} breakpoints.lower.observer
 *
 * @param {Object} infiniteScroll
 * @param {Array} infiniteScroll.content
 * @param {Object} infiniteScroll.observed
 * @param {Object} infiniteScroll.observed.limits
 * @param {Number} infiniteScroll.observed.limits.x
 * @param {Number} infiniteScroll.observed.limits.y
 *
 * @return {InfiniteScroll}
 */
mutations.setInfiniteScroll = (vnode) => {
  const { context } = vnode;
  const { infiniteScroll } = context;
  const { content, observed } = infiniteScroll;
  const { limits } = observed;

  context.infiniteScroll = {
    content,
    observed: {
      limits,
      content: undefined,
      page: 0,
    },
    breakpoints: {
      upper: {
        el: undefined,
        observer: undefined,
      },
      lower: {
        el: undefined,
        observer: undefined,
      },
    },
    indexes: {
      first: {
        default: 0,
        current: undefined,
      },
      last: {
        default: content.length - 1,
        current: undefined,
      },
    },
  };
};
mutations.setObservedContent = (ctx) => {
  const { infiniteScroll } = ctx;
  const { content, observed, indexes } = infiniteScroll;
  const { first, last } = indexes;

  observed.content = content.slice(first.current, last.current + 1);
};
mutations.uploadObservedContent = (ctx) => {
  const { infiniteScroll } = ctx;
  const { content, observed, indexes } = infiniteScroll;
  const { limits } = observed;
  const { last } = indexes;

  Array.prototype.push.apply(
    observed.content,
    content.slice(last.current, last.current + limits.x),
  );
};
mutations.test = (ctx) => {
  const { infiniteScroll } = ctx;
  const { breakpoints } = infiniteScroll;
  const { lower } = breakpoints;

  lower.observer.disconnect();

  mutations.nextPage(ctx);
  mutations.setIndexes(ctx);
  mutations.uploadObservedContent(ctx);

  console.log(ctx.infiniteScroll.observed.content);
};
mutations.setLowerBreakpoint = (el, ctx) => {
  const { infiniteScroll } = ctx;
  const { breakpoints } = infiniteScroll;
  const { lower } = breakpoints;

  lower.el = el.lastChild;
  lower.observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      console.log(this);
    }
  }, {
    threshold: 0,
  });

  lower.observer.observe(lower.el);
};
mutations.setIndexes = (ctx) => {
  const { infiniteScroll } = ctx;
  const { observed, indexes } = infiniteScroll;
  const { limits, page } = observed;
  const { x, y } = limits;
  const { first, last } = indexes;

  const line = page - 1;

  first.current = line * x;
  last.current = (line + y) * x - 1;

  switch (getters.getPosition(indexes)) {
    case 0: {
      first.current = first.default;
      last.current = last.default;

      break;
    }
    case 1: {
      last.current += x;

      break;
    }
    case 2: {
      first.current -= x;
      last.current += x;

      break;
    }
    case 3: {
      first.current -= x;

      break;
    }
    default: break;
  }
};
mutations.nextPage = (ctx) => {
  const { infiniteScroll } = ctx;
  const { observed } = infiniteScroll;

  observed.page += 1;
};

Vue.directive('infinite-scroll', {
  bind(el, binding, vnode) {
    const { context } = vnode;

    mutations.setInfiniteScroll(vnode);
    mutations.nextPage(context);
    mutations.setIndexes(context);
    mutations.setObservedContent(context);
  },
  componentUpdated(el, binding, vnode) {
    console.log('update');
    const { context } = vnode;
    const { infiniteScroll } = context;
    const { indexes } = infiniteScroll;

    switch (getters.getPosition(indexes)) {
      case 0: break;
      case 1: {
        // При первой загрузке необходимо накинуть обработчик
        // на последний элемент.
        console.log('1');
        // mutations.setLowerBreakpoint(el, context);

        const { breakpoints } = infiniteScroll;
        const { lower } = breakpoints;

        /* eslint-disable-next-line */
        vnode.context.infiniteScroll.test = (vnode) => {
          lower.observer.disconnect();

          console.log('tyt');

          mutations.nextPage(vnode.context);
          mutations.setIndexes(vnode.context);
          mutations.uploadObservedContent(vnode.context);

          console.log(vnode.context.infiniteScroll.observed.content);
        };

        lower.el = el.lastChild;
        lower.observer = new IntersectionObserver(([entry]) => {
          if (entry && entry.isIntersecting) {
            vnode.context.infiniteScroll.test(vnode);
          }
        }, {
          threshold: 0,
        });

        lower.observer.observe(lower.el);

        break;
      }
      case 2: break;
      case 3: break;
      default: break;
    }

    // upload()
    // unload()
  },
  unbind() {
    // el.events.infiniteScroll.observer.disconnect();
  },
});
