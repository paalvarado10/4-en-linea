import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper";
import {Records} from '../api/records.js';
import PropTypes from "prop-types";
export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      best:"",
      rec:""
    };
    this.renderList=this.renderList.bind(this);
  }
      renderList(list)
    {
      console.log(list);
      console.log(" records en el props ");
      console.log(this.props.records);
    let records = list;
      if(records)
      {
        console.log("dentro del map: "+records);
        let list = records.map((rec, i)=>{
          console.log("dentro del map: "+i);
          console.log(rec);
          return(<tr><td>{rec.winner}</td><td>{rec.player1}</td><td>{rec.player2}</td></tr>)
        });
        return (
          <table>
          <tr><th>Ganador</th><th>Jugador 1</th><th>Jugador 2</th></tr>
          {list}
          </table>
        );
      }
      else
      {
        return (
        <table>
        <tr><th>Ganador</th><th>Jugador 1</th><th>Jugador 2</th></tr>
        </table>
        );
      }
  }
  render() {
    let dataAvaible = true;
    let records =this.props.records
    console.log("en el LeaderBoard");
    console.log(records);
    console.log("en el LeaderBoard");
    if(records === undefined)
    {
      dataAvaible= false;
    }
    console.log(records);
    let recordAvaible = (dataAvaible && records);
    return (
      <div>
      <h2>Lista de Partidas Jugadas</h2>
<div className="container">
      <table>
        <td>
          <th>
          Ganador i
          </th>
          <th>
          Jugador 1
          </th>
          <th>
          Jugador 2
          </th>
        </td>
        {this.props.records.map((record, i)=>
          <td key={i}>
            <th>
            {record.winner}
            </th>
            <th>
            {record.player1}
            </th>
            <th>
            {record.player2}
            </th>
          </td>
        )}
      </table>
</div>
    {recordAvaible ? this.renderList(records): null}
      </div>
    );
  }
}
