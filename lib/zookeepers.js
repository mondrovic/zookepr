const fs = require("fs");
const path = require("path");

// filter zookeeper (takes in query term and zookeeper dataset)
function filterByQuery(query, zookeepers) {
  let filteredResults = zookeepers;

  // if filtering by age
  if (query.age) {
    // takes filtered results and converts queried string to number
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.age === Number(query.age)
    );
  }

  // if filtering by favorite animal
  if (query.favoriteAnimal) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
    );
  }

  // if filtering by name
  if (query.name) {
    filteredResults = filteredResults.filter(
      (zookeeper) => zookeeper.name === query.name
    );
  }
  return filteredResults;
}

// find by id (takes in id and zookeeper dataset)
function findById(id, zookeepers) {
  const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
  return result;
}

// creates new zookeeper (takes in request body and zookeeper dataset)
function createNewZookeeper(body, zookeepers) {
  const zookeeper = body;
  zookeepers.push(zookeeper);
  fs.writeFileSync(
    path.join(__dirname, "../data/zookeepers.json"),
    JSON.stringify({ zookeepers }, null, 2)
  );
  return zookeeper;
}

// validates zookeeper (takes in zookeeper object)
function validateZookeeper(zookeeper) {
  // checks if name is string
  if (!zookeeper.name || typeof zookeeper.name !== "string") {
    return false;
  }
  // checks if age is number
  if (!zookeeper.age || typeof zookeeper.age !== "number") {
    return false;
  }
  // checks if favorite animal is string
  if (
    !zookeeper.favoriteAnimal ||
    typeof zookeeper.favoriteAnimal !== "string"
  ) {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
};
