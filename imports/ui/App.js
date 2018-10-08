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
import PropTypes from "prop-types";

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      player:null,
      start:false
    };
  }

addPlayer(evt)
{
  evt.preventDefault();

  const pl = Players.findOne({
    name:Meteor.user().username
  });

  if(!pl)
  {
      Players.insert({name:Meteor.user().username});
      this.setState({
      player: Meteor.user().username
      });
  }
  else
  {
    alert("Ya estas inscrito, selecciona a tu oponente");
  }

}

iniciarPartida()
{
  this.setState({
    start:true
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
                  <Block/>
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
      return (<div><li><button class="izq" onClick={this.iniciarPartida.bind(this)} key={r.name}> {r.name} </button><br/><br/></li></div>);
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
  return {
    players:Players.find({}).fetch(),
    user:Meteor.user()
  };
})(App);

