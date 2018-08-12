const baseUrl = '../api/v1';

function deleteEntry(e) {
  e.preventDefault();
  const id = window.location.href.substring(45);
  // heroku 45
  console.log(id);
  fetch(`${baseUrl}/entries/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        const notify = document.getElementById('notify');
        console.log(data);
        if (res.status === 200) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry deleted successfully';
          setTimeout(() => {
            window.location.replace('../home');
          }, 2000);
        }
        if (res.status === 404) {
          notify.style.background = 'hotpink';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry does not exist';
          setTimeout(() => {
            window.location.replace('../home');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
}

document.getElementById('delete').addEventListener('click', deleteEntry);

