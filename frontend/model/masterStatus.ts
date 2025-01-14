export default class MasterStatus implements Record<string,unknown>{
    [x: string]: unknown;
    status_id!: number;
    status_detail!: string;
}