export interface createSurveyRequest{
    id: string;
    survey_title: string;
    creator_id: number;
    publish_date: Date;
    expire_date: Date;
    qr_code: string;
    short_link: string;
    status: number;
    is_outsider_allowed: boolean;
}