document.addEventListener('DOMContentLoaded', () => {
    const bookListContainer = document.getElementById('bookList');
    const languageFiltersContainer = document.getElementById('languageFilters');
    const categoryFiltersContainer = document.getElementById('categoryFilters');
    const noBooksMessage = document.getElementById('noBooksMessage');

    let allBooks = []; // To store all books fetched from the "API"
    let selectedLanguages = new Set();
    let selectedCategories = new Set();

    // Mock API Call - In a real application, you would fetch from a URL
    async function fetchBooksFromAPI() {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(() => {
                const mockApiResponse = {
                    "books": [
                        {
                            "id": "1",
                            "title": "Eloquent JavaScript, 3rd Edition",
                            "author": "Marijn Haverbeke",
                            "language": "JavaScript",
                            "category": "Web Development",
                            "url": "https://eloquentjavascript.net/",
                            "description": "This is a book about JavaScript, programming, and the wonders of the digital.",
                            "imageUrl": "https://eloquentjavascript.net/img/cover.jpg"
                        },
                        {
                            "id": "2",
                            "title": "Automate the Boring Stuff with Python",
                            "author": "Al Sweigart",
                            "language": "Python",
                            "category": "Automation",
                            "url": "https://automatetheboringstuff.com/",
                            "description": "Learn how to use Python to write programs that do in minutes what would take you hours to do manually.",
                            "imageUrl": "https://covers.openlibrary.org/b/id/8313465-M.jpg"
                        },
                        {
                            "id": "3",
                            "title": "Python Crash Course, 2nd Edition",
                            "author": "Eric Matthes",
                            "language": "Python",
                            "category": "Beginner",
                            "url": "https://nostarch.com/pythoncrashcourse2e",
                            "description": "A hands-on, project-based introduction to programming.",
                            "imageUrl": "https://m.media-amazon.com/images/I/51rYw66q+dL._SL500_.jpg"
                        },
                        {
                            "id": "4",
                            "title": "Learning Python, 5th Edition",
                            "author": "Mark Lutz",
                            "language": "Python",
                            "category": "General Programming",
                            "url": "#", // Placeholder for actual URL
                            "description": "Powerful Object-Oriented Programming",
                            "imageUrl": "https://m.media-amazon.com/images/I/51-mS50oNBL._SL500_.jpg"
                        },
                        {
                            "id": "5",
                            "title": "You Don't Know JS Yet (ES6 & Beyond)",
                            "author": "Kyle Simpson",
                            "language": "JavaScript",
                            "category": "Web Development",
                            "url": "https://github.com/getify/You-Dont-Know-JS",
                            "description": "A series of books diving deep into the core mechanisms of the JavaScript language.",
                            "imageUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429188090l/25368383.jpg"
                        },
                        {
                            "id": "6",
                            "title": "The Rust Programming Language",
                            "author": "Steve Klabnik and Carol Nichols",
                            "language": "Rust",
                            "category": "Systems Programming",
                            "url": "https://doc.rust-lang.org/book/",
                            "description": "The official book on Rust, an open-source systems programming language.",
                            "imageUrl": "https://doc.rust-lang.org/book/img/ferris/cover.svg"
                        },
                        {
                            "id": "7",
                            "title": "Go in Action",
                            "author": "William Kennedy, Brian Ketelsen, Erik St. Martin",
                            "language": "Go",
                            "category": "Backend Development",
                            "url": "#", // Placeholder for actual URL
                            "description": "A comprehensive guide to the Go language.",
                            "imageUrl": "https://m.media-amazon.com/images/I/51-Q6m78qCL._SL500_.jpg"
                        },
                        {
                            "id": "8",
                            "title": "C# Yellow Book",
                            "author": "Rob Miles",
                            "language": "C#",
                            "category": "Beginner",
                            "url": "https://www.robmiles.com/csharp-ebook/",
                            "description": "Introduction to Programming with C#",
                            "imageUrl": "https://www.robmiles.com/wp-content/uploads/2019/08/YellowBookCoverSmall.jpg"
                        },
                        {
                            "id": "9",
                            "title": "The C Programming Language",
                            "author": "Brian W. Kernighan, Dennis M. Ritchie",
                            "language": "C",
                            "category": "Systems Programming",
                            "url": "#",
                            "description": "A classic introduction to the C programming language.",
                            "imageUrl": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1392680654i/515601.jpg"
                        },
                        {
                            "id": "10",
                            "title": "Structure and Interpretation of Computer Programs (SICP)",
                            "author": "Harold Abelson, Gerald Jay Sussman",
                            "language": "Scheme",
                            "category": "Computer Science",
                            "url": "https://mitpress.mit.edu/sites/default/files/sicp/index.html",
                            "description": "A classic textbook on fundamental concepts of computer science and programming.",
                            "imageUrl": "https://mitpress.mit.edu/sites/default/files/images/books/large/9780262510875.jpg"
                        }
                    ]
                };
                resolve(mockApiResponse.books);
            }, 500); // Simulate 0.5 second delay
        });
    }

    // Function to render book cards
    function renderBooks(booksToDisplay) {
        bookListContainer.innerHTML = ''; // Clear previous books
        noBooksMessage.style.display = 'none'; // Hide no books message initially

        if (booksToDisplay.length === 0) {
            noBooksMessage.style.display = 'block';
            return;
        }

        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <div class="book-card-content">
                    <h3>${book.title}</h3>
                    <p class="author">Author: ${book.author}</p>
                    <p class="language">Language: ${book.language}</p>
                    <p class="category">Category: ${book.category}</p>
                    <p class="description">${book.description}</p>
                    <a href="${book.url}" target="_blank" rel="noopener noreferrer" class="book-link">Read Online</a>
                </div>
            `;
            // Optional: If you have image URLs, you can add them.
            // if (book.imageUrl) {
            //     const img = document.createElement('img');
            //     img.src = book.imageUrl;
            //     img.alt = book.title;
            //     img.style.width = '100%';
            //     img.style.height = '180px';
            //     img.style.objectFit = 'cover';
            //     img.style.marginBottom = '10px';
            //     img.style.borderRadius = '8px 8px 0 0';
            //     bookCard.prepend(img);
            // }

            bookListContainer.appendChild(bookCard);
        });
    }

    // Function to populate filters
    function populateFilters(books) {
        const languages = new Set();
        const categories = new Set();

        books.forEach(book => {
            languages.add(book.language);
            categories.add(book.category);
        });

        // Populate Language Filters
        languageFiltersContainer.innerHTML = '';
        Array.from(languages).sort().forEach(lang => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" data-filter-type="language" value="${lang}"> ${lang}`;
            languageFiltersContainer.appendChild(label);
        });

        // Populate Category Filters
        categoryFiltersContainer.innerHTML = '';
        Array.from(categories).sort().forEach(cat => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" data-filter-type="category" value="${cat}"> ${cat}`;
            categoryFiltersContainer.appendChild(label);
        });
    }

    // Function to apply filters and re-render books
    function applyFilters() {
        let filteredBooks = allBooks;

        if (selectedLanguages.size > 0) {
            filteredBooks = filteredBooks.filter(book => selectedLanguages.has(book.language));
        }

        if (selectedCategories.size > 0) {
            filteredBooks = filteredBooks.filter(book => selectedCategories.has(book.category));
        }

        renderBooks(filteredBooks);
    }

    // Event listener for filter changes
    function setupFilterListeners() {
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const filterType = event.target.dataset.filterType;
                const value = event.target.value;

                if (filterType === 'language') {
                    if (event.target.checked) {
                        selectedLanguages.add(value);
                    } else {
                        selectedLanguages.delete(value);
                    }
                } else if (filterType === 'category') {
                    if (event.target.checked) {
                        selectedCategories.add(value);
                    } else {
                        selectedCategories.delete(value);
                    }
                }
                applyFilters();
            });
        });
    }

    // Initialize the application
    async function init() {
        bookListContainer.innerHTML = '<p class="loading-message">Loading books...</p>';
        try {
            allBooks = await fetchBooksFromAPI();
            populateFilters(allBooks);
            renderBooks(allBooks); // Display all books initially
            setupFilterListeners(); // Set up listeners after filters are populated
        } catch (error) {
            console.error("Failed to load books:", error);
            bookListContainer.innerHTML = '<p class="loading-message">Failed to load books. Please try again later.</p>';
        }
    }

    init(); // Run the initialization
});