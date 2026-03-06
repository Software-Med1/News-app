import React from 'react'
import Link from "next/link";

const Blogs = ({ val }) => {
    
  return (
    <div className="rounded-2xl p-1.5 mb-2 bg-[#444c56]">
        <div className="h-[320px] relative rounded-2xl pr-3 overflow-hidden">
            {val && <img className="h-full w-full" src={val.urlToImage} alt=''/>}

            <div className="flex gap-1 absolute bottom-2 left-4">
                <img className="h-8 w-8 rounded-full z-10" src="/recommended-6.jpg" alt=""/>
                <img className="h-8 w-8 rounded-full z-10" src="/newsletter.png" alt="" />
            </div>

        </div>

        <div className="desc-card">
            <ul className="flex gap-1">
                <li className="my-2 px-1.5 rounded-lg text-sm bg-blue-50 text-black">{val.category}</li>
            </ul>
            <h3 className="max-w-80 font-bold mb-2.5">
            {val && <Link href={`/blog/${val.title}`}>{val.title}</Link>}
            </h3>
            {val && <p>{val.description}</p>}
        </div>
    </div>
  )
}

export default Blogs