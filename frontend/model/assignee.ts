export default class Assignee implements Record<string,unknown>{
    [x: string]: unknown;
    id!: string;
    survey_id!: string;
    assignee_id!: number;
    created_at?: Date;
    created_by!: number;
    update_at?: Date;
    update_by!: number;
}