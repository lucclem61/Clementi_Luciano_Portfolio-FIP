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
  showControls();
}

function handleControlsMouseLeave() {
  hideControls();
}

function handleVideoMouseEnter() {
  showControls();
}

function handleVideoMouseLeave() {
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

// Init //
setCurrentYear();
highlightActiveNav();
