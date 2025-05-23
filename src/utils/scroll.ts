export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerOffset = 80; // Hauteur du header fixe
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToHash = () => {
  const hash = window.location.hash;
  if (hash) {
    const sectionId = hash.slice(1); // Enlève le # du hash
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  }
};