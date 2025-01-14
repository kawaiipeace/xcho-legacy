import { Elysia } from 'elysia';
import { master_status }from '../../db-models/master_status';

const statusRoutes = new Elysia({ prefix : '/master-status'})
    .get("/all-status", async () => {
        const statuses = await master_status.findAll();
        return statuses;
    })
    .post("/create-status",async ({body}:{body:master_status}) => {
        const newStatus = await master_status.create({
            status_id : body.status_id,
            status_detail : body.status_detail,
        });
        return JSON.stringify(newStatus);
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
    })
export default statusRoutes;
