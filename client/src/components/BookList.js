import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { getBooks, deleteBookMutation } from "../queries/queries";
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
			</div>
		</li>
	);
}

function BookList(props) {
	const { loading, error, data } = useQuery(getBooks);
	const [deleteBook] = useMutation(deleteBookMutation, {
		refetchQueries: [{ query: getBooks }],
	});

	const [selected, setSelected] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	let books = data.books;

	function deleteBookHandle(id) {
		console.log("delete: ", id);
		deleteBook({
			variables: {
				id,
			},
		});
		if (selected == id) setSelected(null);
	}

	return (
		<div>
			<h3>Book Details:</h3>
			<BookDetails bookid={selected} />
			<h3>&nbsp; &nbsp; Books:</h3>
			<ul>
				{books.map((book) => (
					<React.Fragment>
						<BookItem book={book} key={book.id} setSelected={setSelected} />
						<button onClick={() => deleteBookHandle(book.id)}>Delete</button>
					</React.Fragment>
				))}
			</ul>
		</div>
	);
}

export default BookList;
