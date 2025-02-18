import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface mock_user_dataAttributes {
  user_id: string;
  name: string;
  surname: string;
  dep_code: string;
}

export type mock_user_dataPk = "user_id";
export type mock_user_dataId = mock_user_data[mock_user_dataPk];
export type mock_user_dataCreationAttributes = mock_user_dataAttributes;

export class mock_user_data extends Model<mock_user_dataAttributes, mock_user_dataCreationAttributes> implements mock_user_dataAttributes {
  user_id!: string;
  name!: string;
  surname!: string;
  dep_code!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof mock_user_data {
    return mock_user_data.init({
    user_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "รหัสพนักงาน",
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "ขื่อ"
    },
    surname: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "สกุล"
    },
    dep_code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      comment: "รหัสหน่วยงาน"
    }
  }, {
    sequelize,
    tableName: 'mock_user_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mock_user_data_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
