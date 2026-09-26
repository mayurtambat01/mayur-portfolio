export function initConnect5() {

  const section = document.getElementById('connect5');

  if (!section) return null;


  const observer = new IntersectionObserver(
    (entries) => {

      for (const entry of entries) {

        if (entry.isIntersecting) {

          section.classList.add('is-connect-visible');

        } else {

          section.classList.remove('is-connect-visible');

        }

      }

    },
    {
      threshold: 0.28
    }
  );


  observer.observe(section);


  return {

    section,
    observer,

    destroy() {
      observer.disconnect();
    }

  };

}