import bcrypt from 'bcryptjs';

const usersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {},
  );
  Users.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash; // eslint-disable-line
  });
  Users.associate = (models) => {
    Users.hasMany(models.Locations, {
      foreignKey: 'createdBy',
    });
  };
  return Users;
};
export default usersModel;
