
import { history } from "../../db-models/history";
import { randomUUID } from "crypto";

export default class HistoryHelper{
    async createRecord(
        survey_id : string,
        result_id : string | undefined,
        status_before : number,
        status_after : number,
        request_uri : string,
        request_data : object,
        created_by : number
    ){
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        return await history.create({
            id : randomUUID(),
            survey_id : survey_id,
            result_id : result_id,
            status_before : status_before,
            status_after : status_after,
            request_uri : request_uri,
            request_data : request_data,
            created_by : created_by,
            created_at : nowThai
        });
    }
}