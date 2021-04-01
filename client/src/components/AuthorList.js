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

function AuthorItem(props) {
	const author = props.author;

	return (
		<li>
			<div>
				{author.name}
				<br />
				{author.age}
				<br />
			</div>
		</li>
	);
}

function AuthorList(props) {
	const { loading, error, data } = useQuery(getAuthors);

	console.log(loading, error, data);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	let authors = data.authors;

	return (
		<div>
			<h3>&nbsp; &nbsp; Authors:</h3>

			<ul>
				{authors.map((author) => (
					<AuthorItem author={author} key={author.id} />
				))}
			</ul>
		</div>
	);
}

export default AuthorList;
