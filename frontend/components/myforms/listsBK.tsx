'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import { FaAngleDown, FaFileCsv, FaFilePdf, FaFileExcel, FaFileExport, FaRegFaceSadCry, FaEye, FaReply, FaPhone, FaClock, FaWpforms } from "react-icons/fa6";
import { MdTouchApp } from "react-icons/md";
import { IRootState } from '@/store';
import { getTranslation } from '@/i18n';
import { useContextMenu } from 'mantine-contextmenu';
import { Text, Pagination } from '@mantine/core';
import { useMediaQuery, usePagination } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import Dropdown from '@/components/dropdown';
import moment from 'moment';
import survey_record from '@/public/assets/surveydummy.json';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'moment/locale/th';
import 'tippy.js/dist/tippy.css';

import IconSearch from '@/components/icon/icon-search';
import { start } from 'repl';

moment.locale('th');
const rowData = survey_record;
const col = ['id', 'Survey_Title', 'Sector_Creator', 'Tel', 'Expire_Date', 'Status'];
const itemsPerPage = 3; // สำหรับ Pagination แบบ Grid View

const Lists = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
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
                            <FaEye className="h-4 w-4 " />
                        </Link>
                    </button>
                </Tippy>
                <Tippy trigger="mouseenter focus" content="ส่งออกคำตอบ PDF">
                    <button type="button" data-trigger="mouseenter" className="btn btn-outline-secondary w-8 h-8 p-0 rounded-full">
                        <Link href={"/incoming/pdf_answered/" + id}>
                            <FaFilePdf className="h-4 w-4 " />
                        </Link>
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
                                viewBox="0 0 576 512"
                                height="20px"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-green-50"
                            >
                                <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                                ></path>
                            </svg>
                            <span className="text-[0px] group-hover:text-sm duration-300">ดูคำตอบ</span>
                        </div>
                    </div>
                </Link>
                {/* ปุ่มส่งออก PDF */}
                <Link href={"/incoming/pdf_answered/" + id}>
                    <div className="group relative flex justify-center items-center text-sky-50 text-sm font-bold">
                        <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                            <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                                <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                                </div>
                            </div>
                        </div>
                        <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-sky-700 to-sky-600 p-3 rounded-full cursor-pointer duration-300">
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
                        </div>
                    </div>
                </Link>
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
    return (
        <div>
            <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 lg:grid-cols-4">
                {/* แบบฟอร์มที่เผยแพร่แล้ว */}
                <div className="panel area-bg-primary dark:area-bg-primary-dark">
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่เผยแพร่แล้ว')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 10 </div>
                    </div>
                    {/*
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                    */}
                </div>

                {/* แบบฟอร์มที่รออนุมัติ */}
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่รออนุมัติ')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 10 </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                </div>

                {/* แบบฟอร์มที่โดนตีกลับ */}
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่โดนตีกลับ')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 10 </div>
                    </div>
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                </div>

                {/* แบบฟอร์มที่หยุดเผยแพร่ */}
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มที่หยุดเผยแพร่')}</div>
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
                                btnClassName="btn btn-primary dropdown-toggle"
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
                                    title: 'วันหมดอายุ',
                                    sortable: true,
                                    render: ({ Expire_Date }) => <div>{formatDate(Expire_Date)}</div>,
                                },
                                {
                                    accessor: 'Status',
                                    title: 'สถานะ',
                                    sortable: true,
                                    render: ({ Status }) => <span className={`badge bg-${colorBadgeStatus(Status)}/10 text-${colorBadgeStatus(Status)} py-1.5 dark:bg-${colorBadgeStatus(Status)} dark:text-white`}>{showStatus(Status)}</span>,
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
                        <div className="inline-flex items-center space-x-1 rtl:space-x-reverse m-auto mb-4">
                            {pagination.range.map((range) =>
                                range === 'dots' ? (<button key={range}>...</button>) :
                                    (
                                        <button className={pagination.active === range ? 'active' : ''}
                                            key={range}
                                            onClick={() => pagination.setPage(range)}
                                        >
                                            {range}
                                        </button>
                                    )
                            )}
                            <p>จำนวนรายการต่อหน้า {pageSize}</p>
                        </div>
                        <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
                            {recordsData.map((item: any) => {
                                return (
                                    <>
                                        <div className="mb-5 flex items-center justify-center" key={item.id}>
                                            <div className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[10] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-5 transition-all duration-300 group dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                                <div className="absolute -left-[40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
                                                    <div className="flex gap-1">
                                                        <svg
                                                            stroke-linejoin="round"
                                                            stroke-linecap="round"
                                                            stroke-width="1"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            className="fill-gray-300 rotate-[24deg]"
                                                            height="200"
                                                            width="200"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <polygon
                                                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                                            ></polygon>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="absolute rounded-full bg-gray-500 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300"></div>
                                                <div className="para uppercase text-center leading-none z-40">
                                                    <p className="text-black font-semibold text-xs dark:text-gray-300">dummy</p>
                                                    <p className="font-bold text-xl text-gray-500 dark:text-white">{item.Survey_Title}</p>
                                                </div>
                                                <div className="img w-[max] aspect-square bg-gray-100 z-40 rounded-md dark:bg-gray-300">
                                                    <div className="group grid grid-cols-3 gap-0 hover:gap-2 duration-500 relative shadow-sm">
                                                        <h1 className="absolute z-10 group-hover:hidden duration-200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                                            <MdTouchApp className="h-20 w-20" />
                                                        </h1>
                                                        <a href="#">
                                                            <svg
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-[#cc39a4] backdrop-blur-md group-hover:shadow-xl rounded-tl-lg flex justify-center items-center w-full h-full text-[#cc39a4] hover:text-white duration-200"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                    fill="currentColor"
                                                                    fill-rule="evenodd"
                                                                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                                                                    clip-rule="evenodd"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-500 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-500 hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    clip-rule="evenodd"
                                                                    d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                                                                    fill-rule="evenodd"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-red-500 backdrop-blur-md group-hover:shadow-xl rounded-tr-lg flex justify-center items-center w-full h-full text-red-400 hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    clip-rule="evenodd"
                                                                    d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM10 3.707a8.82 8.82 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.755 45.755 0 0 0 10 3.707Zm-6.358 6.555a8.57 8.57 0 0 1 4.73-5.981 53.99 53.99 0 0 1 3.168 4.941 32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.641 31.641 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM12 20.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 15.113 13a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
                                                                    fill-rule="evenodd"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-green-500 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-green-500 hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-black backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-black hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                                    stroke-width="2"
                                                                    stroke-linejoin="round"
                                                                    stroke-linecap="round"
                                                                    stroke="currentColor"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-600 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-700 hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-black backdrop-blur-md group-hover:shadow-xl rounded-bl-lg flex justify-center items-center w-full h-full text-black hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    clip-rule="evenodd"
                                                                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                                                                    fill-rule="evenodd"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-blue-600 backdrop-blur-md group-hover:shadow-xl flex justify-center items-center w-full h-full text-blue-600 hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    clip-rule="evenodd"
                                                                    d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                                                                    fill-rule="evenodd"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                        <a href="#">
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                height="24"
                                                                width="24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                aria-hidden="true"
                                                                className="group-hover:rounded-lg group-hover:opacity-1 p-3 bg-white/50 hover:bg-red-500 backdrop-blur-md group-hover:shadow-xl rounded-br-lg flex justify-center items-center w-full h-full text-red-500 hover:text-white duration-200"
                                                            >
                                                                <path
                                                                    clip-rule="evenodd"
                                                                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                                                                    fill-rule="evenodd"
                                                                    className="opacity-0 group-hover:opacity-100 duration-200"
                                                                ></path>
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="btm-_container z-40 flex flex-row justify-between items-center gap-7">
                                                    <div className="flex flex-col items-start gap-1">
                                                        <div className="inline-flex gap-3 items-center justify-center">
                                                            <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                                                <svg
                                                                    stroke-linejoin="round"
                                                                    stroke-linecap="round"
                                                                    stroke-width="1"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    className="fill-gray-800 h-3 w-3 stroke-none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                            <p className="font-semibold text-xs text-white">{item.Tel}</p>
                                                        </div>
                                                        <div className="flex flex-row gap-2">
                                                            <div className="inline-flex gap-3 items-center justify-center">
                                                                <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                                                    <svg
                                                                        stroke-linejoin="round"
                                                                        stroke-linecap="round"
                                                                        stroke-width="1"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        className="fill-gray-800 h-3 w-3 stroke-white"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                                                        ></path>
                                                                        <polyline points="22,6 12,13 2,6"></polyline>
                                                                    </svg>
                                                                </div>
                                                                <p className="font-semibold text-xs text-white">{item.Sector_Creator}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="badge bg-primary rounded-full text-sm text-white">20 คำตอบ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
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
