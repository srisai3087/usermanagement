import React, { useState } from 'react';

const AddMemberModal = ({ hub, onClose, onMemberAdded }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    adharNum: '',
    panNum: '',
    drivingLicence: '',
    email: '',
    DOB: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:2004/api/v1/member/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...form, hubName: hub }),
      });

      if (!res.ok) throw new Error('Failed to add member');
      await res.json();
      onMemberAdded();
      onClose();
    } catch (err) {
      console.error('Error adding member:', err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">
          Add Member to {hub.toUpperCase()}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="adharNum"
            placeholder="Aadhar Number"
            value={form.adharNum}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="panNum"
            placeholder="PAN Number"
            value={form.panNum}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="text"
            name="drivingLicence"
            placeholder="Driving Licence"
            value={form.drivingLicence}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            type="date"
            name="DOB"
            value={form.DOB}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Member
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-600 font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMemberModal;
