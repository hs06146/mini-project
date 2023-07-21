// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const last = document.getElementById("PhoneNumber03").value;
  const phoneNumber = first + second + last;

  await axios.post("http://localhost:3000/tokens/phone", {
    phone: phoneNumber,
  }).then((res) => {
    console.log(res);
  })
  console.log("인증 번호 전송");
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const first = document.getElementById("PhoneNumber01").value;
  const second = document.getElementById("PhoneNumber02").value;
  const last = document.getElementById("PhoneNumber03").value;
  const phoneNumber = first + second + last;
  const tokenInput = document.getElementById("TokenInput").value;

  await axios.patch("http://localhost:3000/tokens/phone", {
    phone: phoneNumber,
    token: tokenInput,
  });
  console.log("핸드폰 인증 완료");
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById("SignupName").value;
  const signupPersonal1 = document.getElementById("SignupPersonal1").value;
  const signupPersonal2 = document.getElementById("SignupPersonal2").value;
  const phoneNumber01 = document.getElementById("PhoneNumber01").value;
  const phoneNumber02 = document.getElementById("PhoneNumber02").value;
  const phoneNumber03 = document.getElementById("PhoneNumber03").value;
  const tokenInput = document.getElementById("TokenInput").value;
  const prefer = document.getElementById("SignupPrefer").value;
  const email = document.getElementById("SignupEmail").value;
  const pwd = document.getElementById("SignupPwd").value;

  console.log("name: ", name);
  console.log("email: ", email);
  console.log("personal: ", `${signupPersonal1}-${signupPersonal2}`);
  console.log("prefer: ", prefer);
  console.log("pwd: ", pwd);
  console.log("phone: ", phoneNumber01+phoneNumber02+phoneNumber03);
  await axios.post("http://localhost:3000/users", {
    name,
    email,
    personal: `${signupPersonal1}-${signupPersonal2}`,
    prefer,
    pwd,
    phone: phoneNumber01 + phoneNumber02 + phoneNumber03,
  })

  console.log("회원 가입 완료");
};
