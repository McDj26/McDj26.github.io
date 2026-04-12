interface SectionPage extends Element {
  hasEnteredBefore?: boolean;
}

const registry = new Set<Element>();

export const useSectionPage = (
  page: SectionPage,
  enterCallback?: (el: Element) => void,
  firstEnterCallback?: (el: Element) => void
) => {
  registry.add(page);

  let prevSilbing = <SectionPage | null>page.previousElementSibling;
  // 找到上一个注册的页面
  while (prevSilbing && !registry.has(prevSilbing))
    prevSilbing = prevSilbing.previousElementSibling;

  const { top, bottom } = page.getBoundingClientRect();
  if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
    if (!page.hasEnteredBefore) {
      firstEnterCallback?.(page);
      page.hasEnteredBefore = true;
    }
    enterCallback?.(page);
  }
  const cancelSteps: (() => void)[] = [];

  if (prevSilbing) {
    const wheelHandler = useDebounce((e: WheelEvent) => {
      if (e.deltaY > 0) {
        let { bottom } = prevSilbing.getBoundingClientRect();
        if (bottom >= 0 && bottom < window.innerHeight) {
          // 滑动到下一个页面
          window.scrollTo({
            top: page.getBoundingClientRect().top + window.scrollY,
          });
        }
      } else if (e.deltaY < 0) {
        let { top } = page.getBoundingClientRect();
        let { top: start, bottom: end } = prevSilbing.getBoundingClientRect();
        let height = end - start;
        if (top > 0 && top <= window.innerHeight) {
          // 滑动到上一个页面
          window.scrollTo({
            top:
              prevSilbing.getBoundingClientRect().top +
              window.scrollY +
              height -
              window.innerHeight,
          });
        }
      }
    }, 400);

    window.addEventListener("wheel", wheelHandler, { passive: true });

    cancelSteps.push(() => {
      window.removeEventListener("wheel", wheelHandler);
    });
  }

  let previousScrollTop = window.scrollY;
  const scrollHandler = useThrottle((e: Event) => {
    const currentScrollTop = window.scrollY;
    if (previousScrollTop < currentScrollTop) {
      // 向下滚动
      const { top } = page.getBoundingClientRect();
      if (top >= 0 && top <= window.innerHeight) {
        enterCallback?.(page);
        if (!page.hasEnteredBefore) {
          page.hasEnteredBefore = true;
          firstEnterCallback?.(page);
        }
      }
    } else if (prevSilbing) {
      // 向上滚动
      const { bottom } = prevSilbing.getBoundingClientRect();
      if (bottom > 0 && bottom <= window.innerHeight) {
        enterCallback?.(prevSilbing);
        if (!prevSilbing.hasEnteredBefore) {
          prevSilbing.hasEnteredBefore = true;
          firstEnterCallback?.(prevSilbing);
        }
      }
    }
    previousScrollTop = currentScrollTop;
  }, 200);
  window.addEventListener("scroll", scrollHandler, { passive: true });

  cancelSteps.push(() => {
    window.removeEventListener("scroll", scrollHandler);
  });

  return () => {
    cancelSteps.forEach((cancel) => cancel());
  };
};

export const useSection = (
  sectionOptions: {
    el: Element;
    enterCallback?: (el: Element) => void;
    firstEnterCallback?: (el: Element) => void;
  }[]
) => {
  const cancelTokens = sectionOptions.map((page) =>
    useSectionPage(page.el, page.enterCallback, page.firstEnterCallback)
  );
  return () => {
    cancelTokens.forEach((cancel) => cancel());
  };
};
