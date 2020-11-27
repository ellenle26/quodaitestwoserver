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

How did you implement styling? What are the pros and cons? Why did you chose this approach?<br/>
--> Using unordered list for issue list and ordered list for highlight list, using flex box to align items.<br/>
Pros: sample, easy to see.<br/>
This is a simple app, so I decided to make it as simple as possible.

<br/>
How did you share state between components? What are the pros and cons? Why did you chose this approach?<br/>
--> Transfering state as props to share between component.<br/>
Pros: simple. Cons: if the project has bigger scale, transfering state as props is hard to keep track on.<br/>
Because of the simplicity of this app, transfering state as props is more convenient.

<br/>
Did you use React hooks? Why or why not?
What would you improve?
How did you prevent wasted renders?
How did you handle side-effects (e.g. data fetching)? What are the pros and cons? Why did you chose this approach?
