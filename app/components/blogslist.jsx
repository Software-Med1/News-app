import { cache } from 'react'

const apiKey = process.env.DATABASE_KEY;

const addCategory = (data, cat) => {
  const blogs = [];
  data.forEach((e) => {
    if (e && e.content && e.urlToImage) {
      const words = e.content.split(' ');
      words.pop();
      words.pop();
      e.content = words.join(' ');
      e.category = cat;
      blogs.push(e);
    }
  });
  return blogs;
}

// Cached fetcher — memoized per server process by React's cache.
// Also uses Next.js fetch caching via the `next: { revalidate }` option.


const fetchAll = cache(async function fetchAll() {
  try {
    const [TechRes, EntRes, SportRes] = await Promise.all([
      fetch(`https://newsapi.org/v2/top-headlines?category=Technology&apiKey=${apiKey}`, { next: { revalidate: 3600 } }),
      fetch(`https://newsapi.org/v2/top-headlines?category=Entertainment&apiKey=${apiKey}`, { next: { revalidate: 3600 } }),
      fetch(`https://newsapi.org/v2/top-headlines?category=sports&apiKey=${apiKey}`, { next: { revalidate: 3600 } })
    ]);

    if (!TechRes.ok || !EntRes.ok || !SportRes.ok) {
      const errorData = await Promise.all([
        TechRes.json().catch(() => ({})),
        EntRes.json().catch(() => ({})),
        SportRes.json().catch(() => ({}))
      ]);
      throw new Error(`HTTP error! Details: ${JSON.stringify(errorData)}`);
    }

    const Technology = await TechRes.json();
    const Entertainment = await EntRes.json();
    const Sports = await SportRes.json();

    const data = [
      ...addCategory(Technology.articles || [], 'Technology'),
      ...addCategory(Entertainment.articles || [], 'Entertainment'),
      ...addCategory(Sports.articles || [], 'Sports')
    ];

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
});

export default async function getBlogs() {
  return fetchAll();
}


// If you need to bypass the cache (force refresh) during development,
// call this helper which calls the underlying endpoints directly.

// export async function fetchFresh() {

//   try{
//     const [TechRes, EntRes, SportRes] = await Promise.all([
//       fetch('https://newsapi.org/v2/top-headlines?category=Technology&apiKey=7951be79a6c041c19329b686edd325d0'),
//       fetch('https://newsapi.org/v2/top-headlines?category=Entertainment&apiKey=7951be79a6c041c19329b686edd325d0'),
//       fetch('https://newsapi.org/v2/top-headlines?category=sports&apiKey=7951be79a6c041c19329b686edd325d0')
//     ]);
//       if (!TechRes.ok || !EntRes.ok || !SportRes.ok) {
//       const errorData = await Promise.all([
//         TechRes.json().catch(() => ({})),
//         EntRes.json().catch(() => ({})),
//         SportRes.json().catch(() => ({}))
//       ]);
//       throw new Error(`HTTP error! Details: ${JSON.stringify(errorData)}`);
//     }

//     const Technology = await TechRes.json();
//     const Entertainment = await EntRes.json();
//     const Sports = await SportRes.json();

//     const data = [
//       ...addCategory(Technology.articles || [], 'Technology'),
//       ...addCategory(Entertainment.articles || [], 'Entertainment'),
//       ...addCategory(Sports.articles || [], 'Sports')
//     ];
//     return data;

//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// };

// export default async function getBlogs() {
//   return fetchFresh();
// }