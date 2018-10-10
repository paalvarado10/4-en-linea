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
    const r = Records.findOne({
      player1:player1,
      player2:player2,
      winner:winner
    });
      if(r){
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
	},
	"records.getGanadores":function()
	{
    const record = Records.find({}).fetch();
    	return record;
	}
});
