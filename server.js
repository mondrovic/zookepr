const express = require("express");
// index is default file read if one is available
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//adds custom routes instead of hard coding to app.get (/api is for api commands and / is for html pages)
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// accepts public file for files like CSS or public side JS
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
