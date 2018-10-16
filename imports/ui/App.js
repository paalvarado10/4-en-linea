import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from "./AccountsUIWrapper";
import Block from './Block.js';
import LeaderBoard from './LeaderBoard.js';
import {Players} from '../api/players.js';
import {Records} from '../api/records.js';
import {Partidas} from '../api/partidas.js';
import PropTypes from "prop-types";

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      player:null,
      start:false,
      hay:false,
      J1:null,
      J2:null,
      ganador:0,
      firts:0
    };



    this.cambiarGanador=this.cambiarGanador.bind(this);
  }

addPlayer(evt)
{
  evt.preventDefault();

  Meteor.call("players.add", Meteor.user().username);
this.setState({
    hay:true
  });


}

iniciarPartida(e)
{

  this.setState({
    start:true
  });

  Meteor.call("partidas.start", e.target.id, (err,x) => {

          this.setState({
            J1:x[0],
            J2:x[1],
            ganador:x[2]
          });
    });
}

hayPartida()
{
  if(this.state.J1 == null)
  {
    Meteor.call("partidas.consultar", Meteor.user().username, (err,hay)=>{
    this.setState({
      start: hay
          });
    });

    if(this.state.start)
    {
      Meteor.call("partidas.darJugadores",Meteor.user().username, (err,x) => {

      console.log(x[0]);
      console.log(x[1]);

            this.setState({
              J1:x[0],
              J2:x[1]
            });
      });
    }
  }

    return this.state.start;

}

showPlayers()
{
  if(Meteor.user())
  {
    return(<div>
                <h1 class="izq"> Jugadores inscritos: </h1>
                <br/>
                
                {
                  this.state.player==null?

                    <button class="izq" onClick={this.addPlayer.bind(this)}> INSCRIBIRME PARA JUGAR </button>
                  :

                  this.state.hay ? <br/>:
                    <h1 class="der"> Ahora selecciona tu oponente </h1>

                }

                <br/>
                
                <br/>
                
                <ul>
                {
                  this.hayPartida() ?
                  <Block J1={this.state.J1} J2={this.state.J2} ganador={this.state.ganador} cambiarGanador={this.cambiarGanador}/>
                  :

                this.renderPlayers()

                }
                </ul>
          </div>);
  }
  else
  {
    Meteor.call("players.eliminar");
    Meteor.call("partidas.eliminarPartida");
    Meteor.call("casillas.eliminarCasillas");
  }
}

cambiarGanador(nuevGan)
{
  this.setState({
    ganador:nuevGan
  });
}

renderPlayers()
  {
    return this.props.players.map((r)=>{
      return (<div><li><button class="izq" id={r.name} onClick={this.iniciarPartida.bind(this)} key={r.name}> {r.name} </button><br/><br/></li></div>);
    });
  }

  render() {
    console.log("EN EL APP");
        console.log(this.props.records);
        console.log("EN EL APP");
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
        <LeaderBoard records={this.props.records}/>
        </div>

          <div className="container">

          {this.showPlayers()}






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


App.propTypes = {
  players:PropTypes.array.isRequired,
  records:PropTypes.array.isRequired,
  user:PropTypes.object
};

export default withTracker(() => {

  Meteor.subscribe("players");
  Meteor.subscribe("partidas");
  Meteor.subscribe("records");

  return {
    players:Players.find({}).fetch(),
    user:Meteor.user(),
    records: Records.find({}).fetch()
  };
})(App);
