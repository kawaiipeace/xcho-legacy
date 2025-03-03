-- Xcho Database for POSTGRESQL Engine
-- Create by PEACE and MON
-- Last modified: 22/11/2024

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
SET default_tablespace = '';
SET default_table_access_method = heap;

-- Assignees TABLE
CREATE TABLE public.assignees (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    assignee_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer NOT NULL
);
ALTER TABLE public.assignees OWNER TO postgres;
COMMENT ON TABLE public.assignees IS 'ตารางเก็บข้อมูลผู้ที่จะต้องตอบแบบฟอร์มนั้น ๆ';--
COMMENT ON COLUMN public.assignees.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.assignees.assignee_id IS 'รหัสพนักงานของผู้ถูก Assign ให้ตอบ';
COMMENT ON COLUMN public.assignees.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.assignees.created_by IS 'Stamp ID ผู้สร้าง';
COMMENT ON COLUMN public.assignees.update_at IS 'Timestamp วันและเวลาของการปรับปรุง';
COMMENT ON COLUMN public.assignees.update_by IS 'Stamp ID ผู้ปรับปรุง';

-- History TABLE
CREATE TABLE public.history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    result_id uuid,
    status_before smallint NOT NULL,
    status_after smallint NOT NULL,
    request_uri character varying NOT NULL COLLATE pg_catalog."th_TH",
    request_data json,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL
);
ALTER TABLE public.history OWNER TO postgres;
COMMENT ON TABLE public.history IS 'ตารางเก็บข้อมูลประวัติการใช้งานของระบบ';
COMMENT ON COLUMN public.history.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.history.result_id IS 'id คำตอบ';
COMMENT ON COLUMN public.history.status_before IS 'สถานะก่อนเปลี่ยนแปลงของ survey';
COMMENT ON COLUMN public.history.status_after IS 'สถานะหลังเปลี่ยนแปลงของ survey';
COMMENT ON COLUMN public.history.request_uri IS 'uri ที่ frontend ยิงไปหา backend';
COMMENT ON COLUMN public.history.request_data IS 'request body';
COMMENT ON COLUMN public.history.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.history.created_by IS 'Stamp ID ผู้สร้าง';

-- Master_Status TABLE
CREATE TABLE public.master_status (
    status_id smallint NOT NULL,    
    status_name character varying NOT NULL COLLATE pg_catalog."th_TH",
    status_detail character varying NOT NULL COLLATE pg_catalog."th_TH"
);
ALTER TABLE public.master_status OWNER TO postgres;
COMMENT ON TABLE public.master_status IS 'ตารางเก็บข้อมูลสถานะของแบบสอบถาม';
COMMENT ON COLUMN public.master_status.status_id IS 'รหัสสถานะ
(เลข 1 นำหน้าเป็นสถานะ flow อนุมัติสำหรับ survey)
10 บันทึกร่าง (แก้ไขแบบฟอร์มได้)
11 รออนุมัติ
12 อนุมัติสำเร็จ
13 ตีกลับแก้ไข (แก้ไขแบบฟอร์มได้)
(เลข 2 นำหน้าเป็น flow การเผยแพร่ survey) (ยังแก้ไขวันที่เผยแพร่กับ assignee ได้)
20 รอเผยแพร่
21 เผยแพร่แล้ว
22 ระงับเผยแพร่
23 เต็มโควต้า
24 หมดอายุ
(เลข 3 นำหน้าเป็นสถานะสำหรับคำตอบ)
30 ยังไม่ตอบหรือร่างคำตอบ
31 ตอบแล้ว
32 ตอบไม่ทัน
33 ตอบแล้ว/แก้ไขคำตอบ
90 ถูกลบ';
COMMENT ON COLUMN public.master_status.status_detail IS 'คำอธิบายของสถานะ';

-- Results TABLE
CREATE TABLE public.results (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    respondent_id integer NOT NULL,
    personal_id character varying NOT NULL COLLATE pg_catalog."th_TH",
    status smallint NOT NULL,
    content_result json,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer NOT NULL
);
ALTER TABLE public.results OWNER TO postgres;
COMMENT ON TABLE public.results IS 'ตารางเก็บข้อมูลคำตอบของแบบสำรวจ รวมไปถึงสถานะตอบ ยังไม่ตอบ';
COMMENT ON COLUMN public.results.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.results.respondent_id IS 'รหัสพนักงานของผู้ตอบแบบสำรวจ (บุคคลภายนอกเป็น -1)';
COMMENT ON COLUMN public.results.personal_id IS 'รหัสบัตรประชาชนในกรณีบุคคลภายนอกเข้าตอบ';
COMMENT ON COLUMN public.results.status IS 'โยงกับtable master_status 30 ขึ้นไป';
COMMENT ON COLUMN public.results.content_result IS 'โครงสร้างของคำตอบเป็น JSON';
COMMENT ON COLUMN public.results.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.results.created_by IS 'Stamp ID ผู้สร้าง';
COMMENT ON COLUMN public.results.update_at IS 'Timestamp วันและเวลาของการปรับปรุง';
COMMENT ON COLUMN public.results.update_by IS 'Stamp ID ผู้ปรับปรุง';

-- Return TABLE
CREATE TABLE public.return (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL
);
ALTER TABLE public.return OWNER TO postgres;
COMMENT ON TABLE public.return IS 'ตารางเก็บ comment การตีกลับเฉพาะสถานะ 13';
COMMENT ON COLUMN public.return.survey_id IS 'id จาก surveys (โครงสร้างแบบสำรวจ)';
COMMENT ON COLUMN public.return.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.return.created_by IS 'Stamp ID ผู้สร้าง';

-- Role_Approvers TABLE
CREATE TABLE public.role_approvers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_id character varying NOT NULL COLLATE pg_catalog."th_TH",
    role_name character varying NOT NULL COLLATE pg_catalog."th_TH"
);
ALTER TABLE public.role_approvers OWNER TO postgres;
COMMENT ON TABLE public.role_approvers IS 'ตารางเก็บข้อมูลตำแหน่งของผู้มีสิทธิ์อนุมัติ';
COMMENT ON COLUMN public.role_approvers.role_id IS 'ระดับตำแหน่งพนักงานตาม hr platform';
COMMENT ON COLUMN public.role_approvers.role_name IS 'ชื่อตำแหน่งพนักงาน';

-- Survey TABLE
CREATE TABLE public.survey (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_title character varying NOT NULL COLLATE pg_catalog."th_TH",
    creator_id integer NOT NULL,
    publish_date timestamp with time zone NOT NULL,
    expire_date timestamp with time zone NOT NULL,
    content_survey json,
    qr_code text,
    short_link text,
    status smallint NOT NULL,
    approver_id integer,
    is_outsider_allowed boolean NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer NOT NULL
);
ALTER TABLE public.survey OWNER TO postgres;
COMMENT ON TABLE public.survey IS 'ตารางเก็บข้อมูลโครงสร้างของแบบสำรวจ';
COMMENT ON COLUMN public.survey.survey_title IS 'ชื่อแบบสำรวจ';
COMMENT ON COLUMN public.survey.creator_id IS 'รหัสพนักงาน';
COMMENT ON COLUMN public.survey.publish_date IS 'วันและเวลาเผยแพร่แบบฟอร์ม';
COMMENT ON COLUMN public.survey.expire_date IS 'วันและเวลาที่หมดอายุของแบบฟอร์ม';
COMMENT ON COLUMN public.survey.qr_code IS 'เก็บภาพ QR Code';
COMMENT ON COLUMN public.survey.short_link IS 'เก็บลิงค์สั้นของ Survey';
COMMENT ON COLUMN public.survey.status IS 'สถานะของโครงสร้างในแบบสำรวจ';
COMMENT ON COLUMN public.survey.approver_id IS 'รหัสพนักงานของผู้อนุมัติ';
COMMENT ON COLUMN public.survey.is_outsider_allowed IS 'บุคคลภายนอกตอบแบบสอบถามได้หรือไม่';
COMMENT ON COLUMN public.survey.created_at IS 'Timestamp วันและเวลาของการสร้าง';
COMMENT ON COLUMN public.survey.created_by IS 'Stamp ID ผู้สร้าง';
COMMENT ON COLUMN public.survey.update_at IS 'Timestamp วันและเวลาของการปรับปรุง';
COMMENT ON COLUMN public.survey.update_by IS 'Stamp ID ผู้ปรับปรุง';

COPY public.assignees (id, survey_id, assignee_id, created_at, created_by, update_at, update_by) FROM stdin;
\.
COPY public.history (id, survey_id, result_id, status_before, status_after, request_uri, request_data, created_at, created_by) FROM stdin;
\.
COPY public.master_status (status_id, status_detail) FROM stdin;
\.
COPY public.results (id, survey_id, respondent_id, personal_id, status, content_result, created_at, created_by, update_at, update_by) FROM stdin;
\.
COPY public.return (id, survey_id, created_at, created_by) FROM stdin;
\.
COPY public.role_approvers (id, role_id, role_name) FROM stdin;
\.
COPY public.survey (id, survey_title, creator_id, publish_date, expire_date, content_survey, qr_code, short_link, status, approver_id, is_outsider_allowed, created_at, created_by, update_at, update_by) FROM stdin;
\.

-- Add PRIMARY KEY and FOREIGN KEY
ALTER TABLE ONLY public.assignees
    ADD CONSTRAINT assignees_pk PRIMARY KEY (id);
ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_pk PRIMARY KEY (id);
ALTER TABLE ONLY public.master_status
    ADD CONSTRAINT master_status_pk PRIMARY KEY (status_id);
ALTER TABLE ONLY public.results
    ADD CONSTRAINT results_pk PRIMARY KEY (id);
ALTER TABLE ONLY public.return
    ADD CONSTRAINT return_pk PRIMARY KEY (id);
ALTER TABLE ONLY public.role_approvers
    ADD CONSTRAINT role_approvers_pk PRIMARY KEY (id);
ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_pk PRIMARY KEY (id);

--
-- INSERT DATA TO TABLE
--

-- INSERT TO master_status
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (10,'ฉบับร่าง','บันทึกร่าง (แก้ไขแบบฟอร์มได้)');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (11,'รออนุมัติ','รออนุมัติ');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (12,'อนุมัติสำเร็จ','อนุมัติสำเร็จ');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (13,'ตีกลับแก้ไข','ตีกลับแก้ไข (แก้ไขแบบฟอร์มได้)');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (20,'ฉบับร่าง','ฉบับร่าง/รอเผยแพร่');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (21,'เผยแพร่แล้ว','เผยแพร่แล้ว');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (22,'หยุดเผยแพร่','หยุดเผยแพร่/ระงับการเผยแพร่');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (23,'เต็มโควต้า','เต็มโควต้า');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (24,'สิ้นสุด','หมดอายุ/สิ้นสุดทำตอบ');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (30,'ยังไม่ตอบ','ยังไม่ตอบหรือร่างคำตอบ');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (31,'ตอบแล้ว','ตอบแล้ว');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (32,'สิ้นสุด','ตอบไม่ทัน/สิ้นสุดทำตอบ');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (33,'แก้ไขคำตอบ','ตอบแล้ว (แก้ไขคำตอบ)');
INSERT INTO public.master_status(status_id,status_name,status_detail) VALUES (90,'ลบ','ลบถาวร (แต่ติด Flag ไว้อยู่)');