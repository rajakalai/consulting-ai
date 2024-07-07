'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Call } from '../types/calls';
import { FiChevronUp, FiChevronDown, FiFilter, FiX } from 'react-icons/fi';
import Select from 'react-select';

type SortKey = keyof Call;
type SortOrder = 'asc' | 'desc';
type FilterOptions = Partial<Record<SortKey, string[]>>;

const CallsPage = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('call_id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({});
  const filterModalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/calls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        setCalls(data.calls || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching calls:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterModalRef.current && !filterModalRef.current.contains(event.target as Node)) {
        setIsFilterModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRowClick = (call_id: string) => {
    router.push(`/calls/${call_id}`);
  };

  const handleSort = (key: SortKey) => {
    setSortOrder(currentOrder => 
      sortKey === key && currentOrder === 'asc' ? 'desc' : 'asc'
    );
    setSortKey(key);
  };

  const handleFilterChange = (key: SortKey, values: string[]) => {
    setFilterOptions(prev => ({ ...prev, [key]: values }));
  };

  const applyFilters = () => {
    setAppliedFilters(filterOptions);
    setIsFilterModalOpen(false);
  };

  const removeFilter = (key: SortKey, valueToRemove: string) => {
    const newAppliedFilters = { ...appliedFilters };
    newAppliedFilters[key] = (newAppliedFilters[key] || []).filter(value => value !== valueToRemove);
    
    if (newAppliedFilters[key]?.length === 0) {
      delete newAppliedFilters[key];
    }
    
    setAppliedFilters(newAppliedFilters);
    setFilterOptions(newAppliedFilters);
  };

  const sortedCalls = [...calls].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCalls = sortedCalls.filter(call => 
    Object.entries(appliedFilters).every(([key, values]) => 
      values.length === 0 || values.some(value => 
        call[key as SortKey].toString().toLowerCase().includes(value.toLowerCase())
      )
    )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-bounce text-6xl mb-4">📞</div>
          <div className="inline-block animate-pulse text-6xl mb-4 ml-4">💬</div>
          <p className="mt-4 text-xl font-semibold text-purple-600">Fetching awesome calls...</p>
          <p className="mt-2 text-gray-600">Don't hang up, we're almost there! 😉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-[calc(100vh-140px)] text-black relative">
      <div className="p-4 w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Call Details</h1>
        <div className="flex justify-end mb-4 relative">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
          >
            <FiFilter className="mr-2" />
            Filter
          </button>
          {isFilterModalOpen && (
            <div ref={filterModalRef} className="absolute right-0 mt-12 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Filter Options</h3>
                {Object.keys(calls[0] || {}).map((key) => (
                  <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
                    <Select
                      isMulti
                      options={Array.from(new Set(calls.map(call => call[key as SortKey]))).map(value => ({
                        value: value.toString(),
                        label: value.toString()
                      }))}
                      value={(filterOptions[key as SortKey] || []).map(value => ({ value, label: value }))}
                      onChange={(selectedOptions) => handleFilterChange(
                        key as SortKey, 
                        selectedOptions ? selectedOptions.map(option => option.value) : []
                      )}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                ))}
                <button
                  className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap mb-4">
          {Object.entries(appliedFilters).map(([key, values]) => (
            values.map((value) => (
              <div key={`${key}-${value}`} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                <span>{key}: {value}</span>
                <button onClick={() => removeFilter(key as SortKey, value)} className="ml-2">
                  <FiX />
                </button>
              </div>
            ))
          ))}
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 py-5">
              <tr>
                {Object.keys(calls[0] || {}).map((key) => (
                  <th 
                    key={key}
                    className="px-6 py-5 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(key as SortKey)}
                  >
                    {key.replace('_', ' ')}
                    {sortKey === key && (
                      sortOrder === 'asc' ? <FiChevronUp className="inline ml-1" /> : <FiChevronDown className="inline ml-1" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map(call => (
                <tr 
                  key={call.call_id} 
                  onClick={() => handleRowClick(call.call_id)} 
                  className="cursor-pointer odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-purple-100 transition-colors duration-200"
                >
                  {Object.values(call).map((value, index) => (
                    <td key={index} className="px-5 py-5 border-b border-gray-200 text-sm">
                      {value instanceof Date ? value.toLocaleString() : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CallsPage;