export default function FilterSection() {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Number of results</label>
          <input type="number" defaultValue={10} className="w-full p-2 border rounded bg-gray-100" />
        </div>
        <div className="mb-4">
          <h3 className="font-medium mb-2 text-gray-700">Interviewee type</h3>
          {['Competitor', 'Customer', 'Former Mgmt', 'Industry Expert'].map((type) => (
            <label key={type} className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-600">{type}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <h3 className="font-medium mb-2 text-gray-700">Roles</h3>
          {['IT Director', 'Education Technology Specialist', 'Digital Innovation Specialist', 'PowerSchool Administrator', 'Director of Innovation'].map((role) => (
            <label key={role} className="flex items-center mb-2">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm text-gray-600">{role}</span>
            </label>
          ))}
        </div>
        <button className="bg-[#9747FF] text-white px-4 py-2 rounded-full w-full font-medium">
          Save
        </button>
      </div>
    );
  }