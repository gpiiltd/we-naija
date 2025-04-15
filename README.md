# WE-NAIJA FRONTEND

Frontend application of the We-naija project.

See more about the [we-naija](https://gpixyz.atlassian.net/wiki/spaces/IRS/pages/180060400/Product+requirements+For+Nigeria+Solidarity+Support+Fund+NSSF) project.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Authorization](#authorization)
- [Contributing](#contributing)

## Technologies Used

This project is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **gpi-ui-library**: A custom GPI npm package used for UI components (requires authorization).

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gpiiltd/we-naija.git
   ```

2. Navigate to the project directory:

   ```bash
   cd we-naija
   ```

3. Create a `.npmrc` file in the home directory:

   ```bash
   nano .npmrc
   ```

4. Add the following lines to the `.npmrc` file:

   ```
   registry=https://registry.npmjs.org/
   @gpiiltd:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=YOUR_AUTH_TOKEN
   ```

   Replace `YOUR_AUTH_TOKEN` with your actual GitHub token.

5. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Authorization

This project uses an npm package called **UI Library**. You need authorization to access this package. Follow the steps in the **Installation** section to create the `.npmrc` file and input the necessary credentials.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b <JIRACODE>
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "<JIRACODE> | <commit-type> : <message description>"
   ```
4. Push to the branch:
   ```bash
   git push origin -u <JIRACODE>
   ```
5. Open a pull request.
