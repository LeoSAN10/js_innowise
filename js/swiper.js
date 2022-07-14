const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 4,
  slidesPerGroup: 4,
  loop: true,
  observer: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})

// export default swiper
