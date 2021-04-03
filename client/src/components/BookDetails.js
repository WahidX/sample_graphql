import React from "react";
import { useQuery } from "@apollo/client";

import { getBook } from "../queries/queries";

function BookDetails(props) {
	let bookid = props.bookid;

	const { loading, error, data } = useQuery(getBook, {
		variables: { id: bookid },
	});

	console.log(bookid);
	console.log(loading, error, data);

	const book = data && data.book;

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
						<ul>
							{book.author.books.map((book) => (
								<li key={book.id}>
									{book.name} + " - " + {book.genre}{" "}
								</li>
							))}
						</ul>
					</div>
				) : (
					"Not found!"
				)}
			</p>
		</div>
	);
}

export default BookDetails;
