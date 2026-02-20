import { forwardRef } from 'react';
import HeadersSection from '@/components/advanced/HeadersSection';
import IdempotencySection from '@/components/advanced/IdempotencySection';
import AuthSection from '@/components/advanced/AuthSection';
import CacheSection from '@/components/advanced/CacheSection';
import PutPatchSection from '@/components/advanced/PutPatchSection';
import ProtocolsSection from '@/components/advanced/ProtocolsSection';

export const AdvancedSectionsContainer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}>
      <HeadersSection />
      <IdempotencySection />
      <AuthSection />
      <CacheSection />
      <PutPatchSection />
      <ProtocolsSection />
    </div>
  );
});

AdvancedSectionsContainer.displayName = 'AdvancedSectionsContainer';

