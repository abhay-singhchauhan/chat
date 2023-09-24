import Groups from "../models/groups";
import User from "../models/userTable";
import groupuser from "../models/groupuser";

export async function createGroup(req: any, res: any, next: any) {
  interface body_inter {
    name: string;
  }
  try {
    const body: body_inter = req.body;
    console.log(body);
    const group: any = await Groups.create({
      Name: body.name,
      Admin: req.user.id,
    });
    const addMember = await groupuser.create({
      groupId: group.id,
      userId: req.user.id,
      groupName: group.Name,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
}

export async function addMember(req: any, res: any, next: any) {
  interface body_inter {
    email: string;
  }
  type qurey_type = number;

  try {
    const query: qurey_type = req.query.groupId;
    const body: body_inter = req.body;

    const user: any = await User.findOne({ where: { Email: body.email } });
    const group: any = await Groups.findOne({ where: { id: query } });
    console.log(group);
    const addMember = await groupuser.create({
      userId: user.id,
      groupId: group.id,
      groupName: group.Name,
    });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
}

export async function getGroups(req: any, res: any, next: any) {
  try {
    const groups = await groupuser.findAll({ where: { userId: req.user.id } });
    res.json({ groups });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
}
