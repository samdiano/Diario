const baseUrl = 'api/v1';

const getEntries = (e) => {
  e.preventDefault();

  const notify = document.getElementById('notify');


  fetch(`${baseUrl}/entries`, {
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
        console.log(res.status);
        let entries = document.getElementById('entries').innerHTML;
        if (res.status === 401 || res.status === 400) {
          notify.style.background = 'rgb(106, 197, 106)';
          notify.style.display = 'block';
          notify.innerHTML = 'You must be logged in to view this page';
          setTimeout(() => {
            window.location.replace('login');
          }, 2000);
        }
        if (res.status === 200) {
          data.entries.forEach((entry) => {
            entries += `
        <div class="cards text-left"  style="padding:0 1em 0 1em;">
          <span>
            <h3>${entry.title}</h3>
          </span>
          <span class="pull-right">
            <form action="entries/${entry.id}" style="display: inline">
              <button class="btn">View&nbsp;
                  <i class="far fa-eye"></i>
              </button>
            </form>
            <form action="update-entry/${entry.id}" style="display: inline">
              <button class="btn" id="myBtn2">Edit &nbsp;
                  <i class="far fa-edit"></i>
              </button>
            </form>
            <form action="delete-entry/${entry.id}" style="display: inline">
              <button class="btn">Delete&nbsp;
                  <i class="far fa-trash-alt"></i>
              </button>
            </form>
          </span>
          <i>Date Created:${Date(entry.created_at)}</i>

        </div>
            `;
          });
        }
        if (res.status === 404) {
          notify.style.display = 'block';
          notify.style.background = 'hotpink';
          notify.innerHTML = 'You do not have an entry yet';
        }
        document.getElementById('entries').innerHTML = entries;
      })
      .catch(err => console.error(err)));
};

window.onload = getEntries;
