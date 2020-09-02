// Book Class: represents a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// UI Class: Display the books
class UI{

    static displayBooks(){
        let StoredBooks= Store.getbooks();
        let books=StoredBooks;
        books.forEach((book)=> UI.addBookToList(book));
    }

    static addBookToList(book){
        let row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#" class="btn btn-danger btn-sm 
                         delete">X</td>`;
        let list=document.querySelector("#book-list");
        list.appendChild(row);
    }

    static removeBookfromList(e){
        if(e.target.classList.contains('delete')){
            e.target.parentElement.parentElement.remove();
            Store.removebook(e.target.parentElement.previousElementSibling.textContent);
        }
    }

    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value=''; 
    }

    static showAlert(message,className){
        let div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.innerHTML=`<h3>${message}<h3>`;
        const container=document.querySelector('.container');
        const form= document.querySelector('#book-form');
        container.insertBefore(div,form);
        
        //Vanish in 2 seconds
        setTimeout(()=> document.querySelector('.alert').remove(),2000);
    }
}

// Store Class: Handles Storage..
class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        } else{
            books= JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addbook(book){
        let books= Store.getbooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removebook(isbn){
        let books= Store.getbooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));        
    }
}


// Event: Display the books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();

    let title=document.querySelector('#title').value;
    let author=document.querySelector('#author').value;
    let isbn=document.querySelector('#isbn').value;
    
    //validate
    if(title ==='' || author ==='' || isbn ===''){
        UI.showAlert('Please fill in all the fields','danger');
    } else{

    let newBook= new Book(title,author,isbn); 
    UI.addBookToList(newBook);
    
    Store.addbook(newBook);
    UI.showAlert('Successfully added the book', 'success');
    //clear fields
    UI.clearFields();
    }
});

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>
    {
    UI.removeBookfromList(e);
    UI.showAlert('Successfully removed the book', 'success');
    });