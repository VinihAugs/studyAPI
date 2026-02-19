/**
 * Container para a seção de Exemplos Backend
 */
import { forwardRef } from 'react';
import BackendExamples from '@/components/BackendExamples';

export const BackendExamplesContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return <BackendExamples ref={ref} />;
});

BackendExamplesContainer.displayName = 'BackendExamplesContainer';

