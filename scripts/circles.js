/* eslint-disable no-unused-vars */
const handleCircles = (e) => {
  const name = e.currentTarget.name;
  const num = name.charAt(6);
  const value = document.querySelector(`#circle${num}select`).value;

  const el = document.querySelector(`#guide${num}Circle`);
  if (el.classList.value.includes('one')) el.classList.remove('one');
  if (el.classList.value.includes('two')) el.classList.remove('two');
  if (el.classList.value.includes('three')) el.classList.remove('three');
  if (el.classList.value.includes('four')) el.classList.remove('four');
  if (el.classList.value.includes('five')) el.classList.remove('five');
  el.classList.add(value);
};
