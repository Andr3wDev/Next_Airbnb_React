import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import data from '../data/search.json';

function Search({ searchResults }) {

  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
      <div>
        <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />
        <main className='flex'>
            <section className='flex-grow pt-14 px-6 basis-1/2'>
                <p className='text-xs'>
                  300+ Stays - {range} - for {noOfGuests} Guests
                </p>
                <h1 className='text-xl font-semibold mt-2 mb-6'>
                  Stays in {location}
                </h1>
            
                <div className='hidden lg:inline-flex mb-5 space-x-3
                    text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexibility</p>
                    <p className='button'>Type of Place</p>
                    <p className='button'>Price</p>
                    <p className='button'>Rooms and Beds</p>
                    <p className='button'>More filters</p>
                </div>

                <div className='flex flex-col'>
                  {                 
                    /* Search Results */
                    searchResults?.map((item) => (
                      <InfoCard 
                        key={item.img}
                        img={item.img}
                        location={item.location}
                        title={item.title}
                        description={item.description}
                        star={item.star}
                        price={item.price}
                        total={item.total}/>
                    ))
                  }
                </div>
            </section>
            <section className='hidden xl:inline-flex
              xl-min-w-[600px] basis-1/2'>
              <Map searchResults={searchResults} />
            </section>
        </main>
        <Footer />
      </div>
  )
}

export default Search;

/* SSR function e.g context object */
export async function getServerSideProps() {
  const searchResults = data;
  return {
    props: {
      searchResults
    }
  }
}