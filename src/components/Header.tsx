import React from 'react';
import { ASSETS } from '../data/wonderData';
import { ScreenType } from '../types';
import { playChime, triggerHaptic } from '../utils/audio';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  starsCount: number;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  starsCount,
  onOpenHelp,
  onOpenProfile,
  subtitle,
}) => {
  const getSubtext = () => {
    if (subtitle) return subtitle;
    switch (currentScreen) {
      case 'worlds':
        return 'Worlds';
      case 'engine':
        return 'Wonder Engine';
      case 'missions':
        return 'Missions';
      case 'journal':
        return 'Journal';
      case 'parents':
        return 'Parents';
      case 'quest-detail':
        return 'Quest Detail';
      default:
        return 'Worlds';
    }
  };

  const isQuestDetail = currentScreen === 'quest-detail';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-[#fbf9f3]/90 backdrop-blur-xl border-b border-[#00668a]/5 shadow-[0_4px_20px_rgba(0,102,138,0.06)]">
      <div className="h-20 max-w-2xl mx-auto px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isQuestDetail && (
            <button
              aria-label="Go Back"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#eae8e2] text-[#1b1c19] active:scale-95 transition-transform"
              onClick={() => {
                triggerHaptic([20]);
                playChime(420);
                onNavigate('worlds');
              }}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
          )}

          <button
            onClick={() => {
              triggerHaptic([20]);
              playChime(600);
              onNavigate('welcome');
            }}
            className="flex items-center gap-2 text-left active:opacity-85 transition-opacity"
            title="Return to Welcome Screen"
          >
            <img
              alt="WonderWorld Emblem Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={ASSETS.logo}
              onError={(e) => {
                // styled SVG fallback
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-rubik font-bold text-[16px] text-[#00668a] leading-tight tracking-wide">
                WonderWorld
              </span>
              <span className="font-comfortaa text-[12px] font-semibold text-[#3e484f] truncate max-w-[130px]">
                {getSubtext()}
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Star Crystals Indicator */}
          <button
            onClick={() => {
              triggerHaptic([20]);
              playChime(680);
              onNavigate('journal');
            }}
            className="flex items-center gap-1.5 bg-[#ffffff] px-3 py-1.5 rounded-full shadow-[0_3px_0_#eae8e2] active:translate-y-0.5 transition-transform"
            title="View collected Star Crystals"
          >
            <span
              className="material-symbols-outlined text-[#795900] text-[20px] select-none fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              hotel_class
            </span>
            <span className="font-rubik font-bold text-[15px] text-[#1b1c19]">{starsCount}</span>
          </button>

          {/* Help Button */}
          <button
            aria-label="Ask a Wonder Question"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#38bdf8] text-[#004965] shadow-[0_4px_0_#0284c7] active:translate-y-0.5 active:shadow-[0_2px_0_#0284c7] transition-all"
            onClick={() => {
              triggerHaptic([20]);
              playChime(540);
              onOpenHelp();
            }}
          >
            <span className="material-symbols-outlined text-[24px]">help</span>
          </button>

          {/* Pip Avatar Profile */}
          <button
            aria-label="Pip Avatar Profile"
            className="relative p-0.5 rounded-full bg-[#ffffff] shadow-[0_3px_0_#eae8e2] active:scale-95 transition-transform"
            onClick={() => {
              triggerHaptic([20]);
              playChime(640);
              onOpenProfile();
            }}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.pipAvatar}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#30c88f] border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
