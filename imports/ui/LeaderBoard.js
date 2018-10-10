import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper";
import {Records} from '../api/records.js';
import PropTypes from "prop-types";
// App component - represents the whole app
class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      best:""
    };
  }
  renderList()
  {
    let records = this.props.records;
    console.log("Lista de records: "+records);
    console.log("Lista de records v2: "+this.state.records);
    let list = records.map((rec)=>{
      return(<tr><td>{rec.winner}</td><td>{rec.player1}</td><td>{rec.player2}</td></tr>)
    });
    return (
      <table>
      <tr><th>Ganador</th><th>Jugador 1</th><th>Jugador 2</th></tr>
      {list}
      </table>
    );
  }
  render() {
    return (
      <div>
      <h2>Lista de Partidas Jugadas</h2>
      {this.renderList()}
      </div>
    );
  }
}


LeaderBoard.propTypes = {
  records:PropTypes.array.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe("records");
  return {
    players:Records.find({})
  };
})(LeaderBoard);
