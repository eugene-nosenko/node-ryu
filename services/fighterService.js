const { FighterRepository } = require("../repositories/fighterRepository");
const isEmpty = require("lodash.isempty");

class FighterService {
  throwError(messege) {
    const error = new Error(messege);
    error.status = 404;
    throw error;
  }

  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      this.throwError("Fighter is not found");
    }
    return item;
  }

  createFighter(data) {
    const fighter = FighterRepository.create(data);
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
      this.throwError("Fighter is not found");
    }
    return fighter;
  }

  updateFighter(id, dataToUpdate) {
    const fighter = this.search({ id });
    const updatedFighter = FighterRepository.update(id, dataToUpdate);
    if (!fighter) {
      this.throwError("Fighter is not found");
    }
    return updatedFighter;
  }
}

module.exports = new FighterService();
