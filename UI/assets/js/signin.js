const baseUrl = 'api/v1';

function signin(e) {
  e.preventDefault();
  const form = document.forms.signin;
  const email = form.email.value;
  const password = form.password.value;
  const notify = document.getElementById('notify');

  fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email, password
    }),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
  })
    .then(res => res)
    .then((newUser) => {
      localStorage.token = newUser.headers.get('x-auth-token');
      console.log(newUser.headers.get('x-auth-token'));
      console.log(newUser.status);
      if (newUser.status !== 200) {
        notify.style.display = 'block';
        notify.style.background = 'hotpink';
        notify.innerHTML = 'Username or password incorrect';
        setInterval(() => {
          notify.style.display = 'none';
        }, 2000);
      } else {
        notify.style.display = 'block';
        notify.style.background = 'rgb(106, 197, 106)';
        notify.innerHTML = 'Login successful';
        setTimeout(() => {
          window.location.replace('home');
        }, 2000);
      }
    })
    .catch(err => console.error(err));
}

document.getElementById('signin').addEventListener('submit', signin);

