import React from 'react'
import Blogs from '../components/blogs'
import Stories from '../components/stories'
import getBlogs from '../components/blogslist'
import Category from '../components/category'

const blogs = async ({searchParams}) => {


   const { category } = await searchParams;
    const { query } = await searchParams ;
   const articles  = await getBlogs()

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let cat = shuffle(articles.filter((e) =>  category === undefined ? true : category === 'All' ? true : e.category === category ))

  function liveSearch(searchTerm, arrayToSearch) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        return arrayToSearch.filter(item => {
            return item.title.toLowerCase().includes(lowerCaseSearchTerm) || 
            item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.content.toLowerCase().includes(lowerCaseSearchTerm);
        });
    }

  if (query) {
    cat = liveSearch(query, cat)
  }
  

  const a = (articles.filter((e) => e.category === 'Entertainment')).slice(0,2)
  const b = (articles.filter((e) => e.category === 'Technology')).slice(0,2)
  const c = (articles.filter((e) => e.category === 'Sports')).slice(0,2)

  const stories = shuffle([...a, ...b, ...c])

  return (
    <div className='max-w-[1536px] mx-auto px-1 md:px-4 mb-4 mt-18 md:mt-20'>
      <Category />
    {!articles || articles.length === 0 && <p className='text-center'>Please Refresh, No News Available.</p>}
    {articles.length !== 0 && cat.length === 0 && <p className='text-center'>No News matching your keywords "{query}".</p>}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-2 my-4'>
        {articles && cat.map((e, i) => (<Blogs key={i} val={e} />))}
      </div>
      <section className="container mx-auto border-b-8 border-b-blue-50">
          <p className="text-[18px] md:text-2xl lg:text-3xl mb-4">Check out Some <strong>Highlighted stories</strong></p>
          <div className="flex gap-2.5 pb-5 mb-3 overflow-x-scroll scroll">
            {articles && stories.map((e, i) => (<Stories key={i} val={e} />))}
          </div>
        </section>
    </div>
  )
}

export default blogs