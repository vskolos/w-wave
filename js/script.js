(() => {

  document.addEventListener('DOMContentLoaded', () => {

    // HEADER //

    // Burger menu open/close
    const burgerMenu = document.querySelector('.header__burger-menu');
    const burgerBtn = document.querySelector('.header__burger-menu-btn');
    burgerBtn.addEventListener('click', () => {
      burgerMenu.classList.add('header__burger-menu--opened');
    });
    const burgerMenuLinks = document.querySelectorAll('.burger-menu__close-btn, .burger-menu__page-link, .burger-menu__site-link');
    burgerMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        burgerMenu.classList.remove('header__burger-menu--opened');
      });
    });

    // Search box open/close
    const searchBtns = document.querySelectorAll('.header__search-btn');
    const searchBox = document.querySelector('.header__search');
    searchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
      searchBox.classList.toggle('header__search--opened');
      });
    });

    // Music box (mobile) open/close
    const musicMobileBtn = document.querySelector('.header__mobile-music-btn');
    const musicWrapper = document.querySelector('.header__music');
    musicMobileBtn.addEventListener('click', () => {
      musicMobileBtn.classList.toggle('header__mobile-music-btn--active');
      musicWrapper.classList.toggle('header__music--opened');
    });

    // Music play/pause
    const headerPlayers = document.querySelectorAll('.header__player, .header__bottom .site-nav__item:last-child');
    headerPlayers.forEach(headerPlayer => {
      const playBtn = headerPlayer.querySelector('.header__play-btn');
      const pauseBtn = headerPlayer.querySelector('.header__pause-btn');
      const audio = headerPlayer.querySelector('audio');

      playBtn.addEventListener('click', () => {
        playBtn.classList.toggle('header__music-btn--hidden');
        pauseBtn.classList.toggle('header__music-btn--hidden');
        audio.play();
      });
      pauseBtn.addEventListener('click', () => {
        playBtn.classList.toggle('header__music-btn--hidden');
        pauseBtn.classList.toggle('header__music-btn--hidden');
        audio.pause();
      });
    });

    // PODCASTS //
    const podcasts = document.querySelectorAll('.podcast');

    // Music play/pause
    podcasts.forEach(podcast => {
      const playBtn = podcast.querySelector('.podcast__play-btn');
      const pauseBtn = podcast.querySelector('.podcast__pause-btn');
      const audio = podcast.querySelector('audio');

      playBtn.addEventListener('click', () => {
        playBtn.classList.toggle('podcast__music-btn--hidden');
        pauseBtn.classList.toggle('podcast__music-btn--hidden');
        audio.play();
      });
      pauseBtn.addEventListener('click', () => {
        playBtn.classList.toggle('podcast__music-btn--hidden');
        pauseBtn.classList.toggle('podcast__music-btn--hidden');
        audio.pause();
      });
    });

    // Show more
    const podcastsPerPage = window.innerWidth < 768 ? 4 : 8;
    const showMoreBtnWrapper = document.querySelector('.podcasts__btn-wrapper');
    const showMoreBtn = document.querySelector('.podcasts__btn');
    if (podcasts.length <= podcastsPerPage) {
      showMoreBtnWrapper.classList.add('podcasts__btn-wrapper--hidden');
    } else {
      podcasts.forEach((podcast, index) => {
        if (index + 1 > podcastsPerPage) {
          podcast.classList.add('podcast--hidden');
        }
      });
      showMoreBtn.addEventListener('click', () => {
        const hiddenPodcasts = document.querySelectorAll('.podcast.podcast--hidden');
        if (hiddenPodcasts.length < 2 * podcastsPerPage) {
          showMoreBtnWrapper.classList.add('podcasts__btn-wrapper--hidden');
        }
        hiddenPodcasts.forEach((podcast, index) => {
          if (index < podcastsPerPage) {
            podcast.classList.remove('podcast--hidden');
          }
        });
      });
    }

    // SHOWS //

    // Authors selector
    function filterShows() {
      const chosen = document.querySelector('.choices__item--choice.is-highlighted');
      const shows = document.querySelectorAll('.show');
      shows.forEach(show => {
        if (show.dataset.id.split(' ').includes(chosen.dataset.id)) {
          show.classList.remove('show--hidden');
        } else {
          show.classList.add('show--hidden');
        }
      });
    }
    const authors = new Choices('.shows__authors', {
      allowHTML: false,
      searchEnabled: false,
      shouldSort: false,
      position: 'bottom',
      itemSelectText: '',
      callbackOnInit: filterShows,
    });
    authors.passedElement.element.addEventListener('choice', filterShows);

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
