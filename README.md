# Paginated Books Single-Page Application

## Overview

This project is a single-page application that displays paginated books. It consists of a Node.js backend with MongoDB database to store and manipulate the books, and a React frontend to display the paginated books.

## Local Setup

Make sure you have Node.js and MongoDB installed on your machine.

1. **Clone the GitHub repository:**
    ```bash
    git clone <repository-url>
    ```

2. **Start the backend server:**
    ```bash
    node ./database.js
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ./frontend/
    npm install
    ```

4. **Start the frontend development server:**
    ```bash
    npm run dev
    ```

5. **Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the frontend.**

## API Routes

- `GET /books/:page`: Returns the paginated books.
- `GET /len`: Returns the total number of pages.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature`).
3. Commit your changes (`git commit -am 'Adding a new feature'`).
4. Push to the branch (`git push origin feature`).
5. Create a new Pull Request.

## Author

This project was authored by Carolaine Alexandre.
