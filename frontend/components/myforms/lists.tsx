'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import { FaAngleDown, FaFileCsv, FaFilePdf, FaFileExcel, FaFileExport, FaRectangleList, FaPhone, FaClock, FaWpforms, FaQrcode, FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { IoDuplicateSharp } from "react-icons/io5";
import { MdMoreHoriz, MdDashboard, MdAddBox, MdDeleteForever } from "react-icons/md";
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

import IconSearch from '@/components/icon/icon-search';

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
        return <div className="mx-auto flex w-max items-center gap-2">
            <Tippy trigger="mouseenter focus" content='ดูหรือแก้ไขฟอร์ม'>
                <button type="button" data-trigger="mouseenter" className="btn btn-outline-warning w-8 h-8 p-0 rounded-full">
                    <Link href={"/myforms/manage/" + id}>
                        <FaEdit className="h-4 w-4 " />
                    </Link>
                </button>
            </Tippy>
            <Tippy trigger="mouseenter focus" content="ตารางผลลัพธ์">
                <button type="button" data-trigger="mouseenter" className="btn btn-outline-success w-8 h-8 p-0 rounded-full">
                    <Link href={"/myforms/result/" + id}>
                        <FaRectangleList className="h-4 w-4 " />
                    </Link>
                </button>
            </Tippy>
            <Tippy trigger="mouseenter focus" content="อื่น ๆ">
                <div className="flex dropdown">
                    <Dropdown
                        btnClassName="btn btn-outline-info w-8 h-8 p-0 rounded-full dropdown-toggle"
                        button={
                            <>
                                <MdMoreHoriz className="h-4 w-4 " />
                            </>
                        }
                    >
                        <ul className="!min-w-[170px]">
                            <li>
                                <Link className="inline-block" href={"/myforms/dashboard/" + id}>
                                    <button type="button" className="text-center inline-flex items-center">
                                        <MdDashboard className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                        {t('แดชบอร์ด')}
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <button type="button" className="text-center inline-flex items-center">
                                    <FaEye className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                    {t('เผยแพร่')}
                                </button>
                            </li>
                            <li>
                                <button type="button" className="text-center inline-flex items-center">
                                    <FaQrcode className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                    {t('ลิงก์/QR Code')}
                                </button>
                            </li>
                            <li>
                                <button type="button" className="text-center inline-flex items-center">
                                    <IoDuplicateSharp className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                    {t('ทำซ้ำ')}
                                </button>
                            </li>
                            <li>
                                <button type="button" className="text-danger text-center inline-flex items-center" onClick={() => exportTable('pdf')}>
                                    <MdDeleteForever className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
                                    {t('ลบแบบฟอร์ม')}
                                </button>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </Tippy>
        </div>;
    };

    const actionStatusGrid = (id: any, Status: any) => {
        return <div className="mx-auto flex w-max items-center gap-2">
            {/* ปุ่มดูหรือแก้ไข */}
            <Link href={"/myforms/result/" + id}>
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
                        <span className="text-[0px] group-hover:text-sm duration-300">ดูหรือแก้ไขฟอร์ม</span>
                    </div>
                </div>
            </Link>
            {/* ปุ่มแสดงผลลัพธ์ (ตาราง) */}
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
                        <span className="text-[0px] group-hover:text-sm duration-300">ตารางผลลัพธ์</span>
                    </div>
                </div>
            </Link>
            {/* ปุ่มดังโงะ (อื่น ๆ) */}
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
                        <span className="text-[0px] group-hover:text-sm duration-300">อื่น ๆ</span>
                    </div>
                </div>
            </Link>
        </div>;
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มเผยแพร่แล้ว')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-7xl font-bold ltr:mr-3 rtl:ml-3"> 5 </div>
                    </div>
                    {/*
                    <div className="mt-5 flex items-center font-semibold">
                        <FaWpforms className="shrink-0 ltr:mr-2 rtl:ml-2" />
                        {t('จากทั้งหมด 30')}
                    </div>
                    */}
                </div>

                {/* แบบฟอร์มที่รออนุมัติ */}
                <div className="panel area-bg-primary">
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มรออนุมัติ')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-7xl font-bold ltr:mr-3 rtl:ml-3"> 3 </div>
                    </div>
                </div>

                {/* แบบฟอร์มที่โดนตีกลับ */}
                <div className="panel area-bg-warning">

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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มโดนตีกลับ')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-7xl font-bold ltr:mr-3 rtl:ml-3"> 2 </div>
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
                        <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">{t('แบบฟอร์มหยุดเผยแพร่')}</div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="text-7xl font-bold ltr:mr-3 rtl:ml-3"> 7 </div>
                    </div>
                </div>
            </div>

            <div className="panel mt-6">
                <div className="mb-4.5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center">
                        <h2 className="text-xl">{t('ฟอร์มของคุณ')}</h2>
                    </div>

                    <div className='flex flex-wrap items-end'>
                        <Link href={"/myforms/creator"} >
                            <button type="button" className="btn btn-primary m-1 p-2">
                                <span>
                                    <MdAddBox className="h-5 w-5 ltr:mr-1 rtl:ml-1" />
                                </span>
                                &nbsp;{t('สร้างแบบฟอร์ม')}
                            </button>
                        </Link>
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
                                                <span className={`badge bg-${colorBadgeStatus(item.Status)}/10 text-${colorBadgeStatus(item.Status)} py-1.5 dark:bg-${colorBadgeStatus(item.Status)} dark:text-white`}>{item.Status}</span>
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
        </div >
    );
};

export default Lists;
