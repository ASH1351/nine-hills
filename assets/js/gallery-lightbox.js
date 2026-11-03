/**
 * Nine Hills Family Salon - Gallery Filter & Lightbox
 * Responsive category filtering and full-screen modal lightbox with keyboard & swipe navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentVisibleItems = Array.from(galleryItems);
  let currentIndex = 0;

  // 1. Category Filtering
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update current visible items for lightbox
      currentVisibleItems = Array.from(galleryItems).filter(
        (item) => item.style.display !== 'none'
      );
    });
  });

  // 2. Open Lightbox
  function openLightbox(index) {
    if (!currentVisibleItems[index]) return;
    currentIndex = index;
    const item = currentVisibleItems[currentIndex];
    const imgEl = item.querySelector('img');
    const titleEl = item.querySelector('.gallery-item-title');
    const catEl = item.querySelector('.gallery-item-category');

    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || 'Nine Hills Salon Style';
    lightboxCaption.textContent = `${titleEl ? titleEl.textContent : ''} • ${catEl ? catEl.textContent : ''}`;

    lightboxModal.classList.add('is-active');
    document.body.classList.add('no-scroll');
  }

  // 3. Close Lightbox
  function closeLightbox() {
    lightboxModal.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  }

  // 4. Navigate Lightbox
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    openLightbox(currentIndex);
  }

  // Attach click to items
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = currentVisibleItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  // Close when clicking modal backdrop
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        showPrev(); // Swiped right
      } else {
        showNext(); // Swiped left
      }
    }
  }
});
