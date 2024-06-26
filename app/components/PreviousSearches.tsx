import { XCircle } from 'react-feather';

interface Search {
  term: string;
  results: number;
  date: string;
}

interface PreviousSearchesProps {
  searches: Search[];
  removeSearch: (index: number) => void;
}

export default function PreviousSearches({ searches, removeSearch }: PreviousSearchesProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Previous searches</h2>
      {searches.map((search, index) => (
        <div key={index} className="mb-3 relative">
          <div className="flex justify-between items-start">
            <p className="font-medium text-gray-800">{search.term}</p>
            <button 
              onClick={() => removeSearch(index)} 
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle size={18} />
            </button>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>{search.results} results</p>
            <p className="text-xs text-gray-400">{search.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}