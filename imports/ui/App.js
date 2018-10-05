import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from "./AccountsUIWrapper";
import Task from './Task.js';
import Block from './Block.js';
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  handleSubmit(event) {
  event.preventDefault();

  // Find the text field via the React ref
  const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

  Tasks.insert({
    text,
    createdAt: new Date(), // current time
  });

  // Clear form
  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}
renderTasks() {
  let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
}

  render() {
    return (
      <div>

           <nav class="barra">
                        <a> Bienvenido a 4 en linea </a>
                        <div class="useri">
                          <AccountsUIWrapper/>
                        </div>
                        
           </nav>
           <br />
           <br />
           <br />

        <div class = "App">

          <div className="container">

            { this.props.currentUser ?
              <Block/>:''
            }

          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
