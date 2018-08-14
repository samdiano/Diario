const baseUrl = 'api/v1';

function getProfile(e) {
  e.preventDefault();
  fetch(`${baseUrl}/profile/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        const email = document.getElementById('email');
        const fname = document.getElementById('fname');
        console.log(data);
        data.user.forEach((profile) => {
          email.value = profile.email;
          fname.value = profile.full_name;
        });
      })
      .catch(err => console.error(err)));

  fetch(`${baseUrl}/entries/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        let count = document.getElementById('count').innerHTML;
        console.log(data);
        if (res.status === 200) {
          count += `
                <span>Number of Entries
                    <br>
                    <i>${data.entries.length}</i>
                </span>
                `;
        }
        document.getElementById('count').innerHTML = count;
      })
      .catch(err => console.error(err)));
}

window.onload = getProfile;

