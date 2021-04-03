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

const getBook = gql`
	query($id: ID!) {
		book(id: $id) {
			id
			name
			genre

			author {
				id
				name
				age
				books {
					id
					name
					genre
				}
			}
		}
	}
`;

const deleteBookMutation = gql`
	mutation($id: ID!) {
		deleteBook(id: $id) {
			name
		}
	}
`;

export { getBooks, getAuthors, addBookMutation, getBook, deleteBookMutation };
