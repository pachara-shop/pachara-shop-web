# Pachara Shop Web

Pachara Shop Web is an e-commerce web application for managing and selling products online. This project is built using modern web technologies to provide a seamless and efficient user experience for both customers and administrators.

## Features

- **Product Management**: Add, edit, and delete products.
- **Product Gallery**: Upload and manage product images.
- **Category Management**: Manage product categories.
- **Order Management**: View and update order statuses.
- **User Authentication**: Secure login and registration for users.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Authentication)
- **State Management**: Redux
- **Form Handling**: React Hook Form, Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/pachara-shop-web.git
   cd pachara-shop-web
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Firebase**:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore, Storage, and Authentication.
   - Copy the Firebase configuration and replace the content in `src/config/firebaseConfig.ts`.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   - Visit `http://localhost:3000` to see the application in action.

## Project Structure
