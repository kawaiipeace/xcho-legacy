CREATE TABLE public.results (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    respondent_id integer NOT NULL,
    personal_id character varying NOT NULL COLLATE pg_catalog."th-TH-x-icu",
    status smallint NOT NULL,
    content_result json,    
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer NOT NULL
);

COMMENT ON COLUMN public.results.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.results.respondent_id IS 'รหัสพนักงานของผู้ตอบแบบสำรวจ (บุคคลภายนอกเป็น -1)';
COMMENT ON COLUMN public.results.personal_id IS 'รหัสบัตรประชาชนในกรณีบุคคลภายนอกเข้าตอบ';
COMMENT ON COLUMN public.results.status IS 'โยงกับtable master_status 30 ขึ้นไป';
COMMENT ON COLUMN public.results.content_result IS 'โครงสร้างของคำตอบเป็น JSON';
COMMENT ON COLUMN public.results.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.results.created_by IS 'Stamp ID ผู้สร้าง';
COMMENT ON COLUMN public.results.update_at IS 'Timestamp วันและเวลาของการปรับปรุง';
COMMENT ON COLUMN public.results.update_by IS 'Stamp ID ผู้ปรับปรุง';

CREATE TABLE public.assignees (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    assignee_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer NOT NULL
);

COMMENT ON COLUMN public.assignees.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.assignees.assignee_id IS 'รหัสพนักงานของผู้ถูก Assign ให้ตอบ';
COMMENT ON COLUMN public.assignees.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.assignees.created_by IS 'Stamp ID ผู้สร้าง';
COMMENT ON COLUMN public.assignees.update_at IS 'Timestamp วันและเวลาของการปรับปรุง';
COMMENT ON COLUMN public.assignees.update_by IS 'Stamp ID ผู้ปรับปรุง';

CREATE TABLE public.return (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL
);

COMMENT ON COLUMN public.return.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.return.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.return.created_by IS 'Stamp ID ผู้สร้าง';

CREATE TABLE public.history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    result_id uuid,
    status_before smallint NOT NULL,
    status_after smallint NOT NULL,
    request_uri character varying NOT NULL COLLATE pg_catalog."th-TH-x-icu",
    request_data json,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL
);

COMMENT ON COLUMN public.history.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.history.result_id IS 'id คำตอบ';
COMMENT ON COLUMN public.history.status_before IS 'สถานะก่อนเปลี่ยนแปลงของ survey';
COMMENT ON COLUMN public.history.status_after IS 'สถานะหลังเปลี่ยนแปลงของ survey';
COMMENT ON COLUMN public.history.request_uri IS 'uri ที่ frontend ยิงไปหา backend';
COMMENT ON COLUMN public.history.request_data IS 'request body';
COMMENT ON COLUMN public.history.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.history.created_by IS 'Stamp ID ผู้สร้าง';

CREATE TABLE public.role_approvers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_id character varying NOT NULL COLLATE pg_catalog."th-TH-x-icu",
    role_name character varying NOT NULL COLLATE pg_catalog."th-TH-x-icu"
);

COMMENT ON COLUMN public.role_approvers.role_id IS 'ระดับตำแหน่งพนักงานตาม hr platform';
COMMENT ON COLUMN public.role_approvers.role_name IS 'ชื่อตำแหน่งพนักงาน';


CREATE TABLE public.master_status (
    status_id smallint NOT NULL,
    status_detail character varying NOT NULL COLLATE pg_catalog."th-TH-x-icu"
);

COMMENT ON COLUMN public.master_status.status_id IS 'รหัสสถานะ';
COMMENT ON COLUMN public.master_status.status_detail IS 'คำอธิบายของสถานะ';