'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { RiLockPasswordFill } from "react-icons/ri";
import { getTranslation } from '@/i18n';

const ComponentsAuthUnlockForm = () => {
    const router = useRouter();
    const { t, i18n } = getTranslation();

    const submitForm = (e: any) => {
        e.preventDefault();
        router.push('/incoming');
    };
    return (
        <form className="space-y-5" onSubmit={submitForm}>
            <div>
                <label htmlFor="Password" className="dark:text-white">
                {t('รหัสผ่าน')}
                </label>
                <div className="relative text-white-dark">
                    <input id="Password" type="password" placeholder="กรอกรหัสผ่าน" className="form-input ps-10 placeholder:text-white-dark" />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                        <RiLockPasswordFill/>
                    </span>
                </div>
            </div>
            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                {t('ปลดล็อกหน้าจอ')}
            </button>
        </form>
    );
};

export default ComponentsAuthUnlockForm;
