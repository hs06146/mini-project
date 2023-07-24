import express from "express";
import { User } from "./models/user.model.js";
import { Starbucks } from "./models/starbucks.model.js";
import { Token } from "./models/token.model.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./src/phone.js";
import {
  checkValidationEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./src/email.js";
import mongoose from "mongoose";
import cors from "cors";
import { getOGFromPrefer } from "./src/cheerio.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";

const port = 3000;
const app = express();
const mongoDBPort = process.env.mongoDBPort || 27017;
const mongoDBDatabase = process.env.mongoDBDatabase;

app.use(cors({credentials:true}));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;
  const findToken = await Token.findOne({ phone }).exec();
  if (!findToken || !findToken.isAuth) {
    return res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다");
  }

  const ogData = await getOGFromPrefer(prefer);
  const pattern = /.{6}$/;
  
  const userData = new User({
    name,
    email,
    personal: personal.replace(pattern, "******"),
    prefer,
    pwd,
    phone,
    og: {
      title: ogData.title,
      description: ogData.description,
      image: ogData.image,
    },
  });
  await userData.save();
  
  const isValid = checkValidationEmail(email);
  if (isValid) {
    const mytemplate = getWelcomeTemplate(name);
    sendTemplateToEmail(email, mytemplate);
  }
  res.send(userData._id);
});

app.get("/users", async (req, res) => {
  const userResult = await User.find();
  res.send(userResult);
});

app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.phone;
  const isValid = checkValidationPhone(myphone);
  const isExist = await Token.findOne({ phone: req.body.phone }).exec();
  if (isValid) {
    const mytoken = getToken();
    sendTokenToSMS(myphone, mytoken);
    if (isExist) {
      await Token.updateOne(
        { phone: req.body.phone },
        { $set: { token: mytoken } }
      );
    } else {
      const tokenData = new Token({
        token: mytoken,
        phone: myphone,
        isAuth: "false",
      });
      await tokenData.save();
    }
  }
  res.send("토큰 생성 완료");
});

app.patch("/tokens/phone", async (req, res) => {
  const { phone, token } = req.body;
  const findPhone = await Token.findOne({ phone }).exec();
  if (findPhone === null) {
    return res.send("false");
  }
  if (findPhone.token === token) {
    await Token.updateOne({ phone }, { isAuth: "true" });
  }
  res.send("true");
});

app.get("/starbucks", async (req, res) => {
  const starbucksResult = await Starbucks.find();
  res.send(starbucksResult);
});

mongoose.connect(`mongodb://localhost:${mongoDBPort}/${mongoDBDatabase}`)

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
