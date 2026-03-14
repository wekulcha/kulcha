import React, { PropsWithChildren } from "react";

export const AdminAppShell: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-sm h-[720px] bg-slate-50 rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

