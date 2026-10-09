import React, { useState } from 'react';
import { isSoundEnabled, playChime, setSoundEnabled, triggerHaptic } from '../utils/audio';

export const ParentsTab: React.FC = () => {
  const [sound, setSound] = useState(isSoundEnabled());
  const [screenLimit, setScreenLimit] = useState<number>(20); // 20 minutes default
  const [verifiedAdult, setVerifiedAdult] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathError, setMathError] = useState(false);

  const handleVerifyGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (mathAnswer.trim() === '14') {
      // 7 + 7 = 14
      setVerifiedAdult(true);
      setMathError(false);
      playChime(640);
    } else {
      setMathError(true);
      playChime(320);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none pb-12">
      {/* Safe Kid Header */}
      <div className="bg-gradient-to-r from-[#30c88f]/20 via-[#6ffbbe]/30 to-[#38bdf8]/20 rounded-3xl p-5 shadow-sm border border-white/60">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="material-symbols-outlined text-[#006c49] text-[28px] fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <h2 className="font-rubik font-bold text-[22px] text-[#004e34]">
            Parents &amp; Educators Zone
          </h2>
        </div>
        <p className="font-comfortaa text-[14px] text-[#005236]">
          WonderWorld is 100% kid-safe, ad-free, and designed with elementary school educators.
        </p>
      </div>

      {/* Parental Gate Check */}
      {!verifiedAdult ? (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#795900]">
            <span className="material-symbols-outlined text-[24px]">lock</span>
            <h3 className="font-rubik font-bold text-[18px]">Parent Verification Gate</h3>
          </div>
          <p className="font-comfortaa text-[14px] text-[#3e484f]">
            To adjust settings or view learning metrics, please solve this quick problem:
          </p>
          <form onSubmit={handleVerifyGate} className="flex items-center gap-3 mt-1">
            <span className="font-rubik font-bold text-[18px] text-[#1b1c19]">7 + 7 =</span>
            <input
              type="number"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              placeholder="Answer"
              className="w-24 px-3 py-2 rounded-xl bg-[#f0eee8] text-center font-rubik font-bold text-[16px] focus:outline-none focus:ring-2 focus:ring-[#00668a]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#00668a] text-white rounded-xl font-rubik font-bold text-[14px] shadow-sm active:scale-95 transition-transform"
            >
              Verify
            </button>
          </form>
          {mathError && (
            <span className="font-rubik text-[12px] text-[#ba1a1a]">
              Incorrect answer. Please try again!
            </span>
          )}
        </div>
      ) : (
        <>
          {/* Controls Settings */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-4">
            <h3 className="font-rubik font-bold text-[18px] text-[#1b1c19]">Session &amp; Audio</h3>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between py-2 border-b border-[#eae8e2]">
              <div>
                <span className="font-rubik font-bold text-[15px] text-[#1b1c19] block">
                  Audio &amp; Pip Voice
                </span>
                <span className="font-comfortaa text-[12px] text-[#3e484f]">
                  Play sound effects, chimes, and narration
                </span>
              </div>
              <button
                onClick={() => {
                  const next = !sound;
                  setSound(next);
                  setSoundEnabled(next);
                  triggerHaptic([20]);
                  playChime(next ? 640 : 360);
                }}
                className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                  sound ? 'bg-[#30c88f]' : 'bg-[#e4e2dd]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    sound ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Screen Time Limit */}
            <div className="flex items-center justify-between py-2 border-b border-[#eae8e2]">
              <div>
                <span className="font-rubik font-bold text-[15px] text-[#1b1c19] block">
                  Daily Screen Time Target
                </span>
                <span className="font-comfortaa text-[12px] text-[#3e484f]">
                  Gentle reminder after recommended play limit
                </span>
              </div>
              <select
                value={screenLimit}
                onChange={(e) => setScreenLimit(Number(e.target.value))}
                className="bg-[#f0eee8] px-3 py-1.5 rounded-xl font-rubik text-[14px] font-bold text-[#1b1c19] focus:outline-none"
              >
                <option value={15}>15 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
              </select>
            </div>
          </div>

          {/* Curriculum Standards Alignment */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-white/60 space-y-3">
            <h3 className="font-rubik font-bold text-[18px] text-[#1b1c19]">
              NGSS Curriculum Alignment
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-[#f5f3ee] rounded-2xl">
                <span className="font-rubik text-[13px] font-bold text-[#006c49] block">
                  🌱 2-LS2 Life Science: Ecosystems &amp; Plant Growth
                </span>
                <p className="font-comfortaa text-[12px] text-[#3e484f] mt-0.5">
                  Children discover how sunlight, water, and soil nutrients directly affect blossom vigor and leaf transpiration.
                </p>
              </div>

              <div className="p-3 bg-[#f5f3ee] rounded-2xl">
                <span className="font-rubik text-[13px] font-bold text-[#00668a] block">
                  ☁️ 3-ESS2 Earth&apos;s Systems: Water Cycle &amp; Weather
                </span>
                <p className="font-comfortaa text-[12px] text-[#3e484f] mt-0.5">
                  Children simulate evaporation via thermal heating, condensation into rain clouds, and precipitation onto meadows.
                </p>
              </div>

              <div className="p-3 bg-[#f5f3ee] rounded-2xl">
                <span className="font-rubik text-[13px] font-bold text-[#795900] block">
                  ⚙️ 3-PS2 Motion &amp; Stability: Forces and Mechanics
                </span>
                <p className="font-comfortaa text-[12px] text-[#3e484f] mt-0.5">
                  Hands-on gear transmission ratios and windmill aerodynamic kinetic energy transfer.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
