export function project3Carousel() {
  const projectTrack = document.querySelector(".js-project3-carousel-track");
  const leftArrow = document.querySelector(".js-project3-carousel-left");
  const rightArrow = document.querySelector(".js-project3-carousel-right");

  if (!projectTrack || !leftArrow || !rightArrow) return;

  let isAnimating = false;

  function handleTransitionEndNext() {
    projectTrack.removeEventListener("transitionend", handleTransitionEndNext);

    projectTrack.appendChild(projectTrack.firstElementChild);
    projectTrack.style.transition = "none";
    projectTrack.style.transform = "translateX(0)";
    projectTrack.offsetHeight;
    projectTrack.style.transition = "transform 0.5s ease";

    isAnimating = false;
  }

  function handleTransitionEndPrev() {
    projectTrack.removeEventListener("transitionend", handleTransitionEndPrev);
    isAnimating = false;
  }

  function slideNext() {
    if (isAnimating) return;

    isAnimating = true;
    projectTrack.style.transform = "translateX(-100%)";
    projectTrack.addEventListener("transitionend", handleTransitionEndNext);
  }

  function slidePrev() {
    if (isAnimating) return;

    const lastItem = projectTrack.lastElementChild;
    if (!lastItem) return;

    isAnimating = true;
    projectTrack.style.transition = "none";
    projectTrack.insertBefore(lastItem, projectTrack.firstElementChild);
    projectTrack.style.transform = "translateX(-100%)";
    projectTrack.offsetHeight;
    projectTrack.style.transition = "transform 0.5s ease";
    projectTrack.style.transform = "translateX(0)";

    projectTrack.addEventListener("transitionend", handleTransitionEndPrev);
  }

  leftArrow.addEventListener("click", slidePrev);
  rightArrow.addEventListener("click", slideNext);
}
