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
                    <div class="nav-container">
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
                        <form class="search-form" action="https://www.kaufland.de/suche.html" method="get">
                            <input type="text" name="q" placeholder="Search" />
                            <button type="submit button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                    fill="#020203"
                                    fill-rule="evenodd"
                                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l4.25 4.24a1 1 0 101.42-1.42L15.5 14zm-6 0a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"
                                    clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>    
    `;

    const searchInput = this.querySelector('#search-input');
    const form = this.querySelector('.search-form');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchValue = searchInput.value;
      const searchUrl = `https://www.kaufland.de/s/?search_value=${encodeURIComponent(searchValue)}`;
      window.location.href = searchUrl;
    });

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
  }
  isLinkActive(url) {
    // Get the current page URL
    const currentPageUrl = window.location.href;

    // Check if the current page URL contains the link URL
    return currentPageUrl.includes(url);
  }
}

customElements.define("header-component", Header);

export default Header;
