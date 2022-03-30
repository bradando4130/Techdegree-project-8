// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let searchBar = document.querySelector(".searchBar");
let employeeName = document.querySelectorAll(".name");
let employeeCards = document.querySelectorAll(".card");
let modalData;
let modalToggleleft = document.querySelector('.modalLeft');
let modalToggleRight = document.querySelector('.modalRight');
let modalIndex;

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
    // IMPORTANT update employeeName and employeeCard cariables with new data from fucntion
    employeeName = document.querySelectorAll(".name");
    employeeCards = document.querySelectorAll(".card");
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
    modalData = document.querySelector('.modal-content');
    modalToggleleft = document.querySelector('.modalLeft');
    modalToggleRight = document.querySelector('.modalRight');
}

gridContainer.addEventListener('click', e => {
    // make sure click is not on grid container itself
    if (e.target !== gridContainer) {
        // select the card element based on its procimity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        modalIndex = parseInt(index);   
        displayModal(index);
    }
});

// remove stsatic markup from index.html
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden')
});

function filterEmployee() {
    let searchQuery = document.querySelector(".searchBar").value;
    // loop through cards to crosscheck if name includes searchQuery and update class
    for (let i=0; i<employeeCards.length; i++) {
        if (employeeName[i].innerText.toLowerCase().includes(searchQuery.toLowerCase())) {
            employeeCards[i].classList = "card";
        } else {
            employeeCards[i].classList.add('hidden');
        }
    }
    
}

searchBar.addEventListener('keyup', filterEmployee());

// toggle modal through employees based on left or right modal button clicks
// this is done by repopulating the html of modal based on 'data-index' value and increasing or decreasing it accordingly
// SUPER PROUD OF THIS!
modalToggleRight.addEventListener('click', () => {
    if (modalIndex === 11) {
        modalIndex = 0;
        displayModal(modalIndex)
    } else {
        displayModal(modalIndex += 1)
    }
    
});


modalToggleleft.addEventListener('click', () => {
    if (modalIndex === 0) {
        modalIndex = 11;
        displayModal(modalIndex)
    } else {
        displayModal(modalIndex -= 1)
    }
});