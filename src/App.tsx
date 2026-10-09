/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, Mystery } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { WorldsTab } from './components/WorldsTab';
import { EngineTab } from './components/EngineTab';
import { QuestDetailScreen } from './components/QuestDetailScreen';
import { MissionsTab } from './components/MissionsTab';
import { JournalTab } from './components/JournalTab';
import { ParentsTab } from './components/ParentsTab';
import { HelpModal, ProfileModal, MysteryDetailModal, DiyGuideModal } from './components/Modals';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('worlds');
  const [starsCount, setStarsCount] = useState<number>(148);

  // Modals state
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedMystery, setSelectedMystery] = useState<Mystery | null>(null);
  const [isDiyOpen, setIsDiyOpen] = useState(false);

  const handleAddStars = (amount: number) => {
    setStarsCount((prev) => prev + amount);
  };

  const handleSelectQuest = (_questId: string) => {
    setCurrentScreen('quest-detail');
  };

  // If on welcome screen, show full-screen welcome interface
  if (currentScreen === 'welcome') {
    return (
      <main className="w-full min-h-screen bg-[#fbf9f3] text-[#1b1c19]">
        <WelcomeScreen
          onStartExploring={() => setCurrentScreen('worlds')}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      </main>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#fbf9f3] text-[#1b1c19] flex flex-col font-comfortaa">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        starsCount={starsCount}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-24 pb-28">
        {currentScreen === 'worlds' && (
          <WorldsTab
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectQuest={handleSelectQuest}
          />
        )}

        {currentScreen === 'engine' && (
          <EngineTab
            onAddStars={handleAddStars}
            onOpenMysteryDetail={(m) => setSelectedMystery(m)}
            onOpenDiyGuide={() => setIsDiyOpen(true)}
          />
        )}

        {currentScreen === 'quest-detail' && (
          <QuestDetailScreen
            onBack={() => setCurrentScreen('worlds')}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onAddStars={handleAddStars}
          />
        )}

        {currentScreen === 'missions' && (
          <MissionsTab
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectQuest={handleSelectQuest}
          />
        )}

        {currentScreen === 'journal' && <JournalTab starsCount={starsCount} />}

        {currentScreen === 'parents' && <ParentsTab />}
      </main>

      {/* Bottom Nav: shown on main screens */}
      {currentScreen !== 'quest-detail' && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Modals */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        starsCount={starsCount}
      />
      <MysteryDetailModal
        mystery={selectedMystery}
        onClose={() => setSelectedMystery(null)}
      />
      <DiyGuideModal isOpen={isDiyOpen} onClose={() => setIsDiyOpen(false)} />
    </div>
  );
}
