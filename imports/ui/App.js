import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from "./AccountsUIWrapper";
import Task from './Task.js';
import Block from './Block.js';
import {Players} from '../api/players.js';
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
      J1:null,
      J2:null
    };
  }

addPlayer(evt)
{
  evt.preventDefault();

  Meteor.call("players.add", Meteor.user().username);

  

}

iniciarPartida(e)
{

  this.setState({
    start:true
  });

  Meteor.call("partidas.start", e.target.id, (err,x) => {
    
          this.setState({
            J1:x[0],
            J2:x[1]
          });
    });

  
}

showPlayers()
{
  if(Meteor.user())
  {
    return(<div>
                <h1 class="izq"> Jugadores inscritos: </h1>
                <p></p>
                <br/>
                <p></p>
                {
                  this.state.player==null?
                  
                    <button class="izq" onClick={this.addPlayer.bind(this)}> INSCRIBIRME PARA JUGAR </button>
                  :

                  this.state.start ? <br/>:
                    <h1 class="der"> Ahora selecciona tu oponente </h1>
                  
                }
                
                <br/>
                <p></p>
                <br/>
                <p></p>
                <ul>
                {
                  this.state.start?
                  <Block J1={this.state.J1} J2={this.state.J2}/>
                  :

                this.renderPlayers()

                }
                </ul>
          </div>);
  }
}

renderPlayers()
  {
    return this.props.players.map((r)=>{
      return (<div><li><button class="izq" id={r.name} onClick={this.iniciarPartida.bind(this)} key={r.name}> {r.name} </button><br/><br/></li></div>);
    });
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
  user:PropTypes.object
};

export default withTracker(() => {

  Meteor.subscribe("players");
  Meteor.subscribe("partidas");

  return {
    players:Players.find({}).fetch(),
    user:Meteor.user()
  };
})(App);

