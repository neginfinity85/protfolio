/* Button for printing Resume
  ================================================  */

const printButton = document.getElementById('print-button');

printButton.addEventListener('click', function () {
  window.print();
});
