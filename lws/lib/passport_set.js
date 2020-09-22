var flash = require('connect-flash');
var crypto = require('crypto');

module.exports = function(app, models) {
    var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy; // local 전략 사용

    app.use(passport.initialize()); // 세션 초기화
    app.use(passport.session());  // 세션 사용
    app.use(flash()); // 플래시 사용

    // serializeUser : 사용자의 식별자를 세션 스토어에 저장
    passport.serializeUser(function(user,done){
        done(null, user.user_id); // session.passport.user에 id 저장
    });

    // deserializeUser : 사용자의 식별자로 데이터를 조회할 때 사용
    passport.deserializeUser(async function(id,done){
        var userData = await models.User.findOne({
            where: {
                user_id: id
            }
        });
        done(null, userData.dataValues);
    });

    // local 전략 설정
    passport.use(new LocalStrategy(
        {
            usernameField: 'id' // username으로 id를 받음
        },
        async function(id, password, done) { // local 전략으로 인증요청이 들어오면 이 콜백함수를 수행
            let result = await models.User.findOne({
                where: {
                    user_id: id
                }
            });
            if(result === null){ // 존재하지 않는 ID 입력
                return done(null, false, {
                    message: '존재하지 않는 ID입니다.'
                })
            }
            else {
                // 비밀번호 검사
                let dbPW = result.dataValues.password;
                let salt = result.dataValues.salt;
                let hashPW = crypto.createHash("sha512").update(password+salt).digest("hex");

                if(dbPW === hashPW){  // 인증 성공
                    return done(null, result.dataValues);
                }
                else {
                    return done(null, false, {  // 틀린 비밀번호 입력
                        message: '비밀번호가 틀렸습니다.'
                    })
                }
            }
        }
    ));

    return passport;
};

