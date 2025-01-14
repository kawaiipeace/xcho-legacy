import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface role_approversAttributes {
  id: string;
  role_id: string;
  role_name: string;
}

export type role_approversPk = "id";
export type role_approversId = role_approvers[role_approversPk];
export type role_approversOptionalAttributes = "id";
export type role_approversCreationAttributes = Optional<role_approversAttributes, role_approversOptionalAttributes>;

export class role_approvers extends Model<role_approversAttributes, role_approversCreationAttributes> implements role_approversAttributes {
  id!: string;
  role_id!: string;
  role_name!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof role_approvers {
    return role_approvers.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "ระดับตำแหน่งพนักงานตาม hr platform"
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "ชื่อตำแหน่งพนักงาน"
    }
  }, {
    sequelize,
    tableName: 'role_approvers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "role_approvers_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
