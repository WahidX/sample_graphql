const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const db = require("../db");
const books = db.books;
const authors = db.authors;

const _ = require("lodash");

/*
We wrap the object fields in function
so that we dont get any error saying that 
some custom obectType is not defined 
(const don't get hoisted)
*/

// object types
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				console.log("parent: ", parent);
				return _.find(authors, { id: parent.author_id });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books.filter((book) => book.author_id == parent.id);
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db
				// console.log("parent: " + parent + " args: " + args);
				// console.log("books: ", books);
				return books.filter((book) => book.id === args.id)[0];
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db
				// console.log("parent: " + parent + " args: " + args);
				// console.log("books: ", books);
				return authors.filter((author) => author.id === args.id)[0];
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
