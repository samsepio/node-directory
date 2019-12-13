const express=require('express');
const User=require('../model/database');
const Image=require('../model/database2');
const Comentary=require('../model/database3');
const {unlink}=require('fs-extra');
const path=require('path');
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
	image.path = '/img/uploads/'+req.file.filename;
	await image.save();
	console.log(image);
	res.redirect('/directory');
});
router.get('/delete/:id',async(req,res,next)=>{
	const {id} = req.params;
	const image = await Image.findByIdAndDelete(id);
	unlink(path.resolve('./src/public/'+image.path));
	res.redirect('/directory');
});
router.get('/comentary/:id',async(req,res,next)=>{
	const comentarys = await Comentary.find();
	console.log(comentarys);
	res.render('comentary',{
		comentarys
	});
});
router.post('/comentary',async(req,res,next)=>{
	const comentary = new Comentary(req.body);
	await comentary.save();
	console.log(comentary);
	res.redirect('/directory');
});
router.get('/like/:id',async(req,res,next)=>{
	const image = await Image.findById(req.params.id);
	image.status = !image.status;
	await image.save();
	res.redirect('/directory');
});
router.get('/img/:id',async(req,res,next)=>{
	const {id} = req.params;
	const image = await Image.findById(id);
	res.render('perfil',{
		image
	});
});
router.get('/directory',async(req,res,next)=>{
	const images = await Image.find();
	res.render('directory',{
		images
	});
});

module.exports=router;
