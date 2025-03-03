import Elysia from "elysia";
import { survey } from "../../db-models/survey";
import { results} from "../../db-models/results";
import sequelize from "../database";
import { createSurveyRequest } from "../../models/create_survey_request";
import { randomUUID } from "crypto";
import { QueryTypes } from "sequelize";
import HistoryHelper from "../helper/history_helper";
import { master_status } from "../../db-models/master_status";
import StatusHelper from "../helper/status_helper";

const surveyRoutes = new Elysia({ 
    prefix : '/surveys',
    detail:{
        tags : ['survey']
    }
})
    .post('/create-survey', async ({body}:{body:createSurveyRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        const timestampWithTimeZone = new Date(nowThai).toLocaleString("en-US", {
            timeZone: "Asia/Bangkok",
            timeZoneName: "short",
          });
        const newSurvey = await survey.create({
            id : randomUUID(),
            survey_title : body.survey_title,
            creator_id : body.creator_id,
            publish_date : body.publish_date,
            expire_date : body.expire_date,
            content_survey : body.content_survey,
            qr_code : body.qr_code,
            short_link : body.short_link,
            status : 10,
            is_outsider_allowed : body.is_outsider_allowed,
            created_by : body.creator_id,
            update_by : body.creator_id,
        });
        return JSON.stringify(newSurvey);
    },{
        detail : {
            summary : "Create survey",
            description : "POST request to create survey."
        }
    })
    .post('/update-survey', async ({body}:{body:createSurveyRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        const updateData : Partial<survey> = {};
        if (body.survey_title) updateData.survey_title = body.survey_title;
        if (body.publish_date) updateData.publish_date = body.publish_date;
        if (body.expire_date) updateData.expire_date = body.expire_date;
        if (body.qr_code) updateData.qr_code = body.qr_code;
        if (body.short_link) updateData.short_link = body.short_link;
        if (body.is_outsider_allowed !== undefined) updateData.is_outsider_allowed = body.is_outsider_allowed;
        updateData.update_at = nowThai; // Always include
        if (body.creator_id) updateData.update_by = body.creator_id;
        if (body.content_survey) updateData.content_survey = body.content_survey;
        let newSurvey = await survey.findOne({
            where : {
                id : body.id
            }
        });
        if ((Object.keys(updateData).length > 1)&&(newSurvey)){
            if(newSurvey){
                let oldStatus = newSurvey.getDataValue("status");
                let newStatus = newSurvey.getDataValue("status");
                await survey.update(
                    {
                    survey_title : body.survey_title,
                    publish_date : body.publish_date,
                    expire_date : body.expire_date,
                    qr_code : body.qr_code,
                    short_link : body.short_link,
                    is_outsider_allowed : body.is_outsider_allowed,
                    update_at : nowThai,
                    update_by : body.creator_id,
                    content_survey : body.content_survey,
                    },
                    {
                        where: {
                            id : body.id
                        }
                    }
                );
                newSurvey = await survey.findOne({
                    where : {
                        id : body.id
                    }
                });
                if(newSurvey){
                    newStatus = newSurvey.getDataValue("status");
                    const historyHelper = new HistoryHelper();
                    await historyHelper.createRecord(
                        newSurvey.getDataValue("id"),
                        undefined,
                        oldStatus,
                        newStatus,
                        'survey/update-survey',
                        body,
                        body.creator_id
                    )
                }
            }
        }
        return JSON.stringify(newSurvey);
    },{
        detail : {
            summary : "Update survey",
            description : "POST request to update survey."
        }
    })
    .post('/update-survey-status',async ({body}:{body:createSurveyRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        let newSurvey = await survey.findOne({
            where : {
                id : body.id
            }
        });
        if(newSurvey){
            let oldStatus = newSurvey.getDataValue("status");
            let newStatus = newSurvey.getDataValue("status");
            if(newSurvey.id != body.id){
                await survey.update(
                    {
                    status : body.status,
                    update_at : nowThai,
                    update_by : body.creator_id,
                    },
                    {
                        where: {
                            id : body.id
                        }
                    }
                );
                newSurvey = await survey.findOne({
                    where : {
                        id : body.id
                    }
                });
            }
            if(newSurvey){
                newStatus = newSurvey.getDataValue("status");
                const historyHelper = new HistoryHelper();
                await historyHelper.createRecord(
                    newSurvey.getDataValue("id"),
                    undefined,
                    oldStatus,
                    newStatus,
                    'survey/update-survey-status',
                    body,
                    body.creator_id
                )
            }
        }
        return JSON.stringify(newSurvey);
    },{
        detail : {
            summary : "Update survey status",
            description : "POST request to update survey status."
        }
    })
    .get('/get-survey-by-id', async (req) => {
        const id = req.query.id;
        const searchSurvey = await survey.findAll({
            where: {
                id: id
            }
        })
        return searchSurvey;
    },{
        detail : {
            summary : "Get survey by survey id",
            description : "Get request to get survey by survey id."
        }
    })
    .get('/get-survey-list-by-assignee-id', async (req) => {
        const id = req.query.id;
        var searchSurvey: survey_response[] = [];
        const query = `
            SELECT survey.*
            FROM survey
            INNER JOIN assignees ON survey.id = assignees.survey_id
            WHERE assignees.assignee_id = :id and survey.status > 20
        `;
        searchSurvey = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });
    
        let resultList: results[] = [];
        await Promise.all(searchSurvey.map(async (element) => {
            resultList = await results.findAll({
                where: {
                    id: element.id,
                    respondent_id: req.query.id
                }
            });
            if (resultList.length == 0) {
                if (element.status > 21) {
                    element.status = 32;
                } else {
                    element.status = 30;
                }
            } else {
                element.status = 31;
            }
        }));
    
        const masterStatus = await master_status.findAll({
            raw: true,
        });
        const status_helper = new StatusHelper();
        // Fix creator division and creator phone
        for (let i = 0; i < searchSurvey.length; i++) {
            let creator_id = searchSurvey[i].created_by;
            let creator_info: creator_info = {
                division: "กอพ.1",
                phone: "6894"
            };
            searchSurvey[i].sector_creator = creator_info.division;
            searchSurvey[i].tel = creator_info.phone;
        }
        searchSurvey = status_helper.matchSurveyStatus(searchSurvey, masterStatus);
        return searchSurvey;
    },{
        detail : {
            summary : "Get survey by assignee id",
            description : "Get request to get survey by assignee id and POC of raw query."
        }
    })
    .get('/get-survey-list-by-creator-id', async (req) =>{
        const id = req.query.id;
        let searchSurvey : survey_response[] = [];
        let tempSurvey = await survey.findAll({
            raw : true,
            where:{
                created_by: id
            }
        })
        const masterStatus = await master_status.findAll({
            raw : true,
        });
        const status_helper = new StatusHelper();
        searchSurvey = tempSurvey.map(s => ({
            ...s,
            sector_creator : "",
            tel : "",
            status_text : "",
        }))
        //fix creator division and creator phone
        for(let i=0; i<searchSurvey.length; i++){
            let creator_id = searchSurvey[i].created_by;
            let creator_info : creator_info = {
                division : "กอพ.1",
                phone : "6894"
            }
            searchSurvey[i].sector_creator = creator_info.division;
            searchSurvey[i].tel = creator_info.phone;
        }
        searchSurvey = status_helper.matchSurveyStatus(searchSurvey,masterStatus);
        return searchSurvey;
    },{
        detail : {
            summary : "Get survey by creator id",
            description : "Get request to get survey by creator id."
        }
    })
export default surveyRoutes;