import React from 'react';

const PartnerProgramPage = () => {
  const qualityContentClickBaitArr = [
    {
      title: 'Member read time',
      content:
        'Members-only stories will earn money when a member reads your story for 30 seconds or more, and will continue to earn more the longer they keep reading. Long, thoughtful, reads are encouraged!',
    },
    {
      title: 'Positive interactions',
      content:
        'You’ll also earn more when members clap, highlight, reply, or engage with your story in other ways.',
    },
    {
      title: 'Follower bonus',
      content:
        'When members follow you and continue to read and interact with your stories, you will be given a follower bonus. We encourage writers to share their stories with readers in a way that promotes community and audience building.',
    },
    {
      title: 'Boost bonus',
      content:
        'Stories that are Boosted will also earn more for each read and interaction. We recommend that writers spend more time on fewer, high-quality stories to reach this bar.',
    },
  ];

  const qualityCriteria = [
    {
      title: 'You’re a member.',
      content:
        'The best way to succeed as a Partner Program author is to also participate as a reader of stories on Medium.',
    },
    {
      title: 'You’ve published a story in the last 6 months.',
      content:
        'Staying active, publishing regularly, and being engaged with the community are important ways to help our platform flourish.',
    },
    {
      title: 'You’re located in an eligible country.',
      content:
        'We recently expanded the number of supported countries, so now more people than ever are able to join the Partner Program.',
    },
  ];

  return (
    <div className='h-ful mt-10'>
      <div className='p-5 bg-emerald-500'>
        <h1 className='text-9xl pt-20 font-semibold text-white'>
          Medium Partner Program
        </h1>
        <p className='w-1/5 pt-12 pb-12 text-white'>
          Medium’s Partner Program is for people who are interested in helping
          us fulfill our mission of deepening the collective wisdom of the world
          through personal expression, knowledge-sharing, and storytelling.
        </p>
        <button className='py-3 px-4 mb-8 bg-black rounded-3xl text-white dark:text-black dark:bg-white'>
          Apply Now
        </button>
      </div>
      <div className='flex flex-row mt-12 border-b border-1'>
        <div className='flex-1'>
          <div className='py-20 px-10'>
            <h1 className='text-7xl'>Quality over clickbait</h1>
            <p className='mt-10 text-lg pr-10'>
              In a creator economy ruled by clickbait and ad impressions,
              Medium’s Partner Program is taking a stand for quality. As a
              partner, when your best stories are read by Medium members, a
              portion of their membership dues will be shared with you. Here are
              a few factors we consider in order to determine quality.
            </p>
          </div>
        </div>
        <div className='flex-1'>
          <div className='px-32'>
            {qualityContentClickBaitArr.map((q, index) => {
              return (
                <div key={index} className='my-10'>
                  <p className='font-semibold'>{q.title}</p>
                  <p className='text-gray-500 text-sm'>{q.content}</p>
                  {index !== qualityContentClickBaitArr.length - 1 && (
                    <p className='mt-10 border-b border-gray-100'></p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='flex flex-row mt-12'>
        <div className='flex-1'>
          <div className='py-20 px-10'>
            <h1 className='text-7xl'>Eligibility criteria</h1>
          </div>
        </div>
        <div className='flex-1'>
          <div className='px-32'>
            {qualityCriteria.map((q, index) => {
              return (
                <div key={index} className='my-10'>
                  <p className='font-semibold'>{q.title}</p>
                  <p className='text-gray-500 text-sm'>{q.content}</p>
                  {index !== qualityCriteria.length - 1 && (
                    <p className='mt-10 border-b border-gray-100'></p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProgramPage;
