import { useRef, useCallback, useEffect } from "react";
import { isClient } from "./use-is-client";

function scrollToPercent(
  el,
  { container, percentOfElement, offsetPX, direction, percentOfContainer }
) {
  const rect = el.current.getClientRects()[0];
  const isVertical = true;
  const refSize = isVertical ? rect.height : rect.width;
  const elemScroll = isVertical ? rect.y : rect.x;

  const scrollSize =
    container === window
      ? isVertical
        ? container.innerHeight
        : container.innerWidth
      : isVertical
      ? container.scrollHeight
      : container.scrollWidth;

  let addOffset = (refSize * percentOfElement) / 100;
  if (offsetPX) {
    addOffset += offsetPX;
  }

  const containerScroll = isVertical ? container.scrollY : container.scrollX;
  const newScroll =
    containerScroll +
    elemScroll +
    ((scrollSize * percentOfContainer) / 100 + addOffset);

  const scrollObj = isVertical ? { top: newScroll } : { left: newScroll };

  window.scrollTo({
    ...scrollObj,
    behavior: "smooth",
  });
}

export function useRefScroll({
  percentOfElement = 50,
  offsetPX = 0,
  onMount = false,
  container = isClient ? window : null,
  percentOfContainer = 50,
  // direction = Vertical,
}) {
  const elRef = useRef(null);

  const scroll = useCallback(() => {
    if (elRef.current) {
      scrollToPercent(elRef, {
        percentOfElement,
        offsetPX,
        container,
        percentOfContainer,
        // direction,
      });
    }
  }, [elRef.current]);

  useEffect(() => {
    if (onMount) {
      scroll();
    }
  }, []);

  return { elRef, scroll };
}
