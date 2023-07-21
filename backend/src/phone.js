import coolsms from "coolsms-node-sdk";
import * as dotenv from "dotenv";
dotenv.config();

export function checkValidationPhone(myphone) {
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const count = 6;
  if (count === undefined) {
    console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
    return;
  } else if (count <= 0) {
    console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
    return;
  } else if (count > 10) {
    console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
    return;
  }
  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    "0"
  );
  return result;
  // console.log(result)
}

export async function sendTokenToSMS(fff, ggg) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;
  const mysms = coolsms.default;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  await messageService
    .sendOne({
      to: fff,
      from: SMS_SENDER,
      text: `[효성] 요청하신 인증번호는 [${ggg}] 입니다.`,
    })
    .then((res) => console.log(res));
}
