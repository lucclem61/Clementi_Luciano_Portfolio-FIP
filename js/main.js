import { burgerMenu } from "./modules/burger-menu.js";
import { yearNav } from "./modules/year-nav.js";
import { videoPlayer } from "./modules/video-player.js";
import { project1Carousel } from "./modules/project1-carousel.js";
import { project3Carousel } from "./modules/project3-carousel.js";
import { projectDetails } from "./modules/project-details.js";
import { contactForm } from "./modules/contact-form.js";
import { gsapAnimations } from "./modules/gsap.js";

burgerMenu();

if (document.body.dataset.page === "home") {
  yearNav();
  videoPlayer();
  project1Carousel();
  project3Carousel();
  projectDetails();
  gsapAnimations();
} else if (document.body.dataset.page === "contact") {
  contactForm();
  gsapAnimations();
}
