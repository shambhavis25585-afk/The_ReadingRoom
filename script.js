const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookResults = document.getElementById('bookResults');

async function fetchBooks() {
    const query = searchInput.value;

    if (!query) {
        alert("Please enter a book name!");
        return;
    }

    bookResults.innerHTML = "<p>Searching...</p>";

    try {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            displayBooks(data.items);
        } else {
            bookResults.innerHTML = "<p>No books found. Try again!</p>";
        }
    } catch (error) {
        bookResults.innerHTML = "<p>Something went wrong.</p>";
    }
}

function displayBooks(books) {
    bookResults.innerHTML = "";

    books.forEach(book => {
        const info = book.volumeInfo;
        const img = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover';
        
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${img}" alt="cover">
            <h3>${info.title}</h3>
            <p>${info.authors ? info.authors[0] : 'Unknown Author'}</p>
        `;
        bookResults.appendChild(card);
    });
}

searchBtn.addEventListener('click', fetchBooks);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchBooks();
});