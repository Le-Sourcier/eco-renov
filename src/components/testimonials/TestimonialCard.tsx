import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
  savingsAmount: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  text,
  rating,
  savingsAmount,
  image
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={image} 
            alt={name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <h4 className="font-bold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>
        
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < rating ? 'fill-[#FFC107] text-[#FFC107]' : 'text-gray-300'} 
            />
          ))}
        </div>
        
        <p className="text-gray-700 mb-4">{text}</p>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-green-700">Economies réalisées: </span>
            <span className="font-semibold">{savingsAmount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;