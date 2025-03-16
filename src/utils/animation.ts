
import { useEffect, useState } from 'react';

export function useScrollAnimation() {
  const [elements, setElements] = useState<Element[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
    
    setElements(Array.from(animatedElements));
    
    return () => {
      if (elements.length > 0) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [elements]);
}

export function useDelayedAppear(delay: number = 0) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isVisible;
}
