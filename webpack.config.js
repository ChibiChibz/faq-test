import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Import 'path' module again, this time for your webpack configuration

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/js/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'), // Use the 'path' module here
  },
};