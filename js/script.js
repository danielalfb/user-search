let userSubmit = null;
let userInput = null;

let usersResult = null;
let statsResult = null;

let countStatsAge = 0;
let countAverageAge = 0;

let totalStatsAge = 0;
let totalAverageAge = 0;

let userArray = [];
let userArrayResult = [];


window.addEventListener('load', () => {
  userSubmit = document.querySelector('#userSubmit').addEventListener("submit", usersFilters);
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
      picture: picture.medium
    }
  });
  console.log(userArray);
  render();
}

function render() {
  usersFilters()
}

function usersFilters() {
  userArray
}