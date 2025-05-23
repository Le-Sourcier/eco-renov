import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    path: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const location = useLocation();

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            to="/" 
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Accueil
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            <ChevronRight size={16} className="text-gray-400 mx-2" />
            {index === items.length - 1 ? (
              <span className="text-primary font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.path}
                className="text-gray-500 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;