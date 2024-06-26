'use client'
import { useState } from 'react';
import PreviousSearches from './components/PreviousSearches';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';

export default function Home() {
  const [searches, setSearches] = useState([
    { term: '"Contracts & vendors"', results: 2, date: 'Fri, 21 Jul, 05:10 pm' },
    { term: '"procurement"', results: 10, date: 'Mon, 1 May, 00:37 pm' },
    { term: '"integration"', results: 10, date: 'Mon, 1 May, 00:35 pm' },
    { term: '"evaluation criteria"', results: 10, date: 'Mon, 24 Apr, 03:44 pm' },
    { term: '"satisfaction"', results: 10, date: 'Mon, 24 Apr, 03:43 pm' },
  ]);

  const removeSearch = (index: number) => {
    setSearches(searches.filter((_, i) => i !== index));
  };

  return (
    <main className="flex-1 bg-white p-6">
      <SearchBar />
      <div className="mt-6 flex gap-6">
        <div className="w-3/12">
          <PreviousSearches searches={searches} removeSearch={removeSearch} />
        </div>
        <div className="w-6/12">
          {/* Space for future content */}
        </div>
        <div className="w-3/12">
          <FilterSection />
        </div>
      </div>
    </main>
  );
}