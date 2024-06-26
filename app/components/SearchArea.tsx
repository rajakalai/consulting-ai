import PreviousSearches from './PreviousSearches'
import SearchBar from './SearchBar'

export default function SearchArea() {
  return (
    <div className="flex-1 pr-6">
      <div className="flex">
        <PreviousSearches />
        <div className="flex-1">
          <SearchBar />
        </div>
      </div>
    </div>
  )
}