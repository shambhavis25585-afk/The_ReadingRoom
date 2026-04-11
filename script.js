async function fetchBooks() {
    const query = searchInput.value;
    if (!query) {
        alert("Please enter a book title!");
        return;
    }

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        console.log("Data received from Google:", data); 

        if (data.items) {
            displayBooks(data.items);
        } else {
            bookResults.innerHTML = '<p>No books found. Try another search!</p>';
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        bookResults.innerHTML = '<p>Something went wrong. Please try again later.</p>';
    }
}

function displayBooks(books) {
    bookResults.innerHTML = ''; 
    
    books.forEach(book => {
        const info = book.volumeInfo;
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        
        const image = info.imageLinks ? info.imageLinks.thumbnail : 'https://via.placeholder.com/150';

        bookCard.innerHTML = `
            <img src="${image}" alt="${info.title}">
            <h3>${info.title}</h3>
            <p>${info.authors ? info.authors.join(', ') : 'Unknown Author'}</p>
        `;
        bookResults.appendChild(bookCard);
    });
}


searchBtn.addEventListener('click', fetchBooks);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchBooks();
});