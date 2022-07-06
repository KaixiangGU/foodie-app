# Foodie App

## About Project

This app is called "Foodie", it's a simple recipe app that allows users to create, update, delete and like recipes.<br>
This is my first time that I built a MERN stack app. It really helps me to understand how frontend and backend are connected each other and how database works.
**[See Live Version](https://app-foodie.netlify.app/)**

### Built With

#### Frontend:

React.js, Redux, Material UI, React Router, Axios

#### Backend:

Node.js, Express

#### Database:

MongoDB

### Screenshots

![Index page](client/src/images/screenshot1.png "home page")
![product page](client/src/images/screenshot2.png)
![checkout page](client/src/images/screenshot3.png)

### Key Features

- Multistep recipe form
- Create and post new recipe
- Delete recipe
- Edit posted recipes
- Add favorite recipes
- Show faorite recipes
- Recipe details page

### Potential features in the future

- User authentication
- Upload multiple images when create recipe
- Recipes Pagination
- Ratings
- Search recipe
- User comments
- Beautifully designed welcome page

## Getting Started

### Usage

1. Clone the Repo

```bash
git clone https://github.com/KaixiangGU/foodie-app.git
```

2. Set Env Variables<br/>
   Create a .env file in the server folder and add following below

```bash
MONGODB_CONNECTION_URL = your MongoDB url
```

3. Install NPM packages (Frontend & Backend)

```bash
cd client
npm install
cd server
npm install
```

First, run the development server:

```bash
Frontend & Backend
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
