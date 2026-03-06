import React from 'react'
import Stories from '../../components/stories'
import Link from 'next/link'
import getBlogs from '../../components/blogslist'


export default  async function Blog ( {params} ) {
    const  articles  = await getBlogs()
    const { id } = await params

    let decode = decodeURIComponent(id)
    const blog = articles.find(({title}) => (title == decode))

    function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

    const stories = shuffle((articles.filter((e) => e.category === blog.category)).slice(0,4))
    
    if (!blog) {
      return <h2 className='text-3xl md:text-5xl md:max-w-3xl xl:text-6xl font-bold xl:max-w-6xl mx-auto my-8 pt-12 text-center'>News not found</h2>
    }

    const { author, title, description, url, urlToImage, publishedAt, content, source } = blog
    

  return (
    <div>
      {blog &&  <div>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl md:text-5xl md:max-w-3xl xl:text-6xl font-bold xl:max-w-6xl mx-auto my-8 pt-12'>{title}</h2>
        <img className="h-10 w-10 rounded-full z-10 mx-auto" src="/newsletter.png" alt=""/>
        <p className='font-semibold'>{author}</p>
      </div>

      <div className='max-w-6xl mx-auto my-4 bg-[#444c56] px-4 py-3 rounded-t-2xl'>
        <img className="rounded-2xl h-full w-full mx-auto max-h-[640px] min-h-80" src={urlToImage} alt={''}/>
        <div className='my-10 md:max-w-[94%] text-left'>
          <p className='text-[20px] font-semibold'>Description</p>
          <p>{description}</p>
          <p className='text-[20px] font-semibold mt-5'>Content</p>
          <p>{content}</p>
          <p className='text-[20px] mt-1'>Read full content here at: <Link href={url}  className='font-semibold underline'>{source.name}</Link></p>
        </div>
      </div>

      <section className="container mx-auto border-b-8 border-b-blue-50 mb-3">
          <p className="text-[18px] md:text-2xl lg:text-3xl mb-4">Here are Some <strong>Related stories</strong></p>
          <div className="flex gap-2.5 pb-5 mb-3 overflow-x-scroll scroll">
            {stories.map((e, i) => (<Stories key={i} val={e} />))}
          </div>
        </section>
    </div>}
    </div> 
  )
}
