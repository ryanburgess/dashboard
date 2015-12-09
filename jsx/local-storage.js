module.exports = (city, state, degree, stock, background) => {
  'use stict';

  const storedCity = localStorage.getItem('city');
  const storedDegree = localStorage.getItem('degrees');
  const storedStock = localStorage.getItem('stock');
  const storedState = localStorage.getItem('state');
  const storedBackground = localStorage.getItem('background');

  // if local storage city is not yet set, use the config settings city and set local storage
  if(storedCity === null) {
    localStorage.setItem('city', city);
  }

  // if local storage state is not yet set, use the config settings state and set local storage
  if(storedState === null) {
    localStorage.setItem('state', state);
  }

  // if local storage degree is not yet set, use the config settings degree and set local storage
  if(storedDegree === null) {
    localStorage.setItem('degrees', degree);
  }

  // if local storage stock is not yet set, use the config settings stock and set local storage
  if(storedStock === null) {
    localStorage.setItem('stock', stock);
  }

  // if local storage background is not yet set, use the config settings background and set local storage
  if(storedBackground === null) {
    localStorage.setItem('background', background);
  }
};