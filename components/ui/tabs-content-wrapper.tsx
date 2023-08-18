import React, { ReactNode } from 'react';

type Props = {
  visible: boolean;
  mount: boolean;
  children: ReactNode;
  value: string;
};
function TabsContentWrapper({ visible, mount, children }: Props) {
  if (!mount) return null;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        display: visible ? 'block' : 'none',
      }}
    >
      {children}
    </div>
  );
}

export default TabsContentWrapper;
