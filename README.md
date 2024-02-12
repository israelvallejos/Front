# News Platform with Angular and Spring Boot

## Description

This project is a news platform that allows users to view, search, and save their favorite news articles. It consists of an Application developed with Angular for the web interface (hosted in the pruebaFront repository) and a Spring Boot microservice for backend operations (hosted in the pruebaback repository).

## Prerequisites

- JDK 11 or newer
- Maven 3.6.3 or newer
- Node.js and npm

## Setup and Installation

### Backend Setup
1. Clone the backend repository:
    ```sh
    git clone https://github.com/israelvallejos/pruebaback.git
    ```
2. Navigate to the backend project directory:
    ```sh
    cd pruebaback
    ```
3. Run the Spring Boot application:
    ```sh
    mvn spring-boot:run
    ```

### Frontend Setup
1. Clone the frontend repository:
    ```sh
    git clone https://github.com/israelvallejos/pruebaFront.git
    ```
2. Navigate to the frontend project directory:
    ```sh
    cd pruebaFront
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the Angular application:
    ```sh
    ng serve
    ```

## API Documentation

The API documentation for the Spring Boot microservice is available at `http://localhost:8080/swagger-ui.html`, detailing the endpoints, request bodies, and responses.

## Technologies Used

- Frontend: Angular/TypeScript
- Backend: Java with Spring Boot, H2 Database
- Documentation: Swagger/OpenAPI