const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const bookResults = document.getElementById("bookResults");

async function fetchBooks() {
    const query = searchInput.value.trim();
    if (!query) return alert("Please type a book name!");

    bookResults.innerHTML = "<p>Searching the library...</p>";

    try {
        const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        if (!data.items || data.items.length === 0) {
            bookResults.innerHTML = "<p>No books found. Try another search!</p>";
            return;
        }

        displayBooks(data.items);
    } catch (err) {
        bookResults.innerHTML = "<p>Error connecting to the library. Try again!</p>";
        console.error(err);
    }
}

function displayBooks(books) {
    bookResults.innerHTML = "";

    books.forEach((book) => {
        const info = book.volumeInfo || {};
        const title = info.title || "Untitled Book";
        const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
        const thumbnail =
            (info.imageLinks && info.imageLinks.thumbnail) ||
            "https://via.placeholder.com/128x192?text=No+Cover";

        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <h3>${title}</h3>
            <p>${authors}</p>
        `;
        bookResults.appendChild(card);
    });
}

searchBtn.addEventListener("click", fetchBooks);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") fetchBooks();
});