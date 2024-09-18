import { Metadata } from 'next';
import React from 'react';
import { getTranslation } from '@/i18n';
import Creator from "@/components/myforms/creator";

export const metadata: Metadata = {
  title: 'สร้างแบบฟอร์ม',
};

export default function New() {
  const { t, i18n } = getTranslation();

  return (
    <>
      <Creator />
    </>);
}
