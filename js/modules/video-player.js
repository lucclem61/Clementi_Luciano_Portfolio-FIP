export function videoPlayer() {
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

  if (!playerElement || !videoControls || !playerContainer) return;

  function hideControls() {
    if (!playerElement.paused) {
      videoControls.classList.add("hide");
    }
  }

  function showControls() {
    videoControls.classList.remove("hide");
  }

  function playVideo() {
    playerElement.play();
    showControls();
  }

  function pauseVideo() {
    playerElement.pause();
    showControls();
  }

  function stopVideo() {
    playerElement.pause();
    playerElement.currentTime = 0;
    showControls();
  }

  function changeVolume() {
    playerElement.volume = Number(volumeSlider.value);
  }

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerContainer.requestFullscreen();
    }
  }

  function handleContainerClick() {
    if (playerElement.paused) {
      playerElement.play();
    } else {
      playerElement.pause();
    }
    showControls();
  }

  videoControls.classList.remove("hide");
  videoControls.classList.remove("hidded");
  playerElement.controls = false;

  if (playButton) playButton.addEventListener("click", playVideo);
  if (pauseButton) pauseButton.addEventListener("click", pauseVideo);
  if (stopButton) stopButton.addEventListener("click", stopVideo);

  if (volumeSlider) {
    volumeSlider.addEventListener("input", changeVolume);
    volumeSlider.addEventListener("change", changeVolume);
  }

  if (fullScreenButton)
    fullScreenButton.addEventListener("click", toggleFullScreen);

  playerContainer.addEventListener("click", handleContainerClick);
  playerContainer.addEventListener("mouseleave", hideControls);
  playerContainer.addEventListener("mouseenter", showControls);

  playerElement.addEventListener("pause", showControls);
  playerElement.addEventListener("ended", showControls);
}
