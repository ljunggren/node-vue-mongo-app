# Node-Vue-Mongo App

This is a full-stack web application boilerplate using **Node.js**, **Vue.js**, and **MongoDB**. The application includes routing and a basic structure for managing users, properties, tenants, and contracts, and features a sidebar navigation for easy access to different sections of the app.

## Features

- **Node.js** and **Express** for backend API development
- **MongoDB** for database storage using **Mongoose** for object modeling
- **Vue.js** with **Vue Router** for frontend development
- Sidebar navigation for easy access to different app sections
- Basic CRUD operations for users (extendable to properties, tenants, and contracts)
- Clean folder structure for scalability

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Available Routes](#available-routes)
  - [Backend Routes](#backend-routes)
  - [Frontend Routes](#frontend-routes)
- [License](#license)


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Vue CLI](https://cli.vuejs.org/) (optional, for generating additional Vue components)


### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/node-vue-mongo-app.git
   cd node-vue-mongo-app

### Navigate to the backend folder and install dependencies
cd server
npm install

### Navigate to the frontend folder and install dependencies
cd ../frontend
npm install

### Start the backend server
cd server
node server.js

### Start the frontend server
cd frontend
npm run serve

### Frontend Routes

The Vue Router handles the following routes in the frontend:

- `/`: Dashboard page
- `/users`: Users management page
- `/properties`: Properties management page
- `/tenants`: Tenants management page
- `/contracts`: Contracts management page

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
