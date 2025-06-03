'use client';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/home/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  
  // Don't render the header on the special-tour page
  if (pathname === '/special-tour') {
    return null;
  }

  // Don't render the header on the custome page
  if (pathname === '/saad-alqurashi' || pathname === '/raslania') {
    return null;
  }

  let [lang, setLang] = useState('ar');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang') === 'ar' || localStorage.getItem('lang') === 'en') {
        setLang(localStorage.getItem('lang'));
      }
      else {
        localStorage.setItem('lang', 'ar');
        setLang('ar');
      }
    }
  }, [lang]);
  return (
    <header className={`${lang === 'en' ? 'ltr' : 'rtl'} header`} >
      <div className="container m-auto flex items-center gap-2 justify-between">
        <Link href="/"> <Image src={logo} alt="logo" className="logo-img" /></Link>
        <div className="links">
          <Link href="/" className={pathname === '/' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
          <Link href="/#paths" className={pathname === '/#paths' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Paths' : 'المسارات'}</Link>
          <Link href="/#about" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'About' : 'من نحن'}</Link>
          <Link href="/#gallery" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Gallery' : 'المعرض'}</Link>
          <Link href="/blogs" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Blogs' : 'المقالات'}</Link>
          <Link href="/all-news" className={pathname === '/all-news' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'News' : 'الاخبار'}</Link>
          {
            pathname === '/' ?
              <Link href="/book" className='book-link' >{lang === 'en' ? 'Book now' : 'احجز الان'}</Link>
              : null
          }

          <div
            className="lang-btn"
            onClick={() => {
              if (lang === 'en') {
                localStorage.setItem('lang', 'ar');
                setLang('ar');
              } else {
                localStorage.setItem('lang', 'en');
                setLang('en');
              }
              if(pathname === '/blog'){
                console.log('here');
                router.push('/')
              }
              else{
                window.location.reload(); // Reloads the page
              }
            }}
          >
            {/* {lang === 'ar' ? 'En' : 'ع'} */}
            <Globe size={20} />
          </div>

        </div>
       
        <Menu className='menu-bars' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }} />
        <X className='menu-bars-X hidden' onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }} />
        <div className="side-menu" onClick={() => {
          document.querySelector('.side-menu').classList.toggle('side-menu-active')
          document.querySelector('.menu-bars').classList.toggle('hidden')
          document.querySelector('.menu-bars-X').classList.toggle('hidden')
        }}>
          <div className="links">
            <Link href="/" className={pathname === '/' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
            <Link href="/#paths" className={pathname === '/#paths' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Paths' : 'المسارات'}</Link>
            <Link href="/#about" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'About' : 'من نحن'}</Link>
            <Link href="/#about" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Gallery' : 'المعرض'}</Link>
            <Link href="/blogs" className={pathname === '/#about' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'Blogs' : 'المقالات'}</Link>
            <Link href="/all-news" className={pathname === '/all-news' ? 'active' : 'normal-Link'}>{lang === 'en' ? 'News' : 'الاخبار'}</Link>
            <Link href="/book" className='book-link' >{lang === 'en' ? 'Book now' : 'احجز الان'}</Link>
            <div
              className="lang-btn"
              onClick={() => {
                if (lang === 'en') {
                  localStorage.setItem('lang', 'ar');
                  setLang('ar');
                } else {
                  localStorage.setItem('lang', 'en');
                  setLang('en');
                }
                if(pathname === '/blog'){
                  console.log('here');
                  router.push('/')
                }
                else{
                  window.location.reload(); // Reloads the page
                }
              }}
            >
              {/* {lang === 'ar' ? 'En' : 'ع'} */}
              <Globe size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
