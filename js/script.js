let userSubmit = null;
let userInput = null;

let userFilter = null;

let usersResult = null;
let statsResult = null;

let countStatsAge = 0;
let countAverageAge = 0;

let totalStatsAge = 0;
let totalAverageAge = 0;

let userArray = [];
let userArrayResult = [];


window.addEventListener('load', () => {

  userSubmit = document.querySelector('#userSubmit');
  userInput = document.querySelector('#userInput');
  usersResult = document.querySelector('#usersResult');
  statsResult = document.querySelector('#statsResult');

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  userArray = json.results.map(user => {
    const {
      gender,
      name,
      dob,
      picture
    } = user;
    return {
      gender,
      name: name.first + " " + name.last,
      age: dob.age,
      picture: picture.thumbnail
    }
  });

  activateButton();
}

function activateButton() {
  userInput.addEventListener('input', () => {
    if (userInput.value != '') {
      userSubmit.disabled = false;
    }
  });
  inputClick();
}

function inputClick() {
  userSubmit.addEventListener('click', () => {
    userFilter = userArray.filter((user) =>
      user.name.toLowerCase().indexOf(userInput.value.toLowerCase()) != -1
    ).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  })
  render();
}

function render() {
  const userHTML = `
  <div id="userContainer">
  <h4>${userFilter.length} usuário(s) encontrado(s)</h5>
  `
}