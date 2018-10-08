import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Partidas = new Mongo.Collection('partidas');

if(Meteor.isServer)
{
	Meteor.publish("partidas", ()=>{
	return Partidas.find({});
	});	
}

Meteor.methods(
{
	"partidas.start":function(name){

		const par = Partidas.findOne({
		    J1:Meteor.user().username,
		    J2:name
		  });

		  if(!par)
		  {
		    Partidas.insert({
		      J1:Meteor.user().username,
		      J2:name,
		      actual:true
		    })
		    alert("Partida insertada")
		  }

		  const jugadores = [2];
		  jugadores[0]= Meteor.user().username
		  jugadores[1]= name;

		  return jugadores;
	}
});
