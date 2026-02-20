import { forwardRef, ReactNode } from 'react';
import { SectionConfig } from '@/core/types';

interface SectionProps extends SectionConfig {
  children: ReactNode;
  className?: string;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, dataSection, children, className = '' }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-section={dataSection}
        className={className}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

