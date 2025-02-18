import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface master_departmentAttributes {
  dept_sap: string;
  dept_change_code?: string;
  dept_upper?: string;
  dept_short1?: string;
  dept_short2?: string;
  dept_short3?: string;
  dept_short4?: string;
  dept_short5?: string;
  dept_short6?: string;
  dept_short7?: string;
  dept_short?: string;
  dept_full1?: string;
  dept_full2?: string;
  dept_full3?: string;
  dept_full4?: string;
  dept_full5?: string;
  dept_full6?: string;
  dept_full7?: string;
  dept_full?: string;
  cost_center_code?: string;
  cost_center_name?: string;
  pea_code?: string;
  business_place?: string;
  business_area?: string;
  resource_code?: string;
  resource_name?: string;
  tax_branch?: string;
  is_active: boolean;
  created_at: Date;
  created_by?: string;
  updated_at: Date;
  updated_by?: string;
  is_deleted?: boolean;
}

export type master_departmentPk = "dept_sap";
export type master_departmentId = master_department[master_departmentPk];
export type master_departmentOptionalAttributes = "dept_change_code" | "dept_upper" | "dept_short1" | "dept_short2" | "dept_short3" | "dept_short4" | "dept_short5" | "dept_short6" | "dept_short7" | "dept_short" | "dept_full1" | "dept_full2" | "dept_full3" | "dept_full4" | "dept_full5" | "dept_full6" | "dept_full7" | "dept_full" | "cost_center_code" | "cost_center_name" | "pea_code" | "business_place" | "business_area" | "resource_code" | "resource_name" | "tax_branch" | "created_at" | "created_by" | "updated_at" | "updated_by" | "is_deleted";
export type master_departmentCreationAttributes = Optional<master_departmentAttributes, master_departmentOptionalAttributes>;

export class master_department extends Model<master_departmentAttributes, master_departmentCreationAttributes> implements master_departmentAttributes {
  dept_sap!: string;
  dept_change_code?: string;
  dept_upper?: string;
  dept_short1?: string;
  dept_short2?: string;
  dept_short3?: string;
  dept_short4?: string;
  dept_short5?: string;
  dept_short6?: string;
  dept_short7?: string;
  dept_short?: string;
  dept_full1?: string;
  dept_full2?: string;
  dept_full3?: string;
  dept_full4?: string;
  dept_full5?: string;
  dept_full6?: string;
  dept_full7?: string;
  dept_full?: string;
  cost_center_code?: string;
  cost_center_name?: string;
  pea_code?: string;
  business_place?: string;
  business_area?: string;
  resource_code?: string;
  resource_name?: string;
  tax_branch?: string;
  is_active!: boolean;
  created_at!: Date;
  created_by?: string;
  updated_at!: Date;
  updated_by?: string;
  is_deleted?: boolean;


  static initModel(sequelize: Sequelize.Sequelize): typeof master_department {
    return master_department.init({
      dept_sap: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true
      },
      dept_change_code: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      dept_upper: {
        type: DataTypes.STRING(8),
        allowNull: true
      },
      dept_short1: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short2: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short3: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short4: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short5: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short6: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short7: {
        type: DataTypes.STRING(12),
        allowNull: true
      },
      dept_short: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      dept_full1: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full2: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full3: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full4: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full5: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full6: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full7: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      dept_full: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      cost_center_code: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      cost_center_name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      pea_code: {
        type: DataTypes.STRING(6),
        allowNull: true
      },
      business_place: {
        type: DataTypes.STRING(4),
        allowNull: true
      },
      business_area: {
        type: DataTypes.STRING(4),
        allowNull: true
      },
      resource_code: {
        type: DataTypes.STRING(5),
        allowNull: true
      },
      resource_name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      tax_branch: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      created_by: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      updated_by: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      created_at: '',
      updated_at: ''
    }, {
    sequelize,
    tableName: 'master_department',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "master_department_pk",
        unique: true,
        fields: [
          { name: "dept_sap" },
        ]
      },
    ]
  });
  }
}
