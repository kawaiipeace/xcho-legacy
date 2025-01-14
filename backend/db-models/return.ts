import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface return_Attributes {
  id: string;
  survey_id: string;
  created_at?: Date;
  created_by: number;
}

export type return_Pk = "id";
export type return_Id = return_[return_Pk];
export type return_OptionalAttributes = "id" | "created_at";
export type return_CreationAttributes = Optional<return_Attributes, return_OptionalAttributes>;

export class return_ extends Model<return_Attributes, return_CreationAttributes> implements return_Attributes {
  id!: string;
  survey_id!: string;
  created_at?: Date;
  created_by!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof return_ {
    return return_.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    survey_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "id จาก surveys (โครงสร้างแบบสำรวจ)"
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Stamp ID ผู้สร้าง"
    }
  }, {
    sequelize,
    tableName: 'return',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "return_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
