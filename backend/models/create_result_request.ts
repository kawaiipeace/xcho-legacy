import { Json } from "sequelize/types/utils";

export interface createResultRequest{
    id? : string,
    survey_id: string;
    respondent_id: number;
    personal_id: string;
    status: number;
    content_result: Json;
}