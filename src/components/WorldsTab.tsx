import React, { useState } from 'react';
import { ASSETS, REALMS } from '../data/wonderData';
import { ScreenType } from '../types';
import { playChime, speakPhrase, triggerHaptic } from '../utils/audio';

interface WorldsTabProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectQuest: (questId: string) => void;
}

export const WorldsTab: React.FC<WorldsTabProps> = ({ onNavigate, onSelectQuest }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [tipDismissed, setTipDismissed] = useState(false);

  const handlePlayAudio = (phrase: string) => {
    triggerHaptic([30]);
    playChime(620);
    speakPhrase(phrase);
  };

  const handleLockedClick = () => {
    triggerHaptic([40, 20, 40]);
    playChime(320);
    handlePlayAudio(
      'Little City is locked! Finish two more missions in Space Frontier or Invention Island to unlock its gates!'
    );
  };

  const filteredRealms = REALMS.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  return (
    <div className="flex flex-col w-full pb-8 select-none">
      {/* Today's Wonder Mission Banner (Squishy Bento Card) */}
      <section className="relative w-full rounded-3xl bg-white p-5 shadow-[0_6px_0_#eae8e2,0_16px_28px_rgba(0,102,138,0.08)] mb-5 overflow-hidden border border-white/60">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#ffdf9f]/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="relative w-14 h-14 rounded-full bg-[#ffc329] flex items-center justify-center shadow-[0_4px_0_#d97706] shrink-0 animate-bounce"
              style={{ animationDuration: '2.4s' }}
            >
              <span
                className="material-symbols-outlined text-[#6f5100] text-[30px] fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#795900] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#795900]"></span>
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdf9f] text-[#5c4300] font-rubik text-[12px] font-bold uppercase tracking-wide">
                  Daily Quest
                </span>
                <span className="font-rubik text-[13px] text-[#795900] flex items-center gap-0.5 font-bold">
                  <span
                    className="material-symbols-outlined text-[16px] fill-icon"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    diamond
                  </span>{' '}
                  +40
                </span>
              </div>
              <h2 className="font-rubik font-bold text-[22px] text-[#1b1c19] truncate mt-0.5">
                The Thirsty Garden
              </h2>
            </div>
          </div>

          <button
            aria-label="Listen to mission description"
            className="w-10 h-10 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#00668a] shadow-[0_3px_0_#dbdad4] active:translate-y-0.5 transition-all shrink-0"
            onClick={() =>
              handlePlayAudio(
                'The hummingbirds need pure waterfall drops! Guide the magic creek water to wake up the giant blossom.'
              )
            }
          >
            <span className="material-symbols-outlined text-[22px]">volume_up</span>
          </button>
        </div>

        <p className="font-comfortaa text-[15px] text-[#3e484f] mt-2 relative z-10 leading-relaxed">
          The hummingbirds need pure waterfall drops! Guide the magic creek water to wake up the giant blossom.
        </p>

        <div className="mt-4 flex items-center gap-3 relative z-10">
          <button
            className="flex-1 h-14 rounded-full bg-[#38bdf8] text-[#004965] font-rubik font-bold text-[18px] shadow-[0_6px_0_#0284c7] active:translate-y-1 active:shadow-[0_2px_0_#0284c7] transition-all flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              triggerHaptic([30]);
              playChime(740);
              onSelectQuest('thirsty-garden');
            }}
          >
            <span
              className="material-symbols-outlined text-[26px] fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_circle
            </span>
            <span>Jump In Now!</span>
          </button>
          <div className="flex items-center justify-center px-4 h-14 rounded-full bg-[#eae8e2] text-[#3e484f] font-rubik font-bold text-[15px]">
            <span>2 min</span>
          </div>
        </div>
      </section>

      {/* Pip's Flying Sparkle Guide (Floating Companion Toast) */}
      {!tipDismissed && (
        <aside className="relative w-full rounded-2xl bg-[#f0eee8] p-3 shadow-[0_4px_0_#e4e2dd] mb-5 flex items-center gap-3">
          <div className="relative w-12 h-12 shrink-0">
            <img
              className="w-12 h-12 rounded-full object-cover shadow-[0_3px_0_#0284c7]"
              alt="Cute friendly Pip companion"
              src={ASSETS.pipOtter}
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#30c88f] flex items-center justify-center text-[#004e34] shadow-[0_2px_0_#005236]">
              <span className="material-symbols-outlined text-[13px]">chat</span>
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-rubik text-[12px] text-[#00668a] uppercase font-bold tracking-wider">
              Pip Explorer Tip
            </p>
            <p className="font-comfortaa text-[14px] text-[#1b1c19] truncate">
              Tap <strong className="text-[#006c49]">Nature Kingdom</strong> to revive the Thirsty Garden!
            </p>
          </div>
          <button
            aria-label="Dismiss Pip tip"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#3e484f] hover:text-[#1b1c19] active:scale-90 transition-transform"
            onClick={() => {
              triggerHaptic([15]);
              setTipDismissed(true);
            }}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </aside>
      )}

      {/* Realm Carousel Filter Pills */}
      <nav aria-label="World biomes selection" className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-5">
        <button
          className={`shrink-0 px-4 py-2.5 rounded-full font-rubik font-bold text-[13px] flex items-center gap-1.5 transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#00668a] text-white shadow-[0_4px_0_#004c69]'
              : 'bg-[#eae8e2] text-[#1b1c19] shadow-[0_4px_0_#dbdad4] hover:bg-white'
          }`}
          onClick={() => {
            triggerHaptic([15]);
            playChime(520);
            setFilter('all');
          }}
        >
          <span
            className="material-symbols-outlined text-[18px] fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            public
          </span>
          <span>All Realms</span>
        </button>

        <button
          className={`shrink-0 px-4 py-2.5 rounded-full font-rubik font-bold text-[13px] flex items-center gap-1.5 transition-all cursor-pointer ${
            filter === 'unlocked'
              ? 'bg-[#00668a] text-white shadow-[0_4px_0_#004c69]'
              : 'bg-[#eae8e2] text-[#1b1c19] shadow-[0_4px_0_#dbdad4] hover:bg-white'
          }`}
          onClick={() => {
            triggerHaptic([15]);
            playChime(560);
            setFilter('unlocked');
          }}
        >
          <span
            className="material-symbols-outlined text-[18px] text-[#006c49] fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span>Unlocked (4)</span>
        </button>

        <button
          className={`shrink-0 px-4 py-2.5 rounded-full font-rubik font-bold text-[13px] flex items-center gap-1.5 transition-all cursor-pointer ${
            filter === 'locked'
              ? 'bg-[#00668a] text-white shadow-[0_4px_0_#004c69]'
              : 'bg-[#eae8e2] text-[#1b1c19] shadow-[0_4px_0_#dbdad4] hover:bg-white'
          }`}
          onClick={() => {
            triggerHaptic([15]);
            playChime(480);
            setFilter('locked');
          }}
        >
          <span
            className="material-symbols-outlined text-[18px] text-[#795900] fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
          <span>Mysterious (1)</span>
        </button>
      </nav>

      {/* Interactive World Map Realms (Stack of 3D Toy Islands) */}
      <div className="flex flex-col gap-5 w-full">
        {filteredRealms.map((realm) => {
          const isNature = realm.id === 'nature-kingdom';
          const isSpace = realm.id === 'space-frontier';
          const isInvention = realm.id === 'invention-island';
          const isOcean = realm.id === 'ocean-discovery';
          const isLittleCity = realm.id === 'little-city';

          if (isLittleCity) {
            return (
              <React.Fragment key={realm.id}>
                <article className="relative w-full rounded-3xl bg-[#f0eee8] p-4 shadow-[0_6px_0_#dbdad4] opacity-95 flex flex-col gap-3">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#dbdad4]">
                    <img
                      className="w-full h-full object-cover filter grayscale contrast-75 opacity-70"
                      alt={realm.imageAlt}
                      src={realm.imageUrl}
                    />
                    <div className="absolute inset-0 bg-[#dbdad4]/40 backdrop-blur-[2px]"></div>

                    {/* Big Tactile Lock Badge */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <div className="w-16 h-16 rounded-full bg-white text-[#795900] flex items-center justify-center shadow-[0_6px_0_#eae8e2,0_12px_20px_rgba(0,0,0,0.1)] mb-2 animate-pulse">
                        <span
                          className="material-symbols-outlined text-[32px] fill-icon"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          lock
                        </span>
                      </div>
                      <span className="font-rubik font-bold text-[22px] text-[#1b1c19]">
                        Little City, Big Ideas
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#ffdf9f] text-[#5c4300] font-rubik text-[13px] font-bold mt-1 shadow-[0_2px_0_#f9bd22]">
                        Complete 2 more missions to unlock!
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-[#eae8e2] rounded-2xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#795900] text-[20px]">
                        key
                      </span>
                      <span className="font-rubik text-[13px] font-bold text-[#1b1c19]">
                        Lock Progress: 1/3 Missions Done
                      </span>
                    </div>
                    <div className="w-20 bg-[#e4e2dd] rounded-full h-3 overflow-hidden">
                      <div className="bg-[#795900] h-full rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>

                  <button
                    className="w-full h-14 rounded-full bg-[#eae8e2] text-[#3e484f] font-rubik font-bold text-[18px] shadow-[0_6px_0_#dbdad4] active:translate-y-1 active:shadow-[0_2px_0_#dbdad4] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    onClick={handleLockedClick}
                  >
                    <span className="material-symbols-outlined text-[22px]">lock</span>
                    <span>Keep Exploring to Unlock</span>
                  </button>
                </article>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={realm.id}>
              <article
                className={`realm-card relative w-full rounded-3xl bg-white p-4 shadow-[0_8px_0_#eae8e2,0_16px_24px_rgba(0,102,138,0.08)] flex flex-col gap-3 border border-white/60`}
              >
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#f0eee8]">
                  <img
                    className="w-full h-full object-cover"
                    alt={realm.imageAlt}
                    src={realm.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c19]/80 via-transparent to-transparent"></div>

                  {/* Category Pill */}
                  <div
                    className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-[0_3px_0_rgba(0,0,0,0.2)] font-rubik text-[13px] font-bold ${
                      isNature
                        ? 'bg-[#30c88f] text-[#004e34]'
                        : isInvention
                        ? 'bg-[#ffc329] text-[#6f5100]'
                        : 'bg-[#38bdf8] text-[#004965]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[16px] fill-icon"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {realm.categoryIcon}
                    </span>
                    <span>{realm.category}</span>
                  </div>

                  {/* Completion Status */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 text-[#1b1c19] font-rubik text-[13px] font-bold shadow-[0_2px_0_#eae8e2] flex items-center gap-1">
                    {isNature ? (
                      <>
                        <span
                          className="material-symbols-outlined text-[16px] text-[#006c49] fill-icon"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        <span className="text-[#006c49]">3/3 Done!</span>
                      </>
                    ) : isOcean ? (
                      <>
                        <span className="material-symbols-outlined text-[16px] text-[#00668a]">
                          fiber_new
                        </span>
                        <span className="text-[#00668a]">New Territory!</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[16px]">
                          {isInvention ? 'construction' : 'pending'}
                        </span>
                        <span>
                          {realm.completedMissions}/{realm.totalMissions} Complete
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <h3 className="font-rubik font-bold text-[26px] text-white leading-tight drop-shadow-md">
                        {realm.title}
                      </h3>
                      <p className="font-comfortaa text-[14px] text-white/90 line-clamp-1">
                        {realm.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Missions Tracker Bar */}
                <div className="w-full bg-[#f5f3ee] rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {isNature && (
                        <>
                          <span className="w-7 h-7 rounded-full bg-[#006c49] flex items-center justify-center text-white shadow-[0_2px_0_#005236]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#006c49] flex items-center justify-center text-white shadow-[0_2px_0_#005236]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#006c49] flex items-center justify-center text-white shadow-[0_2px_0_#005236]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                        </>
                      )}

                      {isSpace && (
                        <>
                          <span className="w-7 h-7 rounded-full bg-[#00668a] flex items-center justify-center text-white shadow-[0_2px_0_#004c69]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-[#3e484f] shadow-[0_2px_0_#dbdad4]">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-[#3e484f] shadow-[0_2px_0_#dbdad4]">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          </span>
                        </>
                      )}

                      {isInvention && (
                        <>
                          <span className="w-7 h-7 rounded-full bg-[#ffc329] text-[#6f5100] flex items-center justify-center shadow-[0_2px_0_#d97706]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#ffc329] text-[#6f5100] flex items-center justify-center shadow-[0_2px_0_#d97706]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-[#3e484f] shadow-[0_2px_0_#dbdad4]">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          </span>
                        </>
                      )}

                      {isOcean && (
                        <>
                          <span className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-[#3e484f] shadow-[0_2px_0_#dbdad4]">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-[#3e484f] shadow-[0_2px_0_#dbdad4]">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          </span>
                          <span className="w-7 h-7 rounded-full bg-[#e4e2dd] flex items-center justify-center text-[#3e484f] shadow-[0_2px_0_#dbdad4]">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                          </span>
                        </>
                      )}
                    </div>

                    <span
                      className={`font-rubik text-[13px] font-bold ${
                        isNature ? 'text-[#006c49]' : 'text-[#3e484f]'
                      }`}
                    >
                      {realm.nextMissionTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#795900] font-rubik text-[13px] font-bold">
                    <span
                      className="material-symbols-outlined text-[18px] fill-icon"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      diamond
                    </span>
                    <span>
                      {isOcean ? '0/30' : `${realm.crystals} Crystals`}
                    </span>
                  </div>
                </div>

                {/* Realm Action Button */}
                <button
                  className={`w-full h-14 rounded-full font-rubik font-bold text-[18px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isNature
                      ? 'bg-[#006c49] text-white shadow-[0_6px_0_#004e34] active:translate-y-1 active:shadow-[0_2px_0_#004e34]'
                      : isSpace
                      ? 'bg-[#38bdf8] text-[#004965] shadow-[0_6px_0_#0284c7] active:translate-y-1 active:shadow-[0_2px_0_#0284c7]'
                      : isInvention
                      ? 'bg-[#ffc329] text-[#6f5100] shadow-[0_6px_0_#d97706] active:translate-y-1 active:shadow-[0_2px_0_#d97706]'
                      : 'bg-[#00668a] text-white shadow-[0_6px_0_#004c69] active:translate-y-1 active:shadow-[0_2px_0_#004c69]'
                  }`}
                  onClick={() => {
                    triggerHaptic([30]);
                    playChime(640);
                    if (isNature) {
                      onSelectQuest('thirsty-garden');
                    } else if (isSpace) {
                      onNavigate('engine');
                      handlePlayAudio('Launching Star Hopper rocket toward Zero-G Orbit!');
                    } else if (isInvention) {
                      onNavigate('engine');
                      handlePlayAudio('Entering Invention Island Gear Workshop!');
                    } else {
                      onNavigate('engine');
                      handlePlayAudio('Diving deep into Ocean Discovery reef!');
                    }
                  }}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isNature
                      ? 'travel_explore'
                      : isSpace
                      ? 'explore'
                      : isInvention
                      ? 'build'
                      : 'sailing'}
                  </span>
                  <span>{realm.actionText}</span>
                </button>
              </article>

              {/* Connecting Bridge Ribbon */}
              {realm.bridgeName && (
                <div className="w-full flex items-center justify-center py-1">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#eae8e2] text-[#3e484f] font-rubik text-[13px] font-bold shadow-sm">
                    <span
                      className="material-symbols-outlined text-[18px] fill-icon text-[#f9bd22]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {realm.bridgeIcon1 || 'star'}
                    </span>
                    <span>{realm.bridgeName}</span>
                    <span
                      className="material-symbols-outlined text-[18px] fill-icon text-[#38bdf8]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {realm.bridgeIcon2 || 'star'}
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Audio Help Accessibility Floater Button */}
      <div className="fixed bottom-24 right-4 z-40">
        <button
          aria-label="Listen to Audio Guide"
          className="w-14 h-14 rounded-full bg-[#ffc329] text-[#6f5100] shadow-[0_6px_0_#d97706,0_12px_24px_rgba(121,89,0,0.25)] active:translate-y-1 active:shadow-[0_2px_0_#d97706] transition-all flex items-center justify-center cursor-pointer"
          onClick={() =>
            handlePlayAudio('Welcome to WonderWorld! Tap any island to begin an adventure!')
          }
        >
          <span
            className="material-symbols-outlined text-[30px] fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            record_voice_over
          </span>
        </button>
      </div>
    </div>
  );
};
