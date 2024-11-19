import Elysia from "elysia";
import { survey } from "../../models/survey";
import sequelize from "../database";
import { createSurveyRequest } from "../../request_models/create_survey_request";
import { randomUUID } from "crypto";
import { where } from "sequelize";
import { assignees } from "../../models/assignees";

survey.initModel(sequelize);
assignees.initModel(sequelize);

const surveyRoutes = new Elysia({ prefix : '/surveys'})
    .post("/create-survey", async ({body}:{body:createSurveyRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        const newSurvey = await survey.create({
            id : randomUUID(),
            survey_title : body.survey_title,
            creator_id : body.creator_id,
            publish_date : body.publish_date,
            expire_date : body.expire_date,
            qr_code : body.qr_code,
            short_link : body.short_link,
            status : 10,
            is_outsider_allowed : body.is_outsider_allowed,
            created_at : nowThai,
            created_by : body.creator_id,
            update_at : nowThai,
            update_by : body.creator_id,
        });
        return JSON.stringify(newSurvey);
    })
    .post("/update-survey", async ({body}:{body:createSurveyRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        const newSurvey = await survey.update(
            {
            survey_title : body.survey_title,
            publish_date : body.publish_date,
            expire_date : body.expire_date,
            qr_code : body.qr_code,
            short_link : body.short_link,
            is_outsider_allowed : body.is_outsider_allowed,
            update_at : nowThai,
            update_by : body.creator_id,
            },
            {
                where: {
                    id : body.id
                }
            }
        );
        return JSON.stringify(newSurvey);
    })
    .post("/update-survey-status",async ({body}:{body:createSurveyRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        const newSurvey = await survey.update(
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
        return JSON.stringify(newSurvey);
    })
    .get("/get-survey-by-id/:id", async ({id}:{id:string}) => {
        const searchSurvey = await survey.findAll({
            where: {
                id: id
            }
        })
        return searchSurvey;
    })
    .get("get-survey-list-by-assignee-id/:id", async ({id}:{id:string}) =>{
        const searchSurvey = await survey.findAll({
            include:[
                {
                    model: assignees,
                    required: true,
                    on:{
                        col1: sequelize.where(sequelize.col('survey.id'),'=',sequelize.col('assignees.survey_id'))
                    },
                    where:{
                        assignee_id: id
                    }
                }
            ]
        })
        return searchSurvey;
    })
    // .post("/create-status",async ({body}:{body:master_status}) => {
    //     const newStatus = await master_status.create({
    //         status_id : body.status_id,
    //         status_detail : body.status_detail,
    //     });
    //     return JSON.stringify(newStatus);
    // })
    // .post("/update-status", async ({body}:{body:master_status}) => {
    //     const toUpdateStatus = await master_status.update(
    //         {status_detail : body.status_detail},
    //         {
    //             where: {
    //                 status_id: body.status_id,
    //             },
    //         },
    //     );
    // })
//     const { Op } = require('sequelize');
// Post.findAll({
//   where: {
//     authorId: {
//       [Op.eq]: 2,
//     },
//   },
// });
export default surveyRoutes;