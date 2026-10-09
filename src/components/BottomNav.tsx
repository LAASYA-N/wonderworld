import React from 'react';
import { ScreenType } from '../types';
import { playChime, triggerHaptic } from '../utils/audio';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: 'worlds' as ScreenType,
      label: 'Worlds',
      icon: 'public',
    },
    {
      id: 'engine' as ScreenType,
      label: 'Engine',
      icon: 'science',
    },
    {
      id: 'missions' as ScreenType,
      label: 'Missions',
      icon: 'explore',
    },
    {
      id: 'journal' as ScreenType,
      label: 'Journal',
      icon: 'auto_stories',
    },
    {
      id: 'parents' as ScreenType,
      label: 'Parents',
      icon: 'family_restroom',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#fbf9f3]/95 backdrop-blur-xl border-t border-[#00668a]/5 shadow-[0_-4px_24px_rgba(0,102,138,0.08)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-20 px-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic([15]);
                playChime(isActive ? 640 : 520);
                onNavigate(tab.id);
              }}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'bg-[#38bdf8] text-[#004965] shadow-[0_4px_0_#0284c7]'
                  : 'text-[#3e484f] hover:text-[#1b1c19] hover:bg-[#eae8e2]/50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className="material-symbols-outlined text-[28px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {tab.icon}
              </span>
              <span className="font-rubik font-semibold text-[12px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
