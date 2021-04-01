const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		genre: {
			type: String,
		},
		authorid: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
