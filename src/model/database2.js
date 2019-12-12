const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const imageSchema = new Schema({
	title:{type: String},
	description:{type: String},
	name:{type: String},
	religion:{type: String},
	personal:{type: String},
	favorite:{type: String},
	originalname:{type: String},
	destination:{type: String},
	filename:{type: String},
	mimetype:{type: String},
	path:{type: String},
	size:{type: Number},
	created_at: {type: Date, default: Date.now}
});

module.exports=mongoose.model('Image',imageSchema);
