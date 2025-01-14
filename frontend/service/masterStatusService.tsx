import MasterStatus from "@/model/masterStatus";

const APIURL = 'http://localhost:2501/master-status';
export async function fetchMasterStatusList(): Promise<MasterStatus[]> {
  const response = await fetch(APIURL+'/master-status');

  if (!response.ok) {   
    throw new Error(`Failed to fetch master status: ${response.statusText}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format: Expected an array of master status.');
  }

  const masterStatuses: MasterStatus[] = data.map((item: MasterStatus) => {
    const masterStatusItem = new MasterStatus();

    // Map JSON properties to class properties
    masterStatusItem.status_id = item.status_id;
    masterStatusItem.status_detail = item.status_detail;

    return masterStatusItem;
  });

  return masterStatuses;
}