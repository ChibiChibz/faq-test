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
        // Slice the data array to get only the specified number of posts to display
        const postsToDisplay = this.data.slice(0, this.postsToShow);
        const loadMoreButton = '<button id="loadMoreBtn" class="button">Load More</button>';

        // Implement your logic to render or update the accordion based on the sliced data
        // For example, you can iterate through the sliced data and create accordion items
        this.innerHTML = `
            <section class="accordion">
                <div class="accordion-wrapper">
                    <h2 class="accordion-headline">Accordion vs. Search Filter</h2>
                    <p class="accordion-copy">I don't know if the filter function would work, but it would be really cool.</p>
                    <div class="accordion-container">
                        ${postsToDisplay.map((post, index) => `
                            <div class="accordion-item ${this.openItems.includes(index) ? 'active' : ''}">
                                <button class="accordion-title" data-index="${index}">
                                    ${post.title}
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
