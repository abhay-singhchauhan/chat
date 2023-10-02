import User from "../models/userTable";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signup(req: any, res: any, next: any) {
  interface req_body {
    name: string;
    email: string;
    phone: number;
    password: string;
  }
  try {
    const body: req_body = req.body;
    const user = await User.findAll({ where: { Email: body.email } });
    if (user.length < 1) {
      bcrypt.hash(body.password, 10, async (err, hashed) => {
        const createdUser = await User.create({
          Name: body.name,
          Email: body.email,
          Password: hashed,
          Phone: body.phone,
        });
        res.status(200).json({
          data: createdUser,
          status: "success",
          message: "User Created Successfully, Please Login",
        });
      });
    } else {
      res.status(403).json({
        data: null,
        status: "failed",
        message: "User Already Exists, Please Login",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ data: err, message: "Unexpected Error", status: "failed" });
  }
}

export async function login(req: any, res: any, next: any) {
  //interface for jwt_token and req_body
  interface jwt_res {
    userId: number;
    name: string;
    email: string;
  }
  interface login_req {
    email: string;
    password: string;
  }
  //interface for jwt_token and req_body
  try {
    const body = req.body as login_req;
    const user = (await User.findOne({ where: { email: body.email } })) as any;
    if (user) {
      bcrypt.compare(body.password, user.Password, (err, hash) => {
        if (hash) {
          console.log("every thing is fine");
          const obj: jwt_res = {
            userId: user.id,
            name: user.Name,
            email: user.Email,
          };
          const token = jwt.sign(obj, process.env.JWT_KEY as string);
          if (token) {
            res.status(200).json({
              status: true,
              message: "Login Successfull",
              token: token,
            });
          }
        } else {
          console.log("error hai");
          res.status(401).json({ status: false, message: "Wrong Password" });
        }
      });
    } else {
      res.status(404).json({ status: false, message: "User dosen't exist" });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "uncought error" });
  }
}
