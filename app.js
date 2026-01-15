/* Created by Tivotal */

// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

let themeToggler = document.querySelector(".theme-toggler");
let toggleBtn = document.querySelector(".toggle-btn");

toggleBtn.onclick = () => {
  themeToggler.classList.toggle("active");
};

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  themeToggler.classList.remove("active");
  
  // Show/hide back to top button
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
};

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        menu.classList.remove("fa-times");
        navbar.classList.remove("active");
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

document.querySelectorAll(".theme-toggler .theme-btn").forEach((btn) => {
  btn.onclick = () => {
    let color = btn.style.background;
    document.querySelector(":root").style.setProperty("--theme-color", color);
  };
});

// Stats Counter Animation
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = () => {
  if (hasAnimated) return;
  
  const section = document.querySelector('.home');
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY + window.innerHeight;
  
  if (scrollY > sectionTop + sectionHeight / 2) {
    hasAnimated = true;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCounter();
    });
  }
};

// Run on scroll
window.addEventListener('scroll', animateCounter);

// Run on load if already in view
window.addEventListener('load', animateCounter);

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Project Slider
var projectSwiper = new Swiper(".project-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 20,
  centeredSlides: false,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".review-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// Gallery Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

// Get all gallery images
const galleryImages = [];
document.querySelectorAll('.gallery .box-container .box').forEach((box, index) => {
  const img = box.querySelector('img');
  const title = box.querySelector('.title');
  galleryImages.push({
    src: img.src,
    alt: title ? title.textContent : 'Gallery Image'
  });
});

let currentImageIndex = 0;

// Open lightbox
document.querySelectorAll('.zoom-icon').forEach((icon, index) => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
    currentImageIndex = index;
    showImage(currentImageIndex);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Show image in lightbox
function showImage(index) {
  if (galleryImages[index]) {
    lightboxImage.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].alt;
  }
}

// Close lightbox
closeLightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Previous image
prevImage.addEventListener('click', (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentImageIndex);
});

// Next image
nextImage.addEventListener('click', (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  showImage(currentImageIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    } else if (e.key === 'ArrowLeft') {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentImageIndex);
    } else if (e.key === 'ArrowRight') {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(currentImageIndex);
    }
  }
});
