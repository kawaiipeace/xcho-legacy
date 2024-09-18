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

import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { DefaultDark } from "survey-core/themes";
import { DefaultLight } from "survey-core/themes";
import survey_json from '@/public/assets/survey_json.json'

moment.locale('th');

export const json = survey_json;

export default function Reply() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const survey = new Model(json);
    isDark ? survey.applyTheme(DefaultDark) : survey.applyTheme(DefaultLight);
    // survey.mode = "display"; ไว้ใช้ตอน Answered
    return (
        <div className="panel mt-6">
            <Survey model={survey} />
        </div>
    );
};
