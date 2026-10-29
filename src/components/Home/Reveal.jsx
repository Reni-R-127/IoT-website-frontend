import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

/* Shared scroll-speed tracker */
let scrollTrackerStarted = false;
let previousScrollY = 0;
let previousScrollTime = 0;
let scrollVelocity = 0;

function startScrollTracker() {
  if (scrollTrackerStarted || typeof window === "undefined") return;

  scrollTrackerStarted = true;
  previousScrollY = window.scrollY;
  previousScrollTime = performance.now();

  window.addEventListener(
    "scroll",
    () => {
      const currentTime = performance.now();
      const currentY = window.scrollY;
      const elapsed = Math.max(currentTime - previousScrollTime, 1);

      scrollVelocity = Math.abs(currentY - previousScrollY) / elapsed;

      previousScrollY = currentY;
      previousScrollTime = currentTime;
    },
    { passive: true }
  );
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [motion, setMotion] = useState({
    duration: 650,
    delay,
  });

  useEffect(() => {
    startScrollTracker();

    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const fastScroll = scrollVelocity > 0.8;

          setMotion({
            duration: fastScroll ? 300 : 650,
            delay: fastScroll ? Math.min(delay, 40) : delay,
          });

          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={[
        "home-reveal",
        `home-reveal-${direction}`,
        visible ? "is-visible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--reveal-delay": `${motion.delay}ms`,
        "--reveal-duration": `${motion.duration}ms`,
      }}
    >
      {children}
    </div>
  );
}