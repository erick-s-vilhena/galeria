    // class="carousel js-carousel"
    // data-infinite="true"
    // data-autoplay="true"
    // data-autoplay-speed="3500"
    // data-show-bullets="true"
    // data-slides-desktop="1"
    // data-slides-tablet="1"
    // data-slides-mobile="1"

class GenericCarousel {
  constructor(root, userOptions = {}) {
    this.root = root;
    this.track = root.querySelector(".carousel-track");
    this.originalSlides = Array.from(root.querySelectorAll(".carousel-slide"));
    this.bulletsContainer = root.querySelector(".carousel-bullets");

    this.options = this.buildOptions(userOptions);
    this.currentIndex = 0;
    this.currentTranslate = 0;
    this.startX = 0;
    this.prevTranslate = 0;
    this.isDragging = false;
    this.autoplayId = null;
    this.resizeTimeout = null;

    this.init();
  }

  buildOptions(userOptions) {
    const d = this.root.dataset;
    return {
      infinite: this.parseBool(userOptions.infinite ?? d.infinite, true),
      autoplay: this.parseBool(userOptions.autoplay ?? d.autoplay, false),
      autoplaySpeed: Number(userOptions.autoplaySpeed ?? d.autoplaySpeed ?? 3500),
      showBullets: this.parseBool(userOptions.showBullets ?? d.showBullets, true),
      dragMobile: this.parseBool(userOptions.dragMobile ?? d.dragMobile, true),
      slidesPerView: {
        desktop: Number(userOptions.slidesDesktop ?? d.slidesDesktop ?? 1),
        tablet: Number(userOptions.slidesTablet ?? d.slidesTablet ?? 1),
        mobile: Number(userOptions.slidesMobile ?? d.slidesMobile ?? 1),
      }
    };
  }

  parseBool(value, fallback) {
    if (value === undefined || value === null || value === "") return fallback;
    if (typeof value === "boolean") return value;
    return String(value).toLowerCase() === "true";
  }

  getSlidesPerView() {
    if (window.innerWidth <= 768) return this.options.slidesPerView.mobile;
    if (window.innerWidth <= 1024) return this.options.slidesPerView.tablet;
    return this.options.slidesPerView.desktop;
  }

  init() {
    this.wrapViewport();
    this.setupSlides();
    this.createBullets();
    this.goTo(0, false);
    this.bindEvents();
    this.updateBullets();
    this.updateBulletsVisibility();
    this.startAutoplay();
  }

  wrapViewport() {
    const viewport = document.createElement("div");
    viewport.className = "carousel-viewport";
    this.track.parentNode.insertBefore(viewport, this.track);
    viewport.appendChild(this.track);
    this.viewport = viewport;
  }

  setupSlides() {
    this.track.innerHTML = "";
    this.realSlides = this.originalSlides.map(slide => slide.cloneNode(true));
    this.slidesPerView = Math.max(1, this.getSlidesPerView());

    if (this.options.infinite && this.realSlides.length > this.slidesPerView) {
      this.cloneCount = this.slidesPerView;

      const headClones = this.realSlides.slice(0, this.cloneCount).map(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add("is-clone");
        return clone;
      });

      const tailClones = this.realSlides.slice(-this.cloneCount).map(slide => {
        const clone = slide.cloneNode(true);
        clone.classList.add("is-clone");
        return clone;
      });

      [...tailClones, ...this.realSlides, ...headClones].forEach(slide => {
        this.track.appendChild(slide);
      });

      this.allSlides = Array.from(this.track.children);
      this.currentIndex = this.cloneCount;
    } else {
      this.cloneCount = 0;
      this.realSlides.forEach(slide => this.track.appendChild(slide));
      this.allSlides = Array.from(this.track.children);
      this.currentIndex = 0;
    }

    this.slideWidth = this.viewport.clientWidth / this.slidesPerView;

    this.allSlides.forEach(slide => {
      slide.style.flex = `0 0 ${100 / this.slidesPerView}%`;
      slide.style.maxWidth = `${100 / this.slidesPerView}%`;
    });
  }

  createBullets() {
    if (!this.bulletsContainer) return;

    this.bulletsContainer.innerHTML = "";

    this.originalSlides.forEach((_, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Ir para o slide ${index + 1}`);

      button.addEventListener("click", () => {
        const target = this.options.infinite ? index + this.cloneCount : index;
        this.goTo(target);
        this.restartAutoplay();
      });

      this.bulletsContainer.appendChild(button);
    });
  }

  updateBullets() {
    if (!this.bulletsContainer) return;

    const buttons = Array.from(this.bulletsContainer.children);
    const realIndex = this.getRealIndex();

    buttons.forEach((button, index) => {
      button.classList.toggle("is-active", index === realIndex);
    });
  }

  updateBulletsVisibility() {
    if (!this.bulletsContainer) return;
    this.bulletsContainer.style.display = this.options.showBullets ? "flex" : "none";
  }

  getRealIndex() {
    if (!this.options.infinite || this.realSlides.length <= this.slidesPerView) {
      return Math.max(0, Math.min(this.currentIndex, this.realSlides.length - 1));
    }

    let index = (this.currentIndex - this.cloneCount) % this.realSlides.length;

    if (index < 0) index += this.realSlides.length;

    return index;
  }

  setTranslate(value, animate = true) {
    this.track.style.transition = animate ? "transform .35s ease" : "none";
    this.track.style.transform = `translateX(${value}px)`;
    this.currentTranslate = value;
  }

  goTo(index, animate = true) {
    this.currentIndex = index;
    const offset = -(this.currentIndex * this.slideWidth);
    this.prevTranslate = offset;
    this.setTranslate(offset, animate);
    this.updateBullets();
  }

  next() {
    if (!this.options.infinite && this.currentIndex >= this.realSlides.length - this.slidesPerView) {
      this.goTo(0);
      return;
    }

    this.goTo(this.currentIndex + 1);
  }

  prev() {
    if (!this.options.infinite && this.currentIndex <= 0) {
      this.goTo(Math.max(0, this.realSlides.length - this.slidesPerView));
      return;
    }

    this.goTo(this.currentIndex - 1);
  }

  handleInfiniteLoop() {
    if (!this.options.infinite || this.realSlides.length <= this.slidesPerView) return;

    if (this.currentIndex >= this.realSlides.length + this.cloneCount) {
      this.currentIndex = this.cloneCount;
      this.goTo(this.currentIndex, false);
    }

    if (this.currentIndex < this.cloneCount) {
      this.currentIndex = this.realSlides.length + this.cloneCount - 1;
      this.goTo(this.currentIndex, false);
    }
  }

  startAutoplay() {
    if (!this.options.autoplay) return;

    this.stopAutoplay();

    this.autoplayId = setInterval(() => {
      this.next();
    }, this.options.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = null;
    }
  }

  restartAutoplay() {
    if (!this.options.autoplay) return;
    this.startAutoplay();
  }

    pointerDown(clientX) {
    if (!this.options.dragMobile) return;

    this.isDragging = true;
    this.startX = clientX;
    this.root.classList.add("is-dragging");
    this.stopAutoplay();
    }

  pointerMove(clientX) {
    if (!this.isDragging) return;

    const moved = clientX - this.startX;
    this.setTranslate(this.prevTranslate + moved, false);
  }

  pointerUp() {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.root.classList.remove("is-dragging");

    const movedBy = this.currentTranslate - this.prevTranslate;
    const threshold = this.slideWidth * 0.15;

    if (movedBy < -threshold) {
      this.next();
    } else if (movedBy > threshold) {
      this.prev();
    } else {
      this.goTo(this.currentIndex);
    }

    this.restartAutoplay();
  }

  bindEvents() {
    this.track.addEventListener("transitionend", () => this.handleInfiniteLoop());

    this.root.addEventListener("mouseenter", () => this.stopAutoplay());
    this.root.addEventListener("mouseleave", () => this.startAutoplay());

    this.track.addEventListener("mousedown", e => this.pointerDown(e.clientX));
    window.addEventListener("mousemove", e => this.pointerMove(e.clientX));
    window.addEventListener("mouseup", () => this.pointerUp());

    this.track.addEventListener(
      "touchstart",
      e => this.pointerDown(e.touches[0].clientX),
      { passive: true }
    );

    this.track.addEventListener(
      "touchmove",
      e => this.pointerMove(e.touches[0].clientX),
      { passive: true }
    );

    this.track.addEventListener("touchend", () => this.pointerUp());

    window.addEventListener("resize", () => {
      clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(() => {
        const realIndex = this.getRealIndex();
        this.setupSlides();

        const target = this.options.infinite
          ? realIndex + this.cloneCount
          : realIndex;

        this.goTo(target, false);
        this.createBullets();
        this.updateBullets();
        this.updateBulletsVisibility();
      }, 120);
    });
  }
}

document.querySelectorAll(".js-carousel").forEach(carousel => {
  new GenericCarousel(carousel);
});