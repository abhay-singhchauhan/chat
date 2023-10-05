import { where } from "sequelize";
import Messages from "../models/messages";
import User from "../models/userTable";

export async function sendMessgaes(req: any, res: any, next: any) {
  interface body_inter {
    message: string;
    groupId: number;
  }
  try {
    console.log(req.body);
    const body = req.body;
    console.log(req.user);
    const message = await Messages.create({
      Name: req.user.Name,
      Email: req.user.Email,
      userId: req.user.id,
      groupId: body.groupId,
      Message: body.message,
      IsImage: body.isImage,
    });
    if (message) {
      res.status(200).json({ success: true, data: message });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
}

export async function getMessages(req: any, res: any, next: any) {
  interface query_inter {
    groupId: string;
    ofsetDetails: number;
  }
  try {
    let query: query_inter = req.query;
    const obj = {
      haveMore: true,
      lastPoint: query.ofsetDetails,
    };
    console.log(query.ofsetDetails, " <<");
    const count = await Messages.count({ where: { groupId: query.groupId } });
    let offsethere: number = +count - Number(query.ofsetDetails) * 20;
    let limit = 20;
    if (offsethere <= 0) {
      obj.haveMore = false;
      limit = 20 - Math.abs(offsethere);
      offsethere = 0;
    }
    console.log(req.query);
    console.log(offsethere, "yaha hai Bhai ye Problem", count);
    const message = await Messages.findAll({
      where: { groupId: query.groupId },
      limit: limit,
      offset: offsethere,
    });

    if (message) {
      res.json({ success: true, data: message, obj });
    }
  } catch (err) {
    res.json({ success: true, data: err });
    console.log(err);
  }
}
