const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// load posts 
router.get('/', async(req, res) => {
	const posts = await loadPosts(); 
	res.send(await posts.find({}).toArray());
});

// add post 
router.post('/', async(req, res) => {
	const posts = await loadPosts();
	// define the new object from form
	await posts.insertOne({
		text: req.body.text, 
		created: new Date
	});
	res.status(201).send(); //everything ok
});

// delete post 
router.delete('/:id', async(req, res) => {
	const posts = await loadPosts();
	await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
	res.status(200).send(); // ok response 
		
});


async function loadPosts(){
	const client = await mongodb.MongoClient.connect(/*Use mongodb database driver here */, {
			useNewUrlParser: true
		});
	return client.db(/*use db name here */).collection('posts');
}
module.exports = router;