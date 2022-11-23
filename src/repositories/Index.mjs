"use strict";
import getEntityManager from "../configs/db.config.mjs";
import "./UserRepository.mjs";
import "./ConstraintConfig.mjs";
import { initRole, initUser } from "./Init.mjs";

const entityManager = await getEntityManager();
await entityManager.sync({ alter: true });

// setTimeout(async () => {
//   await initRole();
//   await initUser();
// }, 2000);
