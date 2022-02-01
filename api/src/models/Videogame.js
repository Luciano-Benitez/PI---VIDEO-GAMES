const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    plataformas: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: true, 
      defaultValue:true
    },

    img: {
      type: DataTypes.STRING,
      allowNull: false, 
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcAzVhivQaODwCNC-s4WGPbGoF2Yi2mx2aVw&usqp=CAU'
    },

  });
};
