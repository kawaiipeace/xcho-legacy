export default class Result implements Record<string,unknown>
{
    [x: string]: unknown;
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
}