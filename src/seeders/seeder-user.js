"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          email: "root@gmail.com",
          password: "123456",
          name: "Duy Vũ",
          position: "root",
          phonenumber: "0908260591",
          gender: "Male",
          address: "Thủ Đức",
          image: "https://www.w3schools.com/howto/img_avatar.png",

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
