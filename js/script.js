(() => {

  document.addEventListener('DOMContentLoaded', () => {

    // Handle audio play/pause
    function handleAudio(playerElement, playBtnClass, pauseBtnClass, hiddenClass) {
      const playBtn = playerElement.querySelector(`.${playBtnClass}`);
      const pauseBtn = playerElement.querySelector(`.${pauseBtnClass}`);
      const audio = playerElement.querySelector('audio');

      playBtn.addEventListener('click', () => {
        playBtn.classList.toggle(`${hiddenClass}`);
        pauseBtn.classList.toggle(`${hiddenClass}`);
        audio.play();
      });
      pauseBtn.addEventListener('click', () => {
        playBtn.classList.toggle(`${hiddenClass}`);
        pauseBtn.classList.toggle(`${hiddenClass}`);
        audio.pause();
      });
    }

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
    headerPlayers.forEach(headerPlayer => handleAudio(headerPlayer, 'header__play-btn', 'header__pause-btn', 'header__music-btn--hidden'));

    // PODCASTS //
    const podcasts = document.querySelectorAll('.podcast');

    // Music play/pause
    podcasts.forEach(podcast => handleAudio(podcast, 'podcast__play-btn', 'podcast__pause-btn', 'podcast__music-btn--hidden'));

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

    // GUESTS //

    // Types accordion
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
      });
    });

    // PLAYLISTS //

    // Label background for checked genre on mobile
    const labels = document.querySelectorAll('.playlists__label');
    labels.forEach(label => {
      const input = label.querySelector('input');
      input.addEventListener('change', () => {
        labels.forEach(label => {
          label.classList.remove('playlists__label--active');
        });
        label.classList.add('playlists__label--active');
      });
    });

    // Filter by genre
    const playlists = document.querySelectorAll('.playlist');
    const genres = document.querySelectorAll('.playlists__radio');
    function filterPlaylists() {
      genres.forEach(genre => {
        if (genre.checked) {
          playlists.forEach(playlist => {
            if (playlist.dataset.id.split(' ').includes(genre.dataset.id)) {
              playlist.classList.remove('playlist--hidden');
            } else {
              playlist.classList.add('playlist--hidden');
            }
          });
        }
      });
    }

    // Slider
    const swiper = new Swiper('.playlists__slider', {
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      autoHeight: true,
      spaceBetween: 30,
    });

    // Distribute playlists by slides
    const PLAYLISTS_PER_SLIDE = 12
    const sliderWrapper = document.querySelector('.swiper-wrapper');
    function distributePlaylists() {
      const activePlaylists = [...playlists].filter(playlist => !playlist.classList.contains('playlist--hidden'));
      const slidesAmount = Math.ceil(activePlaylists.length / PLAYLISTS_PER_SLIDE);
      let i = 0;
      const slides = [];
      while (i++ < slidesAmount) {
        const slide = document.createElement('div');
        slide.className = 'playlists__cards swiper-slide';
        slides.push(slide);
      }
      slides.forEach((slide, index) => {
        let i = 0;
        while (i < PLAYLISTS_PER_SLIDE) {
          if (activePlaylists[PLAYLISTS_PER_SLIDE * index + i]) {
            slide.append(activePlaylists[PLAYLISTS_PER_SLIDE * index + i]);
          }
          i++;
        }
      });
      sliderWrapper.innerHTML = '';
      sliderWrapper.append(...slides);
      swiper.update();
      swiper.slideTo(0);
    }

    function updatePlaylists() {
      filterPlaylists();
      distributePlaylists();
    }
    genres.forEach(genre => {
      genre.addEventListener('change', updatePlaylists);
    });
    swiper.on('init', distributePlaylists());
    if (window.innerWidth < 1024) {
      swiper.on('slideChange', () => {
        document.querySelector('.playlists__genres-title').scrollIntoView(true);
      })
    }

    // Music play/pause
    playlists.forEach(playlist => handleAudio(playlist, 'playlist__image', 'playlist__info', 'playlist__music-btn--hidden'));

  });

})();
