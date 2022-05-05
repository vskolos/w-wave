(() => {

  document.addEventListener('DOMContentLoaded', () => {

    // Burger menu open/close
    const burgerBtn = document.querySelector('.header__burger-menu-btn');
    burgerBtn.addEventListener('click', () => {
      const burgerMenu = document.querySelector('.header__burger-menu');
      burgerMenu.classList.add('header__burger-menu--opened');
    });
    const burgerMenuLinks = document.querySelectorAll('.burger-menu__close-btn, .burger-menu__page-link, .burger-menu__site-link');
    burgerMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        const burgerMenu = document.querySelector('.header__burger-menu');
        burgerMenu.classList.remove('header__burger-menu--opened');
      });
    });

    // Search box open/close
    const searchBtns = document.querySelectorAll('.header__search-btn');
    searchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
      const searchBox = document.querySelector('.header__search');
      searchBox.classList.toggle('header__search--opened');
    });
    });

    // Header music (mobile) open/close
    const musicMobileBtn = document.querySelector('.header__mobile-music-btn');
    musicMobileBtn.addEventListener('click', () => {
      musicMobileBtn.classList.toggle('header__mobile-music-btn--active');
      const musicWrapper = document.querySelector('.header__music');
      musicWrapper.classList.toggle('header__music--opened');
    });

    // Authors selector
    const authors = new Choices('.shows__authors', {
      allowHTML: false,
      searchEnabled: false,
      shouldSort: false,
      position: 'bottom',
      itemSelectText: '',
    });

    // Guests types accordion
    const guestTypes = new Accordion('.guests__types', {
      duration: 300,
      elementClass: 'guests__type',
      triggerClass: 'guests__type-wrapper',
      panelClass: 'guests__type-panel',
      activeClass: 'guests__type--is-active',
      openOnInit: [0],
    });

    // Chosen guest info
    const guests = document.querySelectorAll('.guests__btn');
    guests.forEach(guest => {
      guest.addEventListener('click', e => {
        const path = e.currentTarget.dataset.path;

        guests.forEach(link => {
          link.classList.remove('guests__btn--active');
        });
        e.currentTarget.classList.add('guests__btn--active');

        document.querySelectorAll('.guest').forEach(div => {
          div.classList.remove('guest--active');
        })

        const target = document.querySelector(`[data-target="${path}"]`);
        if (target) {
          target.classList.add('guest--active');
        } else {
          document.querySelector(`[data-target="nobody"]`).classList.add('guest--active');
        }
      })
    })
  });

})();
