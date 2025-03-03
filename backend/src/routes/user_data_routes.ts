import Elysia from "elysia";
import { mock_user_data } from "../../db-models/mock_user_data";
import { master_department } from "../../db-models/master_department";
import { Op } from "sequelize";

const userDataRoutes = new Elysia({ 
    prefix : '/user-data',
    detail: {
        tags: ['user-data']
    }
})
    .get('/get-user-list-by-dep-code', async (req) =>{
        const dep_code = req.query.dep_code;
        var dept_search = await master_department.findOne({
            where:{
                dept_sap : dep_code
            },
            raw : true
        })
        if(!dept_search){
            return [];
        }
        const to_search_dept_short = dept_search?.dept_short;
        var list_dept_code : string[] = [];
        if(dept_search.dept_short1){
            if(dept_search.dept_short1 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short1 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }

        if(dept_search.dept_short2){
            if(dept_search.dept_short2 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short2 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }

        if(dept_search.dept_short3){
            if(dept_search.dept_short3 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short3 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }

        if(dept_search.dept_short4){
            if(dept_search.dept_short4 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short4 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }

        if(dept_search.dept_short5){
            if(dept_search.dept_short5 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short5 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }

        if(dept_search.dept_short6){
            if(dept_search.dept_short6 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short6 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }

        if(dept_search.dept_short7){
            if(dept_search.dept_short7 == to_search_dept_short){
                var list_under_dept = await master_department.findAll({
                    where:{
                        dept_short7 : to_search_dept_short
                    },
                    raw : true
                })
                list_dept_code = list_under_dept.map(item => item.dept_sap);
            }
        }
        var searchAssignee : mock_user_data[] = [];
        searchAssignee = await mock_user_data.findAll({
            where:{
                dep_code : {
                    [Op.in] : list_dept_code
                }
            }
        })
        return searchAssignee;
    },{
        detail: {
            summary : "Get user by department code",
        }
    })
export default userDataRoutes;
