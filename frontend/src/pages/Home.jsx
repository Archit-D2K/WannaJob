import Heading from '../Components/Heading'; 
import Latest from '../Components/Latest';
import JobSlider from '../Components/JobSlider';
import SearchBox from '../Components/SearchBox';
import JobCard from '../Components/JobCard';

const Home = () => {
  const jobsData = [
    {
      companyName: "Tech Corp",
      location: "New York, USA",
      role: "Software Engineer",
      description: "Work with cutting-edge technology in a dynamic environment.",
      positions: 3,
      jobType: "Full-Time",
      salary: "$80k - $100k",
    },
  ];

  return (
    <>
      <Heading />
      <SearchBox />
      <JobSlider />
      <Latest />
      <div className="flex flex-wrap justify-center space-x-4">
        {jobsData.map((job, index) => (
          <JobCard 
            key={index} 
            companyName={job.companyName}
            location={job.location}
            role={job.role}
            description={job.description}
            positions={job.positions}
            jobType={job.jobType}
            salary={job.salary}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
