const express = require("express");
const { animals } = require("./data/animals");

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(3001, () => {
  console.log(`API server now on port ${PORT}`);
});

function filterByQuery(query, animalArr) {
  let personalityTraits = [];
  let filteredResults = animalArr;

  if (query.personalityTraits) {
    if (typeof query.personalityTraits === "string") {
      personalityTraits = [query.personalityTraits];
    } else {
      personalityTraits = query.personalityTraits;
    }
  }

  personalityTraits.forEach((trait) => {
    filteredResults = filteredResults.filter(
      (animal) => animal.personalityTraits.indexOf(trait) !== -1
    );
  });

  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }

  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }

  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }

  return filteredResults;
}

// takes in req (animal)
app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});
