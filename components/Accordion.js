class Accordion extends HTMLElement {
    constructor() {
        super();

        // Initialize an empty array to store the fetched data
        this.data = [];

        // Set the initial number of posts to display
        this.postsToShow = 10;

        // Array to store the indices of open accordion items
        this.openItems = [];

        // Variable to store the scroll position
        this.scrollPosition = 0;
    }

    connectedCallback() {
        // Fetch data when the element is connected to the document
        this.fetchData();

        // Setup the search filter after everything is rendered
        setTimeout(() => this.setupSearchFilter(), 1000);
    }

    async fetchData() {
        try {
            // Fetch data from the API endpoint
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

            // Check if the request was successful (status code 200)
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            // Parse the response as JSON
            const data = await response.json();

            // Update the data property with the fetched data
            this.data = data;

            // Save the current scroll position
            this.scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // Call a method to render or update the accordion with the initial number of posts
            this.renderAccordion();
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    renderAccordion() {
        // Render all items initially
        const allItems = this.data.map((post, index) => `
            <div class="accordion-item ${this.openItems.includes(index) ? 'active' : ''}">
                <button class="accordion-title" data-index="${index}">
                    ${post.title}
                    <div class="accordion-title-icon">
                        <svg role="img" focusable="false" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="svg-icon__icon">
                            <path d="m6.71 21.71-1.42-1.42 9.3-9.29-9.3-9.29L6.71.29 17.41 11 6.71 21.71Z"></path>
                        </svg>
                    </div>
                </button>
                <div class="accordion-content">
                    <p class="accordion-content-copy">
                        ${post.body}
                    </p>
                </div>
            </div>
        `).join('');
        
        // Slice the data array to get only the specified number of posts to display
        const postsToDisplay = this.data.slice(0, this.postsToShow);
        const postsNotDisplayed = this.data.slice(this.postsToShow);
        const loadMoreButton = '<button id="loadMoreBtn" class="button">Load More</button>';

        // Implement your logic to render or update the accordion based on the sliced data
        // For example, you can iterate through the sliced data and create accordion items
        this.innerHTML = `
            <section class="accordion">
                <div class="accordion-wrapper">
                    <h2 class="accordion-headline">Accordion vs. Search Filter</h2>
                    <p class="accordion-copy">I don't know if the filter function would work, but it would be really cool.</p>
                    <form id="searchForm" class="search">
                        <input type="text" id="search" name="q" class="search-bar"placeholder="Enter your search term">
                    </form>
                    <div class="accordion-container">
                        ${postsToDisplay.map((post, index) => `
                            <div class="accordion-item ${this.openItems.includes(index) ? 'active' : ''}">
                                <button class="accordion-title" data-index="${index}">
                                    <div>${post.title}</div>
                                    <div class="accordion-title-icon">
                                        <svg role="img" focusable="false" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="svg-icon__icon"><path d="m6.71 21.71-1.42-1.42 9.3-9.29-9.3-9.29L6.71.29 17.41 11 6.71 21.71Z"></path></svg>
                                    </div>
                                </button>
                                <div class="accordion-content">
                                    <p class="accordion-content-copy">
                                        ${post.body}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                        ${postsNotDisplayed.map((post, index) => `
                            <div class="accordion-item hidden">
                                <button class="accordion-title" data-index="${index}">
                                    <div>${post.title}</div>
                                    <div class="accordion-title-icon">
                                        <svg role="img" focusable="false" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" class="svg-icon__icon"><path d="m6.71 21.71-1.42-1.42 9.3-9.29-9.3-9.29L6.71.29 17.41 11 6.71 21.71Z"></path></svg>
                                    </div>
                                </button>
                                <div class="accordion-content">
                                    <p class="accordion-content-copy">
                                        ${post.body}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ${this.postsToShow < this.data.length ? loadMoreButton : ''}
            </section>
        `;

        // Restore the scroll position
        window.scrollTo(0, this.scrollPosition);

        // Add a "Load More" button if there are more posts to load
        if (this.postsToShow < this.data.length) {
            // Attach a click event listener to the "Load More" button
            this.querySelector('#loadMoreBtn').addEventListener('click', () => this.loadMore());
        }

        // Attach click event listeners to the accordion buttons to toggle the "active" class
        this.querySelectorAll('.accordion-title').forEach(button => {
            button.addEventListener('click', (event) => this.toggleAccordionContent(event));
        });

        // Attach click event listener to the accordion container for event delegation
        this.querySelector('.accordion-container').addEventListener('click', (event) => {
            const accordionTitle = event.target.closest('.accordion-title');
            if (accordionTitle) {
                this.toggleAccordionContent(accordionTitle);
            }
        });

        this.setupSearchFilter()
    }

    setupSearchFilter() {
        const searchForm = this.querySelector('#searchForm');
        const searchInput = this.querySelector('#search');

        // Prevent the form from being submitted and causing a page refresh
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.filterResults(searchInput.value.toLowerCase());
        });

        // Add event listeners for both keyup and input events
        searchInput.addEventListener('keyup', () => this.filterResults(searchInput.value.toLowerCase()));
        searchInput.addEventListener('input', () => this.filterResults(searchInput.value.toLowerCase()));
    }

    filterResults(searchTerm) {
        // If the search term is empty, reset to the initial state
        if (!searchTerm) {
            this.renderAccordion();
            return;
        }
    
        // Get all accordion items
        const accordionItems = this.querySelectorAll('.accordion-container .accordion-item');
    
        // Loop through each item and hide/show based on the search term
        accordionItems.forEach((item, index) => {
            const titleText = this.data[index].title.toLowerCase();
            const bodyText = this.data[index].body.toLowerCase();
    
            // Check if the search term is found in the title or body
            const titleMatch = titleText.includes(searchTerm);
            const bodyMatch = bodyText.includes(searchTerm);
    
            // Toggle the 'active' class based on the match
            item.classList.toggle('active', titleMatch || bodyMatch);
    
            // Toggle the visibility of the accordion item based on the match
            if (titleMatch || bodyMatch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
    
            // Highlight matching words in title
            const titleElement = item.querySelector('.accordion-title div');
            titleElement.innerHTML = this.highlightMatches(this.data[index].title, searchTerm);
    
            // Highlight matching words in body
            const bodyElement = item.querySelector('.accordion-content-copy');
            bodyElement.innerHTML = this.highlightMatches(this.data[index].body, searchTerm);
        });
    }
    
    highlightMatches(text, searchTerm) {
        // Use a regular expression to find all occurrences of the search term in the text
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        // Replace the matching words with a highlighted version
        return text.replace(regex, (match, p1) => `<span class="highlight">${p1}</span>`);
    }
    

    toggleAccordionContent(event) {
        // Get the index from the data-index attribute
        const index = event.target.getAttribute('data-index');

        // Toggle the "active" class on the accordion item
        const accordionItem = this.querySelector(`.accordion-container .accordion-item:nth-child(${parseInt(index) + 1})`);
        accordionItem.classList.toggle('active');

        // Update the openItems array based on the toggle
        if (accordionItem.classList.contains('active')) {
            this.openItems.push(parseInt(index));
        } else {
            this.openItems = this.openItems.filter(item => item !== parseInt(index));
        }
    }

    loadMore() {
        // Save the current scroll position before loading more posts
        this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
        // Increase the number of posts to display
        this.postsToShow += 10;
    
        // Call the renderAccordion method again with the updated number of posts to display
        this.renderAccordion();
    }

}


customElements.define("accordion-component", Accordion);
export default Accordion;
