import React from 'react';

const MemberDetailsModal = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Member Details</h2>
        <p>
          <strong>Name:</strong> {member.name}
        </p>
        <p>
          <strong>Email:</strong> {member.email}
        </p>
        <p>
          <strong>Phone:</strong> {member.phone}
        </p>
        <p>
          <strong>Aadhar:</strong> {member.adharNum}
        </p>
        <p>
          <strong>Driving License:</strong> {member.drivingLicence}
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MemberDetailsModal;
