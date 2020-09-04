var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var router = express.Router();

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('auth');
});

// 회원가입
router.post('/signup', function(req, res, next) {
  let body = req.body;
  // 비밀번호 암호화
  let inputPW = body.pw;
  let salt = Math.round((new Date().valueOf()*Math.random()))+"";
  let hashPW = crypto.createHash("sha512").update(inputPW+salt).digest("hex");
  
  // DB에 등록
  models.User.create({
    user_id: body.id,
    password: hashPW,
    name: body.name,
    birthday: body.birthday,
    gender: body.gender,
    phone: body.phone,
    email: body.email,
    salt: salt
  })
  .then(result => {
    console.log(`${body.id}님 회원가입 데이터 추가 완료`);
    res.redirect("/auth");  // 로그인 페이지로 리디렉션
  })
  .catch(err => {
    console.log("데이터 추가 실패");
    res.send("회원가입 실패. 관리자에게 문의하세요.");
  });
});

// 로그인
router.post('/login', async function(req, res, next) {
  let body = req.body;

  let result = await models.User.findOne({
    where: {
      user_id: body.id
    }
  });
  // 비밀번호 검사
  let dbPW = result.dataValues.password;
  let inputPW = body.password;
  let salt = result.dataValues.salt;
  let hashPW = crypto.createHash("sha512").update(inputPW+salt).digest("hex");

  if(dbPW === hashPW){
    console.log(`${body.id} 로그인`);
    res.redirect("/user");
  }
  else {
    console.log("비밀번호 불일치");
    res.redirect("/auth");
  }
});

module.exports = router;
