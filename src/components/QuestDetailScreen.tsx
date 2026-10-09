import React, { useState } from 'react';
import { ASSETS } from '../data/wonderData';
import { ScreenType } from '../types';
import {
  playChime,
  playSuccessFanfare,
  playWaterDropSound,
  speakPhrase,
  triggerHaptic,
} from '../utils/audio';

interface QuestDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onAddStars: (amount: number) => void;
}

export const QuestDetailScreen: React.FC<QuestDetailScreenProps> = ({
  onBack,
  onNavigate,
  onAddStars,
}) => {
  const [water, setWater] = useState<'none' | 'opt' | 'flood'>('opt');
  const [sun, setSun] = useState<'dark' | 'opt' | 'desert'>('opt');
  const [soil, setSoil] = useState<'sand' | 'opt' | 'clay'>('opt');
  const [hasRun, setHasRun] = useState<boolean>(true);
  const [isThriving, setIsThriving] = useState<boolean>(true);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [rewardClaimed, setRewardClaimed] = useState<boolean>(false);

  const [pipFeedback, setPipFeedback] = useState<string>(
    "Welcome Scientist! Wild sunflowers love just the right balance. Try experimenting with the dials to see what makes leaves turn bright green!"
  );

  const hints = [
    "Pip's Pro-Tip: Look at the badges above the sunflower! They show the current ingredients you are testing.",
    "Botanist Secret: The perfect sunflower thrives with: Just Right water + Warm Sun + Rich Compost!",
    "Great scientists test one dial at a time to observe how each change affects the leaves!",
  ];

  const handlePipHint = () => {
    triggerHaptic([20]);
    playChime(620);
    const nextHint = hints[hintIndex % hints.length];
    setPipFeedback(nextHint);
    speakPhrase(nextHint);
    setHintIndex((prev) => prev + 1);
  };

  const handleAudioStory = () => {
    triggerHaptic([25]);
    playChime(580);
    const story =
      "Save the Thirsty Garden! The wild sunflowers in Nature Kingdom are drooping down! Can you balance sunlight, soil, and water so our friendly blossom can smile again?";
    setPipFeedback(story);
    speakPhrase(story);
  };

  const handleRunExperiment = () => {
    triggerHaptic([35, 45, 35]);
    setHasRun(true);

    if (water === 'opt' && sun === 'opt' && soil === 'opt') {
      setIsThriving(true);
      playSuccessFanfare();
      if (!rewardClaimed) {
        setRewardClaimed(true);
        onAddStars(25);
      }
      const msg =
        "Hooray! That's the golden formula! Warm sun feeds the leaves, rich compost gives nourishment, and perfect water drinks fuel growth!";
      setPipFeedback(msg);
      speakPhrase(msg);
    } else {
      setIsThriving(false);
      playWaterDropSound();

      if (water === 'flood') {
        const msg =
          "Oops, roots are soaked! Plant roots breathe tiny pockets of air inside the dirt. Let's adjust the water dial to 'Just Right'!";
        setPipFeedback(msg);
        speakPhrase(msg);
      } else if (water === 'none') {
        const msg =
          "The sunflower is feeling faint! Sunflowers need water droplets to carry minerals up from the soil. Try adding water!";
        setPipFeedback(msg);
        speakPhrase(msg);
      } else if (sun === 'desert') {
        const msg =
          "Phew, that scorcher heat is evaporating water too fast! Sunflowers love gentle warmth. Try switching to 'Warm Sun'!";
        setPipFeedback(msg);
        speakPhrase(msg);
      } else if (sun === 'dark') {
        const msg =
          "Plants use sunlight to cook their own food using Photosynthesis! Without sunbeams, our flower stays sleepy. Let's give it Warm Sun!";
        setPipFeedback(msg);
        speakPhrase(msg);
      } else {
        const msg =
          "The plant is surviving, but rich dark compost is like a super-healthy smoothie for sunflower roots! Try Rich Compost!";
        setPipFeedback(msg);
        speakPhrase(msg);
      }
    }
  };

  // Compute status labels
  const getStatusText = () => {
    if (!hasRun) return 'Ready to test: Tap ingredients below!';
    if (isThriving) return 'Spectacular Bloom! Golden petals unlocked!';
    if (water === 'flood') return 'Roots are soaked! Soil is waterlogged.';
    if (water === 'none') return 'Thirsty! Leaves are drooping down.';
    if (sun === 'desert') return 'Too hot! Sun is crisping the petals.';
    if (sun === 'dark') return 'In the dark! Cannot make energy.';
    return 'Soil could be richer in minerals!';
  };

  const getHealthBadge = () => {
    if (!hasRun) return 'Status';
    if (isThriving) return '100% Thriving';
    if (water === 'flood') return 'Needs Air';
    if (water === 'none') return 'Dry Soil';
    if (sun === 'desert') return 'Heat Stress';
    if (sun === 'dark') return 'No Sunlight';
    return 'Hungry Soil';
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5 select-none">
      {/* Learning Loop Stage Banner */}
      <div className="w-full bg-[#f5f3ee] rounded-2xl p-3 shadow-sm border border-white/60">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="font-rubik text-[12px] font-bold text-[#00668a] uppercase tracking-wider">
            Mission 1 • Scientific Method
          </span>
          <div className="flex items-center gap-1 bg-[#eae8e2] px-2.5 py-1 rounded-full">
            <span
              className="material-symbols-outlined text-[16px] text-[#006c49] fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <span className="font-rubik text-[12px] font-bold text-[#3e484f]">
              Step 4 of 6: Experiment
            </span>
          </div>
        </div>

        {/* Step Tracker Pills */}
        <div className="grid grid-cols-6 gap-1 text-center font-rubik text-[12px] font-bold">
          <div className="py-1 rounded-full bg-[#006c49] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px]">check</span>
          </div>
          <div className="py-1 rounded-full bg-[#006c49] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px]">check</span>
          </div>
          <div className="py-1 rounded-full bg-[#006c49] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[14px]">check</span>
          </div>
          <div className="py-1 rounded-full bg-[#00668a] text-white shadow-sm">Test</div>
          <div className="py-1 rounded-full bg-[#e4e2dd] text-[#3e484f] opacity-75">Learn</div>
          <div className="py-1 rounded-full bg-[#e4e2dd] text-[#3e484f] opacity-75">Apply</div>
        </div>
      </div>

      {/* Story Mission Card */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3 border border-white/60">
        <div className="w-12 h-12 rounded-full bg-[#ffdf9f] flex items-center justify-center shrink-0 shadow-[0_4px_0_#e4b335]">
          <span
            className="material-symbols-outlined text-[28px] text-[#5c4300] fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_florist
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-rubik font-bold text-[20px] text-[#1b1c19] leading-snug">
              Save the Thirsty Garden!
            </span>
            <button
              aria-label="Listen to mission story"
              className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#00668a] active:scale-90 transition-transform cursor-pointer"
              onClick={handleAudioStory}
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
            </button>
          </div>
          <p className="font-comfortaa text-[14px] text-[#3e484f] leading-relaxed">
            &ldquo;The wild sunflowers in Nature Kingdom are drooping down! Can you balance sunlight, soil, and water so our friendly blossom can smile again?&rdquo;
          </p>
        </div>
      </div>

      {/* Interactive Plant Chamber Box */}
      <div className="w-full bg-white rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col items-center border border-white/60">
        {/* Ambient Backdrop Gradient */}
        <div
          className={`absolute inset-0 transition-colors duration-700 pointer-events-none ${
            sun === 'desert'
              ? 'bg-gradient-to-b from-[#ffdad6]/40 to-[#f5f3ee]'
              : sun === 'dark'
              ? 'bg-gradient-to-b from-[#64748b]/20 to-[#f5f3ee]'
              : 'bg-gradient-to-b from-[#c4e7ff]/30 to-[#f5f3ee]'
          }`}
        ></div>

        {/* Weather/Environment Badges */}
        <div className="relative w-full flex items-center justify-between z-10 mb-2">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-[#1b1c19] font-rubik text-[12px] font-bold shadow-sm backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px] text-[#795900]">wb_sunny</span>
            <span>
              {sun === 'dark' ? 'Dark Shade' : sun === 'opt' ? 'Warm Sun' : 'Scorching Sun'}
            </span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-[#1b1c19] font-rubik text-[12px] font-bold shadow-sm backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px] text-[#795900]">landscape</span>
            <span>
              {soil === 'sand' ? 'Sandy' : soil === 'opt' ? 'Rich Compost' : 'Heavy Clay'}
            </span>
          </div>

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-[#1b1c19] font-rubik text-[12px] font-bold shadow-sm backdrop-blur-sm">
            <span className="material-symbols-outlined text-[16px] text-[#00668a]">water_drop</span>
            <span>
              {water === 'none' ? 'None (Dry)' : water === 'opt' ? 'Just Right' : 'Flooded'}
            </span>
          </div>
        </div>

        {/* Animated Sunflower Canvas/Stage */}
        <div className="relative w-64 h-64 flex items-center justify-center z-10">
          {/* Flying Bees when thriving */}
          {isThriving && (
            <>
              <div
                className="absolute top-4 left-6 animate-bounce text-[#795900] text-[24px]"
                style={{ animationDuration: '1.8s' }}
              >
                <span className="material-symbols-outlined">pest_control_rodent</span>
              </div>
              <div
                className="absolute top-8 right-6 animate-pulse text-[#795900] text-[20px]"
                style={{ animationDuration: '1.2s' }}
              >
                <span className="material-symbols-outlined">cruelty_free</span>
              </div>
            </>
          )}

          {/* Sunflower SVG Graphic */}
          <svg
            className={`w-56 h-56 transition-transform duration-700 ease-out origin-bottom transform ${
              isThriving
                ? 'translate-y-0 scale-105'
                : water === 'flood'
                ? 'translate-y-2 rotate-[-6deg]'
                : water === 'none'
                ? 'translate-y-3 rotate-[10deg]'
                : sun === 'desert'
                ? 'translate-y-2 rotate-[8deg]'
                : sun === 'dark'
                ? 'translate-y-2 rotate-[-4deg]'
                : 'translate-y-1'
            }`}
            viewBox="0 0 200 200"
          >
            {/* Soil Mound */}
            <ellipse className="fill-[#e4e2dd]" cx="100" cy="180" rx="60" ry="14"></ellipse>
            <path
              d="M 50 180 Q 100 160 150 180 Z"
              fill={soil === 'sand' ? '#d4a373' : soil === 'clay' ? '#9c6644' : '#6f5100'}
            ></path>

            {/* Stem */}
            <path
              className="transition-all duration-700"
              d={
                isThriving
                  ? 'M 100 170 Q 100 115 100 70'
                  : water === 'flood'
                  ? 'M 100 170 Q 115 125 90 95'
                  : water === 'none'
                  ? 'M 100 170 Q 80 130 110 105'
                  : 'M 100 170 Q 100 120 100 80'
              }
              fill="none"
              stroke={
                isThriving
                  ? '#30c88f'
                  : water === 'none'
                  ? '#795900'
                  : water === 'flood'
                  ? '#006c49'
                  : '#30c88f'
              }
              strokeLinecap="round"
              strokeWidth="10"
            ></path>

            {/* Leaves */}
            <g className="transition-all duration-700">
              <ellipse
                className="transition-transform duration-700 origin-center"
                cx="80"
                cy={isThriving ? 120 : 130}
                fill={water === 'none' ? '#a27b5c' : '#006c49'}
                rx="20"
                ry="8"
                transform={
                  isThriving
                    ? 'rotate(-15 80 120)'
                    : water === 'none'
                    ? 'rotate(-50 80 130)'
                    : 'rotate(-30 80 130)'
                }
              ></ellipse>
              <ellipse
                className="transition-transform duration-700 origin-center"
                cx="120"
                cy={isThriving ? 110 : 120}
                fill={water === 'none' ? '#a27b5c' : '#006c49'}
                rx="20"
                ry="8"
                transform={
                  isThriving
                    ? 'rotate(15 120 110)'
                    : water === 'none'
                    ? 'rotate(50 120 120)'
                    : 'rotate(30 120 120)'
                }
              ></ellipse>
            </g>

            {/* Flower Head Group */}
            <g
              className="transition-all duration-700 origin-center"
              transform={
                isThriving
                  ? 'translate(100, 70)'
                  : water === 'flood'
                  ? 'translate(90, 95)'
                  : water === 'none'
                  ? 'translate(110, 105)'
                  : 'translate(100, 80)'
              }
            >
              {/* Petals Ring */}
              <g>
                {[
                  { cx: 0, cy: -30 },
                  { cx: 21, cy: -21 },
                  { cx: 30, cy: 0 },
                  { cx: 21, cy: 21 },
                  { cx: 0, cy: 30 },
                  { cx: -21, cy: 21 },
                  { cx: -30, cy: 0 },
                  { cx: -21, cy: -21 },
                ].map((pos, i) => (
                  <circle
                    key={i}
                    cx={pos.cx}
                    cy={pos.cy}
                    fill={
                      sun === 'desert'
                        ? '#d97706'
                        : sun === 'dark'
                        ? '#e4e2dd'
                        : '#ffc329'
                    }
                    r={isThriving ? 14 : 11}
                  ></circle>
                ))}
              </g>

              {/* Center Face */}
              <circle cx="0" cy="0" fill="#795900" r="22"></circle>
              {/* Eyes */}
              <circle cx="-7" cy="-4" fill="#ffffff" r="3.5"></circle>
              <circle cx="7" cy="-4" fill="#ffffff" r="3.5"></circle>
              <circle cx="-7" cy="-4" fill="#1b1c19" r="1.8"></circle>
              <circle cx="7" cy="-4" fill="#1b1c19" r="1.8"></circle>

              {/* Mouth */}
              <path
                className="transition-all duration-300"
                d={
                  isThriving
                    ? 'M -10 6 Q 0 16 10 6' // Big happy smile
                    : water === 'flood'
                    ? 'M -6 12 Q 0 8 6 12' // Wobbly frown
                    : water === 'none'
                    ? 'M -6 12 Q 0 8 6 12' // Frown
                    : sun === 'desert'
                    ? 'M -6 10 Q 0 6 6 10'
                    : 'M -6 9 Q 0 9 6 9' // Flat
                }
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeWidth="2.5"
              ></path>
            </g>
          </svg>
        </div>

        {/* Status Banner Inside Chamber */}
        <div
          className={`z-10 w-full mt-2 py-2.5 px-3 rounded-2xl flex items-center justify-between shadow-sm transition-all ${
            isThriving
              ? 'bg-[#30c88f] text-[#004e34]'
              : 'bg-[#ffdf9f] text-[#5c4300]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[20px] fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isThriving ? 'eco' : 'spa'}
            </span>
            <span className="font-rubik text-[13px] font-bold">{getStatusText()}</span>
          </div>
          <span
            className={`font-rubik text-[12px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
              isThriving ? 'bg-[#006c49] text-white' : 'bg-white text-[#1b1c19]'
            }`}
          >
            {getHealthBadge()}
          </span>
        </div>
      </div>

      {/* Interactive Control Dials / Toy Squishy Triggers */}
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="font-rubik font-bold text-[20px] text-[#1b1c19]">Garden Controls</span>
          <span className="font-comfortaa text-[13px] text-[#3e484f]">Tap to adjust levels</span>
        </div>

        {/* 1. Water Level Control */}
        <div className="w-full bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-white/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#c4e7ff] flex items-center justify-center text-[#00668a]">
                <span className="material-symbols-outlined text-[20px]">water_drop</span>
              </div>
              <span className="font-rubik text-[14px] font-bold text-[#1b1c19]">Water Level</span>
            </div>
            <span className="font-rubik text-[13px] font-bold text-[#00668a]">
              {water === 'none' ? 'None (Dry)' : water === 'opt' ? 'Just Right' : 'Flooded'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                water === 'none'
                  ? 'bg-[#00668a] text-white shadow-[0_4px_0_#004c69]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setWater('none');
              }}
            >
              None (Dry)
            </button>
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                water === 'opt'
                  ? 'bg-[#00668a] text-white shadow-[0_4px_0_#004c69]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setWater('opt');
              }}
            >
              Just Right 💧
            </button>
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                water === 'flood'
                  ? 'bg-[#00668a] text-white shadow-[0_4px_0_#004c69]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setWater('flood');
              }}
            >
              Flooded 🌊
            </button>
          </div>
        </div>

        {/* 2. Sunlight Level Control */}
        <div className="w-full bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-white/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#ffdf9f] flex items-center justify-center text-[#795900]">
                <span className="material-symbols-outlined text-[20px]">sunny</span>
              </div>
              <span className="font-rubik text-[14px] font-bold text-[#1b1c19]">
                Sunlight Intensity
              </span>
            </div>
            <span className="font-rubik text-[13px] font-bold text-[#795900]">
              {sun === 'dark' ? 'Dark Shade' : sun === 'opt' ? 'Warm Sun' : 'Scorching'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                sun === 'dark'
                  ? 'bg-[#ffc329] text-[#6f5100] shadow-[0_4px_0_#b88a00]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setSun('dark');
              }}
            >
              Dark Shade 🌑
            </button>
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                sun === 'opt'
                  ? 'bg-[#ffc329] text-[#6f5100] shadow-[0_4px_0_#b88a00]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setSun('opt');
              }}
            >
              Warm Sun ☀️
            </button>
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                sun === 'desert'
                  ? 'bg-[#ffc329] text-[#6f5100] shadow-[0_4px_0_#b88a00]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setSun('desert');
              }}
            >
              Scorching 🔥
            </button>
          </div>
        </div>

        {/* 3. Soil Nutrients Control */}
        <div className="w-full bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-white/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6ffbbe] flex items-center justify-center text-[#006c49]">
                <span className="material-symbols-outlined text-[20px]">terrain</span>
              </div>
              <span className="font-rubik text-[14px] font-bold text-[#1b1c19]">
                Soil Nutrients
              </span>
            </div>
            <span className="font-rubik text-[13px] font-bold text-[#006c49]">
              {soil === 'sand' ? 'Sandy' : soil === 'opt' ? 'Rich Compost' : 'Heavy Clay'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                soil === 'sand'
                  ? 'bg-[#30c88f] text-[#004e34] shadow-[0_4px_0_#005236]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setSoil('sand');
              }}
            >
              Sandy 🏜️
            </button>
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                soil === 'opt'
                  ? 'bg-[#30c88f] text-[#004e34] shadow-[0_4px_0_#005236]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setSoil('opt');
              }}
            >
              Rich Compost 🌱
            </button>
            <button
              className={`py-2.5 px-2 rounded-xl font-rubik text-[13px] font-bold transition-all cursor-pointer ${
                soil === 'clay'
                  ? 'bg-[#30c88f] text-[#004e34] shadow-[0_4px_0_#005236]'
                  : 'bg-[#eae8e2] text-[#1b1c19] shadow-sm hover:bg-white'
              }`}
              onClick={() => {
                triggerHaptic([15]);
                setSoil('clay');
              }}
            >
              Heavy Clay 🧱
            </button>
          </div>
        </div>
      </div>

      {/* Big Interactive Squishy Test Button */}
      <button
        className="w-full py-4 px-6 rounded-2xl bg-[#38bdf8] text-[#004965] font-rubik font-bold text-[20px] shadow-[0_6px_0_#00668a] active:translate-y-1 active:shadow-[0_2px_0_#00668a] transition-all flex items-center justify-center gap-2 cursor-pointer"
        onClick={handleRunExperiment}
      >
        <span className="material-symbols-outlined text-[28px]">science</span>
        <span>Run Botanical Experiment!</span>
      </button>

      {/* Pip's Progressive Hint & Mascot Feedback Card */}
      <div className="w-full bg-[#f5f3ee] rounded-2xl p-4 shadow-sm flex items-start gap-3 border border-white/60">
        <img
          alt="Pip the Explorer Mascot"
          className="w-16 h-16 rounded-full object-cover shrink-0 shadow-[0_3px_0_#bdc8d1]"
          src={ASSETS.pipAvatar}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-rubik text-[14px] font-bold text-[#1b1c19]">
                Pip&apos;s Field Notes
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdf9f] text-[#5c4300] font-rubik text-[11px] font-bold">
                Explorer Guide
              </span>
            </div>
            <button
              aria-label="Ask Pip for a hint"
              className="w-8 h-8 rounded-full bg-[#eae8e2] flex items-center justify-center text-[#00668a] active:scale-90 transition-transform cursor-pointer"
              onClick={handlePipHint}
            >
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </button>
          </div>
          <p className="font-comfortaa text-[13px] text-[#3e484f] leading-relaxed">
            &ldquo;{pipFeedback}&rdquo;
          </p>
        </div>
      </div>

      {/* Discovery Reward Area */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-white/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#795900] text-[24px]">military_tech</span>
            <span className="font-rubik font-bold text-[18px] text-[#1b1c19]">Mission Rewards</span>
          </div>
          <span
            className={`font-rubik text-[12px] font-bold px-2.5 py-0.5 rounded-full ${
              rewardClaimed || isThriving
                ? 'bg-[#006c49] text-white'
                : 'bg-[#eae8e2] text-[#3e484f]'
            }`}
          >
            {rewardClaimed || isThriving ? 'Unlocked!' : 'In Progress'}
          </span>
        </div>

        {/* Reward Cards Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Badge */}
          <div className="bg-[#f5f3ee] rounded-xl p-2.5 flex flex-col items-center text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                isThriving
                  ? 'bg-[#ffc329] text-[#6f5100] shadow-[0_2px_0_#d97706]'
                  : 'bg-[#e4e2dd] text-[#3e484f]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">award_star</span>
            </div>
            <span className="font-rubik text-[12px] font-bold text-[#1b1c19] truncate w-full">
              Master Botanist
            </span>
            <span className="font-comfortaa text-[11px] text-[#3e484f] leading-tight">
              Badge Earned
            </span>
          </div>

          {/* Wonder Crystals */}
          <div className="bg-[#f5f3ee] rounded-xl p-2.5 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#ffdf9f] text-[#5c4300] flex items-center justify-center mb-1.5">
              <span
                className="material-symbols-outlined text-[22px] fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                diamond
              </span>
            </div>
            <span className="font-rubik text-[12px] font-bold text-[#1b1c19]">+25 Crystals</span>
            <span className="font-comfortaa text-[11px] text-[#3e484f] leading-tight">
              Kingdom Energy
            </span>
          </div>

          {/* Specimen Journal */}
          <div className="bg-[#f5f3ee] rounded-xl p-2.5 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#6ffbbe] text-[#006c49] flex items-center justify-center mb-1.5">
              <span className="material-symbols-outlined text-[22px]">grain</span>
            </div>
            <span className="font-rubik text-[12px] font-bold text-[#1b1c19] truncate w-full">
              Seed of Life
            </span>
            <span className="font-comfortaa text-[11px] text-[#3e484f] leading-tight">
              Journal Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Real-World Offline Exploration Card */}
      <div className="w-full bg-[#f5f3ee] rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-white/60">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#006c49] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">cottage</span>
          </div>
          <span className="font-rubik text-[13px] font-bold text-[#006c49]">
            Real-World Explorer Challenge
          </span>
        </div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm shrink-0 text-[#795900]">
            <span className="material-symbols-outlined text-[32px]">yard</span>
          </div>
          <div>
            <span className="font-rubik text-[13px] font-bold text-[#1b1c19] block mb-0.5">
              Kitchen Window Greenhouse!
            </span>
            <p className="font-comfortaa text-[13px] text-[#3e484f] leading-relaxed">
              &ldquo;Wet a folded paper towel, tuck a dry bean seed inside a clear jar or baggie, and tape it to a sunny window! Watch roots pop out in 3 days!&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Next Mission Action Bar */}
      <div className="w-full pt-1">
        <button
          className="w-full py-4 px-5 rounded-2xl bg-[#ffc329] text-[#6f5100] font-rubik font-bold text-[18px] shadow-[0_6px_0_#795900] active:translate-y-1 active:shadow-[0_2px_0_#795900] transition-all flex items-center justify-between cursor-pointer"
          onClick={() => {
            triggerHaptic([30]);
            playChime(640);
            speakPhrase("Launching next quest: The Missing Butterfly Mission!");
            onNavigate('missions');
          }}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            <span>Next: The Missing Butterfly Mission</span>
          </div>
          <span className="material-symbols-outlined text-[24px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};
