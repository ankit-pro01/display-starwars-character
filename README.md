# Star Wars Characters App.

App link : https://velvety-trifle-ae1797.netlify.app/

It is a react typescript project which is for displaying all the characters of star wars from https://swapi.dev/ api's.
and allows the user to add characters to a favourites list and edit some of thier attributes. I have also used https://starwars-visualguide.com/assets/img/characters for taking the imageURl of star wars characters.

## Technologies
Project is created with:
* React version: ^18;
* react-router-dom version: ^6.3
* bootstrap": ^5.1.3"

## Project Overview
Ir has four Views Homepage, CharactersListView, CharactersDetailsView, FavourtiesView
* Homepage: In Home page there is an starwars bannrer.From Navbar we can navigate to the different views of this website.
* Characters ListView: In this view all the characters are paginated on the basis of 10 character per page. In this view we can search any apecific character from star wars universe.
* Characters DetailsView": It shows all the details of an individual character on a page. from here we can add our favoutie characters to our         favourities list.
* Favourties View: This consists of all the favourities character that can bd added from details Characters Details View. In this page we can amend the height and gender attribute of the character.

## Next action item and Improvements
I did not got much time to work on this , completely forgot to ad  the unit test cases for components will be focus on writing the unit test cases for this project.
Will add the functionality so that character can be added to favourities list from listview page only instead of going to details page.



## Set Up
```
  $cd ../my-app
  @cd npm install
  @cd npm start
  
```
Project with start [http://localhost:3000];


if creating a new Project follow below instructions.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
