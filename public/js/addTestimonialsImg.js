function addTestimonialsImg() {
    const images = document.querySelectorAll(".__people");
    images.forEach((item) => {
        item.style.background = `url(${item.dataset.url})`
        item.style.backgroundSize = "cover"
    });

}