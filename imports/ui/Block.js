import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import { withTracker } from 'meteor/react-meteor-data';
import Square from './BoardComponents/Square.js';
import RowB from './BoardComponents/RowB.js';
import './App.css';
import { Meteor } from "meteor/meteor";
import {Partidas} from '../api/partidas.js';
import {Casillas} from '../api/casillas.js';
import {Records} from '../api/records.js';

import PropTypes from "prop-types";

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row1: [0,0,0,0,0,0],
      row2: [0,0,0,0,0,0],
      row3: [0,0,0,0,0,0],
      row4: [0,0,0,0,0,0],
      row5: [0,0,0,0,0,0],
      row6: [0,0,0,0,0,0],
      row7: [0,0,0,0,0,0],
      row8: [0,0,0,0,0,0],
      player: 1,
      turno:null,
      vecino: 0,
      winner: ""
    };
    this.setMove1=this.setMove1.bind(this);
    this.setMove2=this.setMove2.bind(this);
    this.setMove3=this.setMove3.bind(this);
    this.setMove4=this.setMove4.bind(this);
    this.setMove5=this.setMove5.bind(this);
    this.setMove6=this.setMove6.bind(this);
    this.setMove7=this.setMove7.bind(this);
    this.setPlayer=this.setPlayer.bind(this);
    this.evaluateH=this.evaluateH.bind(this);
    this.acabar=this.acabar.bind(this);
  }
  evaluateH(){
    let m =[7];
    m[0]=this.state.row1;
    m[1]=this.state.row2;
    m[2]=this.state.row3;
    m[3]=this.state.row4;
    m[4]=this.state.row5;
    m[5]=this.state.row6;
    m[6]=this.state.row7;
    let col=[];
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 7; j++) {
        let x =m[j];
        col.push(x[i]);
      }
      let p1=0;
      let p2=0;
      let last=0;
      // ya puede revisar columna
      for (var j = 0; j < col.length; j++) {
        console.log("p1: "+p1+" p2: "+p2+" last: "+last);
        if(last===0 && col[j]!=0){
          last=col[j];
          if(col[j]===1){
            p1=1;
            p2=0;
          }
          else {
            p2=1;
            p1=0;
          }
        }
        else if(last === 1){
          if(col[j]===1){
              p1++;
              p2=0;
          }
          else if(col[j]===2){
            p1=0;
            last=2;
            p2++;
          }
          else {
            p1=0;
            p2=0;
            last=0;
          }
        }
        else if(last === 2){
          if(col[j]===2){
            p2++;
            p1=0;
          }
          else if(col[j]===1){
            p2=0;
            p1++;
            last=1;
          }
          else {
            p1=0;
            p2=0;
            last=0;
          }
        }
        if(p1===4 || p2===4){
          if(p1===4){
            //alert("Gana el jugador P1");
            this.setState({winner: 1});
            this.props.cambiarGanador(this.state.winner);
          }
          else {
            //alert("Gana el jugador P2");
            this.setState({winner: 2});
            this.props.cambiarGanador(this.state.winner);
          }
        }
      }
    }
  }


   evaluateV(){
    let filas =[7];
    filas[0]=this.state.row1;
    filas[1]=this.state.row2;
    filas[2]=this.state.row3;
    filas[3]=this.state.row4;
    filas[4]=this.state.row5;
    filas[5]=this.state.row6;
    filas[6]=this.state.row7;


    for(var i = 0; i < 7; i++)
    {

    let m =filas[i];
      let p1=0;
      let p2=0;
      let last=0;
      for (var j = 0; j < m.length; j++) {
        if(last===0 && m[j]!=0){
          last=m[j];
          if(m[j]===1){
            p1=1;
            p2=0;
          }
          else {
            p2=1;
            p1=0;
          }
        }
        else if(last === 1){
          if(m[j]===1){
              p1++;
              p2=0;
          }
          else if(m[j]===2){
            p1=0;
            last=2;
            p2++;
          }
          else {
            p1=0;
            p2=0;
            last=0;
          }
        }
        else if(last === 2){
          if(m[j]===2){
            p2++;
            p1=0;
          }
          else if(m[j]===1){
            p2=0;
            p1++;
            last=1;
          }
          else {
            p1=0;
            p2=0;
            last=0;
          }
        }
        if(p1===4 || p2===4){
          if(p1===4){
            //alert("Gana el jugador P1");
            this.setState({winner: 1});
          }
          else {
            //alert("Gana el jugador P2");
            this.setState({winner: 2});
          }
        }
      }
    }

  }

  evaluateD()
  {
    let filas =[7];
    filas[0]=this.state.row1;
    filas[1]=this.state.row2;
    filas[2]=this.state.row3;
    filas[3]=this.state.row4;
    filas[4]=this.state.row5;
    filas[5]=this.state.row6;
    filas[6]=this.state.row7;

    let matriz = new Array(6);


    for(var i = 0; i < 7; i++)
    {
      matriz[i] = new Array(7)
    }

    for(var i = 0; i < 7; i++)
    {
      let fila = filas[i];
      for(var j = 0; j < 6; j++)
      {
        matriz[i][j] = fila[j];
      }
    }


    for(var i = 0; i < 7; i++)
    {
      for(var j = 0; j < 6; j++)
      {
        if(matriz[i][j] == 1)
        {
            //Derecha arriba para P1
            let x = i+1;
            let y =  j-1;
            if( x < 7 && y >=0 && matriz[x][y] == 1)
            {
              //Dos
              x++;
              y--;
              if( x < 7 && y>=0 && matriz[x][y] == 1)
              {
                //Tres
                x++;
                y--;
                if( x < 7 && y >=0 && matriz[x][y] == 1)
                {
                  //Cuatro, gano
                  alert("Gana el jugador P1");
                  this.setState({winner: 1});
                }
              }
            }

            //Izquierda arriba para P1

            let xi = i-1;
            let yi =  j-1;
            if( xi >= 0 && yi >=0 && matriz[xi][yi] == 1)
            {
              //Dos
              xi--;
              yi--;
              if( xi >= 0 && yi>=0 && matriz[xi][yi] == 1)
              {
                //Tres
                xi--;
                yi--;
                if( xi >= 0 && yi >=0 && matriz[xi][yi] == 1)
                {
                  //Cuatro, gano
                  alert("Gana el jugador P1");
                  this.setState({winner: 1});
                }
              }
            }

        }
        else if(matriz[i][j] == 2)
        {
          //Derecha arriba para P2
          let x = i+1;
          let y =  j-1;
          if( x < 7 && y >=0 && matriz[x][y] == 2)
          {
            //Dos
            x++;
            y--;
            if( x < 7 && y>=0 && matriz[x][y] == 2)
            {
              //Tres
              x++;
              y--;
              if( x < 7 && y >=0 && matriz[x][y] == 2)
              {
                //Cuatro, gano
                alert("Gana el jugador P2");
                this.setState({winner: 2});
              }
            }
          }

          //Izquierda arriba para P2

            let xi = i-1;
            let yi =  j-1;
            if( xi >= 0 && yi >=0 && matriz[xi][yi] == 2)
            {
              //Dos
              xi--;
              yi--;
              if( xi >= 0 && yi>=0 && matriz[xi][yi] == 2)
              {
                //Tres
                xi--;
                yi--;
                if( xi >= 0 && yi >=0 && matriz[xi][yi] == 2)
                {
                  //Cuatro, gano
                  alert("Gana el jugador P2");
                  this.setState({winner: 2});
                }
              }
            }
        }
      }
    }

  }
//-------------------------------------------------------------------------------------------------------------
  setPlayer(){
    let player = this.state.player;
    let nuevo;
    console.log(player);
    if(player===1){
      nuevo=2;
    }
    else{
      nuevo=1;
    }

    this.setState({player:nuevo},()=>{this.evaluateH();this.evaluateV();this.evaluateD();console.log(player+" JUGADOR CAMBIADO A "+this.state.player);});
  };


  //***************************************************************************************************
  setMove1(row, winner){
    let player=this.state.player;
    if(winner!=""){
      this.setState({row1: row, winner: winner});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row1: row});
    }
     //this.setState({vecino:1});
    this.setPlayer();
  };
  setMove2(row, winner){
    let player=this.state.player;

    if(winner!=""){
      this.setState({row2: row, winner: winner},()=>{this.setPlayer();});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row2: row},()=>{this.setPlayer();});
    }

  };
  setMove3(row, winner){
    let player=this.state.player;

    if(winner!=""){
      this.setState({row3: row, winner: winner},()=>{this.setPlayer();});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row3: row},()=>{this.setPlayer();});
    }

  };
  setMove4(row, winner){
    let player=this.state.player;

    if(winner!=""){
      this.setState({row4: row, winner: winner},()=>{this.setPlayer();});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row4: row},()=>{this.setPlayer();});
    }

  };
  setMove5(row, winner){
    let player=this.state.player;

    if(winner!=""){
      this.setState({row5: row, winner: winner},()=>{this.setPlayer();});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row5: row},()=>{this.setPlayer();});
    }

  };
  setMove6(row, winner){
    let player=this.state.player;
    if(winner!=""){
      this.setState({row6: row, winner: winner},()=>{this.setPlayer();});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row6: row},()=>{this.setPlayer();});
    }
  };
  setMove7(row, winner){
    let player=this.state.player;
    if(winner!=""){
      this.setState({row7: row, winner: winner},()=>{this.setPlayer();});
      //alert("Gana el jugador P"+player);
    }
    else {
      this.setState({row7: row},()=>{this.setPlayer();});
    }
  };
  win(){
    let winner =this.state.winner;
  }

  acabar()
  {
      Meteor.call("partidas.eliminarPartida");
      Meteor.call("casillas.eliminarCasillas");

      this.setState({
        winner:0
      });
  }

  tablero(){

    let winnerInicial = this.props.ganador;

    let winner =this.state.winner;

    if(winner==0 || winnerInicial==0)
    {

        let player = this.state.player;
        let vecino = this.state.vecino;
        this.props.cambiarGanador(1);
        let turno = null;
        if(player == 1)
        {
          turno=this.props.J1;
        }
        else
        {
          turno=this.props.J2;
        }

        if(player!=0){
          return (<div><h2> {this.props.J1} VS  {this.props.J2} </h2>
            <div><h2>{"Jugador "+player+ " ("+turno+") "+ " en turno"}</h2>
                  <br/>
            <br/>
            <div className="container-block">
              <RowB setMove={this.setMove1} player={player} num={1} vec={vecino} setNA={this.setNA}/>
              <RowB setMove={this.setMove2} player={player} num={2} vec={vecino} setNA={this.setNA}/>
              <RowB setMove={this.setMove3} player={player} num={3} vec={vecino} setNA={this.setNA}/>
              <RowB setMove={this.setMove4} player={player} num={4} vec={vecino} setNA={this.setNA}/>
              <RowB setMove={this.setMove5} player={player} num={5} vec={vecino} setNA={this.setNA}/>
              <RowB setMove={this.setMove6} player={player} num={6} vec={vecino} setNA={this.setNA}/>
              <RowB setMove={this.setMove7} player={player} num={7} vec={vecino} setNA={this.setNA}/>
            </div></div></div>);
        }
        else {
          return (<div><h2>{"Iniciando partida"}</h2>
                  <br/>
            <br/>
            <div className="container-block">
              <RowB setMove={this.setMove1} player={player}/>
              <RowB setMove={this.setMove2} player={player}/>
              <RowB setMove={this.setMove3} player={player}/>
              <RowB setMove={this.setMove4} player={player}/>
              <RowB setMove={this.setMove5} player={player}/>
              <RowB setMove={this.setMove6} player={player}/>
              <RowB setMove={this.setMove7} player={player}/>
            </div></div>);
          }
    }
    else
    {
      //
let gan = null;
let p1 = this.props.J1;
let p2 = this.props.J2;
      if(this.state.winner == 1)
      {
        gan = this.props.J1;
      }
      else
      {
        gan = this.props.J2;
      }

      if(this.state.winner != 0)
      {
        Meteor.call("partidas.consultar", (err, res)=>{
          if(!res)
          {
            this.setState({
              winner:0
               });
          }
        });
      }
      console.log("Lo esta Guardando: Player1: "+p1+", Player2: "+p2+", Winner: "+ gan);
      Meteor.call("records.nuevoGanador",p1,p2,gan   ,(res)=>{if(err){console.log("ERRORRRR: "+err);}else{console.log("SUCCESS: "+res)}});
      return(<div><h1>La partida terminó, ganó {gan}</h1><button onClick={this.acabar}>Revancha</button></div>);
    }
  }


  render(){
    let winner= this.state.winner;
    let player= this.state.player;
    console.log(player+" ENVIANDO JUGADOR "+player);
    return(
      <div className="block">
        {this.tablero()}
      </div>
    );
  }
}

Block.propTypes = {
  casillas:PropTypes.array.isRequired,
  records:PropTypes.array
};

export default withTracker(() => {

Meteor.subscribe("partidas");
  Meteor.subscribe("casillas");
  Meteor.subscribe("records");
  return {
    casillas:Casillas.find({}).fetch(),
    records: Records.find({}).fetch()
  };
})(Block);
