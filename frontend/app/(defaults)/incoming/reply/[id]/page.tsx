import { Metadata } from 'next';
import React from 'react';
import { getTranslation } from '@/i18n';
import SurveyComponent from "@/components/incoming/reply";

export const metadata: Metadata = {
  title: 'หน้าตอบแบบฟอร์ม',
};

export default function Reply({ params }: { params: { id: any } }) {
  const { t, i18n } = getTranslation();

  return (
    <>
      <h2 className="text-xl">{t('หน้าจอตอบแบบฟอร์มของ SurveyJS ID ที่')} {params.id}</h2>
      <SurveyComponent />
    </>);
}
