var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var router = express.Router();

module.exports = function(passport) {
  /* GET auth page. */
  router.get('/', function(req, res, next) {
    var fmsg = req.flash();
    var feedback = '';
    console.log(fmsg);
    if(typeof fmsg.error != "undefined"){
      feedback = fmsg.error[0];
    }
    console.log('feedback : '+ feedback);
    res.render('auth', {msg: feedback});
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

  router.post('/login', 
    passport.authenticate('local', 
    { 
      successRedirect: '/auth/login_success',
      failureRedirect: '/auth/login_failure',
      failureFlash: true
    })
  );

  router.get('/login_success', function(req, res, next){
    res.redirect('/');
  });

  router.get('/login_failure', function(req, res, next){
    res.redirect('/auth');
  });

  router.get('/logout', function(req, res) {
    req.logout();
    req.session.save(function(){
      res.redirect('/');
    });
  });

  return router;
};
