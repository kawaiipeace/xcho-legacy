export default class CreateSurveyRequest implements Record<string,unknown>
{
    [x: string]: unknown;
    id?: string;
    survey_title!: string;
    creator_id!: number;
    publish_date!: Date;
    content_survey!: JSON;
    expire_date!: Date;
    qr_code?: string;
    short_link?: string;
    is_outsider_allowed!: boolean;
}