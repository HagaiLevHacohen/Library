
const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function (){
        let read_str;
        if (this.read) {
            read_str = "already read";
        } else {
            read_str = "not read yet";
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read_str}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let new_book = new Book(title, author, pages, read);
  myLibrary.push(new_book);
}

function displayBooks(){
    const cards = document.querySelector('.cards');
    cards.innerHTML = "";
    for (let book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = book.id;

        // card-content
        const content = document.createElement('div');
        content.classList.add('card-content');

        // card-buttons
        const buttons = document.createElement('div');
        buttons.classList.add('card-buttons');

        // Title
        const title = document.createElement('h2');
        title.classList.add('book-title');
        title.textContent = book.title;

        // Author
        const author = document.createElement('p');
        author.classList.add('book-author');
        author.innerHTML = `<em>Author:</em> ${book.author}`;

        // Pages
        const pages = document.createElement('p');
        pages.classList.add('book-pages');
        pages.innerHTML = `<em>Pages:</em> ${book.pages}`;

        // Read status
        const read = document.createElement('p');
        read.classList.add('book-status');
        let status;
        if (book.read) {
            status = "read";
        } else {
            status = "not read";
        }
        read.innerHTML = `<em>Status:</em> ${status}`;

        // Append all to card-content
        content.appendChild(title);
        content.appendChild(author);
        content.appendChild(pages);
        content.appendChild(read);


        // delete-button
        const delete_button = document.createElement('button');
        delete_button.classList.add('delete-button');
        delete_button.setAttribute("type", "button");
        delete_button.innerHTML = "Delete Card";
        delete_button.addEventListener('click', deleteCard);

        // status-button
        const status_button = document.createElement('button');
        status_button.classList.add('status-button');
        status_button.setAttribute("type", "button");
        status_button.innerHTML = "Change Status";
        status_button.addEventListener('click', changeStatusCard);

        // Append all to buttons
        buttons.appendChild(delete_button);
        buttons.appendChild(status_button);


        // Append buttons and content to card
        card.appendChild(content);
        card.appendChild(buttons);

        // Append card to container
        cards.appendChild(card);
    }
}

function validateTitle() {
    const title = document.querySelector("#title");
    title.setCustomValidity("");
    
    if(title.validity.valueMissing) {
        title.setCustomValidity("The title must be filled!");
    }
}

function validateAuthor() {
    const author = document.querySelector("#author");
    author.setCustomValidity("");
    
    if(author.validity.valueMissing) {
        author.setCustomValidity("The author name must be filled!");
    }
}

function deleteCard(event) {
    const deleteButton = event.target;
    const card = deleteButton.parentElement.parentElement;
    const id = card.dataset.id;
    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].id === id) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayBooks();
}

function changeStatusCard(event) {
    const changeStatusButton = event.target;
    const card = changeStatusButton.parentElement.parentElement;
    const id = card.dataset.id;

    for (let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].id === id) {
            myLibrary[i].read = !myLibrary[i].read;
            break;
        }
    }
    displayBooks();
}

function formSubmit(event) {
    event.preventDefault();
    validateAuthor(); // sets custom message
    validateTitle(); // sets custom message
    
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");

    // Stop if title is still invalid
    if (!titleInput.checkValidity()) {
        titleInput.reportValidity();
        return;
    }
    if (!authorInput.checkValidity()) {
        authorInput.reportValidity();
        return;
    }

    const form = event.target;
    const title = form.elements.title.value.trim();
    const author = form.elements.author.value.trim();
    const pages = form.elements.pages.value;
    const status = form.elements.status.value; // from radio buttons

    const read = status === 'yes'; // convert read status to boolean
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    form.reset(); // clears all fields after submission

    const formContainer = document.querySelector('.form-container');
    formContainer.style.display = 'none';
    const btn = document.querySelector('.right button');
    btn.style.display = 'block';
}

function openForm(event){
    const btn = event.target;
    const formContainer = document.querySelector('.form-container');
    formContainer.style.display = 'block';
    btn.style.display = 'none';
}


const form = document.querySelector('form');
form.addEventListener('submit', formSubmit);

const newButton = document.querySelector('.right button');
newButton.addEventListener('click', openForm);