"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "user_model",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
      paranoid: false,
    }
  );

  // uncomment this if first time downloading this project to automatically create table for you
  // users.sync({force: true}).then(() => {
  //     console.log('user table created')
  // })
  // users.sync().then(() => {
  //     console.log('user table created')
  // })
  return users;
};
