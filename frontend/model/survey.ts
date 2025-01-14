export default class Survey implements Record<string,unknown>
{
    [x: string]: unknown;
    id!: string;
    survey_title!: string;
    creator_id!: number;
    publish_date!: Date;
    expire_date!: Date;
    qr_code!: string;
    short_link!: string;
    status!: number;
    status_text!: string;
    sector_creator!: string;
    tel!: string;
    approver_id?: number;
    is_outsider_allowed!: boolean;
    created_at?: Date;
    created_by!: number;
    update_at?: Date;
    update_by!: number;
}
