import Head from 'next/head'
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';
import largeCard from '../public/largecard.jpg';
import explore from '../data/explore.json';
import cards from '../data/cards.json';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className='index'>
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />      
      <main className='max-w-7xl mx-auto px-8 sm:px-16'>        
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4'>
          {
            /* Retrieve items from API */
            exploreData?.map(({img, distance, location}) => (
              <SmallCard key={img}
                img={img}
                location={location}
                distance={distance} />
            ))
          }
          </div>
        </section>
        <section className='pt-6'>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {
              /* Retrieve items from API */
              cardsData?.map(({img, title}) => (
                <MediumCard key={img} img={img} title={title} />
              ))
            }
          </div>
        </section>
        <LargeCard 
          img={largeCard}
          description='Wishlists curated by Airbnb.'
          title='The Greatest Outdoors'
          buttonText='Get Inspired'/>        
      </main>
      <Footer />
    </div>
  )
}

/* SSR */
export async function getStaticProps(){  
  const exploreData = explore;
  const cardsData = cards;
  return {
    props: {
      exploreData,
      cardsData
    }
  }
};