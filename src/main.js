// =========================================================
// MAYUR TAMBAT PORTFOLIO
// Main scene orchestration
// =========================================================

import { initChrono } from './scene3/boot3.js';
import { initGallery } from './scene4/boot4.js';
import { initMayurHero } from './scene6/mayurHero.js';
import { initConnect5 } from './scene6/connect5.js';


// Prevent browser from restoring an old scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


async function main() {

  // -----------------------------------------
  // SCENE 1 — MAYUR HERO
  // -----------------------------------------
  initMayurHero();

  // -----------------------------------------
  // SCENE 5 — CONNECT
  // -----------------------------------------
  initConnect5();

  // -----------------------------------------
  // SCENE 3 — DEVELOPER JOURNEY
  // -----------------------------------------
  initChrono()
    .catch((e) => {
      console.warn(
        '[Mayur] Developer Journey unavailable:',
        e.message
      );
    });


  // -----------------------------------------
  // SCENE 4 — PROJECTS
  // -----------------------------------------
  initGallery()
    .catch((e) => {
      console.warn(
        '[Mayur] Projects unavailable:',
        e.message
      );
    });


  // Website is ready
  document.documentElement.classList.remove('is-booting');
}


main().catch((e) => {

  console.error(
    '[Mayur] Portfolio initialization failed:',
    e
  );

  document.documentElement.classList.remove('is-booting');

});