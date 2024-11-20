'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconListCheck from '@/components/icon/icon-list-check';
import { FaAngleDown, FaFileCsv, FaFilePdf, FaFileExcel, FaFileExport, FaRegFaceSadCry, FaEye, FaReply, FaPhone, FaClock, FaWpforms } from "react-icons/fa6";
import { IRootState } from '@/store';
import { getTranslation } from '@/i18n';
import { useContextMenu } from 'mantine-contextmenu';
import { useMediaQuery } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import Dropdown from '@/components/dropdown';
import moment from 'moment';
import survey_record from '@/public/assets/surveydummy.json';
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

import { ICreatorOptions } from "survey-creator-core";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";

const defaultCreatorOptions: ICreatorOptions = {
    showLogicTab: true,
    showTranslationTab: true,
    showThemeTab: true
};

export default function Creator(props: { json?: Object, options?: ICreatorOptions }) {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                                        ออกแบบ
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
                                        เผยแพร่
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
                                <div className="rounded-br-md rounded-tr-md border border-l-2 border-white-light !border-l-primary bg-white p-5 text-black shadow-md ltr:pl-3.5 rtl:pr-3.5 dark:border-[#060818] dark:bg-[#060818]">
                                    <div className="flex items-start">
                                        <p className="m-0 text-sm not-italic text-[#515365] dark:text-white-dark">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
                                        </p>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                )}
            </div>
    );
};
