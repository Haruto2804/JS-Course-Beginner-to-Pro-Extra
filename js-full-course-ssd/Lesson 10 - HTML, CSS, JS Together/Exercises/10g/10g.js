function toggleButton (selector) {
  const currentBtn = document.querySelector(selector);
  if(!currentBtn.classList.contains('is-toggled')) {
    checkPreviousBtn();
    currentBtn.classList.add('is-toggled');
  }else {
    currentBtn.classList.remove('is-toggled');
  }
}
function checkPreviousBtn () {
  const previousBtn = document.querySelector('.is-toggled');
  if(previousBtn) {
    console.log('Da remove')
    previousBtn.classList.remove('is-toggled');
  }
}