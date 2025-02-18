import { Elysia } from 'elysia';
import { master_department } from '../../db-models/master_department';

const departmentRoutes = new Elysia({ prefix : '/master-department'})
    .get("/all-department", async () => {
        const statuses = await master_department.findAll();
        return statuses;
    })
export default departmentRoutes;
