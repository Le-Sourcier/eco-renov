import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  sectionIds: string[];
  onChange: (activeSection: string) => void;
}

const NavigationObserver: React.FC<Props> = ({ sectionIds, onChange }) => {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onChange(entry.target.id);
            // Met à jour l'URL sans recharger la page
            const newUrl = `${location.pathname}#${entry.target.id}`;
            window.history.replaceState(null, '', newUrl);
          }
        });
      },
      {
        rootMargin: '-80px 0px 0px 0px', // Ajuste selon la hauteur du header
        threshold: 0.5
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, onChange, location]);

  return null;
};

export default NavigationObserver;