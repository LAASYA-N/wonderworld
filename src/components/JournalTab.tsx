import React from 'react';
import { BADGES } from '../data/wonderData';
import { playChime, speakPhrase, triggerHaptic } from '../utils/audio';

interface JournalTabProps {
  starsCount: number;
}

export const JournalTab: React.FC<JournalTabProps> = ({ starsCount }) => {
  const stickers = [
    { name: 'Pip Explorer', emoji: '🐼', desc: 'Adventurer Guide' },
    { name: 'Golden Sunflower', emoji: '🌻', desc: 'Thriving Flora' },
    { name: 'Star Hopper', emoji: '🚀', desc: 'Cosmic Explorer' },
    { name: 'Water Drop', emoji: '💧', desc: 'Pure Hydration' },
    { name: 'Clockwork Gear', emoji: '⚙️', desc: 'Kinetic Motion' },
    { name: 'Coral Submarine', emoji: '🚤', desc: 'Deep Sea diver' },
  ];

  return (
    <div className="flex flex-col w-full gap-5 select-none pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#ffdf9f] via-[#f9bd22] to-[#ffc329] rounded-3xl p-5 shadow-sm border border-white/60 text-[#261a00]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px]">auto_stories</span>
            <h2 className="font-rubik font-bold text-[22px]">Explorer&apos;s Field Journal</h2>
          </div>
          <div className="flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full shadow-sm text-[#1b1c19] font-rubik text-[14px] font-bold">
            <span
              className="material-symbols-outlined text-[#795900] text-[18px] fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              hotel_class
            </span>
            <span>{starsCount} Crystals</span>
          </div>
        </div>
        <p className="font-comfortaa text-[14px] text-[#5c4300] mt-2">
          Your scientific field discoveries, botanical specimens, and merit badges!
        </p>
      </div>

      {/* Badges Collection */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-white/60">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-rubik font-bold text-[18px] text-[#1b1c19]">Earned Badges</h3>
          <span className="font-rubik text-[12px] font-bold text-[#00668a]">
            {BADGES.filter((b) => b.unlocked).length} of {BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-transform active:scale-95 ${
                badge.unlocked
                  ? 'bg-[#f5f3ee] border-[#eae8e2]'
                  : 'bg-[#eae8e2]/50 border-dashed border-[#bdc8d1] opacity-60'
              }`}
              onClick={() => {
                triggerHaptic([20]);
                playChime(badge.unlocked ? 640 : 400);
                speakPhrase(
                  badge.unlocked
                    ? `${badge.name}: ${badge.subtitle}`
                    : `${badge.name} is still locked! Explore more worlds to unlock it.`
                );
              }}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  badge.unlocked
                    ? 'bg-[#ffc329] text-[#6f5100]'
                    : 'bg-[#e4e2dd] text-[#6e7980]'
                }`}
              >
                <span className="material-symbols-outlined text-[26px]">
                  {badge.unlocked ? badge.icon : 'lock'}
                </span>
              </div>
              <div className="min-w-0">
                <span className="font-rubik text-[11px] font-bold text-[#00668a] uppercase">
                  {badge.category}
                </span>
                <h4 className="font-rubik font-bold text-[14px] text-[#1b1c19] truncate leading-tight">
                  {badge.name}
                </h4>
                <p className="font-comfortaa text-[11px] text-[#3e484f] line-clamp-1">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wonder Stickers Collection */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-white/60">
        <h3 className="font-rubik font-bold text-[18px] text-[#1b1c19] mb-1">
          Wonder Stickers Album
        </h3>
        <p className="font-comfortaa text-[13px] text-[#3e484f] mb-3">
          Tap any collectible sticker to hear its field story!
        </p>

        <div className="grid grid-cols-3 gap-3">
          {stickers.map((stk, idx) => (
            <div
              key={idx}
              className="bg-[#f0eee8] hover:bg-[#eae8e2] rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
              onClick={() => {
                triggerHaptic([20]);
                playChime(700 + idx * 40);
                speakPhrase(`${stk.name}! ${stk.desc}`);
              }}
            >
              <span className="text-[36px] mb-1 drop-shadow-sm select-none">{stk.emoji}</span>
              <span className="font-rubik font-bold text-[12px] text-[#1b1c19] truncate w-full">
                {stk.name}
              </span>
              <span className="font-comfortaa text-[10px] text-[#6e7980] truncate w-full">
                {stk.desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
