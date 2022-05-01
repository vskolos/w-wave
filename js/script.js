(() => {

  document.addEventListener('DOMContentLoaded', () => {
    const authors = new Choices('.shows__authors', {
      allowHTML: false,
      searchEnabled: false,
      shouldSort: false,
      position: 'bottom',
      itemSelectText: '',
    });
  });

})();
