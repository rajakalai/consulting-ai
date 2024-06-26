export default function SearchBar() {
    return (
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Quote to search for"
          className="flex-1 p-3 rounded-l-full bg-gray-100 text-gray-800 focus:outline-none"
        />
        <button className="bg-[#9747FF] text-white px-6 py-3 rounded-r-full font-medium">
          Search
        </button>
      </div>
    )
  }