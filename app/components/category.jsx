'use client'
import React from 'react'
import { useSearchParams  } from 'next/navigation';
import Link from 'next/link';

const Category = () => {
  
  const searchParams = useSearchParams() 

  const cat = searchParams.get('category') || "All" ;

  const category = ['All', 'Technology', 'Entertainment', 'Sports' ] 


  return (
    <div>
        <h3>{`${cat} News`}</h3>
        <div className='flex w-fit gap-2 md:gap-3 mx-auto mb-6 md:mb-11 mt-4 lg:mb-15'> 
            {category.map((e, i) => (<Link key={i} href={`?category=${e}`} className={`category ${cat === e ? 'active' : ''}`} replace>{e}</Link>))}
        </div>
    </div>
  )
}

export default Category