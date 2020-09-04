module.exports = function(sequelize, DataTypes){
    // 모델 정의
    let user = sequelize.define("User", {
        // ID
        user_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        // 비밀번호
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // 이름
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // 생년월일(YYYY-MM-DD)
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        // 성별
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // 휴대전화
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // 이메일
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        // 암호화를 위한 salt 키
        salt: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "user"
    });
    return user;
}