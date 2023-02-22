console.log('Hello Symbiote.js!');

window.onload = () => {
  let navDataEl = document.querySelector('data-nav-point');
  if (navDataEl) {
    let location = navDataEl.getAttribute('location');
    if (location) {
      let menuItems = [...document.querySelectorAll('header menu a')];
      menuItems.forEach((a) => {
        if (a.textContent.trim().toLowerCase() === location.trim().toLowerCase()) {
          a.setAttribute('current', '')
        } else {
          a.removeAttribute('current');
        }
      });
    }
  }
};