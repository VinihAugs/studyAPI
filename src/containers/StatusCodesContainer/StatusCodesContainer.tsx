import { forwardRef } from 'react';
import StatusCodesSection from '@/components/StatusCodesSection';

export const StatusCodesContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return <StatusCodesSection ref={ref} />;
});

StatusCodesContainer.displayName = 'StatusCodesContainer';

