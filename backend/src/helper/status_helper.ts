import { master_status } from "../../db-models/master_status";

export default class StatusHelper{
    matchSurveyStatus(
        surveys: survey_response[], 
        masterStatuses: master_status[]
    ): (survey_response)[] 
    {
        return surveys.map(survey => {
            const matchedStatus = masterStatuses.find(status => status.status_id === survey.status);
            return {
            ...survey,
            status_text: matchedStatus ? matchedStatus.status_detail : 'Unknown Status', // Default to "Unknown Status" if no match
            };
        });
    }
}