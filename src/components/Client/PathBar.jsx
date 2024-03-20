import React from 'react'
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';

const PathBar = () => {

    const pathName = usePathname();

    return (
        <>
            <div className='bg-[#EADED7]'>
                <p className='p-4 text-2xl font-bold'>
                    <Link href="/" className='text-[#795744]'>Home</Link><Link href={`/${pathName?.split('/')[1]}`} className='text-[#453227]'>{pathName}</Link>
                </p>
            </div>
        </>
    )
}

export default PathBar
