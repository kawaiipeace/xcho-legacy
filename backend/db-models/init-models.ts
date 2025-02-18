import type { Sequelize } from "sequelize";
import { assignees as _assignees } from "./assignees";
import type { assigneesAttributes, assigneesCreationAttributes } from "./assignees";
import { history as _history } from "./history";
import type { historyAttributes, historyCreationAttributes } from "./history";
import { master_department as _master_department } from "./master_department";
import type { master_departmentAttributes, master_departmentCreationAttributes } from "./master_department";
import { master_status as _master_status } from "./master_status";
import type { master_statusAttributes, master_statusCreationAttributes } from "./master_status";
import { mock_user_data as _mock_user_data } from "./mock_user_data";
import type { mock_user_dataAttributes, mock_user_dataCreationAttributes } from "./mock_user_data";
import { results as _results } from "./results";
import type { resultsAttributes, resultsCreationAttributes } from "./results";
import { return_ as _return_ } from "./return";
import type { return_Attributes, return_CreationAttributes } from "./return";
import { role_approvers as _role_approvers } from "./role_approvers";
import type { role_approversAttributes, role_approversCreationAttributes } from "./role_approvers";
import { survey as _survey } from "./survey";
import type { surveyAttributes, surveyCreationAttributes } from "./survey";

export {
  _assignees as assignees,
  _history as history,
  _master_department as master_department,
  _master_status as master_status,
  _mock_user_data as mock_user_data,
  _results as results,
  _return_ as return_,
  _role_approvers as role_approvers,
  _survey as survey,
};

export type {
  assigneesAttributes,
  assigneesCreationAttributes,
  historyAttributes,
  historyCreationAttributes,
  master_departmentAttributes,
  master_departmentCreationAttributes,
  master_statusAttributes,
  master_statusCreationAttributes,
  mock_user_dataAttributes,
  mock_user_dataCreationAttributes,
  resultsAttributes,
  resultsCreationAttributes,
  return_Attributes,
  return_CreationAttributes,
  role_approversAttributes,
  role_approversCreationAttributes,
  surveyAttributes,
  surveyCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const assignees = _assignees.initModel(sequelize);
  const history = _history.initModel(sequelize);
  const master_department = _master_department.initModel(sequelize);
  const master_status = _master_status.initModel(sequelize);
  const mock_user_data = _mock_user_data.initModel(sequelize);
  const results = _results.initModel(sequelize);
  const return_ = _return_.initModel(sequelize);
  const role_approvers = _role_approvers.initModel(sequelize);
  const survey = _survey.initModel(sequelize);


  return {
    assignees: assignees,
    history: history,
    master_department: master_department,
    master_status: master_status,
    mock_user_data: mock_user_data,
    results: results,
    return_: return_,
    role_approvers: role_approvers,
    survey: survey,
  };
}
