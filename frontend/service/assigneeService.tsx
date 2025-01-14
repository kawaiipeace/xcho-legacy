import Assignee from "@/model/assignee";
import createAssigneeRequest from "@/model/createAssigneeRequest";

const APIURL = 'http://localhost:2501/assignees';
export async function createAssignee(assignee: createAssigneeRequest): Promise<Assignee> {
    const response = await fetch(APIURL+'/create-assignee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignee),
    });
    const mapToAssignee = (item : Assignee) => {
        const assigneeItem = new Assignee();
        assigneeItem.id = item.id;
        assigneeItem.survey_id = item.survey_id;
        assigneeItem.assignee_id = item.assignee_id;
        assigneeItem.created_at = item.created_at;
        assigneeItem.created_by = item.created_by;
        assigneeItem.update_at = item.update_at;
        assigneeItem.update_by = item.update_by;
        return assigneeItem;
    }
    const result: Assignee = mapToAssignee(await response.json());
    return result;
}

export async function fetchAssigneeBySurveyId(surveyId : string): Promise<Assignee[]> {
    const response = await fetch(APIURL+'/get-assignee-by-survey-id?survey_id='+surveyId);
    if (!response.ok) {   
        throw new Error(`Failed to fetch assignees: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of assignees.');
    }
    const assignees: Assignee[] = data.map((item : Assignee) => {
        const assigneeItem = new Assignee();
        assigneeItem.id = item.id;
        assigneeItem.survey_id = item.survey_id;
        assigneeItem.assignee_id = item.assignee_id;
        assigneeItem.created_at = item.created_at;
        assigneeItem.created_by = item.created_by;
        assigneeItem.update_at = item.update_at;
        assigneeItem.update_by = item.update_by;
        return assigneeItem;
    });
    return assignees;
}
export async function fetchAssigneeByAssigneeId(assigneeId : string): Promise<Assignee[]> {
    const response = await fetch(APIURL+'/get-assignee-by-assignee-id?assignee_id='+assigneeId);
    if (!response.ok) {   
        throw new Error(`Failed to fetch assignees: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of assignees.');
    }
    const assignees: Assignee[] = data.map((item : Assignee) => {
        const assigneeItem = new Assignee();
        assigneeItem.id = item.id;
        assigneeItem.survey_id = item.survey_id;
        assigneeItem.assignee_id = item.assignee_id;
        assigneeItem.created_at = item.created_at;
        assigneeItem.created_by = item.created_by;
        assigneeItem.update_at = item.update_at;
        assigneeItem.update_by = item.update_by;
        return assigneeItem;
    });
    return assignees;
}