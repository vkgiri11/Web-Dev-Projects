const mongoose = require("mongoose");

//? connecting and creating a new db
mongoose
    .connect("mongodb://localhost:27017/introproject")
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

//? schema -> defines the structure of the doc, default values, validators etc.
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now,
    },
});

//? creating a collection
// model -> wrapper on mongoose schema that provides an interface for CRUD operations
const Playlist = new mongoose.model("Playlist", playlistSchema);
// "Playlist" -> the name of collection should be always singular mongoose will automatically make it plural
// Playlist is a class (P is capital to represent class name)
// playlistSchema is an object

//? insert multiple row in collections
const createDocument = async () => {
    try {
        const jsPlaylist = new Playlist({
            name: "JavaScript",
            ctype: "Front End",
            videos: 150,
            author: "Vk",
            active: true,
        });

        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            ctype: "Database",
            videos: 40,
            author: "Vk",
            active: true,
        });

        const mongoosePlaylist = new Playlist({
            name: "Mongoose",
            ctype: "Database",
            videos: 10,
            author: "Vk",
            active: true,
        });

        const result = await Playlist.insertMany([jsPlaylist, mongoPlaylist, mongoosePlaylist]);
    } catch (err) {
        console.log(err);
    }
};
//! Comment out after first time to avoid repeated insertions
// createDocument();

//? insert single row in collections
const createSingleDocument = async () => {
    try {
        const reactPlaylist = new Playlist({
            name: "React JS",
            ctype: "Front End",
            videos: 70,
            author: "Vk",
            active: true,
        });

        const result = await reactPlaylist.save();
    } catch (err) {
        console.log(err);
    }
};
//! // Comment out after first time to avoid repeated insertions
// createSingleDocument();

//? Read in collections
const getDocument = async () => {
    try {
        // const result = await Playlist.find();
        // const result = await Playlist.find({ ctype: "Front End" });
        const result = await Playlist.find({ ctype: "Front End" }).select({ name: 1 }); // 1 -> show
        // console.log(result);
    } catch (err) {
        console.log(err);
    }
};
getDocument();

//? Update a row
const updateDocument = async (id) => {
    try {
        const result = await Playlist.updateOne(
            { _id: id },
            {
                $set: {
                    name: "Javascript",
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
};
//! Comment out after first time to avoid repeated updation
// updateDocument("61432c72f29ad4972dec752a");

//? Delete a row
const deleteDocument = async (_id) => {
    try {
        const result = await Playlist.deleteOne({ _id }); // {_id} same as {_id: _id}
    } catch (err) {
        console.log(err);
    }
};
//! Comment out after first time to avoid repeation
// deleteDocument("61432da06a6229a370e12178");
