# QuodAi Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

React/React-redux/Redux-thunk/thunk : to manage state.
Socket.io-client : to handle "real time" notification and highlight.

## Set up

1.``npx create-react-app "appname"``<br/>
2. ``npm install react-redux redux-thunk thunk socket.io-client``

## Cloning

``gitclone https://github.com/ellenle26/quodai.git``

## Technical decision

1. How did you implement styling? What are the pros and cons? Why did you chose this approach?<br/>
--> Using unordered list for issue list and ordered list for highlight list, using flex box to align items.<br/>
Pros: sample, easy to see.<br/>
This is a simple app, so I decided to make it as simple as possible.

<br/>
2. How did you share state between components? What are the pros and cons? Why did you chose this approach?<br/>
--> Transfering state as props to share between component.<br/>
Pros: simple. Cons: if the project has bigger scale, transfering state as props is hard to keep track on.<br/>
Because of the simplicity of this app, transfering state as props is more convenient.<br/>

<br/>
3. Did you use React hooks? Why or why not?<br/>
--> Yes. Because it is easier to declare state and using function.<br/>

<br/>
4. What would you improve?<br/>
--> Adding highlights to local storage so reloading page won't affect the list.<br/>

<br/>
5. How did you prevent wasted renders?<br/>
--> Devide each render part to separated components. Like, issue list is a component, and highlight list is another component, so when i change pages, highlight list don't render again.<br/>

<br/>
6. How did you handle side-effects (e.g. data fetching)? What are the pros and cons? Why did you chose this approach?<br/>
--> Using hooks useEffect to fetch data as we want to see issue list from beginning. And, pass an array as an optional second argument to useEffect() so as to re-render if any value in that argument change.<br/>
Pros: Auto re-render when something change.<br/>
I choose this approach because it has the ability to perform side effects from a function use dependencies argument to control when the side-effect should run.
