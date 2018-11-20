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

  Locations.afterCreate(async (childLocation) => {
    const {
      parentId,
      total: childTotal,
      totalFemale: childFemale,
      totalMale: childMale,
    } = childLocation.dataValues;
    if (!parentId) {
      return false;
    }

    const parentLocation = await Locations.findByPk(parentId);
    const {
      total: parentTotal,
      totalFemale: parentFemale,
      totalMale: parentMale,
    } = parentLocation;

    const newParentDetails = {
      total: parentTotal + childTotal,
      totalFemale: parentFemale + childFemale,
      totalMale: parentMale + childMale,
    };
    await Locations.update(
      { ...newParentDetails },
      { where: { id: parentId } },
    );
    return true;
  });

  Locations.associate = (models) => {
    Locations.belongsTo(models.Users, {
      foreignKey: 'createdBy',
    });
  };

  Locations.associate = (models) => {
    Locations.hasOne(models.Locations, {
      foreignKey: 'parentId',
      as: 'childLocation',
    });
  };
  return Locations;
};

export default locations;
