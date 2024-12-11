import icons from "./icons";
import images from "./images";

export { icons, images };

export const verifyBaseUrl = "http://192.168.107.189:8081/verify";
export const resetBaseUrl = "http://192.168.107.189:8081/reset-password";
export const API_URL = "http://192.168.107.189:3001/api";
export const TOKEN_KEY = "JWT_TOKEN";
export const ROLE_KEY = "ROLE";
export const VERIFIED_KEY = "VERIFY";

export const codes = {
  OKGET: 200, //When the get request is successful.
  OKPOST: 201, //When the get request is successful.
  UNAUTHORIZED: 401, //When either the user is accessing a protected route or invalid/email password
  NOTFOUND: 404, //When a resource that does not exist is fetched.
  ALREADYEXISTS: 409, //When a resource that already is recreated. (Creating a new user with the same email/username)
};
