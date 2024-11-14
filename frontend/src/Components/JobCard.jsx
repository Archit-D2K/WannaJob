// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

const JobCard = ({ companyName, location, role, description, positions, jobType, salary }) => {
  return (
    <div className="max-w-sm  bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{companyName}</h2>
        <p className="text-gray-600 mt-1">{location}</p>
        <h3 className="text-xl font-semibold text-gray-700 mt-4">{role}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-6">
          <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 text-sm">
            {positions} Positions
          </div>
          <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 text-sm">
            {jobType}
          </div>
          <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-gray-700 text-sm">
            {salary}
          </div>
        </div>
      </div>
    </div>
  );
};
JobCard.propTypes = {
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  positions: PropTypes.number.isRequired,
  jobType: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
};

export default JobCard;
