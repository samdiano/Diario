const baseUrl = 'api/v1';
let email = document.getElementById('email');
let full_name = document.getElementById('full_name');
const notify = document.getElementById('notify');

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
        console.log(data);
        data.user.forEach((profile) => {
          email.value = profile.email;
          full_name.value = profile.full_name;
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

const updateProfile = (e) => {
  e.preventDefault();
  email = email.value;
  full_name = full_name.value;

  fetch(`${baseUrl}/profile`, {
    method: 'PUT',
    body: JSON.stringify({
      email,
      full_name,
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
        if (res.status !== 200) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'Please fill all fields correctly';
          setInterval(() => {
            notify.style.display = 'none';
          }, 2000);
        } else {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Profile updated successfully';
          setTimeout(() => {
            window.location.replace('home');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
};

document.getElementById('update').addEventListener('submit', updateProfile);

