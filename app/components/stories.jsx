import React from 'react'
import Link from 'next/link'

const Stories = ({ val }) => {
  return (
    <div className="rounded-2xl p-1.5 mb-2 md:w-2/3 xl:w-2/5 w-10/12 flex-none bg-[#444c56]">
        <div className="h-60 md:h-[320px] relative rounded-2xl">
            {val && <img className="rounded-2xl h-full w-full" src={val.urlToImage} alt='image'/>}

            <div className="flex gap-1 absolute bottom-2 left-4">
                <img className="h-8 w-8 rounded-full z-10" src="/recommended-6.jpg" alt=""/>
                <img className="h-8 w-8 rounded-full z-10" src="/newsletter.png" alt=""/>
            </div>

        </div>

        <div className="desc-card">
            <ul className="flex gap-1">
                <li className="my-2 px-1.5 rounded-lg text-sm bg-blue-50 text-black">{val.category}</li>
            </ul>
            <h3 className="max-w-96 font-bold mb-2.5">
            {val && <Link href={`/blog/${val.title}`}>{val.title}</Link>}
            </h3>
        </div>
    </div>
  )
}

export default Stories