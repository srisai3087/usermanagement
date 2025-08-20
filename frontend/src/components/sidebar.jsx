import React from 'react';

const Sidebar = ({ hubs, onSelectHub }) => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Hubs</h2>
      <ul>
        {hubs.map((hub, idx) => (
          <li
            key={idx}
            onClick={() => onSelectHub(hub)}
            className="cursor-pointer px-3 py-2 mb-2 rounded-lg hover:bg-gray-700"
          >
            {hub}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
