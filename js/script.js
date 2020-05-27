let userArray = [];
let userFilter = [];
let preLoader = null;


let globalUserSubmit = document.querySelector('#userSubmit');
let globalUserInput = document.querySelector('#userInput');

window.addEventListener('load', () => {
  fetchUsers();
});

async function fetchUsers() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  await new Promise((resolve) => resolve(hideLoader()));
  const json = await res.json();
  userArray = json.results.map((user) => {
    const {
      gender,
      name,
      dob,
      picture
    } = user;
    return {
      gender,
      name: name.first + ' ' + name.last,
      age: dob.age,
      picture: picture.thumbnail,
    };
  });

  activateButton();
}

function activateButton() {
  globalUserInput.addEventListener('input', () => {
    if (globalUserInput.value != '') {
      globalUserSubmit.disabled = false;
    }
  });
  inputClick();
}

function inputClick() {
  globalUserSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    userFilter = userArray
      .filter(
        (user) =>
        user.name
        .toLowerCase()
        .indexOf(globalUserInput.value.toLowerCase()) != -1
      )
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    userRender();
  });
}

function userRender() {

  const tabUsersResult = document.querySelector('#tabUsersResult');

  let tabUsers = ` <div>
  <h5>${userFilter.length} usuário(s) encontrado(s)</h5>
  `;

  userFilter.forEach((user) => {
    const {
      name,
      age,
      picture
    } = user;

    const tabUser = `
    <div class="user-data">
        <img src="${picture}" alt="${name}">
        <p>${name}, ${age} anos </p>
    </div>
    `;
    tabUsers += tabUser;
  });
  tabUsersResult.innerHTML = tabUsers;
  statsRender();
}

function statsRender() {
  const tabStatsResult = document.querySelector('#tabStatsResult');

  let genderMasc = 0;
  let genderFem = 0;
  let ageSum = 0;
  let ageAverage = 0;

  userFilter.forEach((user) => {
    const {
      gender,
      age
    } = user;
    gender === 'female' ? (genderFem += 1) : (genderMasc += 1);
    ageSum += age;
    ageAverage = ageSum / userFilter.length;

  });

  let tabStats = `
  <div>
  <h5>Estatísticas</h5>
    <p>Gênero masculino: ${genderMasc}</p>
    <p>Gênero feminino: ${genderFem}</p>
    <p>Soma das idades: ${ageSum}</p>
    <p>Média das idades: ${ageAverage.toFixed(2)}</p>
  `;
  tabStatsResult.innerHTML = tabStats;
}

function hideLoader() {
  preLoader = document.querySelector('#loading');
  preLoader.classList.add('hide');
}