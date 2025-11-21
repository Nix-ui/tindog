import petsFromFile from "../../data/pets.json";

test("Debe existir una mascota real en pets.json", () => {
  const luna = petsFromFile.find((m) => m.id === 1);
  expect(luna).toBeDefined();
  expect(luna.name).toBeDefined();
});
