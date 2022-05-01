var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var TeamSchema = new Schema(
    {
        name:{type:String, required: true},
        players:[{type: Schema.Types.ObjectId, ref: 'Player'}],
    }
);

TeamSchema
.virtual('url')
.get(function(){
    return '/league/team/'+this._id;
})

module.exports = mongoose.model('Team',TeamSchema)