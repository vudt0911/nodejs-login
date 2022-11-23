"use strict";
import { Sequelize } from "sequelize";

function createEntityManager() {
  const sequelize = new Sequelize("login", "root", "root", {
    host: "localhost",
    dialect: "mariadb",
    pool: {
      max: 500,
      min: 10,
      acquire: 30000,
      idle: 10000,
    },
  });

  try {
    (async () => await sequelize.authenticate())();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw new Error("Unable to connect to the database:");
  }
  return sequelize;
}

let entityManager;

export default async function getEntityManager() {
  if (!entityManager) entityManager = await createEntityManager();
  return entityManager;
}
