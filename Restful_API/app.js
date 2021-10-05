const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose
	.connect("mongodb://localhost:27017/wikiDB")
	.then(() => console.log("Connection Successful"))
	.catch((err) => console.log(err));

const articleSchema = new mongoose.Schema({
	title: String,
	content: String,
});

// Mongoose will convert Article -> articles(lowercase+plural)
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
	.get(function (req, res) {
		const findArticles = async () => {
			try {
				const result = await Article.find();
				res.send(result);
			} catch (error) {
				res.send(error);
			}
		};

		findArticles();
	})
	.post(function (req, res) {
		const createNewArticle = async () => {
			try {
				const newArticle = new Article({
					title: req.body.title,
					content: req.body.content,
				});

				const result = await newArticle.save();
				res.send("Article added Successfully");
			} catch (error) {
				res.send(error);
			}
		};

		createNewArticle();
	})
	.delete(function (req, res) {
		const deleteArticle = async () => {
			try {
				const result = await Article.deleteMany();
				res.send("Articles Deleted!!");
			} catch (error) {
				res.send("HOLA");
			}
		};

		deleteArticle();
	});

app.route("/articles/:articleTitleQuery")
	.get(function (req, res) {
		const findArticle = async () => {
			try {
				const result = await Article.findOne({ title: req.params.articleTitleQuery });
				res.send(result);
			} catch (err) {
				res.send("No Matching Article Found.");
			}
		};
		findArticle();
	})
	.put(function (req, res) {
		const replaceArticle = async () => {
			try {
				const result = await Article.replaceOne(
					{ title: req.params.articleTitleQuery }, //condition
					{ title: req.body.title, content: req.body.content } //updates
				);
				res.send("Article replaced");
			} catch (error) {
				res.send("No matching Article found.");
			}
		};

		replaceArticle();
	})
	.patch(function (req, res) {
		//set and req.body using updateOne will only update fields that is passed
		//unlike replace one where it will completely replace the article
		const updateArticle = async () => {
			try {
				const result = await Article.update(
					{ title: req.params.articleTitleQuery },
					{ $set: req.body }
				);
				res.send("Article Updated");
			} catch (error) {
				res.send("No matching Article found.");
			}
		};

		updateArticle();
	})
	.delete(function (req, res) {
		const deleteArticle = async () => {
			try {
				const result = await Article.deleteOne({ title: req.params.articleTitleQuery });
				res.send("Article Deleted!!");
			} catch (error) {
				res.send("HOLA");
			}
		};

		deleteArticle();
	});

app.listen(3000, function () {
	console.log("Sever Started");
});
