(() => {

  document.addEventListener('DOMContentLoaded', () => {

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
