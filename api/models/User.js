'use strict';

const TokenHelper = rootRequire("utilities/token-helper");
const PasswordHelper = rootRequire("utilities/password-helper");


/////////////////////////////////////////////////
//  Export Model Definition
/////////////////////////////////////////////////

module.exports = function(sequelize, DataTypes) {

    const User = sequelize.define('User', {
        id: {
            unique: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        f_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        l_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        email: {
            index: true,
            allowNull: false,
            type: DataTypes.STRING,
            foreignKey: true,
            unique: true,
            validate: {
                isEmail: true,
                isUnique: (email, next) => {

                    User.findByEmail(email).then( (user) => {
                        
                        if (user) {
                            return next("Email has already been used");
                        }

                        return next();
                    });
                }
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        access_token: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        tableName: 'grail_users',
        instanceMethods: {
            toJSON: function () {
                var values = this.get();
                delete values.password;
                delete values.createdAt;
                return values;
            },
            comparePassword: function (password, done) {
                const passwordHash = this.get("password");
                return PasswordHelper.comparePassword(password, passwordHash);
            },
            generateAccessToken: function () {
                this.access_token = TokenHelper.createToken(this.id);
                return this;
            }
        }
    });


    /////////////////////////////////////////////////
    //  Model Hooks
    /////////////////////////////////////////////////

    /* Before Create */
    User.beforeCreate( (user, options) => {

        // Generate User Access Token
        user.generateAccessToken();

        // Hash User Password
        return PasswordHelper.hashPassword(user.get("password"))
            .then( (hash) => { 
                user.password = hash
            });
    });


    /////////////////////////////////////////////////
    //  Model Class Methods
    /////////////////////////////////////////////////
    
    /* Find User By Email */
    User.findByEmail = (email) => {
        return User.findOne({ where: { email } });
    };


    /////////////////////////////////////////////////
    //  Model Export
    /////////////////////////////////////////////////

    return User;
};