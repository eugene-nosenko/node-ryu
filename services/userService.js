const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = UserRepository.getOne(search);

    if (!item) {
      throw "User is not found";
    }
    return item;
  }

  createUser(data) {
    const user = UserRepository.create(data);
    if (!user) {
      throw "User is not found";
    }
    return user;
  }

  getAllUsers() {
    const users = UserRepository.getAll();
    if (!users) {
      throw "Users are not found";
    }
    return users;
  }

  deleteUser(id) {
    const user = UserRepository.delete(id);
    if (!user) {
      throw "User is not found";
    }
    return user;
  }

  updateUser(id, dataToUpdate) {
    const user = UserRepository.update(id, dataToUpdate);
    if (!user) {
      throw "User is not found";
    }
    return user;
  }
}

module.exports = new UserService();
