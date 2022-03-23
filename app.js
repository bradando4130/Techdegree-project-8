// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch data from API
fetch(urlAPI)                           // pass url information to fetch
    .then(res => res.json())            // format the response as JSON
    .then(res => res.results)           // return results value of response 
    .then(displayEmployees)             // run displayEmployees function with results 
    .catch(err => console.log(err))     // catch any errors and log them to the console

function displayEmployees(employeeData) {
    employees = employeeData;

    // initialise employee HTML as we create it
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;


        // template literal to insert HTML and pull from above data points
        employeeHTML += `
        <div class="card" data-index=${index}>
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>    
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {

    // use object destructuring to allocate values from input array
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];

    let date = new Date(dob.date);
    // template literal to insert HTML and pull from above data points
    const modalHTML = `
        <img class="avatar" src = "${picture.large}">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    // make sure click is not on grid container itself
    if (e.target !== gridContainer) {
        // select the card element based on its procimity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

// remove stsatic markup from index.html
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden')
});


