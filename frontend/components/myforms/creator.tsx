'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useRef } from 'react';
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
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';
import 'moment/locale/th';
import 'tippy.js/dist/tippy.css';
import 'survey-core/defaultV2.css'
import "survey-creator-core/survey-creator-core.css";

import { ICreatorOptions } from "survey-creator-core";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";

const defaultCreatorOptions: ICreatorOptions = {
    showLogicTab: true,
    showTranslationTab: true
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
        <div style={{ height: "80vh", width: "100%" }}>
            <SurveyCreatorComponent creator={creator} />
        </div>
    );
};
