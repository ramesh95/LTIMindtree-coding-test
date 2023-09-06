import { Model, DataTypes, Sequelize } from 'sequelize';

class Track extends Model {
  public trackID!: string;
  public trackName!: string;
  public duration!: number; 
  public releaseDate!: Date; 
  public popularity!: number; 
  
  static associate(models: any) {
    Track.hasMany(models.Artist, {
      foreignKey: 'trackID',
      as: 'artists',
    });
  }
}

export const initTrackModel = (sequelize: Sequelize) => {
  Track.init(
    {
      trackID: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      trackName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isrc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      popularity:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: 'Track',
      tableName: 'tracks',
    }
  );
};

export { Track };

