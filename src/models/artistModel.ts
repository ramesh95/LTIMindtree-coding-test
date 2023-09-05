import { Model, DataTypes, Sequelize } from 'sequelize';

class Artist extends Model {
  public artistID!: string;
  public trackID!: string;
  public name!: string;
  public uri!: string; 
}

export const initArtistModel = (sequelize: Sequelize) => {
    Artist.init(
    {
      artistID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      trackID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistName:{
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'artists',
    }
  );
};

export { Artist };

