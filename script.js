const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const bookResults = document.getElementById('bookResults');
const loading = document.getElementById('loading');

async function fetchBooks() {
    const query = searchInput.value;
    if (!query) return alert("Please enter a book name!");

    
    loading.classList.remove('hidden');
    bookResults.innerHTML = '';

    try {
        
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data.items) {
            bookResults.innerHTML = "<p>No books found. Try another search!</p>";
            return;
        }

        displayBooks(data.items);
    } catch (error) {
        console.error("Error fetching data:", error);
        bookResults.innerHTML = "<p>Sorry, the library is closed right now. Try again later!</p>";
    } finally {
        loading.classList.add('hidden');
    }
}

function displayBooks(books) {
    bookResults.innerHTML = books.map(book => {
        const info = book.volumeInfo;
        const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=No+Cover';
        const authors = info.authors ? info.authors.join(', ') : 'Unknown Author';
        const year = info.publishedDate ? info.publishedDate.split('-')[0] : 'N/A';

        return `
            <div class="book-card">
                <img src="${thumbnail}" alt="Book Cover">
                <h3>${info.title}</h3>
                <p><strong>Author:</strong> ${authors}</p>
                <p><strong>Year:</strong> ${year}</p>
            </div>
        `;
    }).join('');
}


searchBtn.addEventListener('click', fetchBooks);


searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchBooks();
});

