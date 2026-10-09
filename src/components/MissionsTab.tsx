import React from 'react';
import { ACTIVE_MISSIONS } from '../data/wonderData';
import { ScreenType } from '../types';
import { playChime, speakPhrase, triggerHaptic } from '../utils/audio';

interface MissionsTabProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectQuest: (questId: string) => void;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ onSelectQuest }) => {
  return (
    <div className="flex flex-col w-full gap-5 select-none pb-12">
      {/* Spotlight Header */}
      <div className="bg-gradient-to-r from-[#c4e7ff] to-[#38bdf8]/30 rounded-3xl p-5 shadow-sm border border-white/60">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#00668a] text-[24px]">explore</span>
          <h2 className="font-rubik font-bold text-[22px] text-[#001e2c]">Wonder Missions Log</h2>
        </div>
        <p className="font-comfortaa text-[14px] text-[#3e484f]">
          Solve hands-on science puzzles across 5 realms to master botany, physics, and astrophysics!
        </p>
      </div>

      {/* Missions List */}
      <div className="flex flex-col gap-3">
        {ACTIVE_MISSIONS.map((mission) => {
          const isThirsty = mission.id === 'thirsty-garden';
          return (
            <article
              key={mission.id}
              className="bg-white rounded-3xl p-4 shadow-[0_5px_0_#eae8e2] border border-white/60 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-rubik font-bold text-white shadow-sm ${
                      isThirsty
                        ? 'bg-[#30c88f]'
                        : mission.realm.includes('Space')
                        ? 'bg-[#00668a]'
                        : mission.realm.includes('Invention')
                        ? 'bg-[#ffc329]'
                        : 'bg-[#38bdf8]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {isThirsty
                        ? 'local_florist'
                        : mission.realm.includes('Space')
                        ? 'rocket_launch'
                        : mission.realm.includes('Invention')
                        ? 'precision_manufacturing'
                        : 'sailing'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-rubik text-[12px] font-bold text-[#00668a]">
                        {mission.realm}
                      </span>
                      <span className="text-[#6e7980] text-[12px]">•</span>
                      <span className="font-comfortaa text-[12px] text-[#6e7980]">
                        {mission.durationMinutes} min
                      </span>
                    </div>
                    <h3 className="font-rubik font-bold text-[18px] text-[#1b1c19] leading-snug">
                      {mission.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-[#ffdf9f] px-2.5 py-1 rounded-full text-[#5c4300] font-rubik text-[12px] font-bold shrink-0">
                  <span
                    className="material-symbols-outlined text-[15px] fill-icon"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    diamond
                  </span>
                  <span>+{mission.rewardCrystals}</span>
                </div>
              </div>

              <p className="font-comfortaa text-[13px] text-[#3e484f] leading-relaxed">
                {mission.storySnippet}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="font-rubik text-[12px] font-bold text-[#3e484f] bg-[#f0eee8] px-3 py-1 rounded-full">
                  {mission.subject}
                </span>

                <button
                  className="px-4 py-2 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#004965] font-rubik text-[13px] font-bold shadow-[0_3px_0_#0284c7] active:translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    triggerHaptic([25]);
                    playChime(640);
                    if (isThirsty) {
                      onSelectQuest('thirsty-garden');
                    } else {
                      speakPhrase(`Launching ${mission.title}!`);
                      onSelectQuest('thirsty-garden');
                    }
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  <span>{isThirsty ? 'Play Mission' : 'Start Quest'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
