const express = require("express");
const router = express.Router();
const mongoose= require("mongoose");
const Video =require("../models/video");




const db="mongodb://javi182:marieo23@ds157641.mlab.com:57641/javivideoplayer";
mongoose.Promise = global.Promise;//avoid any warnings that mondo mifht throw at us
mongoose.connect(db, function(err) {
	// body...
	if(err){
		console.log("error! "+ err);
	}
});


router.get("/", function(req, res){
	res.send("api works");  
} );

router.get("/videos", function(req, res){

	console.log("get request for all videos");
	Video.find({}).exec(function (err, videos) {
		// body...
		if(err){console.log("error! retrieving videos");}else{
			res.json(videos);
		}//end of if
	});

});

router.get("/videos/:id", function(req, res){

	console.log("get request for single video");
	Video.findById(req.params.id).exec(function (err, video) {
		// body...
		if(err){console.log("error! retrieving video");}else{
			res.json(video);
		}//end of if
	});

});//end of get

router.post('/video', function (req, res) {
	// body...
	console.log("post a video ");
	var newVideo=new Video();
	newVideo.title=req.body.title;
	newVideo.url= req.body.url;
	newVideo.description=req.body.description;
	newVideo.save(function(err, insertedVideo){

		if(err){
			console.log("error saving video");
		}else{
			res.json(insertedVideo);

		}//end of if

	});

});//end of post


router.put("/video/:id", function(req, res){
	console.log("update video");
	Video.findByIdAndUpdate( req.params.id, { 
		$set: {title: req.body.title, url: req.body.url, description: req.body.description} 
		}, 
		{new: true},
		function(err, updatedVideo){
			if(err){res.send("Error! updating video") }else{res.json(updatedVideo)}
		}  );

});
//eof put


router.delete("/video/:id", function(req, res){
	console.log("deleting video");
	Video.findByIdAndRemove(req.params.id, function(err, deletetedVideo){
		if(err){
			res.send("Error in deleting video");
		}else{
			res.json(deletetedVideo);

		}
	});

});
//eof delete


module.exports = router;