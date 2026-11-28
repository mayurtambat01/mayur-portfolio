/* =========================================================
   SCENE 04 — PREMIUM CINEMATIC PROJECT SHOWCASE
   ========================================================= */

const PROJECTS = [
  {
    id: "staynest",
    name: "StayNest",
    title: "Stay<span>Nest</span>",
    subtitle: "Room Rental Management System",

    description:
      "A full-stack property management application designed to manage rooms, customers, rent, electricity bills and payments through a secure and centralized dashboard.",

    image: "public/projects/featured/staynest.webp",

    technologies: [
      "Java",
      "Spring Boot",
      "React.js",
      "MySQL",
      "REST APIs",
      "JWT",
    ],

    live: "https://stay-nest-gold.vercel.app/",
    github: "",

    accent: "#ff792e",
    accentRGB: "255, 121, 46",
  },

  {
    id: "cineverse",
    name: "Cineverse",
    title: "Cine<span>verse</span>",
    subtitle: "Cinematic Movie Booking Experience",

    description:
      "A modern movie booking experience featuring cinematic animations, interactive movie exploration, responsive interfaces and smooth scrolling.",

    image: "public/projects/featured/cineverse.webp",

    technologies: [
      "Next.js",
      "TypeScript",
      "React.js",
      "Tailwind CSS",
      "GSAP",
      "Lenis",
    ],

    live: "https://cineverse-mayur.vercel.app/",
    github: "",

    accent: "#ff343f",
    accentRGB: "255, 52, 63",
  },

  {
    id: "bulk-email",
    name: "Bulk Email API",
    title: "Bulk Email <span>API</span>",
    subtitle: "Automated Email Delivery System",

    description:
      "A Spring Boot REST API that automates personalized bulk email delivery using Excel recipient data, Gmail SMTP integration and PDF attachments.",

    image: "public/projects/featured/bulk-email.webp",

    technologies: [
      "Java",
      "Spring Boot",
      "Apache POI",
      "SMTP",
      "REST APIs",
      "Postman",
    ],

    live: "",
    github: "https://github.com/mayurtambat01/spring-boot-bulk-email-api",

    accent: "#ffad42",
    accentRGB: "255, 173, 66",
  },

  {
    id: "restaurant",
    name: "Restaurant Booking",
    title: "Restaurant <span>Booking</span>",
    subtitle: "Online Table Reservation System",

    description:
      "An earlier web development project focused on online restaurant table reservations using PHP and MySQL. The displayed interface is a conceptual preview.",

    image: "public/projects/featured/restaurant.webp",

    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],

    live: "restaurant-deployment.html",
    github: "",

    accent: "#e9a04b",
    accentRGB: "233, 160, 75",
  },
];

const PROJECT_IMAGE_DIMENSIONS = {
  staynest: [1672, 941],
  cineverse: [1672, 941],
  "bulk-email": [1672, 941],
  restaurant: [1671, 941],
};

/* =========================================================
   INITIALIZE PROJECT SHOWCASE
   ========================================================= */

export async function initGallery() {
  const section = document.getElementById("gallery");

  if (!section) return null;

  const navigation = document.getElementById("projectsNavigation");

  const card = document.getElementById("featuredProject");
  const label = document.getElementById("projectLabel");
  const title = document.getElementById("projectTitle");
  const subtitle = document.getElementById("projectSubtitle");

  const description = document.getElementById("projectDescription");

  const technologies = document.getElementById("projectTechnologies");

  const image = document.getElementById("projectImage");
  const liveButton = document.getElementById("projectLive");
  const githubButton = document.getElementById("projectGithub");

  const prevButton = document.getElementById("projectPrev");
  const nextButton = document.getElementById("projectNext");
  const counter = document.getElementById("projectCounter");

  const requiredElements = [
    navigation,
    card,
    label,
    title,
    subtitle,
    description,
    technologies,
    image,
    liveButton,
    githubButton,
    prevButton,
    nextButton,
    counter,
  ];

  if (requiredElements.some((element) => !element)) {
    console.warn("[Projects] Required elements missing.");
    return null;
  }

  let currentIndex = 0;
  let animationTimer;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const formatNumber = (number) => String(number).padStart(2, "0");

  /* =======================================================
     CREATE PROJECT NAVIGATION
     ======================================================= */

  navigation.replaceChildren();

  const navButtons = PROJECTS.map((project, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "project-nav-button";

    button.setAttribute("aria-pressed", "false");

    const number = document.createElement("span");

    number.className = "project-nav-number";
    number.textContent = formatNumber(index + 1);

    const name = document.createElement("span");

    name.className = "project-nav-name";
    name.textContent = project.name;

    button.append(number, name);

    button.addEventListener("click", () => {
      showProject(index);
    });

    navigation.appendChild(button);

    return button;
  });

  /* =======================================================
     UPDATE PROJECT LINKS
     ======================================================= */

  function updateLink(button, url) {
    if (url) {
      button.href = url;
      button.hidden = false;
    } else {
      button.removeAttribute("href");
      button.hidden = true;
    }
  }

  /* =======================================================
     DISPLAY SELECTED PROJECT
     ======================================================= */

  function showProject(index, animate = true) {
    if (index < 0 || index >= PROJECTS.length) return;

    currentIndex = index;

    const project = PROJECTS[index];

    clearTimeout(animationTimer);

    card.classList.remove("is-changing");

    /* Dynamic accent colors */

    section.style.setProperty("--project-accent", project.accent);

    section.style.setProperty("--project-accent-rgb", project.accentRGB);

    section.dataset.project = project.id;

    /* Project information */

    label.textContent = `FEATURED PROJECT / ${formatNumber(index + 1)}`;

    title.innerHTML = project.title;
    subtitle.textContent = project.subtitle;
    description.textContent = project.description;

    /* Project visual */

    image.alt =
      project.id === "restaurant"
        ? "Conceptual restaurant booking interface"
        : `${project.name} cinematic project preview`;

    const [width, height] = PROJECT_IMAGE_DIMENSIONS[project.id];

    image.width = width;
    image.height = height;
    image.src = project.image;

    /* Technology badges */

    technologies.replaceChildren();

    project.technologies.forEach((technology) => {
      const badge = document.createElement("span");

      badge.className = "project-tech-badge";
      badge.textContent = technology;

      technologies.appendChild(badge);
    });

    /* Action buttons */

    updateLink(liveButton, project.live);
    updateLink(githubButton, project.github);

    if (project.id === "restaurant") {
      liveButton.innerHTML = "&#9203; &nbsp; Under Deployment &nbsp; &#8599;";
      liveButton.target = "_self";
      liveButton.setAttribute(
        "aria-label",
        "View restaurant deployment status",
      );
    } else {
      liveButton.innerHTML = "&#9654; &nbsp; Live Demo &nbsp; &#8599;";
      liveButton.target = "_blank";
      liveButton.rel = "noopener noreferrer";
      liveButton.setAttribute("aria-label", `View ${project.name} live demo`);
    }

    /* Active navigation */

    navButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;

      button.classList.toggle("is-active", active);

      button.setAttribute("aria-pressed", String(active));
    });

    /* Navigation counter */

    counter.textContent = `${formatNumber(index + 1)} / ${formatNumber(PROJECTS.length)}`;

    prevButton.disabled = index === 0;

    nextButton.disabled = index === PROJECTS.length - 1;

    /* Cinematic transition */

    if (animate && !reducedMotion.matches) {
      void card.offsetWidth;

      card.classList.add("is-changing");

      animationTimer = window.setTimeout(() => {
        card.classList.remove("is-changing");
      }, 600);
    }
  }

  /* =======================================================
     PREVIOUS AND NEXT NAVIGATION
     ======================================================= */

  prevButton.addEventListener("click", () => {
    showProject(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showProject(currentIndex + 1);
  });

  /* =======================================================
     KEYBOARD NAVIGATION
     ======================================================= */

  section.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showProject(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showProject(currentIndex + 1);
    }
  });

  /* =======================================================
     INITIAL PROJECT
     ======================================================= */

  const url = new URL(window.location.href);

  const requestedProject = url.searchParams.get("project");

  const requestedIndex = PROJECTS.findIndex(
    (project) => project.id === requestedProject,
  );

  showProject(requestedIndex >= 0 ? requestedIndex : 0, false);

  // Remove project parameter after initial selection
  if (url.searchParams.has("project")) {
    url.searchParams.delete("project");

    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  }

  section.classList.add("is-live");

  console.log("[Projects] Scene 4 initialized successfully.");

  return {
    section,
    setTarget: showProject,
  };
}
