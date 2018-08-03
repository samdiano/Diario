const baseUrl = 'api/v1';

function getEntries(e) {
  e.preventDefault();

  fetch(`${baseUrl}/entries/1`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token
    },
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      //   let entries = '<h2>Posts</h2>';
      //   data.forEach((posts) => {
      //     entries += `
      //           <div>
      //               <h3>${posts.title}</h3>
      //               <p>${posts.body}</p>
      //           </div>
      //       `;
      //   });
      document.getElementById('entries').innerHTML = entries;
    })
    .catch(err => console.error(err));
}

window.onload = getEntries;
