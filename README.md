# Guardian-Webapp

This is a React-based web application designed to help guardians with various tasks, including event management, location tracking for AEDs and First Aid boxes, and essential learning guides. The application features a clean user interface with navigation between different screens.

## Features

- **User Authentication:** Login and profile creation.
- **Home Screen:** Displays announcements and upcoming events.
- **Calendar & Event Booking:** View events, navigate through months, and book/unbook events.
- **Rewards:** Track earned points and view redeemable vouchers.
- **Catalogue:** Search for AED and First Aid box locations.
- **Tutorial & Games:** Access essential learning guides on various emergency topics and engage in "Hazard Watch" game.
- **Profile Management:** View user details and manage emergency contacts and language settings.
- **Voice Report:** Report cases using voice commands.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static types.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Luxon:** A powerful, modern, and friendly wrapper for JavaScript dates and times.
- **Lucide React:** A beautiful and consistent icon toolkit for React.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (Node Package Manager) installed on your machine.

- **Node.js:** [https://nodejs.org/](https://nodejs.org/)
- **npm:** Comes with Node.js

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/riaz1017/Guardian-Webapp.git
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd Guardian-Webapp
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

To run the application in development mode:

```bash
npm start
```

This will start the development server, usually at `http://localhost:3000`. If port 3000 is already in use, it will prompt you to run it on another port (e.g., `http://localhost:3001`).

## Project Structure

- `public/`: Public assets.
- `src/`: Source code for the React application.
    - `src/GuardianApp.tsx`: Main application component containing routing and state management.
    - `src/index.tsx`: Entry point for the React application.
    - `src/index.css`: Global CSS styles.
- `package.json`: Project metadata and dependencies.
- `postcss.config.js`: PostCSS configuration for Tailwind CSS.
- `tailwind.config.js`: Tailwind CSS configuration.
- `tsconfig.json`: TypeScript configuration.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details (if applicable).

## Contact

For any questions or suggestions, please contact [riaz001@e.ntu.edu.sg].
