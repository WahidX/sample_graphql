import { gql } from "@apollo/client";

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

const getAuthors = gql`
	query {
		authors {
			name
			id
			age
		}
	}
`;

const addBookMutation = gql`
	mutation addBook($name: String!, $genre: String!, $authorid: ID!) {
		addBook(name: $name, genre: $genre, authorid: $authorid) {
			id
			name
			genre
		}
	}
`;

const getBookById = gql`
	query bookById($id: ID!) {
		book(id: $id) {
			id
			name
			genre

			author {
				id
				name
				age
			}
		}
	}
`;

export { getBooks, getAuthors, addBookMutation, getBookById };
