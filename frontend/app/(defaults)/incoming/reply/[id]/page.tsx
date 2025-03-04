import { Metadata } from 'next';
import React from 'react';
import { getTranslation } from '@/i18n';
import SurveyComponent from "@/components/incoming/reply";

// Use fetch to call your external API
async function fetchSurveyContent(id: string) {
  try {
    const response = await fetch(`http://localhost:2501/surveys/get-survey-by-id?id=${id}`);
    const data = await response.json();

    if (!data || data.length === 0) {
      return null; // No data found
    }

    return data[0]; // Assuming it returns an array, take the first item
  } catch (error) {
    console.error('Error fetching survey data:', error);
    return null;
  }
}

export const metadata: Metadata = {
  title: 'หน้าตอบแบบฟอร์ม',
};

export default async function Reply({ params }: { params: { id: string } }) {
  const { t } = getTranslation();

  // Fetch the survey data using the ID from the URL
  const surveyData = await fetchSurveyContent(params.id);

  // If the survey data is not found, handle it accordingly (e.g., show a 404 page)
  if (!surveyData) {
    return <h2>{t('ไม่พบข้อมูลแบบฟอร์มที่คุณต้องการ')}</h2>; // Survey not found
  }

  return (
    <>
      <div className="panel">
        <h2 className="text-xl">{t('ตอบแบบฟอร์มหัวข้อ')} {surveyData.survey_title}</h2>
        <SurveyComponent content_survey={surveyData.content_survey} />
      </div>
    </>
  );
}