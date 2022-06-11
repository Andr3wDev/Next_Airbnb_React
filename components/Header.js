import React, { useState } from 'react';
import Image from 'next/image';
import logoImage from '../public/logo.jpg';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRouter } from 'next/router';
import { DateRangePicker } from 'react-date-range';
import { 
  SearchIcon,
  GlobeAltIcon,
  UsersIcon,
  UserCircleIcon,
  MenuIcon
 } from '@heroicons/react/solid';

function Header({placeholder}) {

  const [searchInput, setSearchInput] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();

  const resetInput = () => {
    setSearchInput("");    
  };

  const search = () => {
    resetInput();
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests
      }
    });    
  };  

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    };

  return (
    <header className='sticky top-0 z-50 grid 
      grid-cols-3 bg-white shadow-md p-5 md:px-10'>      
        <div onClick={() => router.push('/')} className='relative flex my-auto items-center h-7 md:h-8 lg:h-10 cursor-pointer'>
            <Image alt="logo" objectFit='contain' objectPosition='left'
              src={logoImage} layout='fill' />
        </div>
        <div className='flex items-center border-2 rounded-full py-2 pl-5'>          
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder || "Start your search"}
            className='flex-grow outline-none flex' />          
          <SearchIcon className='h-8 w-8 bg-red-400 hidden md:inline-flex
           text-white rounded-full p-2 cursor-pointer mx-2' />
        </div>
        <div className='flex items-center space-x-4 justify-end'>
          <p className='hidden md:inline-flex cursor-pointer'>Become a host</p>
          <GlobeAltIcon className='h-6 cursor-pointer'/>
          <div className='flex items-center space-x-2 border-2
            p-2 rounded-full'>
            <UserCircleIcon className='h-6' />
            <MenuIcon className='h-6'/>
          </div>
        </div>
        {/* Calendar */}
        { searchInput && 
          <div className='flex flex-col col-span-3 mx-auto mt-5'>            
            <DateRangePicker
              minDate={new Date()}
              ranges={[selectionRange]}
              onChange={handleSelect}
              rangeColors={["#FD5B61"]}/>            
            <div className='flex items-center border-b mb-4'>
              <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
              <UsersIcon className='h-5' />
              <input value={noOfGuests} type='number' min={1}
                className='w-12 pl-2 text-lg outline-none text-red-400'
                onChange={(e) => setNoOfGuests(e.target.value)}
              />
            </div>
            <div className='flex'>
              <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
              <button onClick={search} className='flex-grow text-red-400'>Search</button>
            </div>
          </div>
        }

    </header>
  )
}

export default Header