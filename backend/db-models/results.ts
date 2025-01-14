import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface resultsAttributes {
  id: string;
  survey_id: string;
  respondent_id: number;
  personal_id: string;
  status: number;
  content_result?: object;
  created_at?: Date;
  created_by: number;
  update_at?: Date;
  update_by: number;
}

export type resultsPk = "id";
export type resultsId = results[resultsPk];
export type resultsOptionalAttributes = "id" | "content_result" | "created_at" | "update_at";
export type resultsCreationAttributes = Optional<resultsAttributes, resultsOptionalAttributes>;

export class results extends Model<resultsAttributes, resultsCreationAttributes> implements resultsAttributes {
  id!: string;
  survey_id!: string;
  respondent_id!: number;
  personal_id!: string;
  status!: number;
  content_result?: object;
  created_at?: Date;
  created_by!: number;
  update_at?: Date;
  update_by!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof results {
    return results.init({
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
    respondent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "รหัสพนักงานของผู้ตอบแบบสำรวจ (บุคคลภายนอกเป็น -1)"
    },
    personal_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "รหัสบัตรประชาชนในกรณีบุคคลภายนอกเข้าตอบ"
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "โยงกับtable master_status 30 ขึ้นไป"
    },
    content_result: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "โครงสร้างของคำตอบเป็น JSON"
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
    tableName: 'results',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "results_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
