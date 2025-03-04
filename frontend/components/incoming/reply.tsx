'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'survey-core/defaultV2.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { DefaultDark } from "survey-core/themes";
import { DefaultLight } from "survey-core/themes";
import { IRootState } from '@/store';
import moment from 'moment';

moment.locale('th');

export default function Reply({ content_survey }: { content_survey: any }) {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const survey = new Model(content_survey);
    isDark ? survey.applyTheme(DefaultDark) : survey.applyTheme(DefaultLight);
    // survey.mode = "display"; ไว้ใช้ตอน Answered
    return (
        <div className="mt-3">
            <Survey model={survey} />
        </div>
    );
};