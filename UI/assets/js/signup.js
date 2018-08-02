const baseUrls = 'api/v1';

function signup(e) {
  e.preventDefault();
  const form = document.forms.signup;
  const email = form.email.value;
  const full_name = form.full_name.value;
  const password = form.password.value;
  const notify = document.getElementById('notify');


  fetch(`${baseUrls}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      full_name, email, password
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
      if (newUser.status !== 201) {
        notify.style.display = 'block';
        notify.style.background = 'hotpink';
        notify.innerHTML = 'Please fill all fields correctly';
        setInterval(() => {
          notify.style.display = 'none';
        }, 2000);
      } else {
        notify.style.background = 'rgb(106, 197, 106)';
        notify.style.display = 'block';
        notify.innerHTML = 'Account created successful';
        setTimeout(() => {
          window.location.replace('home');
        }, 2000);
      }
    })
    .catch(err => console.error(err));
}

document.getElementById('signup').addEventListener('submit', signup);
