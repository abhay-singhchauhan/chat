import Groups from "../models/groups";
import User from "../models/userTable";
import groupuser from "../models/groupuser";
import Sequelize from "sequelize";

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
    console.log(query, body);
    const user: any = await User.findOne({ where: { Email: body.email } });
    const group: any = await Groups.findOne({ where: { id: query } });
    console.log(group);
    console.log(user);
    const addMember = await groupuser.create({
      userId: user.id,
      groupId: group.id,
      groupName: group.Name,
    });
    res.json({ success: true });
  } catch (err) {
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

export async function getUsers(req: any, res: any, next: any) {
  interface query_type {
    email: string;
  }
  try {
    const query: query_type = req.query;
    const user = await User.findAll({
      where: { email: { [Sequelize.Op.like]: `%${query.email}%` } },
    });
    console.log(user);
    if (user.length > 0) {
      res.status(200).json({ data: user });
    } else {
      res.status(200).json({ data: null });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null });
  }
}

export async function findGroupMembers(req: any, res: any, next: any) {
  interface query_type {
    groupId: number;
  }
  type inside = any;
  const obj: inside = {
    include: {
      model: User,
      through: groupuser,
    },
  };
  try {
    const query: query_type = req.query;
    const group = (await Groups.findByPk(query.groupId, obj)) as any;
    res.status(200).json(group.users);
    console.log(group);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
}

export async function removeGroupMember(req: any, res: any, next: any) {
  interface query_type {
    userId: number;
    groupId: number;
  }
  try {
    const query: query_type = req.query;
    console.log(query, "<<<<<<<<");
    const gu = await groupuser.destroy({
      where: { groupId: query.groupId, userId: query.userId },
    });
    if (gu) {
      res.status(200).json({ data: gu, success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ success: false });
  }
}
