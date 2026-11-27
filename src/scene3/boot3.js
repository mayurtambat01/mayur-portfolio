// =========================================================
// SCENE 03 — MY DEVELOPER JOURNEY
// Interactive Cinematic Timeline
// =========================================================

import { YEARS } from "./layout3.js";

export async function initChrono() {
  const section = document.getElementById("chrono");

  if (!section) return null;

  // -------------------------------------------------------
  // DOM ELEMENTS
  // -------------------------------------------------------

  const timeline = document.getElementById("journeyTimeline");
  const card = document.getElementById("journeyCard");
  const image = document.getElementById("journeyImage");
  const year = document.getElementById("journeyYear");
  const chapter = document.getElementById("journeyChapter");
  const title = document.getElementById("journeyTitle");
  const description = document.getElementById("journeyDescription");
  const skills = document.getElementById("journeySkills");
  const prev = document.getElementById("journeyPrev");
  const next = document.getElementById("journeyNext");
  const counter = document.getElementById("journeyCounter");

  if (
    !timeline ||
    !card ||
    !image ||
    !year ||
    !chapter ||
    !title ||
    !description ||
    !skills ||
    !prev ||
    !next ||
    !counter
  ) {
    console.warn("[Journey] Required elements are missing.");
    return null;
  }

  // Prevent duplicate initialization
  if (section.dataset.initialized === "true") return null;

  section.dataset.initialized = "true";

  // -------------------------------------------------------
  // CHAPTER DATA
  // -------------------------------------------------------

  const chapterDetails = {
    2021: {
      title: "Foundation",
      description:
        "Started my Computer Engineering journey and developed a strong interest in programming and problem solving.",
      skills: ["Computer Engineering", "Programming", "Problem Solving"],
    },

    2022: {
      title: "Programming",
      description:
        "Strengthened my Java fundamentals, explored object-oriented programming and improved my logical thinking.",
      skills: ["Java", "OOP", "Problem Solving"],
    },

    2023: {
      title: "Backend Development",
      description:
        "Explored backend development by learning Spring Boot, relational databases and REST API development.",
      skills: ["Spring Boot", "MySQL", "REST APIs"],
    },

    2024: {
      title: "Graduation",
      description:
        "Completed my B.Tech in Computer Engineering and continued developing my skills as a full stack developer.",
      skills: ["B.Tech", "Computer Engineering", "Full Stack"],
    },

    2025: {
      title: "Full Stack Development",
      description:
        "Combined React.js, Spring Boot and MySQL to build complete full stack web applications.",
      skills: ["React.js", "Spring Boot", "MySQL"],
    },

    2026: {
      title: "From Code to Creation",
      description:
        "Transforming ideas into real-world applications through projects like StayNest and Cineverse, combining technical expertise with creativity and continuous learning.",
      skills: [
        "Java",
        "Python",
        "MySQL",
        "Spring Boot",
        "React.js",
        "REST APIs",
      ],
    },
  };

  const chapters = YEARS.map((item) => ({
    ...item,
    ...chapterDetails[item.year],
  }));

  let activeIndex = 0;

  const total = chapters.length;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const formatNumber = (number) => String(number).padStart(2, "0");

  // -------------------------------------------------------
  // BUILD INTERACTIVE TIMELINE
  // -------------------------------------------------------

  timeline.replaceChildren();

  const nodes = chapters.map((item, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "journey-node";

    button.setAttribute("aria-label", `Show ${item.year} — ${item.title}`);

    button.setAttribute("aria-pressed", "false");

    button.innerHTML = `
      <span class="journey-node__dot" aria-hidden="true"></span>

      <span class="journey-node__info">
        <span class="journey-node__year">
          ${item.year}
        </span>

        <span class="journey-node__label">
          ${item.year === 2022 ? "Programming" : item.key}
        </span>
      </span>
    `;

    button.addEventListener("click", () => {
      showChapter(index);
    });

    timeline.appendChild(button);

    return button;
  });

  // -------------------------------------------------------
  // UPDATE ACTIVE CHAPTER
  // -------------------------------------------------------

  function showChapter(index, animate = true) {
    if (index < 0 || index >= total) return;

    activeIndex = index;

    const item = chapters[activeIndex];

    // Update image dimensions
    image.width = item.year === 2026 ? 1692 : 1431;
    image.height = item.year === 2026 ? 929 : 1099;

    // Update chapter image
    image.src = `public/years/${item.year}.webp`;
    image.alt = `${item.year} — ${item.title}`;

    // Update chapter information
    year.textContent = item.year;

    chapter.textContent = `CHAPTER ${formatNumber(activeIndex + 1)} / ${formatNumber(total)}`;

    title.textContent = item.title;
    description.textContent = item.description;

    counter.textContent = `${formatNumber(activeIndex + 1)} / ${formatNumber(total)}`;

    // Update technology badges
    skills.replaceChildren();

    item.skills.forEach((skill) => {
      const badge = document.createElement("span");

      badge.className = "journey-skill";
      badge.textContent = skill;

      skills.appendChild(badge);
    });

    // Highlight active timeline year
    nodes.forEach((node, i) => {
      const isActive = i === activeIndex;

      node.classList.toggle("is-active", isActive);

      node.setAttribute("aria-pressed", String(isActive));
    });

    // Update navigation buttons
    prev.disabled = activeIndex === 0;
    next.disabled = activeIndex === total - 1;

    section.dataset.year = String(item.year);

    // Smooth chapter transition
    card.classList.remove("is-changing");

    if (animate && !reducedMotion.matches) {
      void card.offsetWidth;

      card.classList.add("is-changing");
    }
  }

  // -------------------------------------------------------
  // PREVIOUS AND NEXT BUTTONS
  // -------------------------------------------------------

  prev.addEventListener("click", () => {
    showChapter(activeIndex - 1);
  });

  next.addEventListener("click", () => {
    showChapter(activeIndex + 1);
  });

  // -------------------------------------------------------
  // KEYBOARD NAVIGATION
  // -------------------------------------------------------

  section.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      showChapter(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      showChapter(activeIndex + 1);
    }
  });

  // -------------------------------------------------------
  // REMOVE COMPLETED ANIMATION CLASS
  // -------------------------------------------------------

  card.addEventListener("animationend", (event) => {
    if (event.animationName === "journeyReveal") {
      card.classList.remove("is-changing");
    }
  });

  // -------------------------------------------------------
  // INITIALIZE FIRST CHAPTER
  // -------------------------------------------------------

  showChapter(chapters.length - 1, false);

  section.classList.add("is-live");

  console.log("[Journey] Scene 3 initialized successfully.");

  return {
    section,
    setTarget: showChapter,
  };
}
