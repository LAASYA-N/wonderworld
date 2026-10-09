import React, { useState } from 'react';
import { ASSETS, MYSTERIES } from '../data/wonderData';
import { Mystery } from '../types';
import {
  playChillSound,
  playChime,
  playSuccessFanfare,
  playSunnySound,
  playWaterDropSound,
  speakPhrase,
  triggerHaptic,
} from '../utils/audio';

interface EngineTabProps {
  onAddStars: (amount: number) => void;
  onOpenMysteryDetail: (mystery: Mystery) => void;
  onOpenDiyGuide: () => void;
}

export const EngineTab: React.FC<EngineTabProps> = ({
  onAddStars,
  onOpenMysteryDetail,
  onOpenDiyGuide,
}) => {
  // Simulator State: 1 = Warm initial, 2 = Sun turned up (evaporation), 3 = Chill sky (condensation), 4 = Rain released (precipitation & bloom)
  const [simStep, setSimStep] = useState<number>(1);
  const [hypothesisSelected, setHypothesisSelected] = useState<number | null>(null);
  const [questionInput, setQuestionInput] = useState<string>('');
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [pipAnswer, setPipAnswer] = useState<string | null>(null);
  const [pipToastText, setPipToastText] = useState<string | null>(null);

  const showPipToast = (text: string) => {
    setPipToastText(text);
    speakPhrase(text);
    setTimeout(() => {
      setPipToastText(null);
    }, 6000);
  };

  // Step 1: Turn Up Sun
  const handleTurnUpSun = () => {
    triggerHaptic([30]);
    playSunnySound();
    setSimStep(2);
    showPipToast('Look at the ocean water warming up into rising droplets!');
  };

  // Step 2: Chill Sky
  const handleChillSky = () => {
    if (simStep < 2) return;
    triggerHaptic([30]);
    playChillSound();
    setSimStep(3);
    showPipToast('Brrr! The high sky is chilly! The cloud got thick and heavy!');
  };

  // Step 3: Release Rain
  const handleReleaseRain = () => {
    if (simStep < 3) return;
    triggerHaptic([50, 40, 50]);
    playWaterDropSound();
    setSimStep(4);
    playSuccessFanfare();
    onAddStars(20);
    showPipToast(
      'You did it! That is the full Water Cycle: Evaporation, Condensation, and Rain!'
    );
  };

  const handleResetSim = () => {
    triggerHaptic([20]);
    playChime(480);
    setSimStep(1);
  };

  // Question Engine AI answers
  const handleAskQuestion = (customQ?: string) => {
    const q = (customQ || questionInput).trim();
    if (!q) {
      showPipToast('Ask me anything! Like "Why is the grass green?" or "How do rockets zoom?"');
      return;
    }
    triggerHaptic([30]);
    playChime(700);
    setIsAnswering(true);

    setTimeout(() => {
      let answer = `That is a wonderful question! When ${q.toLowerCase()} happens, nature is balancing energy and matter! Keep exploring!`;
      const lower = q.toLowerCase();
      if (lower.includes('rain') || lower.includes('water')) {
        answer =
          'Rain happens when water on the ground warms up, floats into the chilly sky as invisible vapor, and gathers into heavy clouds until gravity pulls it back down as drops!';
      } else if (lower.includes('sky') || lower.includes('blue')) {
        answer =
          'The sky looks bright blue because Earth’s blanket of air scatters tiny blue light waves in every direction like a glitter storm!';
      } else if (lower.includes('plant') || lower.includes('grow')) {
        answer =
          'Plants use sunlight, water, and air to make their own sugary food in tiny leaf kitchens called chloroplasts!';
      } else if (lower.includes('bird') || lower.includes('fly')) {
        answer =
          'Birds fly with light hollow bones and curved wings that create invisible "lift" pressure in the air!';
      } else if (lower.includes('moon')) {
        answer =
          'The moon travels around Earth, and we see different sunny slices as it moves: crescent, half, and bright full moon!';
      }

      setPipAnswer(answer);
      setIsAnswering(false);
      showPipToast(answer);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full gap-5 select-none pb-12">
      {/* Interactive Intro Header with Pip the Mascot */}
      <div className="relative bg-[#f0eee8] rounded-3xl p-4 shadow-[0_6px_0_#eae8e2,0_12px_24px_rgba(0,102,138,0.08)] flex flex-col gap-3 overflow-hidden border border-white/60">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#38bdf8]/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-[#ffc329]/20 blur-2xl pointer-events-none"></div>

        <div className="flex items-start gap-3 relative z-10">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-white p-1 shadow-[0_4px_0_#eae8e2]">
              <img
                alt="Pip the Explorer"
                className="w-full h-full object-cover rounded-full"
                src={ASSETS.pipAvatar}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#30c88f] text-[#004e34] rounded-full p-1 shadow-[0_2px_0_#005236] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-2xl p-3 shadow-[0_4px_0_#eae8e2] relative">
            <div className="absolute -left-2 top-6 w-3 h-3 bg-white rotate-45"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-rubik text-[12px] font-bold text-[#00668a] uppercase tracking-wider">
                Pip&apos;s Wonder Lab
              </span>
              <button
                aria-label="Listen to Pip"
                className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#00668a] active:scale-95 transition-transform"
                onClick={() =>
                  showPipToast(
                    "Let's make rain together right now! Follow the water droplets and build a cloud!"
                  )
                }
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
              </button>
            </div>
            <p className="font-comfortaa text-[14px] text-[#1b1c19] leading-snug">
              &ldquo;Let&apos;s make rain together right now! Follow the water droplets and build a cloud!&rdquo;
            </p>
          </div>
        </div>

        {/* Active Inquiry Banner */}
        <div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-[0_4px_0_#eae8e2] relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-[#004965] shadow-[0_3px_0_#0284c7]">
              <span className="material-symbols-outlined text-[24px]">cloudy_snowing</span>
            </div>
            <div className="flex flex-col">
              <span className="font-rubik text-[11px] font-bold text-[#3e484f] uppercase tracking-wider">
                Today&apos;s Wonder Mission
              </span>
              <span className="font-rubik font-bold text-[20px] text-[#00668a] leading-tight">
                Why does it rain?
              </span>
            </div>
          </div>
          <span className="bg-[#ffdf9f] text-[#5c4300] font-rubik text-[13px] font-bold px-3 py-1 rounded-full shadow-[0_2px_0_#f9bd22]">
            Lab Lv. 1
          </span>
        </div>
      </div>

      {/* Interactive Water Cycle Lab Simulator */}
      <section className="bg-[#f0eee8] rounded-3xl p-4 shadow-[0_6px_0_#eae8e2,0_12px_24px_rgba(0,102,138,0.06)] flex flex-col gap-4 relative overflow-hidden border border-white/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#795900] text-[28px] fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              science
            </span>
            <h2 className="font-rubik font-bold text-[22px] text-[#1b1c19]">The Rain Machine</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[#3e484f] font-rubik text-[13px] font-bold bg-white px-3 py-1 rounded-full shadow-[0_2px_0_#eae8e2]">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">check_circle</span>
            <span>
              {simStep === 1
                ? 'Step 1 of 3'
                : simStep === 2
                ? 'Step 2 of 3'
                : simStep === 3
                ? 'Step 3 of 3'
                : 'Mission Complete! ✨'}
            </span>
          </div>
        </div>

        {/* Canvas Simulation Area */}
        <div
          className={`relative w-full h-72 rounded-2xl overflow-hidden shadow-[inset_0_3px_8px_rgba(0,0,0,0.15)] flex flex-col justify-between p-3 transition-colors duration-700 ${
            simStep === 1
              ? 'bg-gradient-to-b from-[#bfe9ff] via-[#dff4ff] to-[#60b5e5]'
              : simStep === 2
              ? 'bg-gradient-to-b from-[#ffe5b4] via-[#fce7d2] to-[#60b5e5]'
              : simStep === 3
              ? 'bg-gradient-to-b from-[#94a3b8] via-[#cbd5e1] to-[#38bdf8]'
              : 'bg-gradient-to-b from-[#64748b] via-[#94a3b8] to-[#0284c7]'
          }`}
        >
          {/* Sky Area: Sun & Clouds */}
          <div className="relative w-full h-36 flex items-start justify-between z-10">
            {/* Sun Actor */}
            <div
              className={`relative transition-all duration-700 cursor-pointer ${
                simStep >= 2 ? 'scale-125' : 'scale-90 opacity-90'
              }`}
              onClick={handleTurnUpSun}
              title="Warm Sunlight"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  simStep >= 2
                    ? 'bg-[#ffc329] shadow-[0_0_30px_#ffc329] text-[#6f5100]'
                    : 'bg-[#ffdf9f] shadow-[0_0_15px_#ffdf9f] text-[#795900]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[36px] fill-icon"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  light_mode
                </span>
              </div>
              {/* Heat Radiance Waves */}
              {simStep >= 2 && (
                <div className="absolute -inset-2 rounded-full border-4 border-dashed border-[#ffc329]/70 animate-spin"></div>
              )}
            </div>

            {/* Sky Thermometer HUD */}
            <div className="bg-white/90 backdrop-blur rounded-2xl px-3 py-1 flex items-center gap-1.5 shadow-[0_2px_0_#eae8e2]">
              <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">
                thermostat
              </span>
              <span className="font-rubik text-[13px] font-bold text-[#1b1c19]">
                {simStep === 1
                  ? 'Warm (22°C)'
                  : simStep === 2
                  ? 'Very Hot! (38°C)'
                  : simStep === 3
                  ? 'Cold Aloft (-5°C)'
                  : 'Gentle Rain (18°C)'}
              </span>
            </div>

            {/* Cloud Actor */}
            <div
              className={`relative transition-all duration-700 ${
                simStep >= 3 ? 'scale-125 opacity-100' : 'scale-95 opacity-60 translate-x-2'
              }`}
            >
              <div
                className={`w-24 h-14 rounded-full relative flex items-center justify-center transition-all duration-500 shadow-md ${
                  simStep >= 3
                    ? 'bg-[#475569] text-white shadow-[0_6px_0_#334155]'
                    : 'bg-white text-[#00668a]/50 shadow-[0_6px_0_#d5e3ec]'
                }`}
              >
                <span className="material-symbols-outlined text-[30px]">
                  {simStep >= 3 ? 'thunderstorm' : 'cloud'}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Evaporating Vapor Particles (Step 2+) */}
          {simStep >= 2 && (
            <div className="absolute inset-0 pointer-events-none flex justify-around items-end pb-20 overflow-hidden">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-full bg-white/80 animate-bounce"
                  style={{
                    animationDuration: `${0.8 + (idx % 4) * 0.2}s`,
                    transform: `translateY(-${(idx * 8 + 20) % 70}px)`,
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* Falling Raindrops Layer (Step 4) */}
          {simStep === 4 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(24)].map((_, idx) => (
                <div
                  key={idx}
                  className="absolute w-1 h-5 bg-[#38bdf8] rounded-full animate-pulse"
                  style={{
                    left: `${8 + ((idx * 17) % 84)}%`,
                    top: `${20 + ((idx * 23) % 60)}%`,
                    animationDuration: '0.4s',
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* Land & Ocean Bottom Bar */}
          <div className="relative w-full h-20 flex items-end justify-between z-10">
            {/* Ocean */}
            <div className="relative w-3/5 h-14 rounded-2xl bg-[#0284c7] shadow-[inset_0_4px_6px_rgba(255,255,255,0.4)] flex items-center justify-center">
              <span className="font-rubik text-[13px] font-bold text-white flex items-center gap-1 opacity-90">
                <span className="material-symbols-outlined text-[18px]">water</span> Ocean
              </span>
              {simStep >= 2 && (
                <div className="absolute -top-4 font-rubik text-[11px] font-bold text-white bg-[#00668a] px-2.5 py-0.5 rounded-full shadow animate-pulse">
                  Evaporation!
                </div>
              )}
            </div>

            {/* Island & Growing Flower */}
            <div className="relative w-2/5 h-16 rounded-2xl bg-[#006c49] flex flex-col items-center justify-end pb-1 shadow-[inset_0_4px_6px_rgba(255,255,255,0.3)]">
              {/* Flower Sprite */}
              <div
                className={`transition-all duration-700 origin-bottom ${
                  simStep === 4 ? 'scale-150 text-[#ffc329]' : 'scale-80 text-[#ffdf9f]'
                }`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {simStep === 4 ? 'local_florist' : 'yard'}
                </span>
              </div>
              <span className="font-rubik text-[13px] font-bold text-white opacity-90">
                Meadow
              </span>
            </div>
          </div>
        </div>

        {/* Stepped Discovery Controls */}
        <div className="grid grid-cols-3 gap-2">
          {/* Step 1: Sun Heat */}
          <button
            className={`min-h-[58px] p-2 rounded-2xl bg-[#ffc329] text-[#6f5100] shadow-[0_5px_0_#d97706] active:translate-y-1 active:shadow-[0_2px_0_#d97706] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
              simStep === 1 ? 'ring-2 ring-[#795900]' : ''
            }`}
            onClick={handleTurnUpSun}
          >
            <span className="material-symbols-outlined text-[22px]">sunny</span>
            <span className="font-rubik text-[12px] font-bold leading-tight mt-0.5">
              1. Turn Up Sun
            </span>
          </button>

          {/* Step 2: Sky Chill */}
          <button
            className={`min-h-[58px] p-2 rounded-2xl bg-[#38bdf8] text-[#004965] shadow-[0_5px_0_#0284c7] active:translate-y-1 active:shadow-[0_2px_0_#0284c7] flex flex-col items-center justify-center text-center transition-all ${
              simStep < 2
                ? 'opacity-40 cursor-not-allowed'
                : 'cursor-pointer'
            } ${simStep === 2 ? 'ring-2 ring-[#00668a]' : ''}`}
            onClick={handleChillSky}
            disabled={simStep < 2}
          >
            <span className="material-symbols-outlined text-[22px]">ac_unit</span>
            <span className="font-rubik text-[12px] font-bold leading-tight mt-0.5">
              2. Chill Sky
            </span>
          </button>

          {/* Step 3: Rain */}
          <button
            className={`min-h-[58px] p-2 rounded-2xl bg-[#30c88f] text-[#004e34] shadow-[0_5px_0_#005236] active:translate-y-1 active:shadow-[0_2px_0_#005236] flex flex-col items-center justify-center text-center transition-all ${
              simStep < 3
                ? 'opacity-40 cursor-not-allowed'
                : 'cursor-pointer'
            } ${simStep === 3 ? 'ring-2 ring-[#004e34]' : ''}`}
            onClick={handleReleaseRain}
            disabled={simStep < 3}
          >
            <span className="material-symbols-outlined text-[22px]">water_drop</span>
            <span className="font-rubik text-[12px] font-bold leading-tight mt-0.5">
              3. Release Rain
            </span>
          </button>
        </div>

        {/* Mini Feedback Banner */}
        <div className="bg-white p-3 rounded-2xl shadow-[0_3px_0_#eae8e2] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00668a] text-[24px]">lightbulb</span>
            <p className="font-comfortaa text-[13px] text-[#1b1c19] leading-tight">
              {simStep === 1 ? (
                <>
                  Tap <strong>&ldquo;1. Turn Up Sun&rdquo;</strong> to warm the sea and see water turn into invisible vapor bubbles!
                </>
              ) : simStep === 2 ? (
                <>
                  Awesome! Water is evaporating! Now tap <strong>&ldquo;2. Chill Sky&rdquo;</strong> to condense the vapor!
                </>
              ) : simStep === 3 ? (
                <>
                  The vapor clumped into heavy grey clouds! Now tap <strong>&ldquo;3. Release Rain&rdquo;</strong>!
                </>
              ) : (
                <>
                  🎉 Hurray! Precipitation! The rain watered the meadow and new flowers sprouted!
                </>
              )}
            </p>
          </div>

          {simStep === 4 && (
            <button
              onClick={handleResetSim}
              className="px-3 py-1 rounded-full bg-[#eae8e2] hover:bg-[#dbdad4] font-rubik text-[12px] font-bold text-[#1b1c19] shrink-0"
            >
              Replay
            </button>
          )}
        </div>
      </section>

      {/* Kid Hypothesis / Prediction Selector */}
      <section className="bg-white rounded-3xl p-4 shadow-[0_6px_0_#eae8e2,0_12px_24px_rgba(0,102,138,0.06)] flex flex-col gap-3 border border-white/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ffdf9f] flex items-center justify-center text-[#5c4300] font-rubik text-[15px] font-bold">
            ?
          </div>
          <h3 className="font-rubik font-bold text-[20px] text-[#1b1c19]">Explorer&apos;s Big Guess</h3>
        </div>
        <p className="font-comfortaa text-[15px] text-[#3e484f]">
          What happens when the sun gets extra toasty over the water?
        </p>

        {/* Options Stack */}
        <div className="flex flex-col gap-2 mt-1">
          {[
            {
              id: 0,
              letter: 'A',
              text: 'Water evaporates faster to form bigger clouds!',
              correct: true,
            },
            {
              id: 1,
              letter: 'B',
              text: 'The ocean turns into blueberry juice!',
              correct: false,
            },
            {
              id: 2,
              letter: 'C',
              text: 'It immediately starts snowing everywhere.',
              correct: false,
            },
          ].map((opt) => {
            const isSelected = hypothesisSelected === opt.id;
            return (
              <button
                key={opt.id}
                className={`min-h-[56px] w-full p-3 rounded-2xl text-left flex items-center justify-between shadow-[0_3px_0_#eae8e2] active:translate-y-0.5 transition-all cursor-pointer ${
                  isSelected && opt.correct
                    ? 'bg-[#6ffbbe] text-[#002113]'
                    : isSelected && !opt.correct
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : 'bg-[#f0eee8] hover:bg-[#eae8e2] text-[#1b1c19]'
                }`}
                onClick={() => {
                  triggerHaptic([20]);
                  setHypothesisSelected(opt.id);
                  if (opt.correct) {
                    playSuccessFanfare();
                    onAddStars(15);
                    showPipToast(
                      'Brilliant detective work! Hot sun turns liquid water into vapor faster!'
                    );
                  } else {
                    playChime(350);
                    showPipToast(
                      'Nice guess! Try again - think about what happens to puddles on a hot day!'
                    );
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-rubik text-[13px] font-bold text-[#00668a]">
                    {opt.letter}
                  </span>
                  <span className="font-rubik text-[14px] font-bold">{opt.text}</span>
                </div>
                <span className="material-symbols-outlined text-[20px]">
                  {isSelected && opt.correct
                    ? 'check_circle'
                    : isSelected && !opt.correct
                    ? 'cancel'
                    : 'radio_button_unchecked'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Hypothesis Dynamic Reward Toast */}
        {hypothesisSelected === 0 && (
          <div className="mt-1 p-3 rounded-2xl bg-[#6ffbbe] text-[#002113] flex items-center gap-2 shadow-[0_3px_0_#4edea3]">
            <span className="material-symbols-outlined text-[24px]">celebration</span>
            <span className="font-comfortaa text-[14px] font-bold">
              Brilliant detective work! Hot sun turns liquid water into vapor faster! (+15 XP)
            </span>
          </div>
        )}
      </section>

      {/* Big Voice & Text Question Engine Bar */}
      <section className="bg-[#f0eee8] rounded-3xl p-4 shadow-[0_6px_0_#eae8e2] flex flex-col gap-3 border border-white/60">
        <div className="flex items-center justify-between">
          <label className="font-rubik font-bold text-[20px] text-[#1b1c19]" htmlFor="wonder-input">
            Ask Anything!
          </label>
          <span className="font-rubik text-[13px] font-bold text-[#00668a] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">magic_button</span> AI Pip Answers
          </span>
        </div>

        {/* Giant Search Pill */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAskQuestion();
          }}
          className="relative w-full flex items-center"
        >
          <input
            className="w-full h-14 pl-4 pr-16 rounded-full bg-white text-[#1b1c19] font-comfortaa text-[15px] shadow-[0_4px_0_#eae8e2] focus:outline-none focus:shadow-[0_4px_0_#38bdf8] placeholder:text-[#6e7980] transition-all"
            id="wonder-input"
            placeholder="What do you want to discover today?"
            type="text"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
          <button
            type="button"
            aria-label="Ask with Voice"
            className="absolute right-1 w-12 h-12 rounded-full bg-[#38bdf8] text-[#004965] shadow-[0_3px_0_#0284c7] active:translate-y-0.5 active:shadow-[0_1px_0_#0284c7] flex items-center justify-center transition-all cursor-pointer"
            onClick={() => {
              const samples = [
                'Why is the sky blue?',
                'Why does it rain?',
                'How do birds fly?',
                'Why does the moon change shape?',
              ];
              const randomQ = samples[Math.floor(Math.random() * samples.length)];
              setQuestionInput(randomQ);
              handleAskQuestion(randomQ);
            }}
          >
            <span className="material-symbols-outlined text-[26px]">
              {isAnswering ? 'hourglass_top' : 'mic'}
            </span>
          </button>
        </form>

        <div className="flex items-center justify-between px-1">
          <span className="font-comfortaa text-[13px] text-[#3e484f]">
            Tap the microphone to speak your question!
          </span>
          <span className="material-symbols-outlined text-[#38bdf8] text-[20px]">hearing</span>
        </div>

        {pipAnswer && (
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#38bdf8]/40 mt-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-rubik text-[12px] font-bold text-[#00668a]">Pip Explains:</span>
              <button
                onClick={() => speakPhrase(pipAnswer)}
                className="text-[#00668a] hover:opacity-80"
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
              </button>
            </div>
            <p className="font-comfortaa text-[14px] text-[#1b1c19] leading-relaxed">
              {pipAnswer}
            </p>
          </div>
        )}
      </section>

      {/* Suggested Wonder Cards Horizontal Flow */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-rubik font-bold text-[20px] text-[#1b1c19]">Explore More Mysteries</h3>
          <span className="font-rubik text-[13px] font-bold text-[#00668a]">5 New Today</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {MYSTERIES.map((myst) => (
            <div
              key={myst.id}
              className="min-w-[210px] w-[210px] shrink-0 bg-white rounded-2xl p-3 shadow-[0_5px_0_#eae8e2,0_10px_20px_rgba(0,102,138,0.05)] flex flex-col justify-between gap-3 active:scale-98 transition-transform cursor-pointer border border-white/60"
              onClick={() => {
                triggerHaptic([20]);
                playChime(620);
                onOpenMysteryDetail(myst);
              }}
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-full bg-[#c4e7ff] flex items-center justify-center text-[#001e2c]">
                  <span className="material-symbols-outlined text-[22px]">{myst.categoryIcon}</span>
                </span>
                <span className="material-symbols-outlined text-[#bdc8d1] text-[20px]">
                  volume_up
                </span>
              </div>

              <div>
                <span className="font-rubik text-[12px] font-bold text-[#00668a]">
                  {myst.category}
                </span>
                <p className="font-rubik font-bold text-[18px] text-[#1b1c19] leading-snug mt-0.5">
                  {myst.question}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-rubik text-[13px] text-[#3e484f] font-bold flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[16px] text-[#795900] fill-icon"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>{' '}
                  {myst.xp} XP
                </span>
                <span className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#00668a]">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-World Home Experiment Card (Unlockable DIY) */}
      <section className="bg-gradient-to-r from-[#ffdf9f] to-[#ffc329] rounded-3xl p-4 shadow-[0_6px_0_#d97706,0_12px_24px_rgba(121,89,0,0.12)] text-[#261a00] flex flex-col gap-3 relative overflow-hidden border border-white/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-white/80 text-[#1b1c19] px-3 py-1 rounded-full shadow-[0_2px_0_#eae8e2]">
            <span className="material-symbols-outlined text-[#795900] text-[18px]">science</span>
            <span className="font-rubik text-[12px] font-bold">Home Lab Mission</span>
          </div>
          <span className="font-rubik text-[11px] font-bold uppercase bg-[#6f5100] text-white px-2.5 py-0.5 rounded-full">
            With Grown-Up
          </span>
        </div>

        <div>
          <h3 className="font-rubik font-bold text-[20px] text-[#261a00] leading-snug">
            The Jar Cloud Experiment
          </h3>
          <p className="font-comfortaa text-[14px] text-[#5c4300] mt-1 leading-relaxed">
            Trap a real tiny fluffy cloud in your kitchen using warm water, ice cubes on top, and a splash of hairspray!
          </p>
        </div>

        {/* Step checklist badges */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/75 backdrop-blur rounded-2xl p-2 flex flex-col items-center shadow-sm">
            <span className="font-rubik text-[12px] font-bold text-[#1b1c19]">1. Glass Jar</span>
            <span className="font-comfortaa text-[11px] text-[#3e484f]">Warm Water</span>
          </div>
          <div className="bg-white/75 backdrop-blur rounded-2xl p-2 flex flex-col items-center shadow-sm">
            <span className="font-rubik text-[12px] font-bold text-[#1b1c19]">2. Cold Lid</span>
            <span className="font-comfortaa text-[11px] text-[#3e484f]">Ice Cubes</span>
          </div>
          <div className="bg-white/75 backdrop-blur rounded-2xl p-2 flex flex-col items-center shadow-sm">
            <span className="font-rubik text-[12px] font-bold text-[#1b1c19]">3. Poof!</span>
            <span className="font-comfortaa text-[11px] text-[#3e484f]">Cloud Appears</span>
          </div>
        </div>

        <button
          className="min-h-[56px] w-full mt-1 bg-white text-[#00668a] rounded-full font-rubik text-[15px] font-bold shadow-[0_4px_0_#eae8e2] active:translate-y-1 active:shadow-[0_1px_0_#eae8e2] flex items-center justify-center gap-2 transition-all cursor-pointer"
          onClick={() => {
            triggerHaptic([25]);
            playChime(650);
            onOpenDiyGuide();
          }}
        >
          <span className="material-symbols-outlined text-[22px]">play_circle</span>
          <span>See Grown-Up Instructions</span>
        </button>
      </section>

      {/* Pip Speech Toast */}
      {pipToastText && (
        <div className="fixed bottom-24 left-4 right-4 bg-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,102,138,0.25)] flex items-center gap-3 z-50 animate-bounce">
          <div className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-[#004965] shrink-0">
            <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-rubik text-[12px] font-bold text-[#00668a]">Pip says:</p>
            <p className="font-comfortaa text-[13px] text-[#1b1c19] truncate">{pipToastText}</p>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#3e484f]"
            onClick={() => setPipToastText(null)}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
