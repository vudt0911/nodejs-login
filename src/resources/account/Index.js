import ResourceHandler from "../../bases/route/ResourceHandler.js";
import RequestHandler from "../../bases/route/RequestHandler.js";
import accountHandler from "./AccountHandler.js";

const accountResource = new ResourceHandler("account")
accountResource
    .get(new RequestHandler("my-profile", accountHandler.myInfo, ["ROLE_USER"]))
    .post(new RequestHandler("login", accountHandler.login));

export default accountResource;


