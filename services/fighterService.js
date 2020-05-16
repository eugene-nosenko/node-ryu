const { FighterRepository } = require("../repositories/fighterRepository");
const isEmpty = require("lodash.isempty");

class FighterService {
  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      throw new Error("Fighter is not found");
    }
    return item;
  }

  createFighter(data) {
    const fighter = FighterRepository.create(data);
    console.log(fighter);
    if (!fighter) {
      throw new Error("Fighter is not found");
    }
    return fighter;
  }

  getAllFighters() {
    const fighters = FighterRepository.getAll();

    return fighters;
  }

  deleteFighter(id) {
    const fighter = FighterRepository.delete(id);
    if (isEmpty(fighter)) {
      const error = new Error("User is not found");
      error.status = 404;
    }
    return fighter;
  }

  updateFighter(id, dataToUpdate) {
    const fighter = this.search({ id });
    const updatedFighter = FighterRepository.update(id, dataToUpdate);
    if (!fighter) {
      throw new Error("Fighter is not found");
    }
    return updatedFighter;
  }
}

module.exports = new FighterService();
