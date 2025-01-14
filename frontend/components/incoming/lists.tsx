/* eslint-disable react/jsx-key */
'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useRef, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import { FaAngleDown, FaFileCsv, FaFilePdf, FaFileExcel, FaFileExport, FaRegFaceSadCry, FaEye, FaReply, FaPhone, FaClock, FaWpforms } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { IRootState } from '@/store';
import { getTranslation } from '@/i18n';
import { useContextMenu } from 'mantine-contextmenu';
import { useMediaQuery, usePagination } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import Dropdown from '@/components/dropdown';
import moment from 'moment';
import survey_record from '@/public/assets/surveydummy.json';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import Image from 'next/image'
import * as XLSX from 'xlsx';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'moment/locale/th';
import 'tippy.js/dist/tippy.css';

import { Model } from "survey-core";
import { SurveyPDF } from "survey-pdf";
import survey_json from '@/public/assets/survey_json.json'

import IconSearch from '@/components/icon/icon-search';
import Survey from '@/model/survey';
import CreateSurveyRequest from '@/model/createSurveyRequest';
import { CreateSurvey, fetchSurveysByAssigneeId } from '@/service/surveyService';

moment.locale('th');
const rowData = survey_record;
const col = ['id', 'Survey_Title', 'Sector_Creator', 'Tel', 'Expire_Date', 'Status'];
const model = new Model(survey_json);

function savePDF(model: Model) {
    const surveyPDF = new SurveyPDF(survey_json);
    surveyPDF.data = model.data;
    surveyPDF.save();
};

const Lists = () => {
    const [rowData, setRowData] = useState<Survey[]>([]);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        getSurveys();
        setIsMounted(true);
    }, []);
    const { showContextMenu } = useContextMenu();
    const isTouch = useMediaQuery('(pointer: coarse)');
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [value, setValue] = useState<any>('list');
    const tableRef = useRef(null);
    const { t, i18n } = getTranslation();

    const getSurveys = async () => {
        try {
            const testPostRequest = new CreateSurveyRequest();
            testPostRequest.survey_title = 'test post from next';
            testPostRequest.creator_id = 41;
            testPostRequest.publish_date = new Date(2025,2,1);
            testPostRequest.content_survey = JSON.parse('{"questions":[{"id":1,"question":"How satisfied are you with our service?","type":"rating"},{"id":2,"question":"What can we improve?","type":"text"},{"id":3,"question":"new Update2","type":"text"}]}');
            testPostRequest.expire_date = new Date(2025,3,1);
            testPostRequest.short_link = '';
            testPostRequest.qr_code = '';
            testPostRequest.is_outsider_allowed = false;
           
            //42 is assigneeId
            const data = await fetchSurveysByAssigneeId('42');
            setInitialRecords(sortBy(data, 'id'));
            //await CreateSurveyeSurvey(testPostRequest);
        } catch (error) {
            console.error(error);
        }
    };

    {/* Select จำนวนหน้า สำหรับใช้ใน Grid View */ }
    const pageSize_select = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
    ];

    {/* Pagination สำหรับใช้ใน Grid View */ }
    const total = Math.ceil(rowData.length / pageSize);
    const pagination = usePagination({
        total,
        initialPage: 1,
        onChange(page) {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            setRecordsData(rowData.slice(start, end));
            console.log(start);
        },
    });

    const colorBadgeStatus = (Status: unknown) => {
        if (typeof Status === 'string') {
            if (Status === 'ยังไม่ตอบ') {
                return 'info';
            } else if (Status === 'ตอบแล้ว') {
                return 'success';
            } else if (Status === 'สิ้นสุดแล้ว') {
                return 'danger';
            }
        }
        return '';
    };

    const showStatus = (Status: any) => {
        return Status;
    }

    const actionStatusList = (id: any, Status: any) => {
        if (Status === 'ยังไม่ตอบ') {
            return <div className="mx-auto flex w-max items-center gap-2">
                <Tippy trigger="mouseenter focus" content='ตอบแบบฟอร์ม'>
                    <button type="button" data-trigger="mouseenter" className="btn btn-outline-primary w-8 h-8 p-0 rounded-full">
                        <Link href={"/incoming/reply/" + id}>
                            <FaReply className="h-4 w-4 " />
                        </Link>
                    </button>
                </Tippy>
            </div>;
        } else if (Status === 'ตอบแล้ว') {
            return <div className="mx-auto flex w-max items-center gap-2">
                <Tippy trigger="mouseenter focus" content='ดูคำตอบ'>
                    <button type="button" data-trigger="mouseenter" className="btn btn-outline-success w-8 h-8 p-0 rounded-full">
                        <Link href={"/incoming/answered/" + id}>
                            <MdHistory className="h-4 w-4 " />
                        </Link>
                    </button>
                </Tippy>
                <Tippy trigger="mouseenter focus" content="ส่งออกคำตอบ PDF">
                    <button type="button" data-trigger="mouseenter" className="btn btn-outline-secondary w-8 h-8 p-0 rounded-full" onClick={() => savePDF(model)}>
                        <FaFilePdf className="h-4 w-4 " />
                    </button>
                </Tippy>
            </div>;
        } else if (Status === 'สิ้นสุดแล้ว') {
            return <div className="mx-auto flex w-max items-center gap-2">
                <Tippy trigger="mouseenter focus" content='คุณตอบไม่ทัน เสียใจด้วย'>
                    <button type="button" data-trigger="mouseenter" className="btn btn-outline-danger w-8 h-8 p-0 rounded-full">
                        <FaRegFaceSadCry className="h-4 w-4 " />
                    </button>
                </Tippy>
            </div>;
        }
        return '';
    };

    const actionStatusGrid = (id: any, Status: any) => {
        if (Status === 'ยังไม่ตอบ') {
            return <div className="mx-auto flex w-max items-center gap-2">
                {/* ปุ่มตอบแบบฟอร์ม */}
                <Link href={"/incoming/reply/" + id}>
                    <div className="group relative flex justify-center items-center text-fuchsia-50 text-sm font-bold">
                        <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                            <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                                <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                                </div>
                            </div>
                        </div>
                        <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-fuchsia-700 to-fuchsia-600 p-3 rounded-full cursor-pointer duration-300">
                            <svg
                                fill="none"
                                viewBox="0 0 512 512"
                                height="20px"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-fuchsia-50"
                            >
                                <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    d="M205 34.8c11.5 5.1 19 16.6 19 29.2l0 64 112 0c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96l-96 0 0 64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z"
                                ></path>
                            </svg>
                            <span className="text-[0px] group-hover:text-sm duration-300">ตอบแบบฟอร์ม</span>

                        </div>
                    </div>
                </Link>
            </div>;
        } else if (Status === 'ตอบแล้ว') {
            return <div className="mx-auto flex w-max items-center gap-2">
                {/* ปุ่มดูคำตอบ */}
                <Link href={"/incoming/answered/" + id}>
                    <div className="group relative flex justify-center items-center text-green-50 text-sm font-bold">
                        <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                            <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                                <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                                </div>
                            </div>
                        </div>
                        <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-green-700 to-green-600 p-3 rounded-full cursor-pointer duration-300">
                            <svg
                                fill="none"
                                viewBox="0 -960 960 960"
                                height="20px"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-green-50"
                            >
                                <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"
                                ></path>
                            </svg>
                            <span className="text-[0px] group-hover:text-sm duration-300">ดูคำตอบ</span>
                        </div>
                    </div>
                </Link>
                {/* ปุ่มส่งออก PDF */}
                <div className="group relative flex justify-center items-center text-sky-50 text-sm font-bold">
                    <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                        <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                            <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-sky-700 to-sky-600 p-3 rounded-full cursor-pointer duration-300">
                        <button onClick={() => savePDF(model)} className="text-center inline-flex items-center">
                            <svg
                                fill="none"
                                viewBox="0 0 512 512"
                                height="20px"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-sky-50"
                            >
                                <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"
                                ></path>
                            </svg>
                            <span className="text-[0px] group-hover:text-sm duration-300">ส่งคำตอบเป็น PDF</span>
                        </button>
                    </div>
                </div>
            </div>;
        } else if (Status === 'สิ้นสุดแล้ว') {
            return <div className="mx-auto flex w-max items-center gap-2">
                {/* ข้อความเสียใจ */}
                <div className="group relative flex justify-center items-center text-pink-50 text-sm font-bold">
                    <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                        <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                            <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-pink-700 to-pink-600 p-3 rounded-full cursor-pointer duration-300">
                        <svg
                            fill="none"
                            viewBox="0 0 512 512"
                            height="20px"
                            width="20px"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-pink-50"
                        >
                            <path
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                d="M352 493.4c-29.6 12-62.1 18.6-96 18.6s-66.4-6.6-96-18.6L160 288c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 189.8C51.5 433.5 0 350.8 0 256C0 114.6 114.6 0 256 0S512 114.6 512 256c0 94.8-51.5 177.5-128 221.8L384 288c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 205.4zM195.2 233.6c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2c17.6-23.5 52.8-23.5 70.4 0zm121.6 0c17.6-23.5 52.8-23.5 70.4 0c5.3 7.1 15.3 8.5 22.4 3.2s8.5-15.3 3.2-22.4c-30.4-40.5-91.2-40.5-121.6 0c-5.3 7.1-3.9 17.1 3.2 22.4s17.1 3.9 22.4-3.2zM208 336l0 32c0 26.5 21.5 48 48 48s48-21.5 48-48l0-32c0-26.5-21.5-48-48-48s-48 21.5-48 48z"
                            ></path>
                        </svg>
                        <span className="text-[0px] group-hover:text-sm duration-300">คุณตอบไม่ทัน เสียใจด้วย</span>
                    </div>
                </div>
            </div>;
        }
        return '';
    };

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item: any) => {
                return (
                    // item.id.toString().includes(search.toLowerCase()) ||
                    item.Survey_Title.toLowerCase().includes(search.toLowerCase()) ||
                    item.Sector_Creator.toLowerCase().includes(search.toLowerCase()) ||
                    item.Tel.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.Expire_Date.toLowerCase().includes(search.toLowerCase()) ||
                    item.Status.toString().toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const formatDate = (date: any) => {
        if (date) {
            return moment(date).add(543, 'year').format('LL');
        }
        return '';
    };

    const exportTable = (type: any) => {
        let columns: any = col;
        let records = rowData;
        let filename = 'Xcho - ระบบจัดการแบบฟอร์ม';

        let newVariable: any;
        newVariable = window.navigator;

        if (type === 'csv') {
            let coldelimiter = ';';
            let linedelimiter = '\n';
            let result = columns
                .map((d: any) => {
                    return capitalize(d);
                })
                .join(coldelimiter);
            result += linedelimiter;
            records.map((item: any) => {
                columns.map((d: any, index: any) => {
                    if (index > 0) {
                        result += coldelimiter;
                    }
                    let val = item[d] ? item[d] : '';
                    result += val;
                });
                result += linedelimiter;
            });

            if (result == null) return;
            if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                var data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                var link = document.createElement('a');
                link.setAttribute('href', data);
                link.setAttribute('download', filename + '.csv');
                link.click();
            } else {
                var blob = new Blob([result]);
                if (newVariable.msSaveOrOpenBlob) {
                    newVariable.msSaveBlob(blob, filename + '.csv');
                }
            }
        } else if (type === 'pdf') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';
            records.map((item: any) => {
                rowhtml += '<tr>';
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        } else if (type === 'excel') {
            /* Create worksheet from HTML DOM TABLE */
            const wb = XLSX.utils.table_to_book(tableRef.current);

            /* Export to file (start a download) */
            XLSX.writeFile(wb, "Xcho.xlsx");
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };

    {/* RETURN Display start from here */ }
    return (
        <div>
            <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 lg:grid-cols-3">
                {/* ยังไม่ได้ตอบแบบฟอร์ม */}
                <div className="panel area-bg-primary sm:col-span-2 lg:col-span-1 dark:area-bg-primary-dark">
                    <ul className="circles-bg">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่ยังไม่ได้ทำ')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 10 </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                </div>

                {/*  แบบฟอร์มที่ทำไปแล้ว */}
                <div className="panel area-bg-success">
                    <ul className="circles-bg">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่ทำไปแล้ว')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 10 </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                </div>

                {/* แบบฟอร์มที่ทำไม่ทัน */}
                <div className="panel area-bg-danger">

                    <ul className="circles-bg">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="flex justify-between">
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่ทำไม่ทัน')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 10 </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                </div>
            </div>

            <div className="panel mt-6">
                <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center">
                        <h2 className="text-xl">{t('กล่องขาเข้า')}</h2>
                    </div>

                    <div className='flex flex-wrap items-end'>
                        <div className="flex dropdown m-1">
                            <Dropdown
                                btnClassName="btn btn-outline-primary dropdown-toggle"
                                button={
                                    <>
                                        <FaFileExport className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                        {t('ส่งออก')}&nbsp;
                                        <span>
                                            <FaAngleDown />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button" onClick={() => exportTable('csv')}>
                                            <FaFileCsv className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                            {t('CSV')}
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={() => exportTable('excel')}>
                                            <FaFileExcel className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                            {t('Excel')}
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" onClick={() => exportTable('pdf')}>
                                            <FaFilePdf className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                            {t('PDF')}
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>

                        <button type="button" className={`btn btn-outline-primary btn-sm m-1 p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                            <IconListCheck />
                        </button>
                        <button type="button" className={`btn btn-outline-primary btn-sm m-1 p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                            <IconLayoutGrid />
                        </button>

                        <div className="relative">
                            <input type="text" className="peer form-input w-auto m-1 p-2 ltr:pr-11 rtl:pl-11" placeholder="ค้นหา..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                <IconSearch className="mx-auto" />
                            </button>
                        </div>
                    </div>
                </div>

                {value === 'list' && (
                    <div className="datatables">
                        <DataTable
                            tableRef={tableRef}
                            highlightOnHover
                            striped
                            pinLastColumn
                            noRecordsText="ไม่พบข้อมูล"
                            className="table-hover whitespace-nowrap"
                            textSelectionDisabled={isTouch}
                            records={recordsData}
                            onRowContextMenu={({ event }) =>
                                showContextMenu([])(event)}
                            columns={[
                                { accessor: 'Survey_Title', title: 'ชื่อหัวข้อ', sortable: true },
                                { accessor: 'Sector_Creator', title: 'หน่วยงานผู้สร้าง', sortable: true },
                                { accessor: 'Tel', title: 'เบอร์โทรศัพท์', sortable: true },
                                {
                                    accessor: 'Expire_Date',
                                    title: 'วันที่หมดเขต',
                                    sortable: true,
                                    render: ({ Expire_Date }) => <div>{formatDate(Expire_Date)}</div>,
                                },
                                {
                                    accessor: 'Status',
                                    title: 'สถานะ',
                                    sortable: true,
                                    render: ({ Status }) => <span className={`badge bg-outline-${colorBadgeStatus(Status)}/10 rounded-full text-${colorBadgeStatus(Status)} py-1.5 dark:bg-${colorBadgeStatus(Status)} rounded-full dark:text-white !important`}>{showStatus(Status)}</span>,
                                },
                                {
                                    accessor: 'Action',
                                    title: 'ดำเนินการ',
                                    titleClassName: '!text-center',
                                    render: ({ id, Status }) => (
                                        <div>
                                            {actionStatusList(id, Status)}
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            recordsPerPageLabel={`จำนวนรายการต่อหน้า`}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `แสดงจาก  ${from} ถึง ${to} จากทั้งหมด ${totalRecords} รายการ`}
                            paginationActiveBackgroundColor="grape"
                            loadingText="กำลังโหลด ใจเย็น ๆ..."
                        />
                    </div>
                )}

                {value === 'grid' && (
                    <>
                        <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                            <div className="flex flex-wrap items-center custom-select">
                                <p>จำนวนรายการต่อหน้า</p>
                                <Select
                                    className="mx-2"
                                    value={pageSize} // Bind it to the pageSize state
                                    options={pageSize_select}
                                    isSearchable={false}
                                    onChange={(pageSize_select: { value: number; label: string; }) => setPageSize(pageSize_select.value)} // Set the new page size when selected
                                />
                            </div>

                            <div className='flex flex-wrap items-end'>
                                {pagination.range.map((range) =>
                                    range === 'dots' ? (
                                        <div className="flex justify-center font-semibold px-3.5 py-2 rounded transition text-dark hover:text-primary border-2 border-white-light dark:border-[#191e3a] hover:border-primary dark:hover:border-primary dark:text-white-light">
                                            <button key={range}>...</button>
                                        </div>
                                    ) :
                                        (
                                            <div className={pagination.active === range ? 'flex justify-center mx-1 rounded border-2 border-primary px-3.5 py-2 font-semibold text-primary transition dark:border-primary dark:text-white-light' : 'flex justify-center mx-1 rounded border-2 border-white-light px-3.5 py-2 font-semibold text-dark transition hover:border-primary hover:text-primary dark:border-[#191e3a] dark:text-white-light dark:hover:border-primary'}>
                                                <button
                                                    key={range}
                                                    onClick={() => pagination.setPage(range)}
                                                >
                                                    {range}
                                                </button>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                        <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
                            {recordsData.map((item: Survey) => {
                                return (
                                    <div className="mb-5 flex items-center justify-center" key={item.id}>
                                        <div className="w-full max-w-[22rem] rounded border border-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                            <div className="px-6 py-7">
                                                <div className="-mx-6 -mt-7 mb-7 h-[260px] overflow-hidden rounded-tl rounded-tr">
                                                    <Image
                                                        src="/assets/images/survey-bg.jpg"
                                                        alt="default"
                                                        width={500}
                                                        height={500}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex justify-between">
                                                    <h4 className="text-black font-semibold text-base dark:text-white-light">{item.Survey_Title}</h4>
                                                    <span className={`badge bg-outline-${colorBadgeStatus(item.Status)}/10 text-${colorBadgeStatus(item.Status)} py-1.5 dark:bg-${colorBadgeStatus(item.Status)} dark:text-white !important`}>{item.Status}</span>
                                                </div>
                                                <div className="flex font-semibold mb-5">
                                                    <div className="flex text-primary ltr:mr-3 rtl:ml-3">
                                                        <p className="flex mb-1.5 text-xs font-bold text-primary ">
                                                            <FaClock className="h-3 w-3 ltr:mr-2 rtl:ml-2" />
                                                            {formatDate(item.Expire_Date)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {actionStatusGrid(item.id, item.Status)}
                                                </div>
                                                <div className="relative mt-6 flex justify-between pt-4 before:absolute before:inset-x-0 before:top-0 before:mx-auto before:h-[1px] before:w-[250px] before:bg-white-light dark:before:bg-[#1b2e4b]">
                                                    <div className="flex items-center font-semibold">
                                                        <div className="inline-block h-9 w-9 shrink-0 overflow-hidden rounded-full ltr:mr-2 rtl:ml-2.5">
                                                            <span className="flex h-full w-full items-center justify-center bg-[#362867] text-white-light">XC</span>
                                                        </div>
                                                        <div className="text-[#362867] dark:text-white-dark">{item.Sector_Creator}</div>
                                                    </div>
                                                    <div className="flex font-semibold">
                                                        <div className="flex items-center text-primary ltr:mr-3 rtl:ml-3">
                                                            <FaPhone className="h-4 w-4 ltr:mr-1 rtl:ml-1" />
                                                            {item.Tel}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Lists;
