import { Model, DataTypes, Sequelize } from 'sequelize';

class Track extends Model {
  public trackID!: string;
  public trackName!: string;
  public duration!: number; 
  public releaseDate!: Date; 
  public popularity!: number; 

  // Define associations
  static associate(models: any) {
    // Define a one-to-many relationship from Track to Artist
    Track.hasMany(models.Artist, {
      foreignKey: 'trackID', // The foreign key in the Artist model
      as: 'artists', // Alias for the association
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

