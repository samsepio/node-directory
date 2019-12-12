const express=require('express');
const User=require('../model/database');
const Image=require('../model/database2');
const router=express.Router();

router.get('/',(req,res,next)=>{
	res.render('index');
});
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',async(req,res,next)=>{
	const user = new User(req.body);
	await user.save();
	console.log(user);
	res.redirect('/profile');
});
router.get('/profile',(req,res,next)=>{
	res.render('profile');
});
router.post('/profile',async(req,res,next)=>{
	const image = new Image();
	image.title = req.body.title;
	image.description = req.body.title;
	image.personal = req.body.personal;
	image.favorite = req.body.favorite;
	image.name = req.body.name;
	image.religion = req.body.religion;
	image.filename = req.file.filename;
	image.mimetype = req.file.mimetype;
	image.size = req.file.size;
	image.destination = req.file.destination;
	image.originalname = req.file.originalname;
	image.path = 'img/uploads/'+req.file.filename;
	await image.save();
	console.log(image);
	res.redirect('/directory');
});

module.exports=router;
