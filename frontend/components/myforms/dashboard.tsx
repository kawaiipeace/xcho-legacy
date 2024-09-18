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
import "survey-analytics/survey.analytics.css";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";

import { Model } from 'survey-core'
import { VisualizationPanel, VisualizationManager, WordCloud } from "survey-analytics";
import { DefaultDark } from "survey-core/themes";
import { DefaultLight } from "survey-core/themes";
import { data, json } from "@/public/assets/dashboard_data";

moment.locale('th');
(window as any)["jsPDF"] = jsPDF;
(window as any)["XLSX"] = XLSX;

// const WordCloud = require("wordcloud");
// (window as any)["WordCloud"] = WordCloud;

// VisualizationManager.unregisterVisualizerForAll(WordCloud);

export default function Dashboard() {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    let [vizPanel, setVizPanel] = useState<VisualizationPanel>();

    if (!vizPanel) {
        const survey = new Model(json);
        isDark ? survey.applyTheme(DefaultDark) : survey.applyTheme(DefaultLight);
        vizPanel = new VisualizationPanel(survey.getAllQuestions(), data);
        setVizPanel(vizPanel);
    }

    useEffect(() => {
      vizPanel?.render("surveyVizPanel");
      return () => {
        vizPanel?.clear();
      }
    }, [vizPanel]);

    return (
        <div className="panel mt-6">
            <div id="surveyVizPanel" style={{"margin": "auto", "width": "100%", "maxWidth": "1400px"}}></div>
        </div>
    );
};
