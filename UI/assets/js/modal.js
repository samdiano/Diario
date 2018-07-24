const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const modal2 = document.getElementById('myModal2');
const btn2 = document.getElementById('myBtn2');
const span = document.getElementsByClassName('close')[0];
const span2 = document.getElementsByClassName('close')[1];

btn.onclick = () => {
  modal.style.display = 'block';
};

btn2.onclick = () => {
  modal2.style.display = 'block';
};

span.onclick = () => {
  modal.style.display = 'none';
};
span2.onclick = () => {
  modal2.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
  if (event.target === modal2) {
    modal2.style.display = 'none';
  }
};
