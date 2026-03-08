'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams  } from 'next/navigation';
import { useState } from 'react'

const Nav = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter() 

  const [menu, setmenu] = useState(false)
  const [category, setCategory] = useState('home');
  const inputRef = useRef(null);

  function handleSearch () {
    const params = new URLSearchParams(searchParams)
    if (inputRef.current.value) {
        const cat =  inputRef.current.value;
        params.set('query', cat)
      }else {
        params.delete('query')
      }
      replace(`${pathname}?${params.toString()}`);
  }

  const useDebounce = (func, delay) => {
    let timeout = null

    return (...args) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  const debounceData = useDebounce(handleSearch, 500)


  return (
    <div className='relative'>
      <nav className="">

        <h3><Link href="/">MED-NEWS</Link></h3>

        <div className="md:flex md:gap-3">
          <img src="/menu.png" className='md:hidden w-6 h-6 cursor-pointer' alt="" onClick={() => setmenu(!menu)} />
          <div className={`relative ${menu ? "mobile-menu" :  "md:flex gap-3 hidden"}`}>
            {/* <h3 className={`mb-4 ${menu ? "" :  "hidden"}`}>MED-BLOG</h3> */}
            <img src="/close.png" className='md:hidden w-7 h-7 cursor-pointer absolute top-3 right-2' alt="" onClick={() => setmenu(!menu)} />
            <Link href={'/'} className={`${category === 'home' ? 'active md:px-2' : ''}`} onClick={() => setCategory('home')}>Home</Link>
            <Link href="/blogs" className={`${category === 'blogs' ? 'active md:px-2' : ''}`} onClick={() => setCategory('blogs')}>All News</Link>
            <Link href="#socials-list" className={`${category === 'contact' ? 'active md:px-2' : ''}`} onClick={() => setCategory('contact')}>Contact Med</Link>
          
            { pathname === '/blogs' &&
              <div className="border-1 md:max-w-64 mt-5  border-blue-50 rounded-[5px] md:-mt-[2px] relative">
              <input type="text" name="text" ref={inputRef} onChange={() => debounceData() } placeholder="Search" required defaultValue={searchParams.get("query")?.toString()} className="bg-blue-50 text-black w-full pe-10 p-2 md:py-0 md:px-2 h-full md:text-[18px] border-0 " autoComplete="off" />
              <img src="/search-outline.svg" onClick={handleSearch} className='w-7 absolute top-1/2 right-1 transform -translate-y-1/2' alt="" />
            </div>}

          </div>
        </div>

      </nav>
              { pathname === '/blogs' &&
              <div className="border-1 w-11/12 mx-auto mt-16 md:hidden border-blue-50 rounded-[5px] relative">
              <input type="text" name="text" ref={inputRef} onChange={() => debounceData() } placeholder="Search" required defaultValue={searchParams.get("query")?.toString()} className="bg-blue-50 text-black w-full pe-10 p-2 h-full border-0 " autoComplete="off" />
              <img src="/search-outline.svg" onClick={handleSearch} className='w-7 absolute top-1/2 right-1 transform -translate-y-1/2' alt="" />
            </div>}
    </div>
  
  )
}

export default Nav