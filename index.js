const app = require("express")();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
	return res.json("Working!");
});

app.listen(PORT, () => console.log(`Server running at: ${PORT}`));
