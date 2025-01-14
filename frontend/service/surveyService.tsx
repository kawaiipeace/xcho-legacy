import CreateSurveyRequest from '@/model/createSurveyRequest';
import Survey from '@/model/survey';

const APIURL = 'http://localhost:2501/surveys';
export async function fetchSurveysByAssigneeId(assigneeId : string): Promise<Survey[]> {
  const response = await fetch(APIURL+'/get-survey-list-by-assignee-id?id='+assigneeId); // Replace with your API endpoint

  if (!response.ok) {   
    throw new Error(`Failed to fetch surveys: ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format: Expected an array of surveys.');
  }

  const surveys: Survey[] = data.map((item: Survey) => {
    const surveyItem = new Survey();

    // Map JSON properties to class properties
    surveyItem.id = item.id;
    surveyItem.survey_title = item.survey_title;
    surveyItem.creator_id = item.creator_id;
    surveyItem.publish_date = new Date(item.publish_date);
    surveyItem.expire_date = new Date(item.expire_date);
    surveyItem.qr_code = item.qr_code;
    surveyItem.short_link = item.short_link;
    surveyItem.status = item.status;
    surveyItem.status_text = item.status_text;
    surveyItem.sector_creator = item.sector_creator;
    surveyItem.tel = item.tel;
    surveyItem.approver_id = item.approver_id;
    surveyItem.is_outsider_allowed = item.is_outsider_allowed;
    surveyItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
    surveyItem.created_by = item.created_by;
    surveyItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
    surveyItem.update_by = item.update_by;

    return surveyItem;
  });

  return surveys;
}

export async function fetchSurveysByCreatorId(creatorId : string): Promise<Survey[]> {
  const response = await fetch(APIURL+'/get-survey-list-by-creator-id?id='+creatorId); // Replace with your API endpoint

  if (!response.ok) {   
    throw new Error(`Failed to fetch surveys: ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format: Expected an array of surveys.');
  }

  const surveys: Survey[] = data.map((item: Survey) => {
    const surveyItem = new Survey();

    // Map JSON properties to class properties
    surveyItem.id = item.id;
    surveyItem.survey_title = item.survey_title;
    surveyItem.creator_id = item.creator_id;
    surveyItem.publish_date = new Date(item.publish_date);
    surveyItem.expire_date = new Date(item.expire_date);
    surveyItem.qr_code = item.qr_code;
    surveyItem.short_link = item.short_link;
    surveyItem.status = item.status;
    surveyItem.status_text = item.status_text;
    surveyItem.sector_creator = item.sector_creator;
    surveyItem.tel = item.tel;
    surveyItem.approver_id = item.approver_id;
    surveyItem.is_outsider_allowed = item.is_outsider_allowed;
    surveyItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
    surveyItem.created_by = item.created_by;
    surveyItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
    surveyItem.update_by = item.update_by;

    return surveyItem;
  });

  return surveys;
}

export async function fetchSurveysById(id : string): Promise<Survey[]> {
  const response = await fetch(APIURL+'/get-survey-by-id?id='+id); // Replace with your API endpoint

  if (!response.ok) {   
    throw new Error(`Failed to fetch surveys: ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format: Expected an array of surveys.');
  }

  const surveys: Survey[] = data.map((item: Survey) => {
    const surveyItem = new Survey();

    // Map JSON properties to class properties
    surveyItem.id = item.id;
    surveyItem.survey_title = item.survey_title;
    surveyItem.creator_id = item.creator_id;
    surveyItem.publish_date = new Date(item.publish_date);
    surveyItem.expire_date = new Date(item.expire_date);
    surveyItem.qr_code = item.qr_code;
    surveyItem.short_link = item.short_link;
    surveyItem.status = item.status;
    surveyItem.status_text = item.status_text;
    surveyItem.sector_creator = item.sector_creator;
    surveyItem.tel = item.tel;
    surveyItem.approver_id = item.approver_id;
    surveyItem.is_outsider_allowed = item.is_outsider_allowed;
    surveyItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
    surveyItem.created_by = item.created_by;
    surveyItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
    surveyItem.update_by = item.update_by;

    return surveyItem;
  });

  return surveys;
}

export async function CreateSurvey(request : CreateSurveyRequest): Promise<Survey>{
    try{
        const url = APIURL+'/create-survey';
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(request),
        
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        //map response to Survey object
        const mapToSurvey = (item: Survey): Survey => {
            const surveyItem = new Survey();
            // Map JSON properties to class properties
            surveyItem.id = item.id;
            surveyItem.survey_title = item.survey_title;
            surveyItem.creator_id = item.creator_id;
            surveyItem.publish_date = new Date(item.publish_date);
            surveyItem.expire_date = new Date(item.expire_date);
            surveyItem.qr_code = item.qr_code;
            surveyItem.short_link = item.short_link;
            surveyItem.status = item.status;
            surveyItem.status_text = item.status_text;
            surveyItem.sector_creator = item.sector_creator;
            surveyItem.tel = item.tel;
            surveyItem.approver_id = item.approver_id;
            surveyItem.is_outsider_allowed = item.is_outsider_allowed;
            surveyItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
            surveyItem.created_by = item.created_by;
            surveyItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
            surveyItem.update_by = item.update_by;
            
            return surveyItem;
            };
        const result: Survey = mapToSurvey(await response.json());
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export async function UpdateSurvey(request : CreateSurveyRequest): Promise<Survey>{
  try{
      const url = APIURL+'/update-survey';
      const response = await fetch(url,{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body : JSON.stringify(request),
      
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      //map response to Survey object
      const mapToSurvey = (item: Survey): Survey => {
          const surveyItem = new Survey();
          // Map JSON properties to class properties
          surveyItem.id = item.id;
          surveyItem.survey_title = item.survey_title;
          surveyItem.creator_id = item.creator_id;
          surveyItem.publish_date = new Date(item.publish_date);
          surveyItem.expire_date = new Date(item.expire_date);
          surveyItem.qr_code = item.qr_code;
          surveyItem.short_link = item.short_link;
          surveyItem.status = item.status;
          surveyItem.status_text = item.status_text;
          surveyItem.sector_creator = item.sector_creator;
          surveyItem.tel = item.tel;
          surveyItem.approver_id = item.approver_id;
          surveyItem.is_outsider_allowed = item.is_outsider_allowed;
          surveyItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
          surveyItem.created_by = item.created_by;
          surveyItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
          surveyItem.update_by = item.update_by;
          
          return surveyItem;
          };
      const result: Survey = mapToSurvey(await response.json());
      return result;
  }catch(error){
      console.log(error);
      throw error;
  }
}

export async function UpdateSurveyStatus(request : CreateSurveyRequest): Promise<Survey>{
  try{
      const url = APIURL+'/update-survey-status';
      const response = await fetch(url,{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body : JSON.stringify(request),
      
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      //map response to Survey object
      const mapToSurvey = (item: Survey): Survey => {
          const surveyItem = new Survey();
          // Map JSON properties to class properties
          surveyItem.id = item.id;
          surveyItem.survey_title = item.survey_title;
          surveyItem.creator_id = item.creator_id;
          surveyItem.publish_date = new Date(item.publish_date);
          surveyItem.expire_date = new Date(item.expire_date);
          surveyItem.qr_code = item.qr_code;
          surveyItem.short_link = item.short_link;
          surveyItem.status = item.status;
          surveyItem.status_text = item.status_text;
          surveyItem.sector_creator = item.sector_creator;
          surveyItem.tel = item.tel;
          surveyItem.approver_id = item.approver_id;
          surveyItem.is_outsider_allowed = item.is_outsider_allowed;
          surveyItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
          surveyItem.created_by = item.created_by;
          surveyItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
          surveyItem.update_by = item.update_by;
          
          return surveyItem;
          };
      const result: Survey = mapToSurvey(await response.json());
      return result;
  }catch(error){
      console.log(error);
      throw error;
  }
}