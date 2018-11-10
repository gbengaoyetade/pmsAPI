const locations = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      totalFemale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalMale: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentId: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
  Locations.beforeCreate((location) => {
    location.total = Number(location.totalFemale) + Number(location.totalMale); // eslint-disable-line
  });
  Locations.associate = (models) => {
    Locations.belongsTo(models.Users, {
      foreignKey: 'createdBy',
    });
  };
  return Locations;
};

export default locations;
