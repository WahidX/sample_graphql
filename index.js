const app = require("express")();
const PORT = process.env.PORT || 8000;

const { graphqlHTTP } = require("express-graphql");

const db = require("./config/mongoose");

const schema = require("./schema/schema");

app.get("/", (req, res) => {
	return res.json("Working!");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(PORT, () => console.log("Now browse to localhost:4000/graphql"));
