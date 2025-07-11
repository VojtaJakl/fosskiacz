document.addEventListener('DOMContentLoaded', () => {
  // detail sluzby
  document.querySelectorAll('.sluzba').forEach(sluzba => {
    sluzba.addEventListener('click', () => {
      const detailEl = sluzba.querySelector('.sluzba-detail');
      if (!detailEl) return;

      
      document.querySelectorAll('.sluzba-detail.open').forEach(openDetail => {
        if (openDetail !== detailEl) {
          openDetail.classList.remove('open');
          openDetail.style.maxHeight = null;
          openDetail.parentElement.classList.remove('active');
        }
      });

      const isOpen = detailEl.classList.contains('open');
      if (isOpen) {
        detailEl.classList.remove('open');
        sluzba.classList.remove('active');
        detailEl.style.maxHeight = null;
      } else {
        detailEl.classList.add('open');
        sluzba.classList.add('active');
        detailEl.style.maxHeight = detailEl.scrollHeight + "px";
      }
    });
  });

  // aos
  AOS.init({
    duration: 700,
    easing: 'ease-in-out',
    once: true,
  });

  // Hamburger 
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Lucide ikony
  lucide.createIcons();

  // Galerie 
  const showMoreBtn = document.getElementById('show-more-btn');
  const hiddenImages = document.querySelectorAll('.galerie-grid a.hidden');

  if (showMoreBtn && hiddenImages.length > 0) {
    showMoreBtn.addEventListener('click', () => {
      const isHidden = hiddenImages[0].classList.contains('hidden');

      hiddenImages.forEach(item => {
        if (isHidden) {
          item.classList.remove('hidden');
          item.classList.add('show');
        } else {
          item.classList.remove('show');
          item.classList.add('hidden');
        }
      });

      showMoreBtn.textContent = isHidden ? 'Zobrazit méně' : 'Zobrazit více';

      if (!isHidden) {
        window.scrollTo({
          top: document.getElementById('galerie').offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // Lightbox
  const links = document.querySelectorAll('.lightbox');
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  const btnClose = document.getElementById('lightbox-close');
  const btnNext = document.getElementById('lightbox-next');
  const btnPrev = document.getElementById('lightbox-prev');

  let currentIndex = 0;
  const images = Array.from(links).map(link => link.getAttribute('href'));

  function showImage(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    overlay.classList.add('show');
  }

  links.forEach((link, index) => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showImage(index);
    });
  });

  btnClose.addEventListener('click', () => {
    overlay.classList.remove('show');
    lightboxImg.src = "";
  });

  btnNext.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  btnPrev.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('show');
      lightboxImg.src = "";
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      overlay.classList.remove('show');
      lightboxImg.src = "";
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    } else if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }
  });
});

// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 1200);
});
