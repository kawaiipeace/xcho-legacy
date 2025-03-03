import { Elysia } from 'elysia';
import { master_department } from '../../db-models/master_department';

const departmentRoutes = new Elysia({ 
    prefix : '/master-department',
    detail : {
        tags : ['master-department']
    }
})
    .get("/all-department", async () => {
        const statuses = await master_department.findAll();
        return statuses;
    },{
        detail : {
            summary : "Get all departments",
            description : "Get request to get all departments in PEA."
        }
    })
export default departmentRoutes;
