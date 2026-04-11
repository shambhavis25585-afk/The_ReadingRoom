// 1. Grab the elements from your HTML
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookResults = document.getElementById('bookResults');


async function fetchBooks() {
    const query = searchInput.value;
    
    if (!query) {
        alert("Please type a book name!");
        return;
    }

  
    bookResults.innerHTML = "<p>Searching the library...</p>";

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.items) {
            displayBooks(data.items);
        } else {
            bookResults.innerHTML = "<p>No books found. Try another search!</p>";
        }
    } catch (error) {
        bookResults.innerHTML = "<p>Error connecting to the library. Try again!</p>";
    }
}


function displayBooks(books) {
    bookResults.innerHTML = ""; 

    books.forEach(book => {
        const info = book.volumeInfo;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover';
        
        const card = document.createElement('div');
        card.classList.add('book-card');
        
        card.innerHTML = `
            <img src="${thumbnail}" alt="Cover">
            <h3>${info.title}</h3>
            <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
        `;
        bookResults.appendChild(card);
    });
}


searchBtn.addEventListener('click', fetchBooks);


searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchBooks();
    }
});