import Messages from "../models/messages";
import User from "../models/userTable";

export async function sendMessgaes(req: any, res: any, next: any) {
  try {
    console.log(req.user);
    const message = await Messages.create({
      Name: req.user.Name,
      Email: req.user.Email,
      userId: req.user.id,
      Message: req.body.message,
    });
    if (message) {
      res.status(200).json({ success: true, data: message });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
}
