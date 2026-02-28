export function burgerMenu() {
  const headerElement = document.querySelector("#main-header");
  const navToggleButton = document.querySelector(".nav-toggle");
  const mobileNavigationLinks = document.querySelectorAll("#main-nav a");

  if (!headerElement || !navToggleButton) return;

  function toggleMobileNavigation() {
    headerElement.classList.toggle("is-nav-open");
  }

  function closeMobileNavigation() {
    headerElement.classList.remove("is-nav-open");
  }

  navToggleButton.addEventListener("click", toggleMobileNavigation);

  for (let i = 0; i < mobileNavigationLinks.length; i += 1) {
    mobileNavigationLinks[i].addEventListener("click", closeMobileNavigation);
  }
}
