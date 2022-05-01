(() => {

  document.addEventListener('DOMContentLoaded', () => {
    const authors = new Choices('.shows__authors', {
      allowHTML: false,
      searchEnabled: false,
      shouldSort: false,
      position: 'bottom',
      itemSelectText: '',
    });

    const guests = new Accordion('.guests__types', {
      elementClass: 'guests__type',
      triggerClass: 'guests__type-wrapper',
      panelClass: 'guests__type-panel',
      activeClass: 'guests__type--is-active',
      openOnInit: [0],
    });
  });

})();
