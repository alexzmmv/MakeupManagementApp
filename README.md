# Product Management App

## Overview
This is a full-stack **Product Management App** with a **Spring Boot backend** and a **vanilla JavaScript frontend**. The app allows users to manage a list of products stored in a local database file. Users can add, modify, delete, and view products via the frontend, which communicates with the backend through RESTful APIs. Additionally, users can **search** for products by name.

---

## Features

### Frontend
- **Display Products**: Dynamically fetch and display products from the backend.
- **Add Products**: Create new products using a form.
- **Modify Products**: Edit product details directly in the interface.
- **Delete Products**: Remove products from the list.
- **Search Products**: Search for products by name.
- **Date Handling**: The frontend handles date inputs and formats them for display.
- **Toggle View**: Show or hide the product list and the form.

### Backend (Spring Boot)
- **CRUD Operations**: The backend supports Create, Read, Update, and Delete operations for products.
- **Search Products**: Search products by name.
- **Local File Database**: Products are stored in a local `h2 dataabse`

---

## Project Setup

### Requirements

- **Java 8+** for backend development.
- **Maven** for dependency management (for Spring Boot).
- **Node.js** and **npm** for frontend development.
- **Spring Boot** framework for the backend.

---

## Backend Setup (Spring Boot)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/product-management-app.git
cd product-management-app
```

### 2. Install Backend Dependencies
Navigate to the `backend` directory and use Maven to install the required dependencies.

```bash
mvn clean install
```

### 3. Run the Backend
After installing dependencies, you can run the Spring Boot backend using:

```bash
mvn spring-boot:run
```

The backend should now be running on `http://localhost:8080`.

---

## Frontend Setup (Vanilla JavaScript)

### 1. Install Frontend Dependencies
```bash
python3
```

### 2. Run the Frontend
To start the frontend, run the following (or any method to run a web servers) :
```bash
cd frontend
python3 -m http.server 8000
```

The frontend should now be available at `http://localhost:8000`.

---

## Usage

Once both the backend and frontend are running, you can access the app in your browser. The following actions can be performed:

- **View Products**: The product list will be displayed on the homepage.
- **Add Product**: Use the form to add new products to the list.
- **Modify Product**: Click on the product to edit its details.
- **Delete Product**: Remove products by clicking the delete button.
- **Search**: Use the search bar to filter products by name.

---

## Database

This app uses an in-memory **H2 database** for storing products. The database is automatically initialized with some default products. You can modify the database by performing CRUD operations through the frontend.

---

## Contributing

Feel free to fork this repository and submit pull requests for bug fixes, new features, or improvements! 

---
