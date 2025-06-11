# Pachara Boutique

Welcome to the Pachara Boutique application repository. This project contains the frontend code for our e-commerce platform built with Next.js and Firebase.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Technologies](#technologies)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://yarnpkg.com/) package manager
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/pachara-shop-web.git
   cd pachara-shop-web/hosting
   ```

2. Install dependencies

   ```
   yarn install
   ```

3. Set up local environment variables

   ```
   cp .env.development .env.local
   ```

4. Start the development server
   ```
   yarn dev
   ```
5. Open http://localhost:3000 in your browser

# 🌐 Deployment

## Deploy to Development Environment

### Select the default Firebase project

```
firebase use default
```

### Set up environment variables

```
cp .env.development .env.local
```

### Build the application

```
yarn build
```

### Deploy to Firebase

```
firebase deploy
```

## Deploy to Production Environment

### Select the default Firebase project

```
firebase use default
```

### Set up environment variables

```
cp .env.development .env.local
```

### Build the application

```
yarn build
```

### Deploy to Firebase

```
firebase deploy
```

# Project Structure

hosting/
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js App Router pages and layouts
│ ├── components/ # React components
│ │ ├── atoms/ # Small, reusable components
│ │ ├── molecules/ # Composite components
│ │ └── layouts/ # Layout components
│ ├── hooks/ # Custom React hooks and Redux
│ ├── shared/ # Shared utilities, types, and models
│ ├── config/ # Configuration files
│ └── repositories/ # Data access layer
└── ...

# 🔧 Technologies

Next.js - React framework
TypeScript - Type safety
Firebase - Backend and hosting
Tailwind CSS - Styling
Redux Toolkit - State management

# 🤝 Contributing

Please reach out to the project maintainers for information about contributing to this project.

# 📞 Contact

For questions or support, please contact the project maintainers.
