import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userTable";
dotenv.config();

export async function authenticate(req: any, res: any, next: any) {
  console.log("come till Auth");
  try {
    const key = process.env.JWT_KEY as string;

    const token: string = req.headers.token;
    const user = jwt.verify(token, key) as any;
    if (user) {
      const findUser = await User.findOne({
        where: { id: user.userId, Name: user.name, Email: user.email },
      });
      if (findUser) {
        req.user = findUser;
        console.log("found User id");
        next();
      } else res.send({ success: false, message: "user not found" });
    } else res.send({ success: false, message: "token not verified" });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "its an error" });
  }
}
