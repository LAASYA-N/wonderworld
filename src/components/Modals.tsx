import React from 'react';
import { ASSETS } from '../data/wonderData';
import { Mystery } from '../types';
import { playChime, speakPhrase, triggerHaptic } from '../utils/audio';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/60 animate-scale-up select-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-[#004965]">
              <span className="material-symbols-outlined text-[24px]">help</span>
            </span>
            <h3 className="font-rubik font-bold text-[20px] text-[#1b1c19]">How to Play</h3>
          </div>
          <button
            onClick={() => {
              triggerHaptic([15]);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#3e484f] hover:text-[#1b1c19]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-3 font-comfortaa text-[13px] text-[#3e484f]">
          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#c4e7ff] text-[#00668a] font-rubik font-bold flex items-center justify-center text-[12px] shrink-0 mt-0.5">
              1
            </span>
            <p>
              <strong>Explore Worlds:</strong> Tap into floating islands like Nature Kingdom and Space Frontier to solve real science challenges!
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#ffdf9f] text-[#795900] font-rubik font-bold flex items-center justify-center text-[12px] shrink-0 mt-0.5">
              2
            </span>
            <p>
              <strong>Wonder Engine:</strong> Test science hypotheses, make rain with the Rain Machine, and ask Pip questions!
            </p>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#6ffbbe] text-[#006c49] font-rubik font-bold flex items-center justify-center text-[12px] shrink-0 mt-0.5">
              3
            </span>
            <p>
              <strong>Collect Crystals &amp; Badges:</strong> Every experiment earns Star Crystals and badges in your Field Journal!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            triggerHaptic([20]);
            playChime(640);
            onClose();
          }}
          className="w-full mt-5 py-3 rounded-2xl bg-[#00668a] text-white font-rubik font-bold text-[15px] shadow-sm active:scale-95 transition-transform"
        >
          Got It, Let&apos;s Play!
        </button>
      </div>
    </div>
  );
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  starsCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, starsCount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/60 animate-scale-up select-none text-center">
        <div className="flex justify-end">
          <button
            onClick={() => {
              triggerHaptic([15]);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#3e484f]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="relative w-20 h-20 mx-auto -mt-2 mb-3">
          <img
            alt="Pip Mascot Profile"
            className="w-full h-full rounded-full object-cover shadow-[0_4px_0_#eae8e2]"
            src={ASSETS.pipAvatar}
          />
          <span className="absolute -bottom-1 -right-1 bg-[#30c88f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            <span className="material-symbols-outlined text-[14px]">verified</span>
          </span>
        </div>

        <h3 className="font-rubik font-bold text-[20px] text-[#1b1c19]">Pip the Explorer</h3>
        <p className="font-comfortaa text-[13px] text-[#3e484f] mb-4">
          Rank: Senior World Adventurer
        </p>

        <div className="bg-[#f0eee8] rounded-2xl p-4 flex items-center justify-around mb-4">
          <div className="flex flex-col items-center">
            <span
              className="material-symbols-outlined text-[#795900] text-[24px] fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              hotel_class
            </span>
            <span className="font-rubik font-bold text-[18px] text-[#1b1c19] mt-0.5">
              {starsCount}
            </span>
            <span className="font-comfortaa text-[11px] text-[#3e484f]">Star Crystals</span>
          </div>

          <div className="w-px h-10 bg-[#bdc8d1]"></div>

          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[#00668a] text-[24px]">award_star</span>
            <span className="font-rubik font-bold text-[18px] text-[#1b1c19] mt-0.5">5/6</span>
            <span className="font-comfortaa text-[11px] text-[#3e484f]">Badges Earned</span>
          </div>
        </div>

        <button
          onClick={() => {
            triggerHaptic([20]);
            playChime(640);
            speakPhrase("Keep your goggles on, Little Explorer! More discoveries await!");
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-[#ffc329] text-[#6f5100] font-rubik font-bold text-[15px] shadow-[0_3px_0_#d97706] active:translate-y-0.5 transition-transform"
        >
          Keep Adventuring!
        </button>
      </div>
    </div>
  );
};

interface MysteryDetailModalProps {
  mystery: Mystery | null;
  onClose: () => void;
}

export const MysteryDetailModal: React.FC<MysteryDetailModalProps> = ({ mystery, onClose }) => {
  if (!mystery) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-white/60 animate-scale-up select-none">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 rounded-full bg-[#c4e7ff] text-[#004c69] font-rubik text-[12px] font-bold">
            {mystery.category}
          </span>
          <button
            onClick={() => {
              triggerHaptic([15]);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#3e484f]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <h3 className="font-rubik font-bold text-[22px] text-[#1b1c19] leading-snug mb-2">
          {mystery.question}
        </h3>

        <div className="bg-[#f0eee8] rounded-2xl p-3.5 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-rubik text-[12px] font-bold text-[#00668a]">Pip&apos;s Answer:</span>
            <button
              onClick={() => speakPhrase(mystery.fullExplanation)}
              className="text-[#00668a] hover:opacity-80"
              title="Listen to Pip"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
            </button>
          </div>
          <p className="font-comfortaa text-[13px] text-[#1b1c19] leading-relaxed">
            {mystery.fullExplanation}
          </p>
        </div>

        <div className="p-3 bg-[#ffdf9f]/60 rounded-2xl mb-4 border border-[#ffc329]/50">
          <span className="font-rubik text-[11px] font-bold text-[#795900] uppercase block mb-0.5">
            ✨ Mind-Blowing Fun Fact!
          </span>
          <p className="font-comfortaa text-[12px] text-[#5c4300] leading-snug">
            {mystery.funFact}
          </p>
        </div>

        <button
          onClick={() => {
            triggerHaptic([20]);
            playChime(640);
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-[#00668a] text-white font-rubik font-bold text-[15px] shadow-sm active:scale-95 transition-transform"
        >
          Awesome, I Learned Something!
        </button>
      </div>
    </div>
  );
};

interface DiyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiyGuideModal: React.FC<DiyGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-white/60 animate-scale-up select-none">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#795900] text-[24px]">science</span>
            <h3 className="font-rubik font-bold text-[20px] text-[#1b1c19]">
              The Jar Cloud Experiment
            </h3>
          </div>
          <button
            onClick={() => {
              triggerHaptic([15]);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#3e484f]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-3 font-comfortaa text-[13px] text-[#3e484f] max-h-80 overflow-y-auto pr-1">
          <div className="p-2.5 bg-[#f5f3ee] rounded-xl">
            <strong className="text-[#1b1c19] block mb-1">What You Need:</strong>
            <ul className="list-disc list-inside space-y-0.5">
              <li>1 clear glass jar with a metal lid</li>
              <li>Warm tap water (not boiling, ask an adult)</li>
              <li>3-4 ice cubes</li>
              <li>A quick spray of hairspray or a lit match blown out</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div>
              <strong className="text-[#00668a]">Step 1: Warm Water Base</strong>
              <p>Pour warm water into the jar until it is about 1 inch deep. Swirl it around.</p>
            </div>
            <div>
              <strong className="text-[#00668a]">Step 2: Add Cloud Seeds</strong>
              <p>Ask a grown-up to spray a quick spritz of hairspray inside. Water vapor needs tiny particles (condensation nuclei) to cling to!</p>
            </div>
            <div>
              <strong className="text-[#00668a]">Step 3: Ice on Top</strong>
              <p>Quickly flip the lid upside-down over the jar and place ice cubes inside the lid. As the warm rising vapor hits the cold metal lid, a real swirling cloud will form!</p>
            </div>
            <div>
              <strong className="text-[#006c49]">Step 4: Lift the Lid!</strong>
              <p>Lift the cold lid and watch your cloud float out into the room!</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            triggerHaptic([20]);
            playChime(640);
            onClose();
          }}
          className="w-full mt-4 py-3 rounded-2xl bg-[#00668a] text-white font-rubik font-bold text-[15px] shadow-sm active:scale-95 transition-transform"
        >
          Close Guide
        </button>
      </div>
    </div>
  );
};
