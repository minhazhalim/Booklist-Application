const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const addBook = document.getElementById('add-book');
const bookList = document.getElementById('book-list');
function addBookList(title,author){
     const li = document.createElement('li');
     const span = document.createElement('span');
     span.className = 'details';
     span.textContent = `${title} by ${author}`;
     const button = document.createElement('button');
     button.textContent = 'Delete';
     button.addEventListener('click',() => {
          li.remove();
     });
     li.appendChild(span);
     li.appendChild(button);
     bookList.appendChild(li);
}
addBook.addEventListener('click',() => {
     const title = bookTitleInput.value.trim();
     const author = bookAuthorInput.value.trim();
     if(title === "" || author === "") alert('Please Enter Both Title and Author');
     addBookList(title, author);
     bookTitleInput.value = "";
     bookAuthorInput.value = "";
});