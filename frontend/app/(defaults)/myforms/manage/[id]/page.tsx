import { Metadata } from 'next';
import React from 'react';
import { getTranslation } from '@/i18n';
import Manage from "@/components/myforms/manage";

export const metadata: Metadata = {
  title: 'หน้าตอบแบบฟอร์ม',
};

export default function Edit({ params }: { params: { id: any } }) {
  const { t, i18n } = getTranslation();

  return (
    <>
      <Manage />
    </>);
}
