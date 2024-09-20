export const useBackgroundTrace = (el: HTMLElement) => {
  return (e: MouseEvent) => {
    const { top, left } = el.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    el.style.setProperty("--offset-X", `${offsetX}px`);
    el.style.setProperty("--offset-Y", `${offsetY}px`);
  };
};
