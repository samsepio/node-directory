const express=require('express');
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose');
const engine=require('ejs');
const multer=require('multer');
const {format}=require('timeago.js');
const uuid=require('uuid/v4');
const app=express();

mongoose.connect('mongodb+srv://walter:3219329910@database1-wegwd.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

app.set('puerto',process.env.PORT || 8000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
	destination: path.join(__dirname,'public/img/uploads'),
	filename: (req,file,cb,filename) => {
		cb(null, uuid() + path.extname(file.originalname));
	}
});
app.use(multer({
	storage
}).single('image'));
//creamos una variable que sea accesible desde cualquier lugar de la aplicacion la cual se llamara format y le pasamos format que ya lo habiamos requierido esto para despues pasarselo a la vistas
app.use((req,res,next)=>{
	app.locals.format = format;
	next();
});
app.use(require('./routes'));

app.use(express.static(path.join(__dirname,'./public')));

app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutandose en el puerto ${app.get('puerto')}`);
});
