import React from "react";
import { useQuery, gql } from "@apollo/client";

const getAuthors = gql`
	query {
		authors {
			name
			id
			age
		}
	}
`;

function AddBook(props) {
	const { loading, error, data } = useQuery(getAuthors);

	function AuthorOptions(data) {
		if (data) {
			return data.authors.map((author) => <option>{author.name}</option>);
		} else return <option>Loading</option>;
	}

	return (
		<div>
			<h3>Add Book</h3>

			<div>
				<label>Book name</label>
				<input type="text" />
			</div>

			<div>
				<label>Genre</label>
				<input type="text" />
			</div>

			<div>
				<label>Author</label>
				<select>
					<option>select author</option>
					{AuthorOptions(data)}
				</select>
			</div>
		</div>
	);
}

export default AddBook;
