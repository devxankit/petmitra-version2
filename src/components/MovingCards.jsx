import React from 'react';
import happy_dog from '../assets/images/happy_dog.jpg';
import three_dog from '../assets/images/three_dog.jpg';
import sad_dog from '../assets/images/sad_dog.jpg';
import food_suggestion from '../assets/images/food_suggestion.jpg';
import adopt_me from '../assets/images/adopt_me.jpg';
import rescue_dog from '../assets/images/rescue_dog.jpeg';

const MovingCards = () => {
  const cards = [
    { id: 1, image: rescue_dog, description: 'Find Doctors Nearby' },
    { id: 2, image: food_suggestion, description: 'Food Suggestions' },
    { id: 3, image: adopt_me, description: 'Pet Adoption' },
    { id: 4, image: happy_dog, description: 'Helpful Tips' },
    { id: 5, image: sad_dog, description: 'Animal Welfare' },
  ];

  return (
    <div className="relative overflow-hidden bg-gray-100 py-12">
      <div className="flex w-max animate-marquee">
        {[...cards, ...cards].map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className="mx-4 inline-flex w-64 flex-shrink-0 transform flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img src={card.image} alt={card.description} className="h-48 w-full object-cover" />
            <div className="bg-white p-4">
              <p className="text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MovingCards;
