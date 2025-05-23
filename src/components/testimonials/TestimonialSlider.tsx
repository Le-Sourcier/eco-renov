import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Marie Dupont',
    location: 'Lyon, 69',
    text: 'Grâce aux aides CEE, j\'ai pu installer une pompe à chaleur sans effort financier. Mon conseiller a tout géré, des démarches administratives au suivi du chantier.',
    rating: 5,
    savingsAmount: 'Plus de 4500€ d\'aides',
    image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Thomas Martin',
    location: 'Bordeaux, 33',
    text: 'Je ne pensais pas pouvoir financer l\'isolation de ma maison. Grâce au programme CEE, j\'ai bénéficié d\'un reste à charge minimal et mes factures de chauffage ont diminué de 30%.',
    rating: 4,
    savingsAmount: '3800€ d\'aides + 380€/an sur les factures',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Sophie Legrand',
    location: 'Lille, 59',
    text: 'L\'accompagnement a été parfait du début à la fin. Je recommande vivement ce service à tous ceux qui veulent faire des économies d\'énergie sans se ruiner.',
    rating: 5,
    savingsAmount: '6200€ d\'aides pour une rénovation globale',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'Jean Petit',
    location: 'Nantes, 44',
    text: 'Processus simple et efficace. En moins de 3 semaines, j\'avais l\'accord pour les aides et les travaux ont pu commencer. Merci pour votre réactivité.',
    rating: 5,
    savingsAmount: '2900€ d\'aides pour mes fenêtres',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const TestimonialSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  
  // Update how many slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate max slide index
  const maxSlide = Math.max(0, testimonials.length - slidesToShow);
  
  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
        >
          {testimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className="flex-none px-3"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`absolute top-1/2 -left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center focus:outline-none z-10
          ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        aria-label="Témoignage précédent"
      >
        <ChevronLeft size={20} className="text-primary" />
      </button>
      
      <button 
        onClick={nextSlide}
        disabled={currentSlide === maxSlide}
        className={`absolute top-1/2 -right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center focus:outline-none z-10
          ${currentSlide === maxSlide ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        aria-label="Témoignage suivant"
      >
        <ChevronRight size={20} className="text-primary" />
      </button>
    </div>
  );
};

export default TestimonialSlider;