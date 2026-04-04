import React from "react";

const MOTION_PROPS = new Set([
  "initial", "animate", "exit", "transition", "variants", "custom",
  "whileHover", "whileTap", "whileFocus", "whileInView", "layout",
  "layoutId", "drag", "dragConstraints", "dragElastic", "dragMomentum",
  "onAnimationComplete", "onUpdate", "viewport",
]);

function createMotionComponent(tag: string) {
  const Component = React.forwardRef<HTMLElement, Record<string, unknown>>(
    ({ children, ...props }, ref) => {
      const filtered: Record<string, unknown> = { ref };
      for (const [key, value] of Object.entries(props)) {
        if (!MOTION_PROPS.has(key)) filtered[key] = value;
      }
      return React.createElement(tag, filtered, children);
    }
  );
  Component.displayName = `motion.${tag}`;
  return Component;
}

export const motion = new Proxy(
  {} as Record<string, ReturnType<typeof createMotionComponent>>,
  { get: (_, tag: string) => createMotionComponent(tag) }
);

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) => (
  <>{children}</>
);

export const useInView = () => true;
export const useAnimation = () => ({ start: jest.fn(), stop: jest.fn(), set: jest.fn() });
export const useMotionValue = (initial: number) => ({ get: () => initial, set: jest.fn() });
export const useTransform = () => ({ get: jest.fn() });
