# Web React Simple Movie

This project is a simple movie web application built with React. It uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API to fetch movie data.

## Features

- **Home Page**: Displays banners for upcoming movies and categorized movie lists (Now Playing, Top Rated, Popular).
- **Movie Search**: Search for movies by title.
- **Movie Details**: View detailed information about a movie, including cast, trailers, and similar movies.
- **Responsive Design**: Optimized for various screen sizes.
- **Pagination**: Navigate through multiple pages of movie results.
- **Skeleton Loading**: Displays placeholders while data is being fetched.

## Tech Stack

- React
- React Router
- SWR
- Axios
- Tailwind CSS
- Vite

## How to Run

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Key

You need to have a TMDB API key to run this project. You can obtain an API key by creating an account on the TMDB website.

Once you have an API key, create a `.env` file in the root of the project with the following content:
