import Elysia from "elysia";
import { assignees } from "../../db-models/assignees";
import { createAssigneeRequest } from "../../models/create_assignee_request";
import { randomUUID } from "crypto";
import { t } from "elysia";

const assigneeRoutes = new Elysia({ 
    prefix : '/assignees',
    detail : {
        tags: ['assignee']
    }
})
    .post(
        '/create-assignee',
        async ({ body }: { body: createAssigneeRequest }) => {
            const nowUtc = new Date();
            const nowThai = new Date(nowUtc.getTime() + 7 * 60 * 60 * 1000);
            const newAssignee = await assignees.create({
                id: randomUUID(),
                survey_id: body.survey_id,
                assignee_id: body.assignee_id,
                created_by: body.created_by,
                created_at: nowThai,
                update_by: body.created_by,
                update_at: nowThai,
            });

            // ✅ Convert Date to String before returning
            return {
                id: newAssignee.id,
                survey_id: newAssignee.survey_id,
                assignee_id: newAssignee.assignee_id,
                created_by: newAssignee.created_by,
                update_by: newAssignee.update_by,
                created_at: newAssignee.created_at?.toISOString() || "",
                update_at: newAssignee.update_at?.toISOString() || "",
            };
        },
        {
            detail : {
                summary : 'Create assignee',
                description : 'A POST request use to create assignee for survey.'
            },
            body : t.Object({
                survey_id: t.String({examples : '26b64f2a-ec4b-4d05-ac79-62fd92b634bc'}),
                assignee_id: t.Number({examples : 511879}),
                created_by: t.Number({examples : 511879}),
            }),
            response: {
                200: t.Object({
                id: t.String(),
                survey_id: t.String(),
                assignee_id: t.Number(),
                created_by: t.Number(),
                update_by: t.Number(),
                created_at: t.String({ format: "date-time" }), // ✅ Expected as String
                update_at: t.String({ format: "date-time" }), // ✅ Expected as String
                }),
            },
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
                },
                raw : true
            });
        }
        if (newAssignee) {
            return {
            id: newAssignee.id,
            survey_id: newAssignee.survey_id,
            assignee_id: newAssignee.assignee_id,
            created_by: newAssignee.created_by,
            update_by: newAssignee.update_by,
            created_at: newAssignee.created_at?.toISOString() || "",
            update_at: newAssignee.update_at?.toISOString() || "",
            };
        } else {
            throw new Error("Assignee not found");
        }
        
    },
    {
        detail : {
            summary : 'Update assignee',
            description : 'A POST request use to update assignee for survey.'
        },
        body : t.Object({
            id: t.String({examples : '5818c4bd-ee81-407f-a2cb-7d6b60fc5fa9'}),
            survey_id: t.String({examples : '26b64f2a-ec4b-4d05-ac79-62fd92b634bc'}),
            assignee_id: t.Number({examples : 511879}),
            created_by: t.Number({examples : 511879}),
        }),
        response: {
            200: t.Object({
                id: t.String(),
                survey_id: t.String(),
                assignee_id: t.Number(),
                created_by: t.Number(),
                update_by: t.Number(),
                created_at: t.String({ format: "date-time" }), // ✅ Expected as String
                update_at: t.String({ format: "date-time" }), // ✅ Expected as String
            }),
        },
    })
    .get('/get-assignee-by-survey-id', async (req) =>{
        const surveyId = req.query.survey_id;
        var searchAssignee : assignees[] = [];
        searchAssignee = await assignees.findAll({
            where:{
                survey_id : surveyId
            },
            raw : true
        })
        return searchAssignee.map(assignee => ({
            id: assignee.id,
            survey_id: assignee.survey_id,
            assignee_id: assignee.assignee_id,
            created_by: assignee.created_by,
            update_by: assignee.update_by,
            created_at: assignee.created_at?.toISOString() || "",
            update_at: assignee.update_at?.toISOString() || "",
        }));
    },
    {
        detail : {
            summary : 'Get assignee by survey id',
            description : 'A GET request use to get assignee by survey id.'
        },
        query : t.Object({
            survey_id : t.String({example : '26b64f2a-ec4b-4d05-ac79-62fd92b634bc'})
        }),
        response : {
            200 : t.Array(t.Object({
                id: t.String(),
                survey_id: t.String(),
                assignee_id: t.Number(),
                created_by: t.Number(),
                update_by: t.Number(),
                created_at: t.String({ format: "date-time" }), // ✅ Expected as String
                update_at: t.String({ format: "date-time" }), // ✅ Expected as String
            }))
        }
    })
    .get('/get-assignee-by-assignee-id', async (req) =>{
        const assigneeId = req.query.assignee_id;
        var searchAssignee : assignees[] = [];
        searchAssignee = await assignees.findAll({
            where:{
                assignee_id : assigneeId
            },
            raw : true,
        })
        return searchAssignee.map(assignee => ({
            id: assignee.id,
            survey_id: assignee.survey_id,
            assignee_id: assignee.assignee_id,
            created_by: assignee.created_by,
            update_by: assignee.update_by,
            created_at: assignee.created_at?.toISOString() || "",
            update_at: assignee.update_at?.toISOString() || "",
        }));
    },
    {
        detail : {
            summary : 'Get assignee by assignee id.',
            description : 'Get request to get assignee by assignee id.'
        },
        query : t.Object({
            assignee_id : t.String({example : '511879'})
        }),
        response : {
            200 : t.Array(t.Object({
                id: t.String(),
                survey_id: t.String(),
                assignee_id: t.Number(),
                created_by: t.Number(),
                update_by: t.Number(),
                created_at: t.String({ format: "date-time" }), // ✅ Expected as String
                update_at: t.String({ format: "date-time" }), // ✅ Expected as String
            }))
        }
    })

export default assigneeRoutes;