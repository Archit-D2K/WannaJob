// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const companyName = job?.company?.name || "Unknown Company";
    const jobTitle = job?.title || "No Title Provided";
    const jobDescription = job?.description || "No description available.";
    const jobPosition = job?.position || "Not specified";
    const jobType = job?.jobType || "Full-time";
    const salary = job?.salary || "0"; 
    return (
        <div onClick={() => navigate(`/description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{companyName}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{jobTitle}</h1>
                <p className='text-sm text-gray-600'>{jobDescription}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{jobPosition} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{salary} LPA</Badge>
            </div>
        </div>
    )
}
LatestJobCards.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        jobType: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
    }).isRequired
};

export default LatestJobCards;
