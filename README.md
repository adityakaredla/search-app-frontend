# Full-Stack Search Application

## Overview

This project is a full-stack search application that allows users to search for data and view the results in a user-friendly way. The application includes both frontend and backend components, and it has been deployed to [Vercel](https://vercel.com/) and [Heroku](https://www.heroku.com/).

## Frontend Application

### Technologies Used

- **Next.js 13:** The frontend is built using Next.js, a React framework that enables server-side rendering and other powerful features.

### Features

1. **Search Bar:**
   - Users can enter their search queries in the search bar.

2. **Search Results:**
   - The application displays search results in a user-friendly way, using a grid format.

3. **Pagination:**
   - Pagination controls are implemented to navigate through the search results.

4. **Debounce:**
   - Debounce functionality is applied to limit the number of API calls when users are typing in the search bar.

5. **Server-Side Rendering (SSR):**
   - The application utilizes Next.js SSR feature for enhanced performance.

6. **Client-Side Search:**
   - The application sends requests to the backend API to fetch search results based on user queries.

7. **Column Filtering and Sorting:**
   - Users can filter and sort search results based on columns for better control.

8. **Error Handling:**
   - Graceful error handling is implemented, displaying user-friendly messages if backend API requests fail.

### Screenshots

![Search Page](screenshots/search-page.png)
*Figure 1: Search Page with Results*

![Pagination](screenshots/pagination.png)
*Figure 2: Pagination Controls*

## Backend Application

### Technologies Used

- **Node.js with Express:** The backend is built using Node.js with the Express.js framework.

### Features

1. **RESTful API Endpoints:**
   - `GET /api/data`: Fetches a list of data based on the search query and pagination parameters.

2. **Static Dataset:**
   - A static JSON file is treated as a database for this assessment. No modification to the data is required.

3. **Search Functionality:**
   - The backend filters the dataset based on the search query and returns matching results.

4. **Pagination Logic:**
   - Pagination logic is implemented to return a subset of results based on the requested page number.

5. **CORS Configuration:**
   - CORS is properly configured to allow requests from the React.js frontend.

### Deployment

- The backend is deployed on Heroku, and the frontend is deployed on Vercel.

### Repository Structure

The project repository is organized as follows:

- `/frontend`: Contains the Next.js frontend code.
- `/backend`: Contains the Node.js backend code.

## Development Process

### Challenges Faced

- Implementing pagination and sorting on both the frontend and backend required careful synchronization to ensure a seamless user experience.

- Configuring CORS for proper communication between the frontend and backend presented challenges, which were addressed through thorough testing and documentation reading.

### Additional Features

- Beyond the specified requirements, the application includes dynamic column filtering and sorting, providing users with more control over search results.

## Conclusion

This full-stack search application demonstrates my skills in developing a responsive and feature-rich web application. I thoroughly enjoyed working on this project and look forward to any feedback you may have.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fullstack-search-app.git

