Firebase Login App (Next.js)

This is a simple authentication app built using Next.js and Firebase Authentication. It allows users to register and log in using their full name, email address and password. Once authenticated, users are greeted on the homepage with a personalized message and can log out securely.


 Features

- Toggle between Login and Register modes
- Secure authentication using Firebase Auth (email + password)
- Greet users by their full name after login
- Logout functionality with redirect to login page
- Friendly error messages (e.g. "Incorrect email or password")
- Simple dark-themed styling using inline CSS


Getting Started

1. Clone the repository and install dependencies 

```bash
git clone https://github.com/Tarun-2003/Babylon-Login.git
cd Babylon-Login
npm install
npm run dev
```
This project was built to demonstrate how Firebase Authentication can be integrated into a Next.js app using the Pages Router. I designed a simple website that allows users to register with their full name, log in securely and see a greeting message on a home page. One decision was to separate registration from login after signing up and users are logged out when they click on the logout button and prompted to log in again . Some challenges included handling Firebase reload issues in development and converting Firebase’s raw errors into user-friendly messages. In the future, I’d like to improve this app by adding toast notifications and better form validation or Tailwind styling.

