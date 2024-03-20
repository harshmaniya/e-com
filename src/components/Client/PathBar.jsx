'use client'

import React from 'react'
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';

const PathBar = () => {

    const pathName = usePathname();
    const segments = pathName.split('/');
    console.log("🚀 ~ PathBar ~ pathName:", pathName)

    return (
        <>
            {pathName === "/" ? null :
                <div className='bg-[#EADED7] px-34'>
                    <p className='p-4 text-2xl font-bold'>
                        <Link href="/" className='text-[#795744]'>Home</Link>
                        {segments.map((segment, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && '/'}
                                <Link href={index === 0 ?'/': `/${segments.slice(1, index + 1).join('/')}`} className={`text-${index === segments.length - 1 ? '[#453227]' : '[#795744]'}`}>{segment}</Link>
                            </React.Fragment>
                        ))}
                    </p>
                </div>
            }
        </>
    )
}

export default PathBar
