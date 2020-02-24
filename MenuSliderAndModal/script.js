const toggleBtn = document.getElementById('toggleBtn');
const signupBtn = document.getElementById('signupBtn');
const close = document.getElementById('close');
const nav = document.getElementById('nav');
const container = document.getElementById('container');
const backdrop = document.getElementById('backdrop');

toggleBtn.addEventListener('click', () => {
  nav.classList.toggle('show_nav');
  container.classList.toggle('container')
  container.classList.toggle('shift_container');
});
signupBtn.addEventListener('click', () => {
  backdrop.classList.toggle('openModal');
});
close.addEventListener('click', () => {
  backdrop.classList.toggle('openModal');
});
backdrop.addEventListener('click', (e) => {
  e.target == backdrop ?
  backdrop.classList.toggle('openModal') : null;
});