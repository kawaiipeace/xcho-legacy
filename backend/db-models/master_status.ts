import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface master_statusAttributes {
  status_id: number;
  status_detail: string;
}

export type master_statusPk = "status_id";
export type master_statusId = master_status[master_statusPk];
export type master_statusCreationAttributes = master_statusAttributes;

export class master_status extends Model<master_statusAttributes, master_statusCreationAttributes> implements master_statusAttributes {
  status_id!: number;
  status_detail!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof master_status {
    return master_status.init({
    status_id: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "รหัสสถานะ\r\n(เลข 1 นำหน้าเป็นสถานะ flow อนุมัติสำหรับ survey)\r\n10 บันทึกร่าง (แก้ไขแบบฟอร์มได้)\r\n11 รออนุมัติ\r\n12 อนุมัติสำเร็จ\r\n13 ตีกลับแก้ไข (แก้ไขแบบฟอร์มได้)\r\n(เลข 2 นำหน้าเป็น flow การเผยแพร่ survey) (ยังแก้ไขวันที่เผยแพร่กับ assignee ได้)\r\n20 รอเผยแพร่\r\n21 เผยแพร่แล้ว\r\n22 ระงับเผยแพร่\r\n23 เต็มโควต้า\r\n24 หมดอายุ\r\n(เลข 3 นำหน้าเป็นสถานะสำหรับคำตอบ)\r\n30 ยังไม่ตอบหรือร่างคำตอบ\r\n31 ตอบแล้ว\r\n32 ตอบไม่ทัน\r\n33 ตอบแล้ว\/แก้ไขคำตอบ\r\n90 ถูกลบ",
      primaryKey: true
    },
    status_detail: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "คำอธิบายของสถานะ"
    }
  }, {
    sequelize,
    tableName: 'master_status',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "master_status_pk",
        unique: true,
        fields: [
          { name: "status_id" },
        ]
      },
    ]
  });
  }
}
