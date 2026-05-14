# Online Art Gallery

A full-stack web application for an online art gallery platform where customers can browse and purchase artworks, artists can upload and manage their creations, and administrators can oversee the platform.

## Features

### User Roles & Capabilities
- **Customer**: Browse artworks, make purchases, view purchase history, manage profile
- **Artist**: Upload/manage artworks, view sales, track purchases from their work
- **Admin**: Dashboard access for platform management

### Core Functionality
- User authentication and role-based access control (JWT)
- Artwork gallery with browsing and search capabilities
- Artwork management (CRUD operations for artists)
- Payment processing with Razorpay integration
- Order/purchase tracking
- User profiles and role-specific dashboards
- Protected routes by user role
- Static pages (About, Contact, Terms, Privacy)

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 21
- **Database**: MySQL 8.0 with Hibernate JPA
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Spring Security with BCrypt password hashing
- **Payment Gateway**: Razorpay Java SDK
- **Build Tool**: Maven
- **Utilities**: Lombok for code generation

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 7.1.12
- **Routing**: React Router DOM 6.19
- **UI Framework**: Bootstrap 5.3.2
- **State Management**: React Context API
- **Web Server**: Nginx (production)
- **Code Quality**: ESLint

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Database**: MySQL 8.0
- **Reverse Proxy**: Nginx for frontend serving

## Prerequisites

- Java 21 (Eclipse Temurin recommended)
- Node.js 20+
- MySQL 8.0
- Docker and Docker Compose (for containerized deployment)
- Maven 3.9+

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd online-art-gallery-project
```

### 2. Backend Setup

#### Database Setup
1. Install and start MySQL 8.0
2. Create a database named `art_db`:
```sql
CREATE DATABASE art_db;
```

#### Configure Environment Variables
Create `gallery/src/main/resources/application-prod.properties` or set environment variables:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/art_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# JWT Configuration
jwt.secret=your_256_bit_secret_key_here_minimum_32_characters

# Razorpay Configuration (use test credentials for development)
razorpay.key.id=your_deatils
razorpay.key.secret=your_deatils
```

#### Build and Run Backend
```bash
cd gallery
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8082`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd online-art-gallery
npm install
```

#### Configure API Endpoint
Update `online-art-gallery/src/config/api.js` if needed:
```javascript
const API_BASE_URL = 'http://localhost:8082/api';
```

#### Run Frontend
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Usage

1. **Access the Application**: Open `http://localhost:5173` in your browser
2. **Register**: Create an account as Customer, Artist, or Admin
3. **Login**: Use your credentials to access the platform
4. **Browse Artworks**: View available artworks on the gallery page
5. **Artist Features**: Upload and manage artworks from the artist dashboard
6. **Purchase**: Customers can purchase artworks using Razorpay integration
7. **Dashboard**: Access role-specific dashboards for personalized features

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate user and return JWT token

### Artist Endpoints (Requires ROLE_ARTIST)
- `GET /api/artist/dashboard` - Get artist dashboard data

### Payment Endpoints
- `POST /api/payments/create-order` - Create Razorpay payment order
- `POST /api/payments/verify` - Verify payment completion

### Protected Routes
- `/api/artist/**` - Requires ARTIST role
- `/api/customer/**` - Requires CUSTOMER role
- All other routes except auth and payments require authentication

## Docker Deployment

### Build and Run with Docker Compose

1. **Backend Container**:
```bash
cd gallery
docker build -t art-gallery-backend .
docker run -p 8082:8080 -e SPRING_PROFILES_ACTIVE=prod art-gallery-backend
```

2. **Frontend Container**:
```bash
cd online-art-gallery
docker build -t art-gallery-frontend .
docker run -p 80:80 art-gallery-frontend
```

3. **Database**: Ensure MySQL is running separately or use Docker:
```bash
docker run --name mysql-art -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=art_db -p 3306:3306 -d mysql:8.0
```

### Environment Variables for Docker
When running containers, pass environment variables:
```bash
docker run -p 8082:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/art_db \
  -e JWT_SECRET=your_secret_key \
  -e RAZORPAY_KEY_ID=your_key_id \
  -e RAZORPAY_KEY_SECRET=your_key_secret \
  art-gallery-backend
```

## Project Structure

```
online-art-gallery-project/
├── gallery/                          # Spring Boot Backend
│   ├── src/main/java/com/onlineartgallery/gallery/
│   │   ├── controller/               # REST controllers
│   │   ├── model/                    # JPA entities
│   │   ├── repository/               # Data access layer
│   │   ├── service/                  # Business logic
│   │   ├── security/                 # Authentication/JWT
│   │   ├── config/                   # Configuration classes
│   │   └── dto/                      # Data transfer objects
│   ├── src/main/resources/
│   │   └── application.properties    # Configuration
│   └── pom.xml                       # Maven dependencies
├── online-art-gallery/               # React Frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Page components
│   │   ├── contexts/                 # React Context providers
│   │   ├── config/                   # API configuration
│   │   └── utils/                    # Utility functions
│   ├── public/                       # Static assets
│   └── package.json                  # Node dependencies
├── gallery/Dockerfile                # Backend container config
├── online-art-gallery/Dockerfile     # Frontend container config
└── README.md                         # This file
```

## Security Considerations

- JWT tokens are currently stored in localStorage (vulnerable to XSS)
- For production, implement secure HTTP-only cookies
- Move all secrets to environment variables
- Implement token refresh mechanism
- Add comprehensive input validation

## Development Notes

- Artworks and orders are currently stored in browser localStorage
- For production, implement proper database entities for artworks and orders
- Database uses `createDatabaseIfNotExist=true` for auto-creation
- CORS is configured for development ports (5173, 5174, 3000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
