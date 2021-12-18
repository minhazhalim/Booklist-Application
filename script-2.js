function Book(title,author,isbn){
     this.title = title;
     this.author = author;
     this.isbn = isbn;
}
function UI(){}
UI.prototype.addBookToList = function(book){
     const bookList = document.getElementById('book-list');
     const tableRow = document.createElement('tr');
     tableRow.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X<a></td>
     `;
     bookList.appendChild(tableRow);
}
UI.prototype.showAlert = function(message,className){
     const div = document.createElement('div');
     div.className = `alert ${className}`;
     div.appendChild(document.createTextNode(message));
     const container = document.querySelector('.container');
     const bookForm = document.querySelector('#book-form');
     container.insertBefore(div,bookForm);
     setTimeout(function(){
          document.querySelector('.alert').remove();
     },3000);
}
UI.prototype.deleteBook = function(target){
     if(target.className = 'delete'){
          target.parentElement.parentElement.remove();
     }
}
UI.prototype.clearFields = function(){
     document.getElementById('title').value = '';
     document.getElementById('author').value = '';
     document.getElementById('isbn').value = '';
}
document.getElementById('book-form').addEventListener('submit',function(event){
     const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const isbn = document.getElementById('isbn').value;
     const book = new Book(title,author,isbn);
     const ui = new UI();
     if(title === '' || author === '' || isbn === ''){
          ui.showAlert('Please Fill in all Fields','error');
     }else{
          ui.addBookToList(book);
          ui.showAlert('Book Added!','success');
          ui.clearFields();
     }
     event.preventDefault();
});
document.getElementById('book-list').addEventListener('click',function(event){
     const ui = new UI();
     ui.deleteBook(event.target);
     ui.showAlert('Book Removed!','success');
     event.preventDefault();
});