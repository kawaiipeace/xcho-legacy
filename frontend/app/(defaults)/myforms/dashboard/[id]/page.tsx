import { Metadata } from 'next';
import React from 'react';
import { getTranslation } from '@/i18n';
import DashboardSurvey from "@/components/myforms/dashboard";

export const metadata: Metadata = {
  title: 'แดชบอร์ด',
};

export default function Dashboard({ params }: { params: { id: any } }) {
  const { t, i18n } = getTranslation();

  return (
    <>
      <h2 className="text-xl">{t('SurveyJS ID ที่')} {params.id}</h2>
      <DashboardSurvey />
    </>);
}
