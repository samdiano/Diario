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
                <span><b>Number of Entries</b>
                    <br>
                    <i>${data.entries.length}</i>
                </span>
                `;
        }
        document.getElementById('count').innerHTML = count;
      })
      .catch(err => console.error(err)));

  fetch(`${baseUrl}/reminder/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json()
      .then((data) => {
        const check = document.getElementById('check');
        const activate = document.getElementById('activate');
        console.log(data);
        if (res.status === 200) {
          activate.innerHTML = '<small><i>Deactivate Reminder</i></small';
          check.setAttribute('checked', 'true');
        } else {
          activate.innerHTML = '<small><i>Activate Reminder</i></small>';
        }
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
            window.location.replace('profile');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
};
document.getElementById('update').addEventListener('change', updateProfile);


const updateReminder = (e) => {
  e.preventDefault();
  const check = document.getElementById('check');
  let remind;
  if (check.checked) {
    remind = true;
  } else {
    remind = false;
  }
  fetch(`${baseUrl}/reminder`, {
    method: 'PUT',
    body: JSON.stringify({
      remind,
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
          notify.innerHTML = 'something went wrong';
          setInterval(() => {
            notify.style.display = 'none';
          }, 2000);
        } else {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'Reminder status updated successfully';
          setTimeout(() => {
            window.location.replace('profile');
          }, 2000);
        }
      })
      .catch(err => console.error(err)));
};

document.getElementById('check').addEventListener('change', updateReminder);

