// Variables //
const yearTargets = document.querySelectorAll(".js-year, #year");
const navLinks = document.querySelectorAll("#main-nav a, .footer-nav a");

const filterForm = document.querySelector("#projects-filters");
const chipInputs = filterForm ? filterForm.querySelectorAll(".chip-input") : [];
const applyFilterBtn = document.querySelector("#apply-filter");
const clearFilterBtn = document.querySelector("#clear-filter");
const projectCards = document.querySelectorAll(".project-card");

// Functions //
function setCurrentYear() {
  const now = new Date();
  for (let i = 0; i < yearTargets.length; i += 1) {
    yearTargets[i].textContent = now.getFullYear();
  }
}

function highlightActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  for (let i = 0; i < navLinks.length; i += 1) {
    const link = navLinks[i];
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    }
  }
}

function trimString(s) {
  return s.trim();
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

if (applyFilterBtn) {
  applyFilterBtn.addEventListener("click", handleApplyClick);
}
if (clearFilterBtn) {
  clearFilterBtn.addEventListener("click", handleClearClick);
}

setCurrentYear();
highlightActiveNav();
