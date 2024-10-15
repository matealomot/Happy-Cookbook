class Recipe {
  constructor(name, ingredients, flavor, consistency, instructions, difficulty, image) {
    this.name = name;
    this.ingredients = ingredients;
    this.flavor = flavor;
    this.consistency = consistency;
    this.instructions = instructions;
    this.difficulty = difficulty;
    this.image = image;
  };

  getName() {
    return this.name;
  };

  setName(newName) {
    this.name = newName;
  };

  getIngredients() {
    return this.ingredients;
  };

  setIngredients(newIngredients) {
    this.ingredients = newIngredients;
  };

  setFlavor(newFlavor) {
    this.flavor = newFlavor;
  };

  getFlavor() {
    return this.flavor;
  };

  setConsistency(newConsistency) {
    this.consistency = newConsistency;
  };

  getConsistency() {
    return this.consistency;
  };


  getInstructions() {
    return this.instructions;
  };

  setInstructions(newInstructions) {
    this.instructions = newInstructions;
  };

  getDifficulty() {
    return this.difficulty;
  }

  setDifficulty(newDifficulty) {
    this.difficulty = newDifficulty;
  }

  getImage() {
    return this.image;
  };

  setImage(newImage) {
    this.image = newImage;
  };
};

export {Recipe};