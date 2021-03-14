class Book {
     constructor(title,author,isbn){
          this.title = title;
          this.author = author;
          this.isbn = isbn;
     }
}
class UI {
     static displayBooks(){
          const books = Store.getBooks();
          books.forEach((book) => {
               UI.addBookToList(book);
          });
     }
     static addBookToList(book){
          const list = document.querySelector('#book-list');
          const row = document.createElement('tr');
          row.innerHTML = `
                         <td class="text-capitalize">${book.title}</td>
                         <td class="text-capitalize">${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
                         `;
          list.appendChild(row);
     }
     static deleteBook(element){
          if(element.classList.contains('delete')){
               element.parentElement.parentElement.remove();
          }
     }
     static showAlert(message,className){
          const div = document.createElement('div');
          div.className = `alert alert-${className}`;
          div.appendChild(document.createTextNode(message));
          const container = document.querySelector('.container');
          const form = document.querySelector('#book-form');
          container.insertBefore(div,form);
          setTimeout(() => {
               document.querySelector('.alert').remove();
          },2000);
     }
     static clearFields(){
          document.querySelector('#title').value = '';
          document.querySelector('#author').value = '';
          document.querySelector('#isbn').value = '';
     }
}
class Store {
     static getBooks(){
          let books;
          if(localStorage.getItem('books') === null){
               books = [];
          }else{
               books = JSON.parse(localStorage.getItem('books'));
          }
          return books;
     }
     static addBook(book){
          const books = Store.getBooks();
          books.push(book);
          localStorage.setItem('books',JSON.stringify(books));
     }
     static removeBook(isbn){
          const books = Store.getBooks();
          books.forEach((book,index) => {
               if(book.isbn === isbn){
                    books.splice(index,1);
               }
          });
          localStorage.setItem('books',JSON.stringify(books));
     }
}
document.addEventListener('DOMContentLoaded',UI.displayBooks);
document.querySelector('#book-form').addEventListener('submit',(event) => {
     event.preventDefault();
     const title = document.querySelector('#title').value;
     const author = document.querySelector('#author').value;
     const isbn = document.querySelector('#isbn').value;
     if(title === '' || author === '' || isbn === ''){
          UI.showAlert('please fill in all fields','danger');
     }else{
          const book = new Book(title,author,isbn);
          UI.addBookToList(book);
          Store.addBook(book);
          UI.showAlert('book added','success');
          UI.clearFields();
     }
});
document.querySelector('#book-list').addEventListener('click',(event) => {
     UI.deleteBook(event.target);
     Store.removeBook(event.target.parentElement.previousElementSibling.textContent);
     UI.showAlert('book removed','success');
});