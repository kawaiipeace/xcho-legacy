import Elysia from "elysia";
import { assignees } from "../../db-models/assignees";
import { createAssigneeRequest } from "../../models/create_assignee_request";
import { randomUUID } from "crypto";

const assigneeRoutes = new Elysia({ 
    prefix : '/assignees',
    detail : {
        tags: ['assignee']
    }
})
    .post('/create-assignee',async ({body}:{body:createAssigneeRequest})=>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        const newAssignee = await assignees.create({
            id : randomUUID(),
            survey_id : body.survey_id,
            assignee_id : body.assignee_id,
            created_by : body.created_by,
            created_at : nowThai,
            update_by : body.created_by,
            update_at : nowThai
        });
        return  JSON.stringify(newAssignee);
    },
    {
        detail : {
            summary : 'Create assignee',
            description : 'A POST request use to create assignee for survey.'
        }
    })
    .post('/update-assignee', async ({body}:{body:createAssigneeRequest}) =>{
        const nowUtc = new Date();
        const nowThai = new Date(nowUtc.getTime() + 7*60*60*1000);
        // Dynamically construct the update object
        const updateData : Partial<assignees> = {};
        if (body.survey_id) updateData.survey_id = body.survey_id;
        if (body.assignee_id) updateData.assignee_id = body.assignee_id;
        if (body.created_by) updateData.update_by = body.created_by; // Ensure created_by has a value
        updateData.update_at = nowThai; // Always set this
        // Perform the update if there are fields to update
        let newAssignee = await assignees.findOne({
            where : {
                id : body.id
            }
        });
        if (Object.keys(updateData).length > 1) { // At least one field other than update_at
            await assignees.update(updateData, {
                where: {
                    id: body.id
                }
            });
            newAssignee = await assignees.findOne({
                where : {
                    id : body.id
                }
            });
        }
        return newAssignee;
        
    },
    {
        detail : {
            summary : 'Update assignee',
            description : 'A POST request use to update assignee for survey.'
        }
    })
    .get('/get-assignee-by-survey-id', async (req) =>{
        const surveyId = req.query.survey_id;
        var searchAssignee : assignees[] = [];
        searchAssignee = await assignees.findAll({
            where:{
                survey_id : surveyId
            }
        })
        return searchAssignee;
    },
    {
        detail : {
            summary : 'Get assignee by survey id',
            description : 'A GET request use to get assignee by survey id.'
        }
    })
    .get('/get-assignee-by-assignee-id', async (req) =>{
        const assigneeId = req.query.assignee_id;
        var searchAssignee : assignees[] = [];
        searchAssignee = await assignees.findAll({
            where:{
                assignee_id : assigneeId
            }
        })
        return searchAssignee;
    },
    {
        detail : {
            summary : "Get user assigned survey.",
            description : "Get request to get survey id that user has been assigned."
        }
    })

export default assigneeRoutes;