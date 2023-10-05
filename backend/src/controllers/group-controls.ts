import Groups from "../models/groups";
import User from "../models/userTable";
import groupuser from "../models/groupuser";
import Sequelize from "sequelize";

export async function createGroup(req: any, res: any, next: any) {
  interface body_inter {
    name: string;
    heading: string;
    image: any;
  }

  try {
    const body: body_inter = req.body;
    console.log(body, "idhar <<<<<");
    const group: any = await Groups.create({
      Name: body.name,
      Heading: body.heading,
      Admin: req.user.id,
    });
    const addMember = await groupuser.create({
      groupId: group.id,
      userId: req.user.id,
      groupName: group.Name,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
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
    console.log(query, body, " <<<<<<>>>>>>");
    const user: any = await User.findOne({ where: { Email: body.email } });
    const group: any = await Groups.findOne({ where: { id: query } });
    if (group.Admin === req.user.id) {
      const addMember = await groupuser.create({
        userId: user.id,
        groupId: group.id,
        groupName: group.Name,
      });
      console.log(group.id);
      console.log(user.id);
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Only Admin can add members" });
    }
  } catch (err) {
    res.json({ success: false });
  }
}

export async function getGroups(req: any, res: any, next: any) {
  type inside = any;
  try {
    const obj: inside = {
      include: {
        model: Groups,
        through: groupuser,
      },
    };
    const groups = await User.findByPk(req.user.id, obj);
    console.log(groups);
    res.json({ success: true, groups, userDetails: req.user });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
}
export async function getGroup(req: any, res: any, next: any) {
  interface body_inter {
    id: string;
  }
  const body = req.body;

  try {
    const group = await Groups.findOne({ where: { id: body.id } });

    res.status(200).json({ group, success: true });
  } catch (err) {
    res.status(500).json({ group: null, success: true });
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
      res.status(200).json({ data: user, success: true, message: "done" });
    } else {
      res.status(200).json({ data: null, success: false });
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
    const group = (await Groups.findOne({
      where: { id: query.groupId },
    })) as any;
    console.log(group);
    if (group.Admin === req.user.id) {
      const gu = await groupuser.destroy({
        where: { groupId: query.groupId, userId: query.userId },
      });
      if (gu) {
        res.status(200).json({ data: gu, success: true });
      }
    } else {
      res
        .status(200)
        .json({ success: false, message: "Only Admin can Remove a User" });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ success: false });
  }
}
