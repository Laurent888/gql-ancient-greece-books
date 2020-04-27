const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");

const { createToken } = require("../utils/createToken");
const User = require("../models/userModel");
const {
  validateCreateUserInput,
  validateLoginInput,
} = require("../utils/validators");

const userResolvers = {
  Query: {
    getUsers: async () => {
      const users = await User.find();

      return users;
    },
    getUserById: async (_, { id }, context) => {
      const user = await User.findById(id);

      if (!user) throw new Error("No user found");

      return user;
    },
  },
  Mutation: {
    createUser: async (_, { input }, context) => {
      const { valid, errors } = validateCreateUserInput(input);

      if (!valid) {
        throw new UserInputError("One or more fields are empty", { errors });
      }

      const checkEmail = await User.findOne({ email: input.email });

      if (checkEmail) throw new Error("This email already exists");

      try {
        const { username, firstName, lastName, email, password } = input;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          username,
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        const res = await user.save();

        // GET TOKEN
        const token = createToken({ id: res._id, username, email });

        return {
          id: res._id,
          username,
          token,
        };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, { email, password }, context) => {
      const { valid, errors } = validateLoginInput(email, password);

      if (valid === false)
        throw new UserInputError("One of the field is empty", { errors });

      const res = await User.findOne({ email });

      if (!res) throw new Error("This email is not registered");

      const match = await bcrypt.compare(password, res.password);

      if (!match) throw new AuthenticationError("Wrong credentials");

      const token = createToken({ id: res._id, username: res.username, email });

      return {
        id: res._id,
        username: res.username,
        token,
      };
    },
    deleteUser: async (_, { id }, context) => {
      try {
        const user = await User.findById(id);

        if (!user) return "User not found";

        await User.findByIdAndDelete(id);
        return `User with id ${id} has been successfully deleted`;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = userResolvers;
