import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import BookList from "./components/BookList";
import AuthorList from "./components/AuthorList";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
	uri: "http://localhost:8000/graphql",
	// uri: "https://48p1r2roz4.sse.codesandbox.io",    // For testing
	cache: new InMemoryCache(),
});

function App(props) {
	return (
		<ApolloProvider client={client}>
			<div>
				<h1>Book Author -- GraphQL</h1>
				<AddBook />
				<BookList />
			</div>
		</ApolloProvider>
	);
}

export default App;
