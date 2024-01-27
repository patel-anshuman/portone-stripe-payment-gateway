# APIs for Stripe Payment Gateway

This web application provides a seamless and secure platform for handling payment transactions using the Stripe API. Whether you're managing e-commerce payments, subscription services, or one-time transactions, our application simplifies the payment process and ensures a smooth user experience.

## Features

### 1. Seamless Payment Processing

- **Create Payment Intent:** Generate payment intents for smooth and secure transactions.
- **Capture Payment Intent:** Capture created payment intents seamlessly.
- **Refund Capability:** Easily process refunds for completed payment intents.
- **List All Payment Intents:** Retrieve a comprehensive list of all payment intents.

### 2. Logging

- **Request Logging Middleware:** Automatic logging of essential request details (method, endpoint, type, user) using a dedicated logging middleware.
- **Winston Logging:** Utilizes Winston as the logging library for both console and log.txt file.

### 3. Testing

- **Unit Tests:** Includes comprehensive unit tests for key endpoints and functionality.
- **Test Coverage:** Ensures thorough test coverage for robust and reliable application behavior.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Endpoints](#endpoints)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/patel-anshuman/portone-stripe-payment-gateway.git
   ```

2. Navigate to the project directory:

   ```bash
   cd portone-stripe-payment-gateway
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

To run the application, use the following command:

```bash
npm run server
```

The application will be accessible at [http://localhost:4000](http://localhost:4000).

## Running Tests

To run tests, use the following command:

```bash
npm test
```

This will execute the unit tests for the application.

## Endpoints

| Endpoint                      | Method | Description                                 |
| ----------------------------- | ------ | ------------------------------------------- |
| `/v1/create_intent`           | POST   | Create a payment intent for a specified amount |
| `/v1/capture_intent/:id`      | POST   | Capture a created payment intent             |
| `/v1/create_refund/:id`       | POST   | Create a refund for a payment intent         |
| `/v1/get_intents`             | GET    | Get a list of all payment intents            |

Each endpoint is described briefly in the table above. For more details on request and response formats, refer to the corresponding endpoint implementation in the code.