var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
       type: DataTypes.STRING,
       allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    resetPasswordToken: {
      type: DataTypes.STRING
    },

    resetPasswordExpires: {
      type: DataTypes.DATE
    }

  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        options.individualHooks = true;
      },

      beforeUpdate: function (user, options) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        options.individualHooks = true;
      }
    }

  });

  User.associate = (models) => {
    User.belongsToMany(models.Sheet, {
      through: 'UserSheet',
      as: 'Sheet',
      foreignKey: 'userId'
    })
  }

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};