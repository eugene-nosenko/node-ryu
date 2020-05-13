const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = UserRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser(data) {
    const user = UserRepository.create(data);
    if (!user) {
      return null;
    }
    return user;
  }

  getAllUsers() {
    const users = UserRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  deleteUser(id) {
    const user = UserRepository.delete(id);
    if (!user) {
      return null;
    }
    return user;
  }

  updateUser(id, dataToUpdate) {
    const user = UserRepository.update(id, dataToUpdate);
    if (!user) {
      return null;
    }
    return user;
  }
}

module.exports = new UserService();
