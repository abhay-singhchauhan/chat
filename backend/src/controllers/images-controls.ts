import aws from "aws-sdk";
import dotenv from "dotenv";
import Groups from "../models/groups";
import crypto from "crypto";
dotenv.config();

const region = "us-east-1";
const bucketName = "chat.app.project/";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function uploadProfileImage(req: any, res: any, next: any) {
  try {
    const image = "user-" + req.user.id;
    const param = {
      Bucket: bucketName + "userProfile",
      Key: image,
      Expires: 60,
    };
    const uploadUrl = await s3.getSignedUrlPromise("putObject", param);
    res.json(uploadUrl);
  } catch (err) {
    console.log(err);
  }
}

export async function updateProfileImage(req: any, res: any, next: any) {
  try {
    const resp = await req.user.update({ ProfileImageUrl: req.body.url });
    if (res) {
      res.status(200).json({ resp });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
}

export async function uploadGroupImage(req: any, res: any, next: any) {
  try {
    console.log(req.query);
    const image = "group-" + req.query.id;
    const param = {
      Bucket: bucketName + "groupProfile",
      Key: image,
      Expires: 60,
    };
    const uploadUrl = await s3.getSignedUrlPromise("putObject", param);
    res.json(uploadUrl);
  } catch (err) {
    console.log(err);
  }
}

export async function updateGroupImage(req: any, res: any, next: any) {
  try {
    const resp = (await Groups.findOne({
      where: { id: req.query.id },
    })) as any;
    console.log(resp, "<<resp>>");
    console.log(req.query, req.body);
    const update = await resp.update({ Image: req.body.url });
    console.log(update, "<<>><<>><<>><<>>");
    if (update) {
      res.status(200).json({ update });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}

export async function uploadMessageImage(req: any, res: any, next: any) {
  try {
    const uuid = crypto.randomUUID();
    console.log(req.query);
    const image = "message-" + uuid;
    const param = {
      Bucket: bucketName + "Messages",
      Key: image,
      Expires: 60,
    };
    const uploadUrl = await s3.getSignedUrlPromise("putObject", param);
    res.json(uploadUrl);
  } catch (err) {
    console.log(err);
  }
}
