import Elysia from "elysia";
import { createResultRequest } from "../../models/create_result_request";
import { results } from "../../db-models/results";
import { randomUUID } from "crypto";

const resultRoutes = new Elysia({ prefix : '/results'})
.post('/create-result', async ({body}:{body:createResultRequest}) =>{
    const nowUtc = new Date();
    const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
    const timestampWithTimeZone = new Date(nowThai).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
        timeZoneName: "short",
      });
    const newResult = await results.create({
        id : randomUUID(),
        survey_id : body.survey_id,
        respondent_id : body.respondent_id,
        personal_id : body.personal_id,
        status : body.status,
        content_result: body.content_result,
        created_by: body.respondent_id,
        update_by : body.respondent_id,
    });
    return JSON.stringify(newResult);
})
.post('/update-result', async ({body}:{body:createResultRequest}) =>{
    const nowUtc = new Date();
    const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
    const timestampWithTimeZone = new Date(nowThai).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
        timeZoneName: "short",
      });
    const newResult = await results.update({
        survey_id : body.survey_id,
        respondent_id : body.respondent_id,
        personal_id : body.personal_id,
        status : body.status,
        content_result: body.content_result,
        update_by : body.respondent_id,
    },
    {
        where : {
            id : body.id
        }
    }
    );
    return JSON.stringify(newResult);
})
.get('/get-result-by-survey-id', async (req) =>{
    const surveyId = req.query.id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            survey_id : surveyId
        }
    })
    return searchResult;
})
.get('/get-result-by-respondent-id', async (req) =>{
    const respondentId = req.query.id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            respondent_id : respondentId
        }
    })
    return searchResult;
})
.get('/get-result-by-personal-id', async (req) =>{
    const personalId = req.query.id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            personal_id : personalId
        }
    })
    return searchResult;
})
export default resultRoutes;