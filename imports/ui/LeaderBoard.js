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
      best:"",
      rec:""
    };
    this.renderList=this.renderList.bind(this);
  }
  renderList()
  {
    Meteor.call("records.getGanadores", (err, records)=>{
      if(records)
      {
        this.setState({rec:records});
        console.log("Lista de records: "+records);
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
    });
    return (
    <table>
    <tr><th>Ganador</th><th>Jugador 1</th><th>Jugador 2</th></tr>
    </table>
  );
  }
  render() {
    let r = this.state.rec;
    if (r){
      console.log(r);
    }
    console.log(this.props.records+" IMPRIMIENDO RECORDS DEL PROPS");
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
    players:Records.find({}).fetch(),
  };
})(LeaderBoard);
