import Header from './components/header.js';
import Accordion from './components/accordion.js';
import Hero from './components/hero.js';
import Chat from './components/chat.js';
import Footer from './components/footer.js';


class App {
	constructor() {
		// init comoponents
		new Header();
        new Hero();
        new Accordion();
        new Chat();
        new Footer();
	}
}

new App();
