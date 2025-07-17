'use client';

import { OverlayProvider } from 'overlay-kit';
import { ReactNode } from 'react';

const OverlayProviderWrapper = ({ children }: { children: ReactNode }) => {
    return <OverlayProvider>{children}</OverlayProvider>;
};

export default OverlayProviderWrapper;
