const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  search(search) {
    const item = FighterRepository.getOne(search);
    if (!item) {
      throw "Fighter is not found";
    }
    return item;
  }

  createFighter(data) {
    const fighter = FighterRepository.create(data);
    console.log(fighter);
    if (!fighter) {
      throw "Fighter is not found";
    }
    return fighter;
  }

  getAllFighters() {
    const fighters = FighterRepository.getAll();
    if (!fighters) {
      throw "Fighters are not found";
    }
    return fighters;
  }

  deleteFighter(id) {
    const fighter = FighterRepository.delete(id);
    if (!fighter) {
      throw "Fighter is not found";
    }
    return fighter;
  }

  updateFighter(id, dataToUpdate) {
    const fighter = FighterRepository.update(id, dataToUpdate);
    if (!fighter) {
      throw "Fighter is not found";
    }
    return fighter;
  }
}

module.exports = new FighterService();
