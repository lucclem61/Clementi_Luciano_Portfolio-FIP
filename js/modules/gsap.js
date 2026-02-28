export function gsapAnimations() {
  if (typeof gsap === "undefined") return;

  gsap.from("#hero", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#hero",
      start: "top 85%",
    },
  });

  gsap.from("#about-us", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#about-us",
      start: "top 85%",
    },
  });

  gsap.from("#projects", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "top 85%",
    },
  });

  gsap.from("#testimonials", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#testimonials",
      start: "top 85%",
    },
  });
}
