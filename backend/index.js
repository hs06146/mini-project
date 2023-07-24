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

app.use(cors({credentials:true}));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// 회원가입 API: Post /user
app.post("/users", async (req, res) => {
  const { name, email, personal, prefer, pwd, phone } = req.body;
  const findToken = await Token.findOne({ phone }).exec();
  if (!findToken || !findToken.isAuth) {
    return res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다");
  }

  const ogData = await getOGFromPrefer(prefer);
  const pattern = /.{6}$/; // 정규식
  
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

// 회원 목록 조회 API
app.get("/users", async (req, res) => {
  //1. User 데이터를 가져옴
  const userResult = await User.find();
  // name, email, personal, prefer, phone, og

  //2. res.send로 보내줌
  res.send(userResult);
});

//토큰 인증 API
app.post("/tokens/phone", async (req, res) => {
  //1. req에 핸드폰 번호가 담겨서 옴.
  const myphone = req.body.phone;
  //2. token을 발급 받음.
  const isValid = checkValidationPhone(myphone);
  const isExist = await Token.findOne({ phone: req.body.phone }).exec();
  //3. 입력 받은 핸드폰 번호로 token 전송
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
  //4. token, 핸드폰번호, isAuth:false 로 DB에 저장
  res.send("토큰 생성 완료");
});

// 토큰 인증 완료 API
app.patch("/tokens/phone", async (req, res) => {
  // 1. 핸드폰 번호와 토큰을 전달 받음.
  const { phone, token } = req.body;
  // 2. 핸드폰 번호가 있는 지 확인
  const findPhone = await Token.findOne({ phone }).exec();
  if (findPhone === null) {
    return res.send("false");
  }
  // 3. 입력 받은 토큰과 저장된 토큰 비교
  if (findPhone.token === token) {
    // 4. 토큰이 일치하면 isAuth를 true로 변경
    await Token.updateOne({ phone }, { isAuth: "true" });
  }
  res.send("true");
});

app.get("/starbucks", async (req, res) => {
  const starbucksResult = await Starbucks.find();
  res.send(starbucksResult);
});

// 몽고DB 접속
//mongoose.connect("mongodb://mini-project-database:27017/miniProject");
mongoose.connect("mongodb://localhost:27017/miniProject")

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
