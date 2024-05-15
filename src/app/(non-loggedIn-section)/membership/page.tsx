import React from 'react';
import Image from 'next/image';
import userSVG from './../../../../public/icons/user-round-svgrepo-com.svg';

const MembershipPage = () => {
  const membershipArr = [
    {
      title: 'Reward writers',
      content:
        'Your membership directly supports the writers, editors, curators, and teams who make Medium a vibrant, inclusive home for human stories. A portion of your membership is allocated to the writers of the stories you read and interact with.',
    },
    {
      title: 'Unlock every story',
      content:
        'Get access to millions of original stories that spark bright ideas, answer big questions, and fuel bold ambitions.',
    },
    {
      title: 'Enhance your reading experience',
      content:
        'Immerse yourself in audio stories, read offline wherever you go, and connect with the Medium community on Mastodon.',
    },
    {
      title: 'Elevate your writing',
      content:
        'Create and contribute to publications to collaborate with other writers, create a custom domain for your profile, and level up your writing with our simple but powerful publishing tools.',
    },
    {
      title: 'Support a mission that matters',
      content:
        'Members are creating a world where original, human-crafted stories thrive. As a member-supported platform, quality comes first, not ads or clickbait.',
    },
  ];

  const membersSayArr = [
    {
      content:
        'The easy path in social media is promoting the worst content, the cheapest, tackiest, lowest-effort stuff. That’s not what you get on Medium. You can actually find content you can build your brain with. I appreciate that, both as a reader and a writer.',
      authors:
        'Cassie Kozyrkov, Chief Decision Scientist at Google and Medium member',
    },
    {
      content:
        'Medium has proved a game-changer for me, and quickly became the subscription I value the most, and I have quite a few. The cost is nothing compared to the value Medium generates for me month after month.',
      authors:
        'Enrique Dans, Professor of Innovation at IE Business School and Medium member',
    },
    {
      content:
        'For us tech folks, Medium membership unlocks a whole treasure trove of high-quality articles. One good technology book could sell for over the Medium membership fee amount. It’s your choice whether to buy one book, or buy hundreds and thousands of books by unlocking member-only reading on Medium. Investing in a Medium membership is one of the best investments I have ever made for my career.',
      authors:
        'Wenqi Glantz, Software Architect at ArisGlobal and Medium member',
    },
  ];

  return (
    <div className='py-12'>
      {/*  */}
      <div className='flex flex-row border-b border-black'>
        <div className='flex-grow'>
          <div className='w-1/3 sticky top-32 float-left'>
            <h1 className='text-6xl mx-10'>Why membership?</h1>
          </div>
          <div className='w-2/3 mx-8 float-right'>
            {membershipArr.map((singleMembership, index) => {
              const marginTop = index === 0 ? 'mt-0' : 'my-16';
              return (
                <div className={`${marginTop} w-9/12 mx-auto`} key={index}>
                  <h3 className='text-4xl'>{singleMembership.title}</h3>
                  <p className='mt-4'>{singleMembership.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='flex flex-row border-b border-black'>
        <div className='flex-grow'>
          <div className='w-1/3 sticky top-32 float-left'>
            <h1 className='text-6xl mx-10 my-16'>What members are saying</h1>
          </div>
          <div className='w-2/3 mx-auto float-right'>
            {membersSayArr.map((singleSay, index) => {
              return (
                <div className='my-16 ml-20' key={index}>
                  <p className='w-2/3 mt-4'>
                    <div className='flex flex-row flex-wrap'>
                      <div className='w-1/6 flex align-middle justify-center px-4'>
                        <Image src={userSVG} alt={'User'} />
                      </div>
                      <div className='w-5/6'>
                        <p>{singleSay.content}</p>
                        <p className='mt-5 font-light text-sm'>
                          {singleSay.authors}
                        </p>
                      </div>
                    </div>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default MembershipPage;
