// Variables //
const yearTargets = document.querySelectorAll(".js-year, #year");
const navLinks = document.querySelectorAll("#main-nav a, .footer-nav a");

const filterForm = document.querySelector("#projects-filters");
const chipInputs = filterForm ? filterForm.querySelectorAll(".chip-input") : [];
const applyFilterBtn = document.querySelector("#apply-filter");
const clearFilterBtn = document.querySelector("#clear-filter");
const projectCards = document.querySelectorAll(".project-card");

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

// Project carousel (Cartoon Bumper) //
const project1Track = document.querySelector(".js-project1-carousel-track");
const project1LeftArrow = document.querySelector(".js-project1-carousel-left");
const project1RightArrow = document.querySelector(
  ".js-project1-carousel-right"
);
let project1IsAnimating = false;

// Project carousel (Custom Earbuds) //
const project2Track = document.querySelector(".js-project2-carousel-track");
const project2LeftArrow = document.querySelector(".js-project2-carousel-left");
const project2RightArrow = document.querySelector(
  ".js-project2-carousel-right"
);
let project2IsAnimating = false;

// Project carousel (Burple Re-brand) //
const project3Track = document.querySelector(".js-project3-carousel-track");
const project3LeftArrow = document.querySelector(".js-project3-carousel-left");
const project3RightArrow = document.querySelector(
  ".js-project3-carousel-right"
);
let project3IsAnimating = false;

// Functions //
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

function trimString(value) {
  return value.trim();
}

function getSelectedTags() {
  const tags = [];
  for (let i = 0; i < chipInputs.length; i += 1) {
    const input = chipInputs[i];
    if (input.checked) {
      tags.push(input.value);
    }
  }
  return tags;
}

function showAllProjects() {
  for (let i = 0; i < projectCards.length; i += 1) {
    projectCards[i].style.display = "";
  }
}

function applyProjectFilter() {
  const selected = getSelectedTags();
  const hasAll = selected.indexOf("all") !== -1;

  if (hasAll || selected.length === 0) {
    showAllProjects();
    return;
  }

  for (let i = 0; i < projectCards.length; i += 1) {
    const card = projectCards[i];
    const tagsStr = card.getAttribute("data-tags") || "";
    const tags = tagsStr.split(",").map(trimString);
    let include = true;

    for (let j = 0; j < selected.length; j += 1) {
      if (tags.indexOf(selected[j]) === -1) {
        include = false;
      }
    }

    card.style.display = include ? "" : "none";
  }
}

function clearProjectFilter() {
  for (let i = 0; i < chipInputs.length; i += 1) {
    chipInputs[i].checked = false;
  }
  showAllProjects();
}

function handleApplyClick() {
  applyProjectFilter();
}

function handleClearClick() {
  clearProjectFilter();
}

// Video player helpers //
function isSmallScreen() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function initializePlayer() {
  if (!playerElement || !videoControls) {
    return;
  }
  // I am hiding the default browser controls when JS is available
  playerElement.controls = false;
  videoControls.classList.remove("hidded");
  videoControls.classList.remove("hide");
}

function playVideo() {
  if (!playerElement) {
    return;
  }
  playerElement.play();
  if (isSmallScreen()) {
    hideControls();
  }
}

function pauseVideo() {
  if (!playerElement) {
    return;
  }
  playerElement.pause();
  showControls();
}

function stopVideo() {
  if (!playerElement) {
    return;
  }
  playerElement.pause();
  playerElement.currentTime = 0;
  showControls();
}

function changeVolume() {
  if (!playerElement || !volumeSlider) {
    return;
  }
  playerElement.volume = Number(volumeSlider.value);
}

function toggleFullScreen() {
  if (!playerContainer) {
    return;
  }
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    playerContainer.requestFullscreen();
  }
}

function hideControls() {
  if (!videoControls) {
    return;
  }
  videoControls.classList.add("hide");
}

function showControls() {
  if (!videoControls) {
    return;
  }
  videoControls.classList.remove("hide");
}

function handlePlayClick() {
  playVideo();
}

function handlePauseClick() {
  pauseVideo();
}

function handleStopClick() {
  stopVideo();
}

function handleVolumeInput() {
  changeVolume();
}

function handleFullScreenClick() {
  toggleFullScreen();
}

function handleControlsMouseEnter() {
  if (isSmallScreen()) {
    return;
  }
  showControls();
}

function handleControlsMouseLeave() {
  if (isSmallScreen()) {
    return;
  }
  hideControls();
}

function handleVideoMouseEnter() {
  if (isSmallScreen()) {
    return;
  }
  showControls();
}

function handleVideoMouseLeave() {
  if (isSmallScreen()) {
    return;
  }
  hideControls();
}

function handleVideoClick() {
  showControls();
}

function handleVideoEnded() {
  if (isSmallScreen()) {
    showControls();
  }
}

// Project carousel helpers (Cartoon Bumper) //
function handleProject1TransitionEndNext() {
  if (!project1Track) {
    return;
  }
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
  if (!project1Track) {
    return;
  }
  project1Track.removeEventListener(
    "transitionend",
    handleProject1TransitionEndPrev
  );
  project1IsAnimating = false;
}

function slideProject1Next() {
  if (!project1Track || project1IsAnimating) {
    return;
  }
  project1IsAnimating = true;
  project1Track.style.transform = "translateX(-100%)";
  project1Track.addEventListener(
    "transitionend",
    handleProject1TransitionEndNext
  );
}

function slideProject1Prev() {
  if (!project1Track || project1IsAnimating) {
    return;
  }
  const lastItem = project1Track.lastElementChild;
  if (!lastItem) {
    return;
  }
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

function handleProject1LeftClick() {
  slideProject1Prev();
}

function handleProject1RightClick() {
  slideProject1Next();
}

// Project carousel helpers (Custom Earbuds) //
function handleProject2TransitionEndNext() {
  if (!project2Track) {
    return;
  }
  project2Track.removeEventListener(
    "transitionend",
    handleProject2TransitionEndNext
  );
  project2Track.appendChild(project2Track.firstElementChild);
  project2Track.style.transition = "none";
  project2Track.style.transform = "translateX(0)";
  project2Track.offsetHeight;
  project2Track.style.transition = "transform 0.5s ease";
  project2IsAnimating = false;
}

function handleProject2TransitionEndPrev() {
  if (!project2Track) {
    return;
  }
  project2Track.removeEventListener(
    "transitionend",
    handleProject2TransitionEndPrev
  );
  project2IsAnimating = false;
}

function slideProject2Next() {
  if (!project2Track || project2IsAnimating) {
    return;
  }
  project2IsAnimating = true;
  project2Track.style.transform = "translateX(-100%)";
  project2Track.addEventListener(
    "transitionend",
    handleProject2TransitionEndNext
  );
}

function slideProject2Prev() {
  if (!project2Track || project2IsAnimating) {
    return;
  }
  const lastItem = project2Track.lastElementChild;
  if (!lastItem) {
    return;
  }
  project2IsAnimating = true;
  project2Track.style.transition = "none";
  project2Track.insertBefore(lastItem, project2Track.firstElementChild);
  project2Track.style.transform = "translateX(-100%)";
  project2Track.offsetHeight;
  project2Track.style.transition = "transform 0.5s ease";
  project2Track.style.transform = "translateX(0)";
  project2Track.addEventListener(
    "transitionend",
    handleProject2TransitionEndPrev
  );
}

function handleProject2LeftClick() {
  slideProject2Prev();
}

function handleProject2RightClick() {
  slideProject2Next();
}

// Project carousel helpers (Burple Re-brand) //
function handleProject3TransitionEndNext() {
  if (!project3Track) {
    return;
  }
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

function handleProject3TransitionEndPrev() {
  if (!project3Track) {
    return;
  }
  project3Track.removeEventListener(
    "transitionend",
    handleProject3TransitionEndPrev
  );
  project3IsAnimating = false;
}

function slideProject3Next() {
  if (!project3Track || project3IsAnimating) {
    return;
  }
  project3IsAnimating = true;
  project3Track.style.transform = "translateX(-100%)";
  project3Track.addEventListener(
    "transitionend",
    handleProject3TransitionEndNext
  );
}

function slideProject3Prev() {
  if (!project3Track || project3IsAnimating) {
    return;
  }
  const lastItem = project3Track.lastElementChild;
  if (!lastItem) {
    return;
  }
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

function handleProject3LeftClick() {
  slideProject3Prev();
}

function handleProject3RightClick() {
  slideProject3Next();
}

// Event listeners //
if (applyFilterBtn) {
  applyFilterBtn.addEventListener("click", handleApplyClick);
}

if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", handleClearClick);
}

if (playerElement && videoControls) {
  initializePlayer();

  if (playButton) {
    playButton.addEventListener("click", handlePlayClick);
  }

  if (pauseButton) {
    pauseButton.addEventListener("click", handlePauseClick);
  }

  if (stopButton) {
    stopButton.addEventListener("click", handleStopClick);
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", handleVolumeInput);
    volumeSlider.addEventListener("change", handleVolumeInput);
  }

  if (fullScreenButton) {
    fullScreenButton.addEventListener("click", handleFullScreenClick);
  }

  videoControls.addEventListener("mouseenter", handleControlsMouseEnter);
  videoControls.addEventListener("mouseleave", handleControlsMouseLeave);
  playerElement.addEventListener("mouseenter", handleVideoMouseEnter);
  playerElement.addEventListener("mouseleave", handleVideoMouseLeave);
  playerElement.addEventListener("click", handleVideoClick);
  playerElement.addEventListener("ended", handleVideoEnded);
}

if (project1Track && project1LeftArrow && project1RightArrow) {
  project1LeftArrow.addEventListener("click", handleProject1LeftClick);
  project1RightArrow.addEventListener("click", handleProject1RightClick);
}

if (project2Track && project2LeftArrow && project2RightArrow) {
  project2LeftArrow.addEventListener("click", handleProject2LeftClick);
  project2RightArrow.addEventListener("click", handleProject2RightClick);
}

if (project3Track && project3LeftArrow && project3RightArrow) {
  project3LeftArrow.addEventListener("click", handleProject3LeftClick);
  project3RightArrow.addEventListener("click", handleProject3RightClick);
}

// Init //
setCurrentYear();
highlightActiveNav();
