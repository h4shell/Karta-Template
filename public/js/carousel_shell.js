class Carousel_shell {
  constructor(containerSelector) {
    this.currentImage = 0;
    this.userAction = false;

    this.container = document.querySelector(containerSelector);
    this.carousel = this.container.querySelector(".__carousel");
    this.ul = this.carousel.querySelector("ul");
    this.li = this.carousel.querySelectorAll("li");
    this.handler_imageBackground();
    this.handler_styleRules();
    this.initNavigator();

    if (this.container.dataset.time) {
      this.autoScroll(this.container.dataset.time);
    }
  }

  handler_imageBackground() {
    this.li.forEach((li) => {
      li.style.background = `url(${li.dataset.url}) no-repeat center center`;
      li.style.height = "100%";
      li.style.width = "100%";
      li.style.backgroundSize = "cover";
      li.style.flexShrink = "0";
    });
  }

  handler_styleRules() {
    /* STYLE CSS*/
    this.ul.style.height = "100%";
    this.ul.style.listStyle = "none";
    this.ul.style.display = "flex";
    this.carousel.style.overflow = "hidden";
    this.container.style.height = "100%";
    this.carousel.style.height = "100%";
    if (!this.container.dataset.speed) {
      this.container.dataset.speed = 0.6;
    }
    this.ul.style.transition = `transform ${this.container.dataset.speed}s ease`;
    this.container.style.position = "relative";
  }

  nextImage() {
    this.currentImage++;
    this.currentImage =
      this.currentImage > this.li.length - 1 ? 0 : this.currentImage++;
    this.ul.style.transform = `translateX(${-100 * this.currentImage}%)`;
    this.styleNavigatorButton(this.currentImage);
  }

  prevImage() {
    this.currentImage--;

    this.currentImage =
      this.currentImage < 0 ? this.li.length - 1 : this.currentImage;
    this.ul.style.transform = `translateX(${-100 * this.currentImage}%)`;
  }

  initNavigator() {
    this.wrapperNavigator = document.createElement("div");
    this.wrapperNavigator.classList.add("__wrapper-navigator");
    if (
      this.container.dataset.dotPosition === "bottom" ||
      !this.container.dataset.dotPosition
    ) {
      this.wrapperNavigator.style.position = "absolute";
      this.wrapperNavigator.style.bottom = "30px";
      this.wrapperNavigator.style.left = "50%";
      this.wrapperNavigator.style.transform = "translateX(-50%)";
    } else if (this.container.dataset.dotPosition === "top") {
      this.wrapperNavigator.style.position = "absolute";
      this.wrapperNavigator.style.top = "30px";
      this.wrapperNavigator.style.left = "50%";
      this.wrapperNavigator.style.transform = "translateX(-50%)";
    } else if (this.container.dataset.dotPosition === "left") {
      this.wrapperNavigator.style.position = "absolute";
      this.wrapperNavigator.style.top = "50%";
      this.wrapperNavigator.style.left = "30px";
      this.wrapperNavigator.style.transform = "translateY(-50%)";
      this.wrapperNavigator.style.flexDirection = "column";
    } else if (this.container.dataset.dotPosition === "right") {
      this.wrapperNavigator.style.position = "absolute";
      this.wrapperNavigator.style.top = "50%";
      this.wrapperNavigator.style.right = "30px";
      this.wrapperNavigator.style.transform = "translateY(-50%)";
      this.wrapperNavigator.style.flexDirection = "column";
    } else {
      this.wrapperNavigator.style.display = "none";
    }

    this.wrapperNavigator.style.display = "flex";
    this.wrapperNavigator.style.gap = "1.5rem";
    this.wrapperNavigator.style.zIndex = "999";
    for (this.i = 0; this.i < this.li.length; this.i++) {
      const btn = document.createElement("a");
      btn.dataset.slide = this.i;
      this.wrapperNavigator.appendChild(btn);
      btn.href = "#";
      btn.style.background = "white";
      btn.style.opacity = ".4";
      btn.style.width = "10px";
      btn.style.height = "10px";
      btn.style.borderRadius = "50%";
      this.i === 0 ? (btn.style.opacity = "1") : " .4";
      btn.onclick = () => {
        this.gotoSlide(btn.dataset.slide);
      };
    }
    this.container.appendChild(this.wrapperNavigator);
  }

  gotoSlide(slide) {
    this.userAction = true;
    this.currentImage = slide;
    this.ul.style.transform = `translateX(${-100 * this.currentImage}%)`;
    this.styleNavigatorButton(slide);
  }

  autoScroll(time) {
    if (this.container.dataset.speed) {
      this.timer = setInterval(() => {
        if (this.userAction === false) {
          this.nextImage();
        } else {
          this.userAction = false;
        }
      }, parseInt(time) * 1000);
    }
  }

  styleNavigatorButton(slide) {
    this.wrapperNavigator.querySelectorAll("a").forEach((el) => {
      el.style.background = "white";
      el.style.opacity = ".4";
    });
    this.wrapperNavigator.querySelectorAll("a")[slide].style.background =
      "white";
    this.wrapperNavigator.querySelectorAll("a")[slide].style.opacity = "1";
  }
}
