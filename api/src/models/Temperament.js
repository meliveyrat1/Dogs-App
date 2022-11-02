const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('temperament', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true //si yo creo esto no me va a agregra un id por default
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
},{timestamps:false});
};
