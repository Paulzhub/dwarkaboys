document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  const profilesSection = document.getElementById('profiles');
  const profiles = document.querySelectorAll('.profile');
  const firstProfile = profiles[0];
  let currentProfileIndex = 0;
  let isScrolling = false;
  let touchStartY = 0;
  let touchEndY = 0;
  let isProfilesFullyVisible = false;
  let isProfile1FullyVisible = false;
  let lastScrollTime = 0;
  const scrollThrottle = 100; // Throttle scroll events (ms)

  // Ensure landing page is shown on refresh
  window.scrollTo({ top: 0, behavior: 'instant' });
  profilesSection.scrollTo({ left: 0, behavior: 'instant' });

  // IntersectionObserver for landing-to-profiles transition
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 1.0) {
          isProfilesFullyVisible = entry.target === profilesSection;
          entry.target.classList.add('active');
          if (entry.target === profilesSection) {
            // Reset to first profile when profiles section is fully in view
            scrollToProfile(0);
          }
        } else {
          if (entry.target === profilesSection) {
            isProfilesFullyVisible = false;
          }
          entry.target.classList.remove('active');
        }
      });
    },
    { threshold: 1.0 } // Stricter threshold for full visibility
  );

  sectionObserver.observe(landing);
  sectionObserver.observe(profilesSection);

  // IntersectionObserver for Profile 1 visibility
  const profile1Observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isProfile1FullyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.95;
      });
    },
    { root: profilesSection, threshold: 0.95 } // Slightly lower for fast scrolling
  );

  profile1Observer.observe(firstProfile);

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

      // Periodic check to correct scroll position
      const checkScroll = setInterval(() => {
        if (Math.abs(profilesSection.scrollLeft - index * window.innerWidth) < 1) {
          profilesSection.scrollLeft = index * window.innerWidth; // Snap to exact position
          clearInterval(checkScroll);
        }
      }, 50);

      setTimeout(() => {
        isScrolling = false;
      }, 600); // Increased debounce for fast scrolling
    }
  }

  // Mouse wheel scrolling
  window.addEventListener('wheel', (event) => {
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottle) return;
    lastScrollTime = now;

    // Allow vertical scrolling if profiles section is not fully visible
    if (!isProfilesFullyVisible) {
      return; // Allow default vertical scrolling
    }

    // Handle horizontal scrolling within profiles
    if (event.deltaY > 0 && currentProfileIndex < profiles.length - 1) {
      event.preventDefault();
      scrollToProfile(currentProfileIndex + 1);
    } else if (event.deltaY < 0 && currentProfileIndex > 0) {
      event.preventDefault();
      scrollToProfile(currentProfileIndex - 1);
    }
    // Allow vertical scrolling to landing only at Profile 1 when fully visible
    else if (event.deltaY < 0 && currentProfileIndex === 0 && isProfile1FullyVisible && profilesSection.scrollLeft <= 0) {
      return; // Allow default vertical scrolling to landing
    }
    // Fallback: force Profile 1 if attempting to scroll up
    else if (event.deltaY < 0) {
      event.preventDefault();
      scrollToProfile(0);
    }
  }, { passive: false });

  // Touch scrolling for mobile (up/down swipes)
  window.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (event) => {
    touchEndY = event.touches[0].clientY;
    // Allow vertical scrolling if profiles section is not fully visible
    if (!isProfilesFullyVisible) {
      return; // Allow default vertical scrolling
    }

    // Prevent default only for significant vertical swipes
    if (Math.abs(touchStartY - touchEndY) > 10 && currentProfileIndex > 0) {
      event.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('touchend', () => {
    const now = Date.now();
    if (now - lastScrollTime < scrollThrottle) return;
    lastScrollTime = now;

    const deltaY = touchStartY - touchEndY;
    const swipeThreshold = 75; // Reliable threshold

    if (isProfilesFullyVisible && !isScrolling) {
      if (deltaY > swipeThreshold && currentProfileIndex < profiles.length - 1) {
        scrollToProfile(currentProfileIndex + 1); // Upward swipe -> next profile
      } else if (deltaY < -swipeThreshold && currentProfileIndex > 0) {
        scrollToProfile(currentProfileIndex - 1); // Downward swipe -> previous profile
      }
    }
    // Allow vertical scrolling to landing only at Profile 1 when fully visible
    else if (deltaY < -swipeThreshold && currentProfileIndex === 0 && isProfile1FullyVisible && profilesSection.scrollLeft <= 0) {
      return; // Allow default vertical scrolling to landing
    }
    // Fallback: force Profile 1 if attempting to swipe down
    else if (deltaY < -swipeThreshold) {
      scrollToProfile(0);
    }
  }, { passive: true });

  // Keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      scrollToProfile(currentProfileIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      scrollToProfile(currentProfileIndex - 1);
    }
  });
});
