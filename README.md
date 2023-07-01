# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
# Vesting Contract DApp with React, MetaMask, and Ether.js

![Vesting Contract DApp](https://example.com/path/to/screenshot.png)

Welcome to the Vesting Contract DApp repository! This project is a decentralized application (DApp) built using React, MetaMask, and Ether.js, demonstrating a vesting contract implemented in Solidity.

## What is Vesting?

Vesting is a mechanism used in smart contracts to release tokens or assets over a period of time, instead of providing immediate access upon receiving them. Vesting contracts are commonly used for token distribution to team members, investors, or other stakeholders, ensuring that the recipients cannot sell or transfer their tokens all at once.

In a typical vesting contract, tokens are locked for a specific duration, and a certain percentage of the tokens become available for withdrawal at regular intervals until the vesting period is complete.

## Technologies Used

This project utilizes the following technologies:

- React: A JavaScript library for building user interfaces. React is used for creating the frontend of the DApp, allowing users to interact with the vesting contract.

- MetaMask: A browser extension that enables users to interact with Ethereum blockchain applications directly from their browsers. MetaMask provides the necessary wallet functionalities to interact with the vesting contract.

- Ether.js: A JavaScript library for interacting with the Ethereum blockchain. Ether.js simplifies the process of sending transactions and interacting with smart contracts from within the DApp.

- Solidity: Solidity is the programming language used to write the vesting contract. It defines the rules for token vesting and is executed on the Ethereum blockchain.

## Prerequisites

Before running the Vesting Contract DApp, make sure you have the following prerequisites installed:

- MetaMask: Install the MetaMask extension for your browser and create an Ethereum account or import an existing one.

## Installation Guide

Follow these steps to run the Vesting Contract DApp:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/vesting-contract-dapp.git
Install dependencies:


cd vesting-contract-dapp
npm install
Configure MetaMask:

Open MetaMask in your browser.
Connect to the Ethereum test network (e.g., Ropsten or Kovan).
Import the Ethereum account created in MetaMask.
Deploy the Vesting Contract:

Deploy the vesting contract to the test network using Truffle or Remix IDE.
Note the deployed contract address.
Configure the DApp:

In the src/contracts folder, update the VestingContractAddress constant in VestingContract.js with the deployed contract address.
Start the DApp:

npm start
Access the DApp:

Open your browser and go to http://localhost:3000 to access the Vesting Contract DApp.
Screenshots
Screenshot 1
![alt](https://github.com/VivekKadvani/React_Project/blob/master/screenshots/Screenshot%202023-07-01%20144621.png)

Screenshot 2
![screenshots](https://github.com/VivekKadvani/React_Project/blob/master/screenshots/Screenshot%202023-07-01%20144758.png)

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create a pull request or submit an issue.
