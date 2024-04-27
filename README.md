## Amazon Scraper

This project is a simple web application that scrapes data from Amazon product listings based on a provided search keyword. The application is divided into two parts: the backend, which is built with Node.js, and the frontend, which is built with HTML, CSS, and JavaScript.
The backend is responsible for fetching the Amazon search results page for a given keyword and extracting the product details.

### Features

1. Fetches the Amazon search results page for a given keyword.
2. Parses the HTML content and extracts the following details for each product listing on the first page:
    * Product Title
    * Rating (out of five stars)
    * Number of Reviews
    * Product Image URL
    * Product page in Amazon
3. Provides an endpoint `/api/scrape` where a GET request with a query parameter `?keyword=yourKeyword` initiates the scraping process and returns the extracted data in JSON format.

## How to Run the Application

1. Clone the repository to your local computer.
2. Navigate to the project directory in the terminal.
3. Make sure you have NodeJs on your pc (it's necessary), then install the project dependencies with the command `npm install`.
4. Start the server with the command `node app.js`.
5. Open a web browser and navigate to `http://localhost:3000` to see the application in action.