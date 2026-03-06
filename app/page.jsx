import Image from "next/image";
import Blogs from "./components/blogs";
import Stories from "./components/stories";
import getBlogs from "./components/blogslist";

export default async function Home() {
  const articles  = await getBlogs();

    // const { query } = await searchParams ;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const a = (articles.filter((e) => e.category === 'Entertainment')).slice(0,2)
  const b = (articles.filter((e) => e.category === 'Technology')).slice(0,2)
  const c = (articles.filter((e) => e.category === 'Sports')).slice(0,2)

  const stories = shuffle([...a, ...b, ...c])


  const hero_a = (articles.filter((e) => e.category === 'Entertainment')).slice(0,3)
  const hero_b = (articles.filter((e) => e.category === 'Technology')).slice(0,3)
  const hero_c = (articles.filter((e) => e.category === 'Sports')).slice(0,3 )

  const hero_stories = shuffle([...hero_a, ...hero_b, ...hero_c])

  return (
    <div className="">

      <section className="hero relative lg:bg-center">
        <div className="z-10 text-center text-gray-900 max-w-[340px] md:max-w-[540px] lg:max-w-lg pt-20 lg:pt-32 lg:text-start container absolute left-1/2 transform -translate-x-1/2 lg:translate-x-0">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold">Hey there!!!, Welcome to Med News</h3>
          <p className="text-3xl md:text-4xl lg:text-5xl">Explore our Curated collection
          of news on Tech, Entertainment and Sports.</p>
        </div>
      </section>

      <main className="container mx-auto my-4">
         <p className="text-[18px] md:text-2xl lg:text-3xl mb-4">Get started with our <strong>Latest stories</strong></p>
              {!articles || articles.length === 0 && <p className='text-center'>Please Refresh, No News Available.</p>}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {articles && hero_stories.map((e, i) => (<Blogs key={i} val={e} />))}
            </div>
        </main>

        <section className="container mx-auto mb-4 border-b-8 border-b-blue-50 px-1">
          <p className="text-[18px] md:text-2xl lg:text-3xl mb-4">Check out Some <strong>Highlighted stories</strong></p>
          <div className="flex gap-2.5 pb-5 mb-3 overflow-x-scroll scroll">
            {articles && stories.map((e, i) => (<Stories key={i} val={e} />))}
          </div>
        </section>

    </div>
  );
}
