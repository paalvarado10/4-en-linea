import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Records = new Mongo.Collection('records');

if(Meteor.isServer)
{
	Meteor.publish("records", ()=>{
		return Records.find({});
	});
}

Meteor.methods(

{
	"records.nuevoGanador":function(player1, player2, winner)
	{
    console.log("Lo esta Guardando: Player1: "+player1+", Player2: "+player2+", Winner: "+ winner);
    const r = Records.findOne({
      player1:player1,
      player2:player2,
      winner:winner
    }, (res)=>{
      console.log("ESTE ES EL RESULTADO DEL FIND ONE=> "+res+" <= PILAS");
      if(res){
        console.log("Ya lo guardo");
        return "err: Ya lo guardo";
      }
      else
      {
        Records.insert({
         player1:player1,
         player2:player2,
         winner:winner
       });
       return "success: Guardado correctamente";
      }
    });
	},
	"records.getGanadores":function()
	{
    	return Records.find({});
	}
});
