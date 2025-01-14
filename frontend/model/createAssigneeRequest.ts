export default class createAssigneeRequest implements Record<string,unknown>
{
    [x: string]: unknown;
    id?: string;
    survey_id!: string;
    assignee_id!: number;
    created_by!: number;
}