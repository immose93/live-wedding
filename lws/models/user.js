module.exports = function(sequelize, DataTypes){
    let user = sequelize.define("User", {
        // ID
        userID: {
            filed: "user_id",
            type: DataTypes.VARCHAR(30),
            unique: true,
            allowNull: false
        },
        // 비밀번호
        password: {
            filed: "password",
            type: DataTypes.VARCHAR(30),
            allowNull: false
        },
        // 이름
        name: {
            filed: "name",
            type: DataTypes.VARCHAR(30),
            allowNull: false
        },
        // 생일
        birthday: {
            filed: "birthday", 
            type: DataTypes.DATE,
            allowNull: false
        },
        // 성별
        gender: {
            filed: "gender",
            type: DataTypes.CHAR(1),
            allowNull: false
        },
        // 휴대전화
        phone: {
            filed: "phone",
            type: DataTypes.VARCHAR(20),
            allowNull: false
        },
        // 이메일
        email: {
            filed: "email",
            type: DataTypes.STRING(320),
            allowNull: false
        },
        // 가입일(YYYYMMDDHHMMSS)
        joined: {
            filed: "joined",
            type: DataTypes.TIMESTAMP,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "user"
    });
    return user;
}