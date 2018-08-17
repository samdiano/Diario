const baseUrl = '../api/v1';

function getEntry(e) {
  e.preventDefault();
  const id = window.location.href.substring(45);
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
        const body = tinyMCE.get('body').getBody();
        const title = document.getElementById('title');
        console.log(data);
        data.entry.forEach((posts) => {
          title.value = posts.title;
          body.innerHTML = posts.body;
        });
      })
      .catch(err => console.error(err)));
}

window.onload = getEntry;

const baseUrls = '../api/v1';

const updateEntry = (e) => {
  e.preventDefault();
  const id = window.location.href.substring(45);
  // heroku 40
  const form = document.forms.update;
  const title = form.title.value;
  const body = tinyMCE.get('body').getContent();
  // .replace(/<[^>]*>/g, '')
  // const notify = document.getElementById('notify');


  fetch(`${baseUrls}/entries/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        console.log(data);
        console.log(body);
        if (res.status === 401) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'You must be logged in to view this page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        if (res.status !== 200) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'Please fill all fields correctly';
          setInterval(() => {
            notify.style.display = 'none';
          }, 2000);
        }
        if (res.status === 403) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'You cannot update this entry after 24 hours';
          setInterval(() => {
            notify.style.display = 'none';
          }, 2000);
        } else {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Entry updated successfully';
          setTimeout(() => {
            window.location.replace('../home');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
};

document.getElementById('update').addEventListener('submit', updateEntry);
