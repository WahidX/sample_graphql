const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const Author = require("../models/author");
const Book = require("../models/book");

// File Database
// const db = require("../db");
// const books = db.books;
// const authors = db.authors;

// const _ = require("lodash");

/*
We wrap the object fields in function
so that we dont get any error saying that 
some custom obectType is not defined 
(const don't get hoisted)
*/

// Object types
const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			async resolve(parent, args) {
				return await Author.findById(parent.authorid);
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
			async resolve(parent, args) {
				return await Book.find({ authorid: parent.id });
			},
		},
	}),
});

// Query Types
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await Book.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			async resolve(parent, args) {
				return await Author.findById(args.id);
			},
		},

		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				return await Book.find();
			},
		},

		authors: {
			type: new GraphQLList(AuthorType),
			async resolve(parent, args) {
				return await Author.find();
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			async resolve(parent, args) {
				return await Author.create({
					name: args.name,
					age: args.age,
				});
			},
		},

		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: GraphQLString },
				authorid: { type: new GraphQLNonNull(GraphQLID) },
			},
			async resolve(parent, args) {
				return await Book.create({
					name: args.name,
					genre: args.genre,
					authorid: args.authorid,
				});
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
