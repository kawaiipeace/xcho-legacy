import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image'
import React from 'react';

export const metadata: Metadata = {
    title: 'เข้าสู่ระบบ',
};

const Login = () => {
    return (
        <div>
            <div className="absolute inset-0">
                <Image
                    src="/assets/images/auth/bg-gradient.png"
                    alt="default"
                    width={500}
                    height={500}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <Image
                    src="/assets/images/auth/coming-soon-object1.png"
                    alt="default"
                    width={500}
                    height={500}
                    className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
                />
                <Image
                    src="/assets/images/auth/coming-soon-object2.png"
                    alt="default"
                    width={500}
                    height={500}
                    className="absolute left-24 top-0 h-40 md:left-[30%]"
                />
                <Image
                    src="/assets/images/auth/coming-soon-object3.png"
                    alt="default"
                    width={500}
                    height={500}
                    className="absolute right-0 top-0 h-[300px]"
                />
                <Image
                    src="/assets/images/auth/polygon-object.svg"
                    alt="default"
                    width={500}
                    height={500}
                    className="absolute bottom-0 end-[28%]"
                />
                <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                    <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                        <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                            <Link href="/" className="ms-10 block w-48 lg:w-72">
                                <Image
                                    src="/assets/images/auth/logo-transparent-white.svg"
                                    alt="Logo"
                                    width={500}
                                    height={500}
                                    className="w-full"
                                />
                            </Link>
                            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                <Image
                                    src="/assets/images/auth/login.svg"
                                    alt="Cover Image"
                                    width={500}
                                    height={500}
                                    className="w-full"
                                />

                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                        <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                            <Link href="/" className="block w-8 lg:hidden">                                
                                <Image
                                    src="/assets/images/logo.svg"
                                    alt="Logo"
                                    width={500}
                                    height={500}
                                    className="mx-auto w-10"
                                />
                            </Link>
                        </div>
                        <div className="w-full max-w-[440px] lg:mt-16">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">XCHO</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">เข้าสู่ระบบผ่าน PEA Single Sign-On</p>
                            </div>
                            <ComponentsAuthLoginForm />
                        </div>
                        <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. ระบบจัดการแบบฟอร์ม (XCHO) สงวนลิขสิทธิ์ พัฒนาโดย ฝพจ.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
