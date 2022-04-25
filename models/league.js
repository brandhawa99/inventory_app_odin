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
    return '/leage/'+this.name+"/"+ this._id;
});


module.exports = mongoose.model('Book', LeagueSchema);