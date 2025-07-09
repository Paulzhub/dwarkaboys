document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const profilesSection = document.getElementById('profiles');
  const profiles = document.querySelectorAll('.profile');
  let currentProfileIndex = 0;
  let isScrolling = false;

  // IntersectionObserver for landing-to-profiles transition
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(landing);
  observer.observe(profilesSection);

  // IntersectionObserver for profile-to-profile transitions
  const profileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          currentProfileIndex = Array.from(profiles).indexOf(entry.target);
        } else {
          entry.target.classList.remove('active');
        }
      });
    },
    { root: profilesSection, threshold: 0.8 }
  );

  profiles.forEach((profile) => profileObserver.observe(profile));

  // Scroll to profile function
  function scrollToProfile(index) {
    if (index >= 0 && index < profiles.length && !isScrolling) {
      isScrolling = true;
      profilesSection.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
      });
      currentProfileIndex = index;
      setTimeout(() => { isScrolling = false; }, 500); // Match transition duration
    }
  }

  // Mouse wheel and touch scrolling
  profilesSection.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (isScrolling) return;

    // Allow vertical scrolling at boundaries
    if ((event.deltaY < 0 && currentProfileIndex === 0) || 
        (event.deltaY > 0 && currentProfileIndex === profiles.length - 1)) {
      return; // Let browser handle vertical scroll
    }

    // Handle horizontal scrolling
    if (event.deltaY > 0) {
      scrollToProfile(currentProfileIndex + 1);
    } else if (event.deltaY < 0) {
      scrollToProfile(currentProfileIndex - 1);
    }
  }, { passive: false });

  // Keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      scrollToProfile(currentProfileIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      scrollToProfile(currentProfileIndex - 1);
    }
  });
});