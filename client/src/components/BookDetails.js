import React from "react";
import { useQuery } from "@apollo/client";

import { getBook } from "../queries/queries";

function BookDetails(props) {
	let bookid = props.bookid;

	const { loading, error, data } = useQuery(getBook, {
		variables: { id: bookid },
	});

	const book = data && data.book;

	return (
		<div id="book-details-container">
			<h2>Book Details:</h2>

			{book && (
				<React.Fragment>
					<h1>{book.name}</h1>

					<p>Genre: {book.genre}</p>
					<p>
						Author: <br />
						{book.author ? (
							<div>
								Name: {book.author.name} <br />
								Age: {book.author.age} <br />
								<br />
								All books by this author:
								<ul>
									{book.author.books.map((book) => (
										<li key={book.id}>
											{book.name} - {book.genre}{" "}
										</li>
									))}
								</ul>
							</div>
						) : (
							"Not found!"
						)}
					</p>
				</React.Fragment>
			)}
		</div>
	);
}

export default BookDetails;
