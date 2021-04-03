import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getBooks, getAuthors, addBookMutation } from "../queries/queries";

function AddBook(props) {
	const { loading, error, data } = useQuery(getAuthors);
	const [addBook] = useMutation(addBookMutation, {
		refetchQueries: [{ query: getBooks }],
	});
	// console.log("add book arr: ", addBook);

	const [bookName, setBookName] = useState("");
	const [genre, setGenre] = useState("");
	const [authorInput, setAuthorInput] = useState("");

	function AuthorOptions(data) {
		if (data) {
			return data.authors.map((author) => (
				<option key={author.id} value={author.id}>
					{author.name}
				</option>
			));
		} else return <option>Loading</option>;
	}

	function submitHandle(e) {
		e.preventDefault();
		if (bookName && genre && authorInput) {
			addBook({
				variables: {
					name: bookName,
					genre: genre,
					authorid: authorInput,
				},
			});

			setBookName("");
			setGenre("");
			setAuthorInput("");
		} else console.log("Invalid Input");
		console.log(bookName, genre, authorInput);
	}

	return (
		<div>
			<h3>Add Book</h3>

			<form onSubmit={submitHandle}>
				<div>
					<label>Book name</label>
					<input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
				</div>

				<div>
					<label>Genre</label>
					<input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
				</div>

				<div>
					<label>Author</label>
					<select value={authorInput} onChange={(e) => setAuthorInput(e.target.value)}>
						<option>select author</option>
						{AuthorOptions(data)}
					</select>
				</div>
				<button type="submit">+</button>
			</form>
		</div>
	);
}

export default AddBook;
