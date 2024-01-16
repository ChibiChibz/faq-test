// import Header from './components/header.js';
// import Accordion from './components/accordion.js';
// import Hero from './components/hero.js';
// import Footer from './components/footer.js';


class App {
	constructor() {
		// init comoponents
		new Header();
        new Hero();
        new Accordion();
        new Footer();
	}
}

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

class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
          <footer>
              <section class="footer">
              <div class="footer-wrapper">
                  <h2>Could your question not be answered yet? Contact our customer support directly.</h2>
                  <div class="contact-form">
                  <form action="">
                      <div class="contact-inputs">
                          <div class="contact-info">
                              <label for="name">Name</label>
                              <input type="text" name="name" />
                              <label for="email">Email</label>
                              <input type="email" name="email" />
                              <label for="phone">Phone (optional)</label>
                              <input type="tel" name="phone" />
                              <label for="country">Country</label>
                              <select id="country" name="country" class="form-control">
                                  <option disabled selected value></option>
                                  <option value="Germany">Germany</option>                                
                                  <option value="United Kingdom">United Kingdom</option>
                                  <option value="United States">United States</option>
                                  <option value="Viet Nam">Viet Nam</option>
                              </select>
                          </div>
                          <div class="contact-message">
                              <label for="message">Your Message</label>
                              <textarea
                              name="message"
                              id="message"
                              ></textarea>
                          </div>
                      </div>
                      <div class="contact-submit">
                          <input type="checkbox" name="consent" id="consent" value="consent">
                          <label for="consent">I hereby consent to the processing of my data in accordance with the <a href="#">privacy information</a>. </label>
                          <button class="button">
                              Send
                          </button>
                      </div>
                  </form>
                  </div>
              </section>
              <section class="bottombar">
                  <div class="bottombar-wrapper">
                  <div class="links">
                      <ul>
                      <li><a href="#">Legal Notice</a></li>
                      <li><a href="#">Privacy</a></li>
                      </ul>
                  </div>
                  <div class="copyright">
                      <p>© 2024 Chi Thanh Pham for <a href="#">Kaufland Global Marketplace</a></p>
                  </div>
                  </div>
              </div>
              </section>
          </footer>
      `;
    }
  }
  
  customElements.define("footer-component", Footer);

  class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
          <header>
              <nav>
                  <div class="nav-wrapper">
                      <div class="logo">
                          <img src="images/KL_Logo.svg" alt="Kaufland Logo" />
                      </div>
                      <button id="burger" class="nav-burger">
                          <div id="menu-open" class="active">
                              <svg version="1.1" id="_x30_1_x5F_Contact-Female" xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                                  style="enable-background: new 0 0 24 24" xml:space="preserve">
                                  <style type="text/css">
                                      .st0 {
                                          fill: #020203;
                                      }
                                  </style>
                                  <path class="st0" d="M21,12L21,12c0,0.6-0.4,1-1,1H4c-0.5,0-1-0.4-1-1V12c0-0.5,0.4-1,1-1H20C20.6,11,21,11.4,21,12z M20,16H4
                                  c-0.5,0-1,0.4-1,1V17c0,0.5,0.4,1,1,1H20c0.5,0,1-0.4,1-1V17C21,16.4,20.6,16,20,16z M20,6H4C3.4,6,3,6.4,3,7V7c0,0.5,0.4,1,1,1H20
                                  c0.5,0,1-0.4,1-1V7C21,6.4,20.6,6,20,6z" />
                              </svg>
                          </div>
                          <div id="menu-close" class="">
                              <svg version="1.1" id="_x30_1_x5F_Contact-Female" xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                                  style="enable-background: new 0 0 24 24" xml:space="preserve">
                                  <style type="text/css">
                                      .st0 {
                                          fill: #020203;
                                      }
                                  </style>
                                  <path class="st0" d="M17.7,16.3L13.4,12l4.3-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L7.7,6.3c-0.4-0.4-1-0.4-1.4,0
                                  c-0.4,0.4-0.4,1,0,1.4l4.3,4.3l-4.3,4.3c-0.4,0.4-0.4,1,0,1.4c0,0,0,0,0,0c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0l4.3-4.3l4.3,4.3
                                  c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0C18.1,17.3,18.1,16.7,17.7,16.3C17.7,16.3,17.7,16.3,17.7,16.3z" />
                              </svg>
                          </div>
                      </button>
                      <ul id="nav-links" class="nav-links">
                          <li>
                              <a href="https://www.kaufland.de/" class="${this.isLinkActive('https://www.kaufland.de/') ? 'active' : ''}">Online-Marktplatz</a>
                          </li>
                          <li>
                              <a href="https://filiale.kaufland.de/" class="${this.isLinkActive('https://filiale.kaufland.de/') ? 'active' : ''}">Filial-Angebote</a>
                          </li>
                          <li>
                              <a href="${window.location.href}" class="${this.isLinkActive(window.location.href) ? 'active' : ''}">FAQ</a>
                          </li>
                      </ul>
                  </div>
              </nav>
          </header>    
      `;
    }
    isLinkActive(url) {
      // Get the current page URL
      const currentPageUrl = window.location.href;
  
      // Check if the current page URL contains the link URL
      return currentPageUrl.includes(url);
    }
  }
  
  customElements.define("header-component", Header);


  class Hero extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="hero">
            <picture class="hero__image">
                <img src="https://picsum.photos/1280/600" alt="random image" />
            </picture>
            <picture class="hero__blur" alt="random immage blurred">
                <img src="https://picsum.photos/1280/600" alt="random image blurred" />
            </picture>
            <div class="hero__content">
                <div class="hero__box">
                    <div class="hero__title">
                        <h1>
                            Frequently asked questions
                        </h1>
                        <p>
                            Welcome to our Frequently Asked Questions (FAQ) section. Whether you're a new customer or a returning visitor, this page is designed to provide you with quick and informative answers to common queries.
                        </p>
                    </div>
                </div>
		    </div>
        </div>
      `;
    }
  }
  
  customElements.define("hero-component", Hero);

new App();


let burger = document.getElementById('burger');
let openMenu = document.getElementById('menu-open');
let closeMenu = document.getElementById('menu-close');
let navLinks = document.getElementById('nav-links');


burger.addEventListener('click', function() {
    console.log('clicked');
    openMenu.classList.toggle('active');
    closeMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('disable-scroll');

});


window.addEventListener('resize', function() {
    if (window.innerWidth > 959) {
        openMenu.classList.remove('active');
        openMenu.classList.add('active');
        closeMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('disable-scroll');
    }
});