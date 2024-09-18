'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SiKeycloak } from "react-icons/si";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { getTranslation } from '@/i18n';

const ComponentsAuthLoginForm = () => {
    const router = useRouter();
    const { t, i18n } = getTranslation();
    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/incoming');
    };

    return (
        <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
        { /* 
            <div>
                <label htmlFor="Emp_Id">{t('รหัสพนักงาน')}</label>
                <div className="relative text-white-dark">
                    <input id="Emp_Id" type="text" placeholder="กรอกรหัสพนักงาน" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <FaUser/>
                    </span>
                </div>
            </div>
            <div>
                <label htmlFor="Password">{t('รหัสผ่าน')}</label>
                <div className="relative text-white-dark">
                    <input id="Password" type="password" placeholder="กรอกรหัสผ่าน" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <RiLockPasswordFill/>
                    </span>
                </div>
            </div>
            */}
            <div>
                <label className="flex items-center font-semibold">
                    <SiKeycloak className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2"/><span>{t('Powered by Keycloak')}</span>
                </label>
            </div>
            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {t('เข้าสู่ระบบ')}
            </button>
        </form>
    );
};

export default ComponentsAuthLoginForm;
