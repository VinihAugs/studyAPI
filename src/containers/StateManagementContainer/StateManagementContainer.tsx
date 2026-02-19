/**
 * Container para a seção de Gerenciamento de Estado
 */
import { forwardRef } from 'react';
import StateManagementSection from '@/components/StateManagementSection';

export const StateManagementContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return <StateManagementSection ref={ref} />;
});

StateManagementContainer.displayName = 'StateManagementContainer';

