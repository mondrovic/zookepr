const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");

// passes in zookeeper object with zookeeper dataset
test("create zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "2321" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("2321");
});

test("filters by query", () => {
  const startingZK = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const filteredZK = filterByQuery({ name: "Raksha" }, startingZK);

  expect(filteredZK.length).toEqual(1);
});

test("find by id", () => {
  const startingZK = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const results = findById("2", startingZK);
  expect(results.name).toBe("Raksha");
});

test("validates age", () => {
  const validAge = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };
  const invalidAge = {
    id: "2",
    name: "Raksha",
    age: "31",
    favoriteAnimal: "penguin",
  };

  const result1 = validateZookeeper(validAge);
  const result2 = validateZookeeper(invalidAge);

  expect(result1).toBe(true);
  expect(result2).toBe(false);
});
