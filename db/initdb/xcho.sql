--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

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

-- Create database if exists

-- CREATE DATABASE xcho;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: survey; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.survey (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    survey_title character varying NOT NULL COLLATE pg_catalog."th-TH-x-icu",
    creator_id integer NOT NULL,
    publish_date timestamp with time zone NOT NULL,
    expire_date timestamp with time zone NOT NULL,
    qr_code text NOT NULL,
    short_link text NOT NULL,
    survey_status smallint NOT NULL,
    approver_id integer,
    is_outsider_allowed boolean NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    update_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    update_by integer NOT NULL
);


ALTER TABLE public.survey OWNER TO postgres;

--
-- Name: COLUMN survey.survey_title; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.survey_title IS 'ชื่อแบบสำรวจ';


--
-- Name: COLUMN survey.creator_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.creator_id IS 'รหัสพนักงาน';


--
-- Name: COLUMN survey.publish_date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.publish_date IS 'วันและเวลาเผยแพร่แบบฟอร์ม';


--
-- Name: COLUMN survey.expire_date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.expire_date IS 'วันและเวลาที่หมดอายุของแบบฟอร์ม';


--
-- Name: COLUMN survey.qr_code; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.qr_code IS 'เก็บภาพ QR Code';


--
-- Name: COLUMN survey.short_link; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.short_link IS 'เก็บลิงค์สั้นของ Survey';


--
-- Name: COLUMN survey.survey_status; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.survey_status IS 'สถานะ';


--
-- Name: COLUMN survey.approver_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.approver_id IS 'รหัสพนักงานของผู้อนุมัติ';


--
-- Name: COLUMN survey.is_outsider_allowed; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.is_outsider_allowed IS 'บุคคลภายนอกตอบแบบสอบถามได้หรือไม่';


--
-- Name: COLUMN survey.created_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.created_at IS 'Timestamp วันและเวลาของการสร้าง';


--
-- Name: COLUMN survey.created_by; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.created_by IS 'Stamp ID ผู้สร้าง';


--
-- Name: COLUMN survey.update_at; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.update_at IS 'Timestamp วันและเวลาของการปรับปรุง';


--
-- Name: COLUMN survey.update_by; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.survey.update_by IS 'Stamp ID ผู้ปรับปรุง';


--
-- Data for Name: survey; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.survey (id, survey_title, creator_id, publish_date, expire_date, qr_code, short_link, survey_status, approver_id, is_outsider_allowed, created_at, created_by, update_at, update_by) FROM stdin;
\.


--
-- Name: survey survey_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

