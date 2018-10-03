import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';

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
      <div className="container">
        <header>
          <h1>Bienvenido a 4 en linea</h1>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
        <Block/>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
})(App);
