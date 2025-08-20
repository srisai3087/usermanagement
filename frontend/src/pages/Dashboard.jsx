import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import MemberCard from '../components/MemberCard';
import MemberDetailsModal from '../components/MemberDetailsModal';
import AddMemberModal from '../components/AddMemberModal';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [selectedHub, setSelectedHub] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const hubs = ['hub1', 'hub2', 'hub3', 'hub4'];

  const fetchHubMembers = async (hub) => {
    setSelectedHub(hub);
    try {
      const res = await fetch(`http://localhost:2004/api/v1/member/${hub}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setMembers(data.hubMembers || []);
    } catch (error) {
      console.error('Error fetching hub members:', error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar hubs={hubs} onSelectHub={fetchHubMembers} />

      {/* Main Dashboard */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {selectedHub ? `Members of ${selectedHub}` : 'Select a Hub'}
          </h1>
          {selectedHub && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Member
            </button>
          )}
        </div>

        {/* Members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <MemberCard
              key={member._id}
              member={member}
              onSelect={setSelectedMember}
            />
          ))}
        </div>
      </div>

      {/* Member Details Modal */}
      <MemberDetailsModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <AddMemberModal
          hub={selectedHub}
          onClose={() => setIsAddModalOpen(false)}
          onMemberAdded={() => fetchHubMembers(selectedHub)}
        />
      )}
    </div>
  );
};

export default Dashboard;
