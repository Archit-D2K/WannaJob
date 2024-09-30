import React, { useState } from 'react';

const jobCategories = [
  'Frontend Developer',
  'Backend Developer',
  'Data Engineer',
  'dfnvsdhhn',
  'nvinsdvlsg th',
  'mfoc hgbgnhynj',
  'nfudivn hnr'
];

const JobSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(3);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? jobCategories.length - visibleCategories : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === jobCategories.length - visibleCategories ? 0 : prevIndex + 1
    );
  };

  const visibleJobCategories = jobCategories.slice(
    currentIndex,
    currentIndex + visibleCategories
  );

  return (
    <div className="flex items-center justify-center relative mt-5">
      <div className="flex space-x-4">
        <button
          className="p-2 rounded-full bg-gray-300 text-gray-600"
          onClick={handlePrev}
        >
          &lt;
        </button>
        {visibleJobCategories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md ${
              index === 0
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
        <button
          className="p-2 rounded-full bg-gray-300 text-gray-600"
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default JobSlider;