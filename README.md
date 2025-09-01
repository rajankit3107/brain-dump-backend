# Brain Dump Backend

A Node.js/Express backend API for a brain dump application that allows users to store, manage, and share their content with others. Built with TypeScript, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication**: Sign up and sign in with JWT token-based authentication
- **Content Management**: Create, retrieve, and delete content with titles and links
- **Sharing System**: Generate shareable links to share your brain dump with others
- **Data Validation**: Input validation using Zod schema validation
- **TypeScript**: Full TypeScript support for better development experience
- **MongoDB**: NoSQL database for flexible data storage

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Environment**: dotenv
- **Development**: Nodemon, ESLint, Prettier

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd brain-dump-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Build and Run**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### POST `/signup`

Create a new user account.

**Request Body:**

```json
{
  "username": "string (3-13 characters)",
  "password": "string"
}
```

**Response:**

```json
{
  "message": "user created successfully"
}
```

#### POST `/signin`

Authenticate user and get JWT token.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```

### Content Management Endpoints

#### POST `/content`

Create new content (requires authentication).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "title": "string",
  "link": "string"
}
```

**Response:**

```json
{
  "message": "Content Added"
}
```

#### GET `/content`

Get all content for authenticated user.

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "content": [
    {
      "_id": "content_id",
      "title": "string",
      "link": "string",
      "tags": [],
      "userId": {
        "_id": "user_id",
        "username": "string"
      },
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Sharing Endpoints

#### POST `/share`

Create or delete shareable link (requires authentication).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "share": true // true to create, false to delete
}
```

**Response:**

```json
{
  "createdlink": {
    "_id": "link_id",
    "hash": "random_hash_string",
    "userId": "user_id",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### GET `/share/:shareLink`

Get shared content by hash link.

**Parameters:**

- `shareLink`: The hash string from the share link

**Response:**

```json
{
  "username": "string",
  "content": [
    {
      "_id": "content_id",
      "title": "string",
      "link": "string",
      "tags": [],
      "userId": "user_id",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

## 🗄️ Database Schema

### User Model

```typescript
{
  username: String (required, unique),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Content Model

```typescript
{
  title: String (required),
  link: String (required),
  tags: [ObjectId] (references Tag model),
  userId: ObjectId (required, references User model),
  createdAt: Date,
  updatedAt: Date
}
```

### Link Model

```typescript
{
  hash: String,
  userId: ObjectId (required, references User model),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Project Structure

```
brain-dump-backend/
├── src/
│   ├── config.ts              # Database configuration
│   ├── controllers/
│   │   └── controllers.ts     # API route handlers
│   ├── middlewares/
│   │   └── middleware.ts      # JWT authentication middleware
│   ├── models/
│   │   └── model.ts          # MongoDB schemas
│   ├── routes/
│   │   └── routes.ts         # API route definitions
│   ├── utils/
│   │   └── random-string-generator.ts  # Utility functions
│   ├── validators/
│   │   └── validators.ts     # Zod validation schemas
│   └── index.ts              # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server
- `npm run dev` - Build and start in development mode with nodemon

## 🔐 Security Features

- JWT-based authentication
- Input validation using Zod
- Password hashing (implemented in user model)
- Protected routes with middleware
- Environment variable configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.
