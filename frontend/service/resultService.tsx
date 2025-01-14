import CreateResultRequest from "@/model/createResultRequest";
import Result from "@/model/result";

const APIURL = 'http://localhost:2501/results';
export async function createResult(request: CreateResultRequest): Promise<Result> {
    const response = await fetch(APIURL+'/create-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });
    const mapToResult = (item : Result) => {
        const resultItem = new Result();
        resultItem.id = item.id;
        resultItem.survey_id = item.survey_id;
        resultItem.respondent_id = item.respondent_id;
        resultItem.personal_id = item.personal_id;
        resultItem.status = item.status;
        resultItem.content_result = item.content_result;
        return resultItem;
    }
    const result: Result = mapToResult(await response.json());
    return result;
}
export async function updateResult(request: CreateResultRequest): Promise<Result> {
    const response = await fetch(APIURL+'/update-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });
    const mapToResult = (item : Result) => {
        const resultItem = new Result();
        resultItem.id = item.id;
        resultItem.survey_id = item.survey_id;
        resultItem.respondent_id = item.respondent_id;
        resultItem.personal_id = item.personal_id;
        resultItem.status = item.status;
        resultItem.content_result = item.content_result;
        return resultItem;
    }
    const result: Result = mapToResult(await response.json());
    return result;
}
export async function getResultBySurveyId(request : string): Promise<Result[]>
{
    const response = await fetch(APIURL+'/get-result-by-survey-id?id='+request); // Replace with your API endpoint
    
      if (!response.ok) {   
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }
    
      const data = await response.json();
    
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of results.');
      }
    
      const results: Result[] = data.map((item: Result) => {
        const resultItem = new Result();
    
        // Map JSON properties to class properties
        resultItem.id = item.id;
        resultItem.survey_id = item.survey_id;
        resultItem.respondent_id = item.respondent_id;
        resultItem.personal_id = item.personal_id;
        resultItem.status = item.status;
        resultItem.content_result = item.content_result;
        resultItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
        resultItem.created_by = item.created_by;
        resultItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
        resultItem.update_by = item.update_by;
        return resultItem;
      });
    
      return results;
}
export async function getResultByRespondentId(request : string): Promise<Result[]>
{
    const response = await fetch(APIURL+'/get-result-by-respondent-id?id='+request); // Replace with your API endpoint
    
      if (!response.ok) {   
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }
    
      const data = await response.json();
    
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of results.');
      }
    
      const results: Result[] = data.map((item: Result) => {
        const resultItem = new Result();
    
        // Map JSON properties to class properties
        resultItem.id = item.id;
        resultItem.survey_id = item.survey_id;
        resultItem.respondent_id = item.respondent_id;
        resultItem.personal_id = item.personal_id;
        resultItem.status = item.status;
        resultItem.content_result = item.content_result;
        resultItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
        resultItem.created_by = item.created_by;
        resultItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
        resultItem.update_by = item.update_by;
        return resultItem;
      });
    
      return results;
}
export async function getResultByPersonalId(request : string): Promise<Result[]>
{
    const response = await fetch(APIURL+'/get-result-by-personal-id?id='+request); // Replace with your API endpoint
    
      if (!response.ok) {   
        throw new Error(`Failed to fetch results: ${response.statusText}`);
      }
    
      const data = await response.json();
    
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format: Expected an array of results.');
      }
    
      const results: Result[] = data.map((item: Result) => {
        const resultItem = new Result();
    
        // Map JSON properties to class properties
        resultItem.id = item.id;
        resultItem.survey_id = item.survey_id;
        resultItem.respondent_id = item.respondent_id;
        resultItem.personal_id = item.personal_id;
        resultItem.status = item.status;
        resultItem.content_result = item.content_result;
        resultItem.created_at = item.created_at ? new Date(item.created_at) : undefined;
        resultItem.created_by = item.created_by;
        resultItem.update_at = item.update_at ? new Date(item.update_at) : undefined;
        resultItem.update_by = item.update_by;
        return resultItem;
      });
    
      return results;
}