import { buildSchema } from "graphql";

const schema = buildSchema(`

	type Student {
		id: ID
		name: String
		age: Int
		subjects: [Subject]
	}

	type Subject {
		name: String
		teacher: Teacher
	}

	type Teacher {
		name: String
		age: Int
		exp: Int
	}

	type Query {
		getStudent(id: ID): Student
	}

	input StudentInput {
		id: ID
		name: String
		age: Int
		subjects: [Subject]
	}


	input SubjectInput {
		name: String
		teacher: Teacher
	}

	input TeacherInput {
		name: String
		age: Int
		exp: Int
	}

	type Mutation {
		createStudent(input: StudentInput): Student
	}

`);

export default schema;
