'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import { FaRegTrashCan, FaQrcode, FaEye } from "react-icons/fa6";
import { IRootState } from '@/store';
import { FaEdit } from "react-icons/fa";
import { IoDuplicateSharp } from "react-icons/io5";
import { MdMoreHoriz, MdDashboard, MdAddBox, MdDeleteForever } from "react-icons/md";
import { getTranslation } from '@/i18n';
import { useContextMenu } from 'mantine-contextmenu';
import { useMediaQuery, usePagination } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import Dropdown from '@/components/dropdown';
import moment from 'moment';
import survey_record from '@/public/assets/employeedummy.json';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'moment/locale/th';
import 'tippy.js/dist/tippy.css';
import 'survey-core/defaultV2.css'
import "survey-creator-core/survey-creator-core.css";
import IconHome from '@/components/icon/icon-home';
import IconPhone from '@/components/icon/icon-phone';
import IconSettings from '@/components/icon/icon-settings';
import IconUser from '@/components/icon/icon-user';
import Image from 'next/image'
import * as XLSX from 'xlsx';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'moment/locale/th';
import 'tippy.js/dist/tippy.css';

import IconSearch from '@/components/icon/icon-search';

import { ICreatorOptions, editorLocalization } from "survey-creator-core";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-creator-core/i18n/thai";

moment.locale('th');
const rowData = survey_record;
const col = ['id', 'Target_ID', 'Target_Name', 'Target_Sector'];
const itemsPerPage = 3; // สำหรับ Pagination แบบ Grid View
editorLocalization.currentLocale = "th";

const defaultCreatorOptions: ICreatorOptions = {
    showLogicTab: true,
    showThemeTab: true
};

export default function Creator(props: { json?: Object, options?: ICreatorOptions }) {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
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
        return <div className="mx-auto flex w-max items-center gap-2">
            <Tippy trigger="mouseenter focus" content='ลบรายการ'>
                <button type="button" data-trigger="mouseenter" className="btn btn-outline-danger w-8 h-8 p-0 rounded-full">
                    <Link href={"/myforms/manage/" + id}>
                        <FaRegTrashCan className="h-4 w-4 " />
                    </Link>
                </button>
            </Tippy>            
        </div>;
    };

    const actionStatusGrid = (id: any, Status: any) => {
        return <div className="mx-auto flex w-max items-center gap-2">
            {/* ปุ่มดูหรือแก้ไข */}
            <Link href={"/myforms/result/" + id}>
                <div className="group relative flex justify-center items-center text-amber-50 text-sm font-bold">
                    <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                        <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                            <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-amber-500 to-amber-400 p-3 rounded-full cursor-pointer duration-300">
                        <svg
                            fill="none"
                            viewBox="0 0 512 512"
                            height="20px"
                            width="20px"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-amber-50"
                        >
                            <path
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                            ></path>
                        </svg>
                        <span className="text-[0px] group-hover:text-sm duration-300">ดูหรือแก้ไขฟอร์ม</span>
                    </div>
                </div>
            </Link>
            {/* ปุ่มแสดงผลลัพธ์ (ตาราง) */}
            <Link href={"/incoming/pdf_answered/" + id}>
                <div className="group relative flex justify-center items-center text-emerald-50 text-sm font-bold">
                    <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
                        <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
                            <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1">
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-emerald-600 to-emerald-500 p-3 rounded-full cursor-pointer duration-300">
                        <svg
                            fill="none"
                            viewBox="0 0 576 512"
                            height="20px"
                            width="20px"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-sky-50"
                        >
                            <path
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                d="M0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0z"
                            ></path>
                        </svg>
                        <span className="text-[0px] group-hover:text-sm duration-300">ตารางผลลัพธ์</span>
                    </div>
                </div>
            </Link>
            {/* ปุ่มดังโงะ (อื่น ๆ) */}
            <div className="flex dropdown">
                <Dropdown
                    btnClassName="btn btn-info w-11 h-11 p-0 rounded-full dropdown-toggle"
                    button={
                        <>
                            <MdMoreHoriz className="h-7 w-7 " />
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
                    item.Target_ID.toLowerCase().includes(search.toLowerCase()) ||
                    item.Target_Name.toLowerCase().includes(search.toLowerCase()) ||
                    item.Target_Sector.toLowerCase().includes(search.toLowerCase())
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

    let [creator, setCreator] = useState<SurveyCreator>();

    if (!creator) {
        creator = new SurveyCreator(props.options || defaultCreatorOptions);
        creator.saveSurveyFunc = (no: number, callback: (num: number, status: boolean) => void) => {
            console.log(JSON.stringify(creator?.JSON));
            callback(no, true);
        };
        setCreator(creator);
    }

    creator.JSON = props.json;

    return (
        /*
        <div style={{ height: "80vh", width: "100%" }}>
            <SurveyCreatorComponent creator={creator} />
        </div>
        */
        <div className="mb-5">
            {isMounted && (
                <Tab.Group>
                    <Tab.List className="mb-5 mt-3 grid grid-cols-4 gap-2 rtl:space-x-reverse sm:flex sm:flex-wrap sm:justify-start sm:space-x-3">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? '!bg-success text-white !outline-none' : ''}
                                                    flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] p-7 py-3 hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] dark:bg-[#191e3a]`}
                                >
                                    <IconHome className="mb-1" />
                                    แบบสำรวจ
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? '!bg-success text-white !outline-none' : ''}
                                                    flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] p-7 py-3 hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] dark:bg-[#191e3a]`}
                                >
                                    <IconSettings className="mb-1 h-5 w-5" />
                                    กลุ่มเป้าหมาย
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? '!bg-success text-white !outline-none' : ''}
                                                    flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] p-7 py-3 hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] dark:bg-[#191e3a]`}
                                >
                                    <IconSettings className="mb-1 h-5 w-5" />
                                    การเผยแพร่
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="active" style={{ height: "80vh", width: "100%" }}>
                                <SurveyCreatorComponent creator={creator} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
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

                                        <div className="relative">
                                            <input type="text" className="peer form-input w-auto m-1 p-2 ltr:pr-11 rtl:pl-11" placeholder="ค้นหา..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                            <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                                <IconSearch className="mx-auto" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
                                            { accessor: 'Target_ID', title: 'รหัสพนักงาน', sortable: true },
                                            { accessor: 'Target_Name', title: 'ชื่อ-นามสกุล', sortable: true },
                                            { accessor: 'Target_Sector', title: 'หน่วยงานผู้สร้าง', sortable: true },
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
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            )}
        </div>
    );
};
