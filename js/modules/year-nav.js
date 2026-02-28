export function yearNav() {
  const yearTargets = document.querySelectorAll(".js-year, #year");
  const navLinks = document.querySelectorAll("#main-nav a, .footer-nav a");

  function setCurrentYear() {
    const now = new Date();

    for (let i = 0; i < yearTargets.length; i += 1) {
      yearTargets[i].textContent = now.getFullYear();
    }
  }

  function highlightActiveNavigation() {
    const path = window.location.pathname.split("/").pop() || "index.html";

    for (let i = 0; i < navLinks.length; i += 1) {
      const link = navLinks[i];
      const href = link.getAttribute("href");

      if (href === path || (href === "index.html" && path === "")) {
        link.classList.add("active");
      }
    }
  }

  setCurrentYear();
  highlightActiveNavigation();
}
