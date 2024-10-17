# tenzies
Tenzies is a fast-paced dice game where the goal is to roll and match all dice to the same number. Players can select dice to "freeze" their current value while re-rolling the remaining ones. The goal is to win in the fewest rolls and the shortest time. This project was created following the [React Scrimba course](https://v2.scrimba.com/learn-react-c0e), with several additional features implemented beyond the original version.

### Tech used
![Static Badge](https://img.shields.io/badge/React-grey?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Static Badge](https://img.shields.io/badge/Vite-%23646CFF?style=for-the-badge&logo=vite&logoColor=yellow)

## Usage
### Getting started
1. clone the repository
2. navigate to the project directory
3. install dependencies: `npm install`
4. start the server: `npm run dev`

### Game rules
1. The goal of the game is to roll the dice until all carry the same number.
2. When the app first loads, a set of dice along with a 'Roll' button is displayed on the screen.
3. Once the player selects any dice to 'freeze' them, the time starts.
4. Clicking the 'Roll' button will reroll all dice that are not 'frozen'.
5. The player continues to select dice with the same value and rerolling the rest of the dice that don't match. Once all dice match, the game is won.
6. If previous best time is beaten, it is saved and displayed on the screen.
7. New game is started by clicking the 'New Game' button.

## Features
* track the number of rolls
* track the time it takes to win a game
* save the best time in local storage and display it on the page
* time won't start until a first dice is selected

## Optimizations
Planned future optimizations include:
* save the best rolls stat as well and display it on the page
* implement light/dark mode
* users can clear best scores

## Lessons Learned
This project provided valuable hands-on experience with core React concepts and best practices. Among the skills I learned were following:
* React props
* React hooks
* event handling in React
* conditional rendering in React
