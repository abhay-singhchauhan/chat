import User from "../models/userTable";
import bcrypt from "bcrypt";

export async function signup(req: any, res: any, next: any) {
  try {
    const user = await User.findAll({ where: { Email: req.body.email } });
    if (user.length < 1) {
      bcrypt.hash(req.body.password, 10, async (err, hashed) => {
        const createdUser = await User.create({
          Name: req.body.name,
          Email: req.body.email,
          Password: hashed,
          Phone: req.body.phone,
        });
        res.status(200).json({
          data: createdUser,
          message: "User Created Successfully, Please Login",
        });
      });
    } else {
      res
        .status(404)
        .json({ data: null, message: "User Already Exists, Please Login" });
    }
  } catch (err) {
    res.status(500).json({ data: err, message: "Unexpected Error" });
  }
}
