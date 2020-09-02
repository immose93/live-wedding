module.exports = function(sequelize, DataTypes){
    // 모델 정의
    let user = sequelize.define("User", {
        // ID
        user_id: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        // 비밀번호
        password: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        // 이름
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        // 생일(YYYY-MM-DD)
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        // 성별
        gender: {
            type: DataTypes.STRING(1),
            allowNull: false
        },
        // 휴대전화
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        // 이메일
        email: {
            type: DataTypes.STRING(320),
            allowNull: false
        },
        // 가입일(YYYY-MM-DD)
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "user"
    });
    return user;
}