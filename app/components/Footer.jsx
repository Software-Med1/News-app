import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer id='socials-list'>
        <div className='grid lg:grid-cols-3 max-w-5xl gap-3.5 mx-auto pb-5 px-1'>
          <div className='socials flex flex-col gap-2'>
          <h3>Socials</h3>
             <Link href="https://www.instagram.com/software_med?igsh=dnQ4MGZ4ZGZlazBi" className=""><img src="/logo-instagram.svg" className='w-7 mr-1 inline' alt="" />Instagram</Link>
             <Link href="https://x.com/Xiaoprince23?t=g5xs7jXp4BYuL1kjk2TrsQ&s=09" className=""><img src="/logo-twitter.svg" className='w-7 mr-1 inline' alt="" />Twitter</Link>
             <Link href="https://wa.me/+2347032616370" className=""><img src="/whatsapp.svg" className='w-7 mr-1 inline' alt="" />WhatsApp</Link>
              <Link href="https://t.me/AnonymousSnapdragon" className=""><img src="/telegram-black-icon.svg" className='w-7 mr-1 inline' alt="" />Telegram</Link>
          </div>

          <div className='links flex flex-col gap-2'>
          <h3>Links</h3>
            <Link href={'/'}>Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="#socials-list">Contact-Med</Link>
          </div>

          <div className='newsletter'>
            <h3>Newsletter</h3>
            <p className='max-w-xl'>Sign up to be first to receive the latest stories inspiring us, case studies, and industry news.</p>

            <div className="input-wrapper rounded-[5px] relative">
              <input type="text" name="name" placeholder="Your name" required className="bg-blue-50 text-black" autoComplete="off" />
              <img src="/person-outline.svg" className='w-8 absolute top-1/2 left-1 transform -translate-y-1/2' alt="" />
            </div>

            <div className="input-wrapper rounded-[5px] relative">
              <input type="email" name="email_address" placeholder="Emaill address" required className="bg-blue-50 text-black" autoComplete="off" />
              <img src="/mail-outline.svg" className='w-8 absolute top-1/2 left-1 transform -translate-y-1/2' alt="" />
            </div>

            <Link href="#" className="btn border-2 py-2 px-4 rounded-2xl">Subscribe <span><img src="/arrow-forward-outline.svg" className='w-9 -mt-0.5 inline' alt="" /></span> </Link>

          </div>
        </div>
         <div className="text-center border-t-4 border-t-blue-50 pt-3 mb-4">
        <p>&copy; Med-News 2025.<Link href="#" className="hover:underline">Code By Software-Med</Link></p>
      </div>
    </footer>
  )
}

export default Footer