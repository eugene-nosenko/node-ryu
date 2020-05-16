const { UserRepository } = require("../repositories/userRepository");
const isEmpty = require("lodash.isempty");

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = UserRepository.getOne(search);

    if (!item) {
      const error = new Error("User is not found");
      error.status = 404;
      throw error;
    }
    return item;
  }

  createUser(data) {
    const user = UserRepository.create(data);
    if (!user) {
      throw new Error("User is not found");
    }
    return user;
  }

  getAllUsers() {
    const users = UserRepository.getAll();
    return users;
  }

  deleteUser(id) {
    const user = UserRepository.delete(id);
    if (isEmpty(user)) {
      const error = new Error("User is not found");
      error.status = 404;
    }
    return user;
  }

  updateUser(id, dataToUpdate) {
    const user = this.search({ id });
    const updatedUser = UserRepository.update(id, dataToUpdate);
    if (!user) {
      throw new Error("User is not found");
      error.status = 404;
      throw error;
    }
    return updatedUser;
  }
}

module.exports = new UserService();
