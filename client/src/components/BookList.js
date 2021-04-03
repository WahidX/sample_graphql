import React from "react";
import { useQuery, gql } from "@apollo/client";

const getBooks = gql`
	query {
		books {
			name
			genre
			id
			author {
				name
				age
			}
		}
	}
`;

function BookItem(props) {
	const book = props.book;

	return (
		<li>
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

	console.log(loading, error, data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	let books = data.books;

	return (
		<div>
			<h3>&nbsp; &nbsp; Books:</h3>
			<ul>
				{books.map((book) => (
					<BookItem book={book} key={book.id} />
				))}
			</ul>
		</div>
	);
}

export default BookList;
