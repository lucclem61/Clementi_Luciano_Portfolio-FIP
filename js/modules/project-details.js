export function projectDetails() {
  const projectViewButtons = document.querySelectorAll(
    ".project-card .view-link",
  );

  function handleProjectViewClick(event) {
    event.preventDefault();

    const cardElement = event.currentTarget.closest(".project-card");

    if (!cardElement) return;

    const isOpen = cardElement.classList.contains("is-open");

    if (isOpen) {
      cardElement.classList.remove("is-open");
      event.currentTarget.textContent = "View";
    } else {
      cardElement.classList.add("is-open");
      event.currentTarget.textContent = "Hide details";
    }
  }

  for (let i = 0; i < projectViewButtons.length; i += 1) {
    projectViewButtons[i].addEventListener("click", handleProjectViewClick);
  }
}
