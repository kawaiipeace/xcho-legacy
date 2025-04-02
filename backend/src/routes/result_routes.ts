import Elysia from "elysia";
import { createResultRequest } from "../../models/create_result_request";
import { results } from "../../db-models/results";
import { randomUUID } from "crypto";
import { t } from "elysia";

const resultRoutes = new Elysia({ 
    prefix : '/results',
    detail : {
        tags : ['result']
    }
})
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
        content_result: body.content_result ? JSON.parse(body.content_result) : {},
        created_by: body.respondent_id,
        update_by : body.respondent_id,
    });
    return {
        id : newResult.id,
        survey_id : newResult.survey_id,
        respondent_id : newResult.respondent_id,
        personal_id : newResult.personal_id,
        status : newResult.status,
        content_result: newResult.content_result ? newResult.content_result : {}, 
        created_by: newResult.respondent_id,
        update_by : newResult.respondent_id,
        created_at: newResult.created_at?.toISOString() || "",
        update_at: newResult.update_at?.toISOString() || "",
    };
},
{
    detail : {
        summary : "Submit result by user",
        description : "Post request to create result from user."
    },
    body : t.Object({
        survey_id : t.String(),
        respondent_id : t.Number(),
        personal_id : t.String(),
        status : t.Number(),
        content_result : t.String(),
    }),
    response : {
        200 : t.Object({
            id: t.String(),
            survey_id: t.String(),
            respondent_id: t.Number(),
            personal_id: t.String(),
            status: t.Number(),
            content_result: t.Optional(t.Object({})),
            created_at: t.Optional(t.String({ format: "date-time" })), // Convert Date to string format
            created_by: t.Number(),
            update_at: t.Optional(t.String({ format: "date-time" })),
            update_by: t.Number(),
        })
    }
})
.post('/update-result', async ({body}:{body:createResultRequest}) =>{
    const nowUtc = new Date();
    const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
    const timestampWithTimeZone = new Date(nowThai).toLocaleString("en-US", {
        timeZone: "Asia/Bangkok",
        timeZoneName: "short",
      });
    await results.update({
        survey_id : body.survey_id,
        respondent_id : body.respondent_id,
        personal_id : body.personal_id,
        status : body.status,
        content_result: body.content_result ? JSON.parse(body.content_result) : {},
        update_by : body.respondent_id,
    },
    {
        where : {
            id : body.id
        }
    }
    );
    const newResult = await results.findOne({
        where : {
            id : body.id
        },
        raw : true
    });
    if(newResult){
        return {
            id : newResult.id,
            survey_id : newResult.survey_id,
            respondent_id : newResult.respondent_id,
            personal_id : newResult.personal_id,
            status : newResult.status,
            content_result: newResult.content_result ? newResult.content_result : {}, 
            created_by: newResult.respondent_id,
            update_by : newResult.respondent_id,
            created_at: newResult.created_at?.toISOString() || "",
            update_at: newResult.update_at?.toISOString() || "",
        };
    }else{
        throw new Error("Result not found");
    }
},
{
    detail : {
        summary : "Update result by user",
        description : "Post request to update result from user."
    },
    body : t.Object({
        survey_id : t.String(),
        respondent_id : t.Number(),
        personal_id : t.String(),
        status : t.Number(),
        content_result : t.String(),
    }),
    response : {
        200 : t.Object({
            id: t.String(),
            survey_id: t.String(),
            respondent_id: t.Number(),
            personal_id: t.String(),
            status: t.Number(),
            content_result: t.Optional(t.Object({})),
            created_at: t.Optional(t.String({ format: "date-time" })), // Convert Date to string format
            created_by: t.Number(),
            update_at: t.Optional(t.String({ format: "date-time" })),
            update_by: t.Number(),
        })
    }
})
.get('/get-result-by-survey-id', async (req) =>{
    const surveyId = req.query.id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            survey_id : surveyId
        },
        raw : true
    })
    return searchResult.map(response => ({
        id: response.id,
        survey_id: response.survey_id,
        respondent_id: response.respondent_id,
        personal_id: response.personal_id,
        status: response.status,
        content_result: response.content_result || {}, 
        created_at: response.created_at?.toISOString() || "",
        created_by: response.created_by,
        update_at: response.update_at?.toISOString() || "",
        update_by: response.update_by,
    }));
},
{
    detail : {
        summary : "Get result by survey",
        description : "Get request to get result from user by survey id."
    },
    query : t.Object({
        id : t.String({example : '26b64f2a-ec4b-4d05-ac79-62fd92b634bc'})
    }),
    response : {
        200 : t.Array(t.Object({
            id: t.String(),
            survey_id: t.String(),
            respondent_id: t.Number(),
            personal_id: t.String(),
            status: t.Number(),
            content_result: t.Record(t.String(), t.Any()), // Handles dynamic object structure
            created_at: t.String({ format: "date-time" }),
            created_by: t.Number(),
            update_at: t.String({ format: "date-time" }),
            update_by: t.Number(),
        }))
    }
})
.get('/get-result-by-respondent-id', async (req) =>{
    const respondentId = req.query.id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            respondent_id : respondentId
        },
        raw : true
    })
    return searchResult.map(response => ({
        id: response.id,
        survey_id: response.survey_id,
        respondent_id: response.respondent_id,
        personal_id: response.personal_id,
        status: response.status,
        content_result: response.content_result || {}, 
        created_at: response.created_at?.toISOString() || "",
        created_by: response.created_by,
        update_at: response.update_at?.toISOString() || "",
        update_by: response.update_by,
    }));
},
{
    detail : {
        summary : "Get result by respondent id",
        description : "Get request to get result by respondent id."
    },
    query : t.Object({
        id : t.String({example : '511879'})
    }),
    response : {
        200 : t.Array(t.Object({
            id: t.String(),
            survey_id: t.String(),
            respondent_id: t.Number(),
            personal_id: t.String(),
            status: t.Number(),
            content_result: t.Record(t.String(), t.Any()), // Handles dynamic object structure
            created_at: t.String({ format: "date-time" }),
            created_by: t.Number(),
            update_at: t.String({ format: "date-time" }),
            update_by: t.Number(),
        }))
    }
})
.get('/get-result-by-surv-resp-id', async (req) =>{
    const surveyId = req.query.survey_id;
    const respondentId = req.query.respondent_id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            survey_id : surveyId,
            respondent_id : respondentId,
        },
        raw : true
    })
    return searchResult.map(response => ({
        id: response.id,
        survey_id: response.survey_id,
        respondent_id: response.respondent_id,
        personal_id: response.personal_id,
        status: response.status,
        content_result: response.content_result || {}, 
        created_at: response.created_at?.toISOString() || "",
        created_by: response.created_by,
        update_at: response.update_at?.toISOString() || "",
        update_by: response.update_by,
    }));
},
{
    detail : {
        summary : "Get result by survey id and respondent id",
        description : "Get request to get result by survey id and respondent id."
    },
    query : t.Object({
        survey_id : t.String({example : '26b64f2a-ec4b-4d05-ac79-62fd92b634bc'}),
        respondent_id : t.String({example : '511879'}),
    }),
    response : {
        200 : t.Array(t.Object({
            id: t.String(),
            survey_id: t.String(),
            respondent_id: t.Number(),
            personal_id: t.String(),
            status: t.Number(),
            content_result: t.Record(t.String(), t.Any()), // Handles dynamic object structure
            created_at: t.String({ format: "date-time" }),
            created_by: t.Number(),
            update_at: t.String({ format: "date-time" }),
            update_by: t.Number(),
        }))
    }
})
.get('/get-result-by-personal-id', async (req) =>{
    const personalId = req.query.id;
    var searchResult : results[] = [];
    searchResult = await results.findAll({
        where:{
            personal_id : personalId
        },
        raw : true
    })
    return searchResult.map(response => ({
        id: response.id,
        survey_id: response.survey_id,
        respondent_id: response.respondent_id,
        personal_id: response.personal_id,
        status: response.status,
        content_result: response.content_result || {}, 
        created_at: response.created_at?.toISOString() || "",
        created_by: response.created_by,
        update_at: response.update_at?.toISOString() || "",
        update_by: response.update_by,
    }));
},
{
    detail : {
        summary : "Get result by personal id",
        description : "Get request to get result by personal id incase of outsider respondent."
    },
    query : t.Object({
        id : t.String({example : '511879'})
    }),
    response : {
        200 : t.Array(t.Object({
            id: t.String(),
            survey_id: t.String(),
            respondent_id: t.Number(),
            personal_id: t.String(),
            status: t.Number(),
            content_result: t.Record(t.String(), t.Any()), // Handles dynamic object structure
            created_at: t.String({ format: "date-time" }),
            created_by: t.Number(),
            update_at: t.String({ format: "date-time" }),
            update_by: t.Number(),
        }))
    }
})
export default resultRoutes;