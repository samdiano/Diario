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
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      let entries = document.getElementById('entries').innerHTML;
      if (data.entries.length !== 0) {
        data.entries.forEach((entry) => {
          entries += `
        <div class="cards text-left">
          <span><h3>${entry.title}</h3>
              <br>
              <i>Date Created:${Date(entry.created_at)}</i>
          </span>
          <span class="pull-right">
            <button class="btn">View&nbsp;
                <i class="far fa-eye"></i>
            </button>
            <button class="btn" id="myBtn2">Edit &nbsp;
                <i class="far fa-edit"></i>
            </button>
            <button class="btn">Delete&nbsp;
                <i class="far fa-trash-alt"></i>
            </button>
          </span>
        </div>
            `;
        });
      } else {
        notify.style.display = 'block';
        notify.style.background = 'hotpink';
        notify.innerHTML = 'You do not have an entry yet';
      }
      document.getElementById('entries').innerHTML = entries;
    })
    .catch(err => console.error(err));
};

window.onload = getEntries;
