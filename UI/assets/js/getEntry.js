const baseUrl = '../api/v1';

function getEntry(e) {
  e.preventDefault();
  const id = window.location.href.substring(40);
  // heroku 40
  console.log(id);
  fetch(`${baseUrl}/entries/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        let entry = document.getElementById('entry').innerHTML;
        console.log(data);
        if (res.status === 401 || res.status === 400) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'You must be logged in to view this page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        data.entry.forEach((posts) => {
          entry += `
                  <div>
                      <h1>${posts.title}</h1>
                      <p>${posts.body}</p>
                  </div>
              `;
        });
        document.getElementById('entry').innerHTML = entry;
      })
      .catch(err => console.error(err)));
}

window.onload = getEntry;
