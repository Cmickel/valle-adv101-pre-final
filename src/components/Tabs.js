export default function Tabs({ currentFilter, setFilter }) {
  const tabs = [
    { name: 'All', filter: 'all' },
    { name: 'To Do', filter: 'todo' },
    { name: 'Completed', filter: 'completed' },
  ];

  return (
    <div className="flex justify-center border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.filter}
          onClick={() => setFilter(tab.filter)}
          className={`py-2 px-4 text-sm font-medium transition duration-150 ease-in-out ${
            currentFilter === tab.filter
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
