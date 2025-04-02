import { Elysia, t } from 'elysia';
import { master_status }from '../../db-models/master_status';

const statusRoutes = new Elysia({ 
    prefix : '/master-status',
    detail : {
        tags : ['master-status']
    }
})
    .get("/all-status", async () => {
        const statuses = await master_status.findAll({raw : true});
        return statuses.map(status => ({
            status_id: status.status_id,
            status_detail: status.status_detail || "",
        }));
        
    },
    {
        detail : {
            summary : "Get all meter status",
            description : "Get request to get all status of survey and assignment to use as master data."
        },
        response : {
            200 : t.Array(t.Object({
                status_id: t.Number(),
                status_detail: t.String(),
            }))
        }
    })
    .post("/create-status",async ({body}:{body:master_status}) => {
        const newStatus = await master_status.create({
            status_id : body.status_id,
            status_detail : body.status_detail,
        });
        return JSON.stringify(newStatus);
    },
    {
        detail : {
            summary : "POC create",
            description : "Don't use."
        }
    })
    .post("/update-status", async ({body}:{body:master_status}) => {
        const toUpdateStatus = await master_status.update(
            {status_detail : body.status_detail},
            {
                where: {
                    status_id: body.status_id,
                },
            },
        );
    },
    {
        detail : {
            summary : "POC update",
            description : "Don't use."
        }
    })
export default statusRoutes;
