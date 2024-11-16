  # Kitten Adoption 
  
  ## Overview
  A RESTful API built with Express.js to manage the process of kitten adoption. This system follows a Domain-Driven Design (DDD) approach and organizes the application into two main domains:
  
  1. Kitten Management Domain: Responsible for managing kittens, their information, and status (e.g., available for adoption).
  2. Adoption Request Management Domain: Manages the adoption requests, their status (approved, rejected, pending), and the process of matching kittens with applicants.
  
  The system also ensures that a kitten can only be adopted once, enforcing business rules regarding the adoption lifecycle.
 
  ## Project Structure
  ```
  src/
  ├── controller/         # Route handlers and business logic for kittens and adoption requests
  ├── middleware/         # Authentication and request validation middleware
  ├── model/              # Domain models for kittens and adoption requests
  ├── routes/             # API route definitions for kittens and adoption requests
  ├── db/                 # Database configuration and connection
  └── service/            # Business logic, encapsulating domain rules
  ```
 
  ## Domain: Kitten Management
  
  Kitten Management is responsible for storing and managing the details of each kitten available for adoption. The domain ensures the kitten's information is updated, and new kittens can be added for adoption.
  
  ### Endpoints:
 
  #### `POST /kitty`
  - Fetch information about a specific kitten.
  - Request body:
    ```json
    {
      "idKitty": "string"
    }
    ```
  
  #### `POST /add-kitty`
  - Adds a new kitten for adoption.
  - Request body:
    ```json
    {
      "name": "string",
      "age": "number",
      "breed": "string",
      "description": "string",
      "photo": "string"
    }
    ```
 
  #### `PATCH /edit-kitty`
  - Updates the kitten's details (e.g., name, breed, description).
  - Request body:
    ```json
    {
      "id": "string",
      "name": "string",
      "age": "number",
      "breed": "string",
      "description": "string",
      "photo": "string"
    }
    ```
  
  #### `GET /kittens`
  - Fetches all available kittens for adoption.
 
  ## Domain: Adoption Request Management
 
  Adoption Request Management oversees the process by which users submit adoption requests. This domain ensures each kitten can only be adopted once, and manages the lifecycle of each request (from submission to approval or rejection).
 
  ### Endpoints:
 
  #### `GET /requests`
  - Retrieves all adoption requests.
 
  #### `POST /new-request`
  - Submits a new adoption request.
  - Request body:
    ```json
    {
      "kitten_id": "string",
      "applicant_name": "string",
      "phone": "string",
      "email": "string",
      "message": "string",
      "social_media_url": "string"
    }
    ```
 
  #### `POST /info`
  - Retrieves detailed information about a specific adoption request.
  - Request body:
    ```json
    {
      "id": "string"
    }
    ```
 
  #### `PATCH /approve-or-not`
  - Approves or rejects an adoption request.
  - Request body:
    ```json
    {
      "id": "string",
      "status": "approved|rejected|pending",
      "idKitty": "string"
    }
    ```
  
  ## Technical Stack
  - Runtime: Node.js
  - Framework: Express.js
  - Authentication: JWT-based authentication
  - Database: PostgreSQL
  - Architecture: Domain-Driven Design (DDD), MVC Pattern
 
  ## Middleware
  1. authMiddleware: Validates JWT tokens to ensure the user is authorized.
  2. validatorApi: Ensures incoming requests contain all required fields and validate their formats.
 
  ## Error Handling
  Standard error responses across all endpoints:
  ```json
  {
    "message": "Error message",
    "error": {
      "message": "Detailed error description"
    }
  }
  ```
 
  Status codes:
  - 200: Successful operation
  - 400: Bad request or validation error
  - 401: Unauthorized
  - 500: Internal server error
 
  ## Setup Requirements
  1. Node.js (v14 or higher)
  2. NPM or Yarn
  3. PostgreSQL database setup
  4. Environment variables configuration
 
  ## Installation
  ```bash
  # Clone the repository
  git clone [repository-url]
 
  # Install dependencies
  npm install
 
  # Set up environment variables
  cp .env.example .env
 
  # Start the server
  npm start
  ```
 
  ## Environment Variables
  ```env
  JWT_SECRET=your_jwt_secret
  DATABASE_URL=your_database_url
  ```
 
  ## Dependencies
  ```json
  {
    "dependencies": {
      "express": "^4.17.1",
      "jsonwebtoken": "^8.5.1",
      "pg": "^8.7.1"
    }
  }
  ```
 
  ## API Response Format
  Successful responses:
  ```json
  {
    "message": "Operation success message"
  }
  ```
 
  Error responses:
  ```json
  {
    "message": "Error message",
    "missingFields": ["field1", "field2"]  // For validation errors
  }
  ```
 
  ## Development
  1. Follow Domain-Driven Design (DDD) principles
  2. Use async/await for asynchronous operations
  3. Implement proper error handling
  4. Validate all incoming requests
  5. Use middleware for common operations
 
  ## Contributing
  1. Fork the repository
  2. Create your feature branch
  3. Commit your changes
  4. Push to the branch
  5. Create a new Pull Request
 
