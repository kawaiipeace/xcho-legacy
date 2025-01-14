import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface assigneesAttributes {
  id: string;
  survey_id: string;
  assignee_id: number;
  created_at?: Date;
  created_by: number;
  update_at?: Date;
  update_by: number;
}

export type assigneesPk = "id";
export type assigneesId = assignees[assigneesPk];
export type assigneesOptionalAttributes = "id" | "created_at" | "update_at";
export type assigneesCreationAttributes = Optional<assigneesAttributes, assigneesOptionalAttributes>;

export class assignees extends Model<assigneesAttributes, assigneesCreationAttributes> implements assigneesAttributes {
  id!: string;
  survey_id!: string;
  assignee_id!: number;
  created_at?: Date;
  created_by!: number;
  update_at?: Date;
  update_by!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof assignees {
    return assignees.init({
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
    assignee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "รหัสพนักงานของผู้ถูก Assign ให้ตอบ"
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Stamp ID ผู้สร้าง"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Timestamp วันและเวลาของการปรับปรุง"
    },
    update_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Stamp ID ผู้ปรับปรุง"
    }
  }, {
    sequelize,
    tableName: 'assignees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "assignees_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
