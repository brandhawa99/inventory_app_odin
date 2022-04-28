var mongoose = require('mongoose');
var { DateTime} = require('luxon');

var Schema = mongoose.Schema;

var PlayerSchema = new Schema(
    {
        first_name: {type:String, required:true},
        last_name: {type:String, required:true},
        birthday: {type:Date, required:true},
        team:{type: Schema.Types.ObjectId, ref: 'Team'},
        position:{type: String},
        goals:{type: Number,default:0},
    }
);

PlayerSchema
.virtual('url')
.get(function(){
    return '/league/players/'+this._id
});

PlayerSchema
.virtual('name')
.get(function(){
    var fullName = '';
    if(this.first_name && this.last_name){
        fullName = this.last_name+", "+this.first_name;
    }
    return fullName;
})

PlayerSchema
.virtual('birthday_formatted')
.get(function(){
    let date =  DateTime.fromJSDate(this.birthday).toLocaleString(DateTime.DATE_MED);
    return date;
})

module.exports = mongoose.model('PlayerSchema', PlayerSchema);