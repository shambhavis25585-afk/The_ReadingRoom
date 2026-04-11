const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const bookResults = document.getElementById('bookResults');

async function fetchBooks() {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a book title or author.");
        return;
    }

    bookResults.innerHTML = '<p id="loading">Searching the library...</p>';

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            displayBooks(data.items);
        } else {
            bookResults.innerHTML = '<p style="color: white; grid-column: 1/-1; text-align: center;">No books found. Try a different search!</p>';
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        bookResults.innerHTML = '<p style="color: red; grid-column: 1/-1; text-align: center;">Connection error. Please try again.</p>';
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
        <a href="${info.infoLink}" target="_blank" class="view-btn">View Details</a>
        `;
        bookResults.appendChild(card);
    });
}

searchBtn.addEventListener('click', fetchBooks);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchBooks();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
