document.addEventListener('DOMContentLoaded', () => {

  // Pause every playing audio

  function pauseAudio() {

    const activePlayers = document.querySelectorAll('.is-playing');

    activePlayers.forEach(player => {

      const playBtn = player.querySelector('.play-btn');
      const pauseBtn = player.querySelector('.pause-btn');
      const audio = player.querySelector('audio');

      playBtn.classList.remove('music-btn--hidden');
      pauseBtn.classList.add('music-btn--hidden');
      audio.pause();

      player.classList.remove('is-playing');

    });

  }

  // Handle audio play/pause

  function handleAudio(player) {

    const playBtn = player.querySelector('.play-btn');
    const pauseBtn = player.querySelector('.pause-btn');
    const audio = player.querySelector('audio');

    playBtn.addEventListener('click', () => {

      pauseAudio();
      player.classList.add('is-playing');
      playBtn.classList.add('music-btn--hidden');
      pauseBtn.classList.remove('music-btn--hidden');
      audio.play();

    });

    pauseBtn.addEventListener('click', () => {

      player.classList.remove('is-playing');
      playBtn.classList.remove('music-btn--hidden');
      pauseBtn.classList.add('music-btn--hidden');
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
  headerPlayers.forEach(headerPlayer => handleAudio(headerPlayer));

  // PODCASTS //

  const podcastsList = document.querySelector('.podcasts__list');
  const podcasts = document.querySelectorAll('.podcast');

  // Music play/pause

  podcasts.forEach(podcast => handleAudio(podcast));

  // Show more

  const podcastsPerPage = window.innerWidth < 768 ? 4 : 8;
  const showMoreBtnWrapper = document.querySelector('.podcasts__btn-wrapper');
  const showMoreBtn = document.querySelector('.podcasts__btn');

  if (podcasts.length <= podcastsPerPage) {

    showMoreBtnWrapper.remove();

  } else {

    podcasts.forEach((podcast, index) => {

      if (index + 1 > podcastsPerPage) {
        podcast.remove();
      } else {
        podcast.classList.add('is-shown');
      }

    });

    showMoreBtn.addEventListener('click', () => {

      const hiddenPodcasts = [...podcasts].filter(podcast => !podcast.classList.contains('is-shown'));

      if (hiddenPodcasts.length < 2 * podcastsPerPage) {
        showMoreBtnWrapper.remove();
      }

      hiddenPodcasts.forEach((podcast, index) => {
        if (index < podcastsPerPage) {
          podcast.classList.add('is-shown');
          podcastsList.append(podcast);
        }
      });
    });

  }

  // SHOWS //

  // Authors selector

  const showsList = document.querySelector('.shows__cards');
  const shows = document.querySelectorAll('.show');

  function filterShows() {

    const chosen = document.querySelector('.choices__item--choice.is-highlighted');

    shows.forEach(show => {
      if (show.dataset.id.split(' ').includes(chosen.dataset.id)) {
        showsList.append(show);
      } else {
        show.remove();
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
      });

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
            playlist.classList.add('is-shown');
          } else {
            playlist.classList.remove('is-shown');
          }

        });
      }

    });
  }

  // Slider

  const playlistsSlider = new Swiper('.playlists__slider', {
    navigation: {
      prevEl: '.playlists__slider .swiper-button-prev',
      nextEl: '.playlists__slider .swiper-button-next'
    },
    pagination: {
      el: '.playlists__slider .swiper-pagination',
      type: 'fraction',
    },
    autoHeight: true,
    spaceBetween: 30,
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}',
      prevSlideMessage: 'Перейти к предыдущему слайду',
      nextSlideMessage: 'Перейти к следующему слайду',
    },
  });

  // Distribute playlists by slides

  const PLAYLISTS_PER_SLIDE = 12
  const sliderWrapper = document.querySelector('.playlists__slider .swiper-wrapper');

  function distributePlaylists() {

    const activePlaylists = [...playlists].filter(playlist => playlist.classList.contains('is-shown'));
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

    playlistsSlider.update();
    playlistsSlider.slideTo(0);
  }

  function updatePlaylists() {

    filterPlaylists();
    distributePlaylists();

  }

  genres.forEach(genre => {
    genre.addEventListener('change', updatePlaylists);
  });

  playlistsSlider.on('init', updatePlaylists());

  if (window.innerWidth < 1024) {
    playlistsSlider.on('slideChange', () => {
      document.querySelector('.playlists__genres-title').scrollIntoView(true);
    })
  }

  // Music play/pause

  playlists.forEach(playlist => handleAudio(playlist));

  // SPEAKER //

  // Slider

  const speakerSlider = new Swiper('.speaker__slider', {
    pagination: {
      el: '.speaker__slider .swiper-pagination',
      clickable: true,
    },
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
    },
    a11y: {
      paginationBulletMessage: 'Перейти к слайду {{index}}',
    },
  });

  // ABOUT //

  // Form validation

  const validation = new JustValidate('.about__form');
  validation
    .addField('#message', [
      {
        rule: 'required',
        errorMessage: 'Введите сообщение',
      },
    ])
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите ваш e-mail',
      },
      {
        rule: 'email',
        errorMessage: 'E-mail введен некорректно',
      },
    ])

});
