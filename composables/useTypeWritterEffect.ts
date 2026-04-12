export default function useTypeWritterEffect(
  el: HTMLElement,
  charTime: number,
  blankTime: number,
  callback?: () => void
) {
  if (!el || charTime <= 0 || blankTime <= 0) return;
  const text = el.innerText.trim();
  const totalLength = text.length;
  let displayLength = 0;
  const typeNextChar = () => {
    displayLength++;
    if (displayLength <= totalLength) {
      const charIndex = displayLength - 1;
      const char = text[charIndex];
      el.innerText += char;
      if (char === " " || char === "\n") {
        setTimeout(typeNextChar, blankTime);
      } else {
        setTimeout(typeNextChar, charTime);
      }
    } else {
      if (callback) callback();
    }
  };
  el.innerText = "";
  setTimeout(typeNextChar, 1000);
}
