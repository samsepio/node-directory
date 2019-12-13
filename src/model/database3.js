const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const comentarySchema = new Schema({
	name:{type: String},
	comentary:{type: String},
	created_at: {type: Date, default: Date.now}
});

module.exports=mongoose.model('comentarys',comentarySchema);
