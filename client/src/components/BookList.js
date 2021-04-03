import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooks } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookItem(props) {
	const book = props.book;

	return (
		<li onClick={() => props.setSelected(book.id)}>
			<div>
				{book.name}
				<br />
				{book.genre}
				<br />
				{book.author && (
					<React.Fragment>
						{book.author.name}
						<br />
						{book.author.age}
						<br />
					</React.Fragment>
				)}
			</div>
		</li>
	);
}

function BookList(props) {
	const { loading, error, data } = useQuery(getBooks);
	const [selected, setSelected] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	let books = data.books;

	return (
		<div>
			<h3>Book Details:</h3>
			<BookDetails bookid={selected} />
			<h3>&nbsp; &nbsp; Books:</h3>
			<ul>
				{books.map((book) => (
					<BookItem book={book} key={book.id} setSelected={setSelected} />
				))}
			</ul>
		</div>
	);
}

export default BookList;
