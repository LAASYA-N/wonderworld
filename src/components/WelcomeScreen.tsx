import React, { useState } from 'react';
import { ASSETS } from '../data/wonderData';
import { ScreenType } from '../types';
import { playChime, speakPhrase, triggerHaptic, isSoundEnabled, setSoundEnabled } from '../utils/audio';

interface WelcomeScreenProps {
  onStartExploring: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartExploring }) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [pipSpeech, setPipSpeech] = useState(
    "I'm Pip! I wonder... where should our adventure begin today?"
  );
  const [isWaving, setIsWaving] = useState(false);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playChime(640);
    }
    triggerHaptic([25]);
  };

  const handleListen = () => {
    triggerHaptic([30]);
    playChime(700);
    const text = "Welcome to WonderWorld! Where will your curiosity take you today?";
    setPipSpeech(text);
    speakPhrase(text);
  };

  const handleMeetGuide = () => {
    triggerHaptic([30]);
    playChime(440);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1500);
    const greeting = "Hi! I'm Pip! My backpack is packed with telescopes, compasses, and tasty acorn cookies! Let's fly!";
    setPipSpeech(greeting);
    speakPhrase(greeting);
  };

  const previewDestination = (name: string, speech: string) => {
    triggerHaptic([20]);
    playChime(580);
    setPipSpeech(speech);
    speakPhrase(speech);
  };

  const handleStart = () => {
    triggerHaptic([40, 60, 40]);
    playChime(880, 'triangle');
    const msg = "3... 2... 1... Liftoff into WonderWorld!";
    setPipSpeech(msg);
    speakPhrase(msg);
    setTimeout(() => {
      onStartExploring();
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf9f3] text-[#1b1c19] flex flex-col justify-center items-center px-4 py-6 selection:bg-[#ffdf9f] select-none">
      <div className="w-full max-w-md mx-auto flex flex-col pb-6">
        {/* Top Audio Chime Toggle & Parent-Safe Quick Bar */}
        <div className="flex items-center justify-between w-full mb-3 px-1">
          <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md border border-white/50 px-3 py-1.5 rounded-full shadow-sm">
            <span
              className="material-symbols-outlined text-[#006c49] text-lg fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="font-rubik text-[13px] font-bold text-[#3e484f]">Kids Play Safe</span>
          </div>

          <button
            aria-label="Toggle Adventure Sounds"
            className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md border border-white/50 active:bg-[#ffdf9f] text-[#1b1c19] px-3.5 py-1.5 rounded-full shadow-sm transition-transform active:scale-95"
            onClick={toggleSound}
          >
            <span
              className="material-symbols-outlined text-[#795900] text-xl fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {soundOn ? 'volume_up' : 'volume_off'}
            </span>
            <span className="font-rubik text-[13px] font-bold text-[#1b1c19]">
              {soundOn ? 'Music On' : 'Muted'}
            </span>
          </button>
        </div>

        {/* WonderWorld Island Illustration Stage with Glassmorphism */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#c4e7ff]/40 via-white/50 to-white/90 backdrop-blur-xl border border-white/70 p-3 shadow-lg overflow-hidden">
          {/* Floating Sparkles & Clouds Background Layer */}
          <div className="absolute -top-3 -right-3 w-20 h-20 bg-[#ffc329]/30 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute top-1/3 -left-6 w-24 h-24 bg-[#38bdf8]/25 rounded-full blur-xl pointer-events-none"></div>

          {/* Magical Floating Island Landscape Hero */}
          <div
            className="relative w-full h-56 rounded-2xl bg-cover bg-center overflow-hidden shadow-md flex items-end p-3 border border-white/40"
            style={{
              backgroundImage: `url('${ASSETS.islandHero}')`,
            }}
          >
            {/* Ambient Island Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-white/60 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#795900] text-sm fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-rubik text-[13px] font-bold text-[#1b1c19]">
                Realm of Discovery
              </span>
            </div>

            {/* Glowing Crystal Interactive Indicator */}
            <div className="absolute top-3 right-3 bg-[#30c88f]/95 backdrop-blur-md text-[#004e34] px-3 py-1 rounded-full shadow-sm flex items-center gap-1 animate-pulse border border-emerald-300/40">
              <span
                className="material-symbols-outlined text-sm fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                diamond
              </span>
              <span className="font-rubik text-[13px] font-bold">5 Portals Live</span>
            </div>

            {/* Read-Aloud Bubble Helper */}
            <div className="w-full flex justify-end">
              <button
                aria-label="Listen to voice guide"
                className="bg-white/90 backdrop-blur-md border border-white/60 active:scale-95 text-[#00668a] rounded-full p-2 shadow-md flex items-center gap-1.5 px-3.5 transition-transform"
                onClick={handleListen}
              >
                <span
                  className="material-symbols-outlined text-lg fill-icon"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  record_voice_over
                </span>
                <span className="font-rubik text-[13px] font-bold text-[#00668a]">Listen</span>
              </button>
            </div>
          </div>

          {/* Mascot Pip & Speech Bubble Interactive Unit */}
          <div className="relative mt-3 flex items-start gap-3 p-1">
            {/* Pip 3D Mascot Avatar */}
            <div
              className={`relative shrink-0 cursor-pointer transition-transform ${
                isWaving ? 'scale-110' : 'hover:scale-105'
              }`}
              onClick={handleMeetGuide}
              title="Tap Pip!"
            >
              <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-[#ffc329] to-[#c4e7ff] p-1 shadow-md">
                <img
                  alt="Pip the Explorer, friendly baby red panda mascot wearing adventurer goggles"
                  className="w-full h-full object-cover rounded-full bg-[#fbf9f3]"
                  src={ASSETS.pipAvatar}
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 bg-[#006c49] text-white rounded-full w-6 h-6 flex items-center justify-center shadow-sm border-2 border-white ${
                  isWaving ? 'animate-bounce' : ''
                }`}
              >
                <span className="material-symbols-outlined text-sm">waving_hand</span>
              </div>
            </div>

            {/* Dynamic Speech Bubble */}
            <div className="relative flex-1 bg-white/85 backdrop-blur-md border border-white/70 p-3 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-rubik text-[13px] font-bold text-[#00668a]">
                  Pip the Explorer
                </span>
                <span
                  className="material-symbols-outlined text-[#795900] text-xs fill-icon"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  grade
                </span>
              </div>
              <p className="font-comfortaa text-[14px] text-[#1b1c19] leading-snug font-medium">
                &ldquo;{pipSpeech}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Hero Typography Section */}
        <div className="mt-4 text-center px-2">
          <h1 className="font-rubik font-extrabold text-[32px] text-[#1b1c19] tracking-tight leading-tight">
            Hey, Little Explorer!
          </h1>
          <p className="font-comfortaa text-[16px] text-[#3e484f] mt-1 max-w-xs mx-auto">
            A universe of discoveries is waiting for you.
          </p>
        </div>

        {/* Floating Destination Quick Chips (Horizontal Scroll) */}
        <div className="mt-4 w-full">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="font-rubik text-[12px] font-bold text-[#3e484f] uppercase tracking-wider">
              PICK A WORLD
            </span>
            <span className="font-rubik text-[12px] font-bold text-[#00668a]">Tap to glimpse</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-2 px-2">
            {/* Chip 1: Nature Kingdom */}
            <button
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[#1b1c19] active:bg-[#6ffbbe] shadow-sm transition-transform active:scale-95 hover:bg-white"
              onClick={() =>
                previewDestination(
                  'Nature Kingdom',
                  "🌿 Let's discover giant flowers and friendly jungle critters!"
                )
              }
            >
              <span
                className="material-symbols-outlined text-[#006c49] text-lg fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                forest
              </span>
              <span className="font-rubik text-[13px] font-bold">Nature Kingdom</span>
            </button>

            {/* Chip 2: Space Frontier */}
            <button
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[#1b1c19] active:bg-[#c4e7ff] shadow-sm transition-transform active:scale-95 hover:bg-white"
              onClick={() =>
                previewDestination(
                  'Space Frontier',
                  "🚀 Starship ready! We'll count shooting stars and build mini rockets!"
                )
              }
            >
              <span
                className="material-symbols-outlined text-[#00668a] text-lg fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                rocket_launch
              </span>
              <span className="font-rubik text-[13px] font-bold">Space Frontier</span>
            </button>

            {/* Chip 3: Invention Island */}
            <button
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[#1b1c19] active:bg-[#ffdf9f] shadow-sm transition-transform active:scale-95 hover:bg-white"
              onClick={() =>
                previewDestination(
                  'Invention Island',
                  "💡 Gears turning! Let's mix bubbly potions and make funny machines!"
                )
              }
            >
              <span
                className="material-symbols-outlined text-[#795900] text-lg fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lightbulb
              </span>
              <span className="font-rubik text-[13px] font-bold">Invention Island</span>
            </button>

            {/* Chip 4: Ocean Discovery */}
            <button
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[#1b1c19] active:bg-[#c4e7ff] shadow-sm transition-transform active:scale-95 hover:bg-white"
              onClick={() =>
                previewDestination(
                  'Ocean Discovery',
                  "🌊 Splash! The deep reef has glowing coral and ticklish sea turtles!"
                )
              }
            >
              <span
                className="material-symbols-outlined text-[#38bdf8] text-lg fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water
              </span>
              <span className="font-rubik text-[13px] font-bold">Ocean Discovery</span>
            </button>

            {/* Chip 5: Little City */}
            <button
              className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[#1b1c19] active:bg-[#f9bd22] shadow-sm transition-transform active:scale-95 hover:bg-white"
              onClick={() =>
                previewDestination(
                  'Little City',
                  '🛝 Ding ding! The toy tram is stopping at the playground bakery!'
                )
              }
            >
              <span
                className="material-symbols-outlined text-[#795900] text-lg fill-icon"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_city
              </span>
              <span className="font-rubik text-[13px] font-bold">Little City</span>
            </button>
          </div>
        </div>

        {/* Primary & Secondary Tactile Buttons */}
        <div className="mt-4 flex flex-col gap-3 w-full">
          {/* Primary Squishy Button: "START EXPLORING" */}
          <button
            className="w-full h-15 bg-[#38bdf8] active:bg-[#0284c7] active:scale-[0.98] text-[#004965] rounded-full shadow-[0_6px_0_#0284c7] active:shadow-[0_2px_0_#0284c7] active:translate-y-1 flex items-center justify-center gap-3 transition-all border border-white/40 cursor-pointer"
            onClick={handleStart}
          >
            <span
              className="material-symbols-outlined text-2xl fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              explore
            </span>
            <span className="font-rubik text-[18px] font-bold tracking-wide uppercase">
              Start Exploring
            </span>
            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
          </button>

          {/* Secondary Sunshine Button: "Meet Your Guide" */}
          <button
            className="w-full h-13 bg-[#ffc329] active:bg-[#d97706] text-[#6f5100] rounded-full shadow-[0_4px_0_#d97706] active:shadow-[0_1px_0_#d97706] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all border border-white/40 cursor-pointer"
            onClick={handleMeetGuide}
          >
            <span
              className="material-symbols-outlined text-xl fill-icon"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              face_retouching_natural
            </span>
            <span className="font-rubik text-[16px] font-bold">Meet Your Guide Pip</span>
          </button>
        </div>

        {/* Safe Exploration Guarantee Badge */}
        <div className="mt-4 w-full bg-white/75 backdrop-blur-md border border-white/60 p-2.5 rounded-2xl shadow-sm flex items-center justify-center gap-2 text-center">
          <span
            className="material-symbols-outlined text-[#006c49] text-lg fill-icon"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="font-comfortaa text-[14px] text-[#3e484f] font-semibold">
            100% Kid Safe &amp; Ad-Free • No Account Needed
          </span>
        </div>
      </div>
    </div>
  );
};
