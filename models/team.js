var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var TeamSchema = new Schema(
    {
        name:{type:String, required: true},
        players:[{type: Schema.Types.ObjectId, ref: 'Player'}],
        wins:{type:Number, default:0},
        loss:{type:Number, default:0}
    }
);

TeamSchema
.virtual('url')
.get(function(){
    return '/league/team/'+this._id;
})

module.exports = mongoose.model('Team',TeamSchema)