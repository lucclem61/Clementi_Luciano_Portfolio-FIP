gsap.registerPlugin(ScrollTrigger);

const yearTargets = document.querySelectorAll(".js-year, #year");
const navLinks = document.querySelectorAll("#main-nav a, .footer-nav a");
const projectViewButtons = document.querySelectorAll(
  ".project-card .view-link"
);

const playerContainer = document.querySelector("#player-container");
const playerElement = playerContainer
  ? playerContainer.querySelector("video")
  : null;

const videoControls = document.querySelector("#video-controls");
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
const volumeSlider = document.querySelector("#change-vol");
const fullScreenButton = document.querySelector("#full-screen");

const project1Track = document.querySelector(".js-project1-carousel-track");
const project1LeftArrow = document.querySelector(".js-project1-carousel-left");
const project1RightArrow = document.querySelector(
  ".js-project1-carousel-right"
);
let project1IsAnimating = false;

const project3Track = document.querySelector(".js-project3-carousel-track");
const project3LeftArrow = document.querySelector(".js-project3-carousel-left");
const project3RightArrow = document.querySelector(
  ".js-project3-carousel-right"
);
let project3IsAnimating = false;

const headerElement = document.querySelector("#main-header");
const navToggle = document.querySelector(".nav-toggle");
const mobileNavLinks = document.querySelectorAll("#main-nav a");

function setCurrentYear() {
  const now = new Date();
  for (let i = 0; i < yearTargets.length; i += 1) {
    yearTargets[i].textContent = now.getFullYear();
  }
}

function highlightActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  for (let i = 0; i < navLinks.length; i += 1) {
    const link = navLinks[i];
    const href = link.getAttribute("href");
    if (href === path || (href === "index.html" && path === "")) {
      link.classList.add("active");
    }
  }
}

function isSmallScreen() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function initializePlayer() {
  if (!playerElement || !videoControls) return;
  playerElement.controls = false;
  videoControls.classList.remove("hidded");
  videoControls.classList.remove("hide");
}

function playVideo() {
  if (!playerElement) return;
  playerElement.play();
  if (isSmallScreen()) hideControls();
}

function pauseVideo() {
  if (!playerElement) return;
  playerElement.pause();
  showControls();
}

function stopVideo() {
  if (!playerElement) return;
  playerElement.pause();
  playerElement.currentTime = 0;
  showControls();
}

function changeVolume() {
  if (!playerElement || !volumeSlider) return;
  playerElement.volume = Number(volumeSlider.value);
}

function toggleFullScreen() {
  if (!playerContainer) return;
  if (document.fullscreenElement) document.exitFullscreen();
  else playerContainer.requestFullscreen();
}

function hideControls() {
  if (videoControls) videoControls.classList.add("hide");
}

function showControls() {
  if (videoControls) videoControls.classList.remove("hide");
}

function handleProject1TransitionEndNext() {
  project1Track.removeEventListener(
    "transitionend",
    handleProject1TransitionEndNext
  );
  project1Track.appendChild(project1Track.firstElementChild);
  project1Track.style.transition = "none";
  project1Track.style.transform = "translateX(0)";
  project1Track.offsetHeight;
  project1Track.style.transition = "transform 0.5s ease";
  project1IsAnimating = false;
}

function handleProject1TransitionEndPrev() {
  project1Track.removeEventListener(
    "transitionend",
    handleProject1TransitionEndPrev
  );
  project1IsAnimating = false;
}

function slideProject1Next() {
  if (!project1Track || project1IsAnimating) return;
  project1IsAnimating = true;
  project1Track.style.transform = "translateX(-100%)";
  project1Track.addEventListener(
    "transitionend",
    handleProject1TransitionEndNext
  );
}

function slideProject1Prev() {
  if (!project1Track || project1IsAnimating) return;
  const lastItem = project1Track.lastElementChild;
  if (!lastItem) return;
  project1IsAnimating = true;
  project1Track.style.transition = "none";
  project1Track.insertBefore(lastItem, project1Track.firstElementChild);
  project1Track.style.transform = "translateX(-100%)";
  project1Track.offsetHeight;
  project1Track.style.transition = "transform 0.5s ease";
  project1Track.style.transform = "translateX(0)";
  project1Track.addEventListener(
    "transitionend",
    handleProject1TransitionEndPrev
  );
}

function slideProject3Next() {
  if (!project3Track || project3IsAnimating) return;
  project3IsAnimating = true;
  project3Track.style.transform = "translateX(-100%)";
  project3Track.addEventListener(
    "transitionend",
    handleProject3TransitionEndNext
  );
}

function handleProject3TransitionEndNext() {
  project3Track.removeEventListener(
    "transitionend",
    handleProject3TransitionEndNext
  );
  project3Track.appendChild(project3Track.firstElementChild);
  project3Track.style.transition = "none";
  project3Track.style.transform = "translateX(0)";
  project3Track.offsetHeight;
  project3Track.style.transition = "transform 0.5s ease";
  project3IsAnimating = false;
}

function slideProject3Prev() {
  if (!project3Track || project3IsAnimating) return;
  const lastItem = project3Track.lastElementChild;
  if (!lastItem) return;
  project3IsAnimating = true;
  project3Track.style.transition = "none";
  project3Track.insertBefore(lastItem, project3Track.firstElementChild);
  project3Track.style.transform = "translateX(-100%)";
  project3Track.offsetHeight;
  project3Track.style.transition = "transform 0.5s ease";
  project3Track.style.transform = "translateX(0)";
  project3Track.addEventListener(
    "transitionend",
    handleProject3TransitionEndPrev
  );
}

function handleProject3TransitionEndPrev() {
  project3Track.removeEventListener(
    "transitionend",
    handleProject3TransitionEndPrev
  );
  project3IsAnimating = false;
}

function toggleProjectDetails(cardElement, triggerElement) {
  const details = cardElement.querySelector(".project-details");
  const isOpen = cardElement.classList.contains("is-open");
  if (isOpen) {
    cardElement.classList.remove("is-open");
    triggerElement.textContent = "View";
  } else {
    cardElement.classList.add("is-open");
    triggerElement.textContent = "Hide details";
  }
}

function handleProjectViewClick(e) {
  e.preventDefault();
  toggleProjectDetails(
    e.currentTarget.closest(".project-card"),
    e.currentTarget
  );
}

function toggleMobileNav() {
  headerElement.classList.toggle("is-nav-open");
}

function closeMobileNav() {
  headerElement.classList.remove("is-nav-open");
}

if (playerElement && videoControls) {
  initializePlayer();
  if (playButton) playButton.addEventListener("click", playVideo);
  if (pauseButton) pauseButton.addEventListener("click", pauseVideo);
  if (stopButton) stopButton.addEventListener("click", stopVideo);
  if (volumeSlider) {
    volumeSlider.addEventListener("input", changeVolume);
    volumeSlider.addEventListener("change", changeVolume);
  }
  if (fullScreenButton)
    fullScreenButton.addEventListener("click", toggleFullScreen);
  videoControls.addEventListener("mouseenter", showControls);
  videoControls.addEventListener("mouseleave", hideControls);
  playerElement.addEventListener("mouseenter", showControls);
  playerElement.addEventListener("mouseleave", hideControls);
  playerElement.addEventListener("click", showControls);
  playerElement.addEventListener("ended", showControls);
}

if (project1Track && project1LeftArrow && project1RightArrow) {
  project1LeftArrow.addEventListener("click", slideProject1Prev);
  project1RightArrow.addEventListener("click", slideProject1Next);
}

if (project3Track && project3LeftArrow && project3RightArrow) {
  project3LeftArrow.addEventListener("click", slideProject3Prev);
  project3RightArrow.addEventListener("click", slideProject3Next);
}

for (let i = 0; i < projectViewButtons.length; i += 1) {
  projectViewButtons[i].addEventListener("click", handleProjectViewClick);
}

if (navToggle) navToggle.addEventListener("click", toggleMobileNav);

for (let i = 0; i < mobileNavLinks.length; i += 1) {
  mobileNavLinks[i].addEventListener("click", closeMobileNav);
}

setCurrentYear();
highlightActiveNav();

gsap.from("#hero", {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: { trigger: "#hero", start: "top 85%" },
});

gsap.from("#about-us", {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: { trigger: "#about-us", start: "top 85%" },
});

gsap.from("#projects", {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: { trigger: "#projects", start: "top 85%" },
});

gsap.from("#testimonials", {
  opacity: 0,
  y: 40,
  duration: 0.9,
  ease: "power2.out",
  scrollTrigger: { trigger: "#testimonials", start: "top 85%" },
});
