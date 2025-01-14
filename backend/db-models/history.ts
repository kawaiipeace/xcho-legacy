import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface historyAttributes {
  id: string;
  survey_id: string;
  result_id?: string;
  status_before: number;
  status_after: number;
  request_uri: string;
  request_data?: object;
  created_at?: Date;
  created_by: number;
}

export type historyPk = "id";
export type historyId = history[historyPk];
export type historyOptionalAttributes = "id" | "result_id" | "request_data" | "created_at";
export type historyCreationAttributes = Optional<historyAttributes, historyOptionalAttributes>;

export class history extends Model<historyAttributes, historyCreationAttributes> implements historyAttributes {
  id!: string;
  survey_id!: string;
  result_id?: string;
  status_before!: number;
  status_after!: number;
  request_uri!: string;
  request_data?: object;
  created_at?: Date;
  created_by!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof history {
    return history.init({
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
    result_id: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "id คำตอบ"
    },
    status_before: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "สถานะก่อนเปลี่ยนแปลงของ survey"
    },
    status_after: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "สถานะหลังเปลี่ยนแปลงของ survey"
    },
    request_uri: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "uri ที่ frontend ยิงไปหา backend"
    },
    request_data: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "request body"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "Timestamp วันและเวลาของการสร้าง"
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Stamp ID ผู้สร้าง"
    }
  }, {
    sequelize,
    tableName: 'history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "history_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
