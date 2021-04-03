import React from "react";

function BookPage(props) {
	const book = props.book;

	if (!book) return "loading... ";
	return (
		<div>
			<h1>{book.name}</h1>

			<p>Genre: {book.genre}</p>
			<p>
				Author: <br />
				{book.author ? (
					<div>
						Name: {book.author.name} <br />
						Age: {book.author.age}
					</div>
				) : (
					"Not found!"
				)}
			</p>
		</div>
	);
}

export default BookPage;
