import { Json } from "sequelize/types/utils";

export interface createSurveyRequest{
    id: string;
    survey_title: string;
    creator_id: number;
    publish_date: Date;
    content_survey: Json;
    expire_date: Date;
    qr_code: string;
    short_link: string;
    status: number;
    is_outsider_allowed: boolean;
}