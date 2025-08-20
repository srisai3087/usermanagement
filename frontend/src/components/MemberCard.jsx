import React from 'react';

const MemberCard = ({ member, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(member)}
      className="border rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-100"
    >
      <h3 className="text-lg font-bold">{member.name}</h3>
      <p className="text-sm text-gray-600">Phone: {member.phone}</p>
      <p className="text-sm text-gray-600">Email: {member.email}</p>
    </div>
  );
};

export default MemberCard;
