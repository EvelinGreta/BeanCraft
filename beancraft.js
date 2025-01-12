//Dropdown Menu
const toggleBtn = document.querySelector('.toggle_btn') //Select button that activates the dropdown menu
const toggleBtnIcon = document.querySelector('.toggle_btn i') //Select the icon inside of the button, which changes based on the state of the menu
const dropDownMenu = document.querySelector('.dropdown_menu') //Select the dropdown menu

toggleBtn.onclick = function () { //When button is clicked (onclick), the open class is triggered on the dopdown menu
    dropDownMenu.classList.toggle('open') //Adds and removes the open class (showing or hiding the dropdown menu)
    const isOpen = dropDownMenu.classList.contains('open') //Checks if menu open
    toggleBtnIcon.classList = isOpen //Changes the icon from one to the other
    ? 'fa-solid fa-xmark' //X mark
    : 'fa-solid fa-filter' //Filter icon
}


//Coffee Popup Windows
const openModalButtons = document.querySelectorAll('[data-modal-target]') //Buttons to open the popup
const closeModalButtons = document.querySelectorAll('[data-close-button]') //Buttons to close the popup
const overlay = document.getElementById('overlay') // Creates an overlay background for popup window

openModalButtons.forEach(button => { //Open modal when a button is clicked
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget) //Get the target modal
        openModal(modal)
    })
})

closeModalButtons.forEach(button => { //Close modal when button is clicked
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal){ //Function to open modal
    if(modal == null) return
    modal.classList.add('active') //Show popup modal
    overlay.classList.add('active') //Show overlay
}

function closeModal(modal){ //Function to close modal
    if(modal == null) return
    modal.classList.remove('active') //Removes popup modal
    overlay.classList.remove('active') //Removes overlay
}

//Dark/Light Theme
var icon = document.getElementById("icon"); //Select icon

//Ensures that theme remains over different pages of the website
if (localStorage.getItem("theme") === "dark") { //Checks if the theme is already set in local storage
    document.body.classList.add("dark_theme"); //Toggles dark theme
    icon.src = "images/sun.png"; //Changes icon
} 
else {
    document.body.classList.remove("dark_theme"); //Removes dark theme
    icon.src = "images/moon.png"; //Changes icon
}

//Allows users to change between dark and light mode
icon.onclick = function(){ //When icon is clicked, it enables the following changes
    document.body.classList.toggle("dark_theme");
    if(document.body.classList.contains("dark_theme")){
        icon.src = "images/sun.png";
        localStorage.setItem("theme", "dark"); //Ensures that theme persists
    }
    else{
        icon.src = "images/moon.png";
        localStorage.setItem("theme", "light"); //Ensures that theme persists
    }
}

//Create Bean of the Day - for HOME Page
fetch('beans.json')
    .then(response => response.json())
    .then(data => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
        const beanToday = data.find(bean => bean.dates.includes(today)); // Check if today's date is in the dates array

        if (beanToday) {
            document.getElementById('bean_name').innerText = beanToday.name;
            document.getElementById('bean_cost').innerText = `Cost: £${beanToday.cost_per_100g}`;
            document.getElementById('bean_aroma').innerText = `Aroma: ${beanToday.aroma}`;
            document.getElementById('bean_color').innerText = `Color: ${beanToday.color}`;
            document.getElementById('bean_description').innerText = `Description: ${beanToday.description}`;
            document.getElementById('bean_image').src = beanToday.image;
        } else {
            // Handle the case where no bean of the day is found for today
            document.getElementById('bean_name').innerText = "No Bean of the Day";
            document.getElementById('bean_info').innerHTML = "<p>Sorry, there is no bean selected for today.</p>";
        }
    })
    .catch(error => console.error('Error loading bean data:', error));

let beans = []; // Global variable that holds bean data


// Fetch beans data - for the calendar
fetch('beans.json')
    .then(response => response.json())
    .then(data => {
        beans = data; //Stores the fetched data in the beans variable
        createCalendar(); //Creates the calendar after data is loaded
    })
    .catch(error => console.error('Error loading bean data:', error));


//Function to create the calendar
function createCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const numDays = lastDay.getDate();

    calendarDiv.innerHTML = '';  // Clear the calendar

    for (let i = 1; i <= numDays; i++) { // Add days to the calendar
        const date = new Date(currentYear, currentMonth, i);
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;

        dayDiv.addEventListener('click', () => showBeanOfTheDay(date)); // Adds click event to each day - to display the associated coffee details when clicked
        calendarDiv.appendChild(dayDiv);
    }
}


//Function to show the bean of the day - on the calendar
function showBeanOfTheDay(date) {
    const dateStr = date.toISOString().split('T')[0]; //Format needed: YYYY-MM-DD (double check for troubleshooting)
    const bean = beans.find(b => b.dates.includes(dateStr)); //Check if the date is in the 'dates' array

    if (bean) {
        //Displays selected bean information
        document.getElementById('cal_bean_name').textContent = bean.name;
        document.getElementById('cal_bean_cost').textContent = `£${bean.cost_per_100g}`;
        document.getElementById('cal_bean_aroma').textContent = bean.aroma;
        document.getElementById('cal_bean_color').textContent = bean.color;
        document.getElementById('cal_bean_description').textContent = bean.description;
        document.getElementById('cal_bean_image').src = bean.image;

        //Shows bean info section
        const beanInfo = document.getElementById('cal_bean_info');
        beanInfo.classList.add('show');;
    }
}

//Allows dates to remain selected
const calendar = document.getElementById('calendar');
calendar.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') { //Checks if day was clicked
        const previouslySelected = calendar.querySelector('.selected'); //Removes .selected from previously selected day
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        e.target.classList.add('selected'); //Adds .selected to the clicked day
    }
});
