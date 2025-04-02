import { Elysia, t } from 'elysia';
import { master_department } from '../../db-models/master_department';

const departmentRoutes = new Elysia({ 
    prefix : '/master-department',
    detail : {
        tags : ['master-department']
    }
})
    .get("/all-department", async () => {
        const statuses = await master_department.findAll({raw : true});
        return statuses.map(dept => ({
            dept_sap: dept.dept_sap,
            dept_change_code: dept.dept_change_code || "",
            dept_upper: dept.dept_upper || "",
            dept_short1: dept.dept_short1 || "",
            dept_short2: dept.dept_short2 || "",
            dept_short3: dept.dept_short3 || "",
            dept_short4: dept.dept_short4 || "",
            dept_short5: dept.dept_short5 || "",
            dept_short6: dept.dept_short6 || "",
            dept_short7: dept.dept_short7 || "",
            dept_short: dept.dept_short || "",
            dept_full1: dept.dept_full1 || "",
            dept_full2: dept.dept_full2 || "",
            dept_full3: dept.dept_full3 || "",
            dept_full4: dept.dept_full4 || "",
            dept_full5: dept.dept_full5 || "",
            dept_full6: dept.dept_full6 || "",
            dept_full7: dept.dept_full7 || "",
            dept_full: dept.dept_full || "",
            cost_center_code: dept.cost_center_code || "",
            cost_center_name: dept.cost_center_name || "",
            pea_code: dept.pea_code || "",
            business_place: dept.business_place || "",
            business_area: dept.business_area || "",
            resource_code: dept.resource_code || "",
            resource_name: dept.resource_name || "",
            tax_branch: dept.tax_branch || "",
            is_active: dept.is_active,
            created_at: dept.created_at?.toISOString() || "",
            created_by: dept.created_by || "",
            updated_at: dept.updated_at?.toISOString() || "",
            updated_by: dept.updated_by || "",
            is_deleted: dept.is_deleted || false
        }));
        
    },{
        detail : {
            summary : "Get all departments",
            description : "Get request to get all departments in PEA."
        },
        response : {
            200 : t.Array(t.Object({
                dept_sap: t.String(),
                dept_change_code: t.String(),
                dept_upper: t.String(),
                dept_short1: t.String(),
                dept_short2: t.String(),
                dept_short3: t.String(),
                dept_short4: t.String(),
                dept_short5: t.String(),
                dept_short6: t.String(),
                dept_short7: t.String(),
                dept_short: t.String(),
                dept_full1: t.String(),
                dept_full2: t.String(),
                dept_full3: t.String(),
                dept_full4: t.String(),
                dept_full5: t.String(),
                dept_full6: t.String(),
                dept_full7: t.String(),
                dept_full: t.String(),
                cost_center_code: t.String(),
                cost_center_name: t.String(),
                pea_code: t.String(),
                business_place: t.String(),
                business_area: t.String(),
                resource_code: t.String(),
                resource_name: t.String(),
                tax_branch: t.String(),
                is_active: t.Boolean(),
                created_at: t.String({ format: "date-time" }), 
                created_by: t.String(),
                updated_at: t.String({ format: "date-time" }),
                updated_by: t.String(),
                is_deleted: t.Boolean()
            }))
        }
    })
export default departmentRoutes;
