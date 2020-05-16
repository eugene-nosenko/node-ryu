const { UserRepository } = require("../repositories/userRepository");
const isEmpty = require("lodash.isempty");

class UserService {
  // TODO: Implement methods to work with user
  throwError(messege) {
    const error = new Error(messege);
    error.status = 404;
    throw error;
  }

  search(search) {
    const item = UserRepository.getOne(search);

    if (!item) {
      this.throwError("User is not found");
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
      this.throwError("User is not found");
    }
    return user;
  }

  updateUser(id, dataToUpdate) {
    const user = this.search({ id });
    const updatedUser = UserRepository.update(id, dataToUpdate);
    if (!user) {
      this.throwError("User is not found");
    }
    return updatedUser;
  }
}

module.exports = new UserService();
