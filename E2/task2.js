const itemAdd = document.getElementById("addItemButton");
itemAdd.addEventListener('click', addListItem);

const formButton = document.getElementById("submitButton");
formButton.addEventListener('click', validateForm);

function addListItem() {
    const itemInput = document.getElementById("itemInput");
    let inputValue = itemInput.value;

    if (inputValue !== '') {
        const newItem = document.createElement('li');
        newItem.textContent = inputValue;

        const itemList = document.getElementById('itemList');
        itemList.appendChild(newItem);

        itemInput.value = '';
    }
}

function validateForm() {
    // grab elements from the form
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const repeatPassword = document.getElementById("repeatPassword");

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const repeatPasswordError = document.getElementById('repeatPasswordError');
    const successMessage = document.getElementById('successMessage');

    // reset any errors
    name.style.border = '';
    email.style.border = '';
    password.style.border = '';
    repeatPassword.style.border = '';

    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    repeatPasswordError.textContent = '';
    successMessage.textContent = '';

    let isValid = true;

    // update style if name is empty
    if (name.value === '') {
        nameError.textContent = 'Name cannot be empty';
        name.style.border = '1px solid red';
        isValid = false;
    }

    // update style if email is 1. empty or 2. invalid format
    if (email.value === '') {
        emailError.textContent = 'Email cannot be empty';
        email.style.border = '1px solid red';
        isValid = false;
    } else if (!validateEmail(email.value)) {
        emailError.textContent = 'Invalid email format';
        email.style.border = '1px solid red';
        isValid = false;
    }

    // update style if password is 1. empty or 2. doesn't follow password requirements
    if (password.value === '') {
        passwordError.textContent = 'Password cannot be empty';
        password.style.border = '1px solid red';
        isValid = false;
    } else if (password.value.length < 8 && !validatePassword(password.value)) {
        passwordError.textContent = 'Password must have at least 8 characters, at least one uppercase, one lowercase, ' +
            'and one digit';
        password.style.border = '1px solid red';
        isValid = false;
    } else if (!validatePassword(password.value)) {
        passwordError.textContent = 'Password must have at least one uppercase, one lowercase, and one digit';
        password.style.border = '1px solid red';
        isValid = false;
    }

    // update style if repeat password is 1. empty or 2. doesn't match password
    if (repeatPassword.value === '') {
        repeatPasswordError.textContent = 'Repeat Password cannot be empty';
        repeatPassword.style.border = '1px solid red';
        isValid = false;
    } else if (repeatPassword.value !== password.value) {
        repeatPasswordError.textContent = 'Passwords do not match'
        repeatPassword.style.border = '1px solid red';
        password.style.border = '1px solid red';
        isValid = false;
    }

    if (isValid) {
        successMessage.textContent = 'Form successful!';
    }
}

// taken from stack overflow
// (https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript)
function validateEmail(email) {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
}

function todoApp() {
    const newTodo = document.getElementById("newTodo");
    const addButton = document.getElementById("addTodoButton");
    const todoList = document.getElementById("todoList");

    addButton.addEventListener('click', addTask);

    function addTask() {
        const newTodoInput = newTodo.value;

        if (newTodoInput !== '') {
            const todoItem = createTodoItem(newTodoInput);
            todoList.appendChild(todoItem);
            newTodo.value = ''; // clear input field
        }
    }

    // function to create a new todo item
    function createTodoItem(newTodoInput) {
        const listItem = document.createElement('li');

        // create task text
        const todoText = document.createElement('span');
        todoText.textContent = newTodoInput;

        // create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                listItem.style.textDecoration = 'line-through';
            } else {
                listItem.style.textDecoration = '';
            }
        });

        // create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', function() {
           todoList.removeChild(listItem);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(todoText);
        listItem.appendChild(deleteButton);

        return listItem;
    }
}

document.addEventListener("DOMContentLoaded", todoApp);