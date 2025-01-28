'use client'
import React, { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Paths from '../components/home/Paths';
import About from '../components/home/About';
import GenSection from '../components/home/GenSection';
import AppExplore from '../components/home/AppExplore';
import Explore from '../components/home/Explore';
import SemiAbout from '../components/home/SemiAbout';
import Parteners from '../components/home/Parteners';
import Gallery from '../components/home/Gallery';
import Content from '../components/home/Content';
import Latest from '../components/home/Latest';
import Confiemed from '../components/home/Confirmed';
export default function Home() {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang')==='ar') {
        setLang('ar');
      }
      else if (localStorage.getItem('lang')==='en') {
        setLang('en');
      }
      else{
        localStorage.setItem('lang', 'en');
      }
    }
  }, []);
  return (
    <main>
      <Hero></Hero>
      <SemiAbout/>
      {/* <Parteners/> */}
      <Confiemed/>
      <Paths></Paths>
      {/* <Explore/> */}
      <Gallery/>
      <About></About>
      <AppExplore/>
      {/* <Content/> */}
      <GenSection/>
      {/* <Latest/> */}
    </main>
  );
}
