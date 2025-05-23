import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
  activeSection: string;
}

const SectionNav: React.FC<Props> = ({ sections, activeSection }) => {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              to={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              className={`flex items-center group transition-all duration-300 ${
                activeSection === section.id ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-primary scale-150' 
                  : 'bg-gray-300 group-hover:bg-gray-400'
              }`} />
              <span className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm ${
                activeSection === section.id ? 'text-primary' : 'text-gray-600'
              }`}>
                {section.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionNav;