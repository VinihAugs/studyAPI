import { forwardRef } from 'react';
import FrontendExamples from '@/components/FrontendExamples';

export const FrontendExamplesContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return <FrontendExamples ref={ref} />;
});

FrontendExamplesContainer.displayName = 'FrontendExamplesContainer';

