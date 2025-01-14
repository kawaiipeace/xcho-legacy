export default class CreateResultRequest implements Record<string,unknown>
{
    [x: string]: unknown;
    id?: string;
    survey_id!: string;
    respondent_id!: number;
    personal_id?: string;
    status!: number;
    content_result!: JSON;
}