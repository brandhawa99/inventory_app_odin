var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LeagueSchema = new Schema(
    {
        name: {type:String, required:true, minlength:3},
        teams: [{type: Schema.Types.ObjectId, ref:'Team'}]

    }
);

LeagueSchema
.virtual('url')
.get(function(){
    return '/league/leagues/'+ this._id;
});


module.exports = mongoose.model('League', LeagueSchema);