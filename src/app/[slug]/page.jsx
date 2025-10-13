'use client'

import SingleBlog from '../../components/blog/SingleBlog';
import Content from '../../components/home/Content';

import { useParams } from "next/navigation";

export default function BlogSlugPage() {
    const { slug } = useParams();

    return (

        <div className="blog">
            <SingleBlog slug={slug} />
            <Content />
        </div>
    );
}
