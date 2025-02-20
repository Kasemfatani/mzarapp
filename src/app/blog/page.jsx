'use client'
import React, { useEffect, useState } from 'react';
import SingleBlog from '../../components/blog/SingleBlog';
import Content from '../../components/home/Content';
import Head from 'next/head';

export default function Blog() {


    return (

        <div className="blog container m-auto">
            <SingleBlog />
            <Content />
        </div>
    );
}
