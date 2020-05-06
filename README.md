# Yummeek

Did you ever wish to know how much calories and nutrients in your favourite recipe? Do you want to make your diet more balanced? Yummeek can help you make healthier choices when planning you meals.
Yummeek is a meal planner app that allows you to search recipes with keyword and health labels, and add recipes to your weekly meal plan dashboard. Daily and weekly stats help you to analyze your diet and keep track on how much nuthrients you consume every day more easily.

## Screenshots

Home page

!["Home Page"](https://github.com/wangxx1412/yumeek/blob/master/client/src/assets/image/homepage.png)

Detail page

!["Detail page"](https://github.com/wangxx1412/yumeek/blob/master/client/src/assets/image/details.png)

Dashboard

!["Dashboard"](https://github.com/wangxx1412/yumeek/blob/master/client/src/assets/image/dashboard.png)

## Tech Stack

Front-end

- React
- React Router
- Typescript
- Axios

Back-end

- Ruby on Rails

Database

- PostgreSQL

## Setup

1. In one terminal, run `bundle` to install the dependencies. Run `bin/rake db:setup` to create the databases (called rails_project_development by default). Run `bin/rails s` to run the server.
2. In the other terminal, `cd` into `client`. Run `npm install`. Rename the `.env.example` file to be called `.env` and add your API info. Then run `npm start` and go to `localhost:3000` in your browser.

## Running Webpack Development Server

```sh
cd client
npm start
```

## Running Jest Test Framework

```sh
cd client
npm test
```

## API Authorization

1. Edamam: https://developer.edamam.com/edamam-recipe-api

- Register & Create an app
- Add API key to .env file inside the client folder as REACT_APP_APP_ID, REACT_APP_APP_KEY

2. EmailJS: https://www.emailjs.com/docs/sdk/installation/

- Register for API key and store it in .env file as REACT_APP_USER_ID_EMAILJS, REACT_APP_TEMPELATE_ID_EMAILJS

## Dependencies

- React Chart
- React DnD
- React Router
- React Circular Progressbar
- Material-UI
- EmailJS
- Classnames
- BCrypt
- PostgreSQL

## Contributors

- [Xiaoxuan Wang](https://github.com/wangxx1412)
- [Zhao Wang](https://github.com/Joe123123)
- [Anna Gordon](https://github.com/Anna-Gordon)
