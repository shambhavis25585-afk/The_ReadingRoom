const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookContainer = document.getElementById('bookContainer');

async function findBooks() {
    const query = searchInput.value;
    if (!query) {
        alert("Please type a book name!");
        return;
    }

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    
    displayResults(data.items);
}


function displayResults(books) {
    bookContainer.innerHTML = "";

    if (!books) {
        bookContainer.innerHTML = "<p>No books found. Try again!</p>";
        return;
    }

    books.forEach(book => {
        const info = book.volumeInfo;
        const img = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover';
        
       
        const bookCard = `
            <div class="book-card">
                <img src="${img}" alt="Book Cover">
                <h3>${info.title}</h3>
                <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
            </div>
        `;
        bookContainer.innerHTML += bookCard;
    });
}


searchBtn.addEventListener('click', findBooks);
