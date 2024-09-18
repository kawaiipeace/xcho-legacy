import { Metadata } from 'next';
import React from 'react';
import { getTranslation } from '@/i18n';
import Result from "@/components/myforms/result";

export const metadata: Metadata = {
  title: 'ผลลัพธ์ของแบบฟอร์ม',
};

export default function Results({ params }: { params: { id: any } }) {
  const { t, i18n } = getTranslation();

  return (
    <>
      <h2 className="text-xl">{t('SurveyJS ID ที่')} {params.id}</h2>
      <Result />
    </>);
}
