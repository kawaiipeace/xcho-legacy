import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface surveyAttributes {
  id: string;
  survey_title: string;
  creator_id: number;
  publish_date: Date;
  expire_date: Date;
  qr_code: string;
  short_link: string;
  status: number;
  approver_id?: number;
  is_outsider_allowed: boolean;
  created_at?: Date;
  created_by: number;
  update_at?: Date;
  update_by: number;
  content_survey: object;
}

export type surveyPk = "id";
export type surveyId = survey[surveyPk];
export type surveyOptionalAttributes = "id" | "approver_id" | "created_at" | "update_at";
export type surveyCreationAttributes = Optional<surveyAttributes, surveyOptionalAttributes>;

export class survey extends Model<surveyAttributes, surveyCreationAttributes> implements surveyAttributes {
  id!: string;
  survey_title!: string;
  creator_id!: number;
  publish_date!: Date;
  expire_date!: Date;
  qr_code!: string;
  short_link!: string;
  status!: number;
  approver_id?: number;
  is_outsider_allowed!: boolean;
  created_at?: Date;
  created_by!: number;
  update_at?: Date;
  update_by!: number;
  content_survey!: object;


  static initModel(sequelize: Sequelize.Sequelize): typeof survey {
    return survey.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    survey_title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "ชื่อแบบสำรวจ"
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "รหัสพนักงาน"
    },
    publish_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันและเวลาเผยแพร่แบบฟอร์ม"
    },
    expire_date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันและเวลาที่หมดอายุของแบบฟอร์ม"
    },
    qr_code: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "เก็บภาพ QR Code"
    },
    short_link: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "เก็บลิงค์สั้นของ Survey"
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "สถานะของโครงสร้างในแบบสำรวจ"
    },
    approver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "รหัสพนักงานของผู้อนุมัติ"
    },
    is_outsider_allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "บุคคลภายนอกตอบแบบสอบถามได้หรือไม่"
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
    },
    content_survey: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'survey',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "survey_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
