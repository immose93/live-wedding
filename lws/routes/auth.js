var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('auth');
});

// 회원가입
router.post('/signup', function(req, res, next) {
  let body = req.body;
  console.log(`id: ${body.id}`);
  // DB에 등록
  models.User.create({
    user_id: body.id,
    password: body.pw,
    name: body.name,
    birthday: body.birthday,
    gender: body.gender,
    phone: body.phone,
    email: body.email
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

module.exports = router;
