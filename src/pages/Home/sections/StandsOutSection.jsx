import React from 'react';
import './StandsOutSection.css';

export default function StandsOutSection() {
  return (
    <section className="stands-out section">
      <div className="container">
        
        {/* Section Header */}
        <div className="stands-out__header">
          <h2 className="stands-out__title">
            Why Ashoka IAS Academy <span className="text-gold">Stands Out?</span>
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Features Grid */}
        <div className="stands-out__grid">
          
          {/* Card 1 */}
          <div className="stands-out__card">
            <div className="stands-out__illustration-container">
              {/* Soft purple organic blob background */}
              <div className="stands-out__blob stands-out__blob--purple" />
              
              {/* Modern vector illustration: Mentorship/Discussion */}
              <svg viewBox="0 0 240 180" className="stands-out__svg" xmlns="http://www.w3.org/2000/svg">
                {/* Floor shadow */}
                <ellipse cx="120" cy="155" rx="75" ry="8" fill="rgba(0,0,0,0.04)" />
                
                {/* Left Figure (Mentor) */}
                <g className="illust-figure illust-figure--left">
                  {/* Chair */}
                  <path d="M45,115 L58,115 L58,155 M50,155 L50,115" stroke="#4A5568" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M40,95 L62,95 C62,95 65,115 58,115 L42,115 C38,115 40,95 40,95 Z" fill="#2D3748" />
                  <path d="M38,70 L38,95 L44,95 L44,70 Z" fill="#273c68" />
                  {/* Body/Torso */}
                  <path d="M50,85 C55,85 70,95 68,112 L52,112 Z" fill="#273c68" />
                  {/* Head & Hair */}
                  <circle cx="58" cy="74" r="8" fill="#FEEBC8" />
                  <path d="M52,70 C52,66 64,66 64,70 C64,72 62,74 58,74 C54,74 52,72 52,70 Z" fill="#1A202C" />
                  {/* Arm pointing/gesturing */}
                  <path d="M64,90 Q78,88 84,96" fill="none" stroke="#FEEBC8" strokeWidth="3" strokeLinecap="round" />
                  {/* Pants & Shoes */}
                  <path d="M55,112 L52,142 L48,142" fill="none" stroke="#4A5568" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M60,112 L64,142 L68,142" fill="none" stroke="#4A5568" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Desk/Table in the center */}
                <g className="illust-desk">
                  <path d="M100,120 L140,120 L135,155 M105,155 L100,120" stroke="#718096" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="92" y="114" width="56" height="6" rx="2" fill="#d3a62c" />
                  {/* Laptop */}
                  <path d="M110,104 L124,104 L126,114 L108,114 Z" fill="#E2E8F0" />
                  <path d="M106,114 L128,114" stroke="#CBD5E0" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Right Figure (Student) */}
                <g className="illust-figure illust-figure--right">
                  {/* Chair */}
                  <path d="M195,115 L182,115 L182,155 M190,155 L190,115" stroke="#4A5568" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M200,95 L178,95 C178,95 175,115 182,115 L198,115 C202,115 200,95 200,95 Z" fill="#2D3748" />
                  {/* Body/Torso */}
                  <path d="M190,85 C185,85 170,95 172,112 L188,112 Z" fill="#ED8936" />
                  {/* Head */}
                  <circle cx="182" cy="74" r="8" fill="#FEEBC8" />
                  <path d="M176,70 C176,66 188,66 188,70 C188,72 186,74 182,74 C178,74 176,72 176,70 Z" fill="#718096" />
                  {/* Arm holding pen/listening */}
                  <path d="M176,92 Q164,96 160,104" fill="none" stroke="#FEEBC8" strokeWidth="3" strokeLinecap="round" />
                  {/* Pants & Shoes */}
                  <path d="M185,112 L188,142 L192,142" fill="none" stroke="#2D3748" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M180,112 L176,142 L172,142" fill="none" stroke="#2D3748" strokeWidth="4.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <p className="stands-out__desc">
              Ensures comprehensive student mentorship & care.
            </p>
          </div>

          {/* Card 2 */}
          <div className="stands-out__card">
            <div className="stands-out__illustration-container">
              {/* Soft green organic blob background */}
              <div className="stands-out__blob stands-out__blob--green" />
              
              {/* Modern vector illustration: Communication & Chatting */}
              <svg viewBox="0 0 240 180" className="stands-out__svg" xmlns="http://www.w3.org/2000/svg">
                {/* Floor shadow */}
                <ellipse cx="120" cy="155" rx="85" ry="8" fill="rgba(0,0,0,0.04)" />
                
                {/* Left Figure on Beanbag */}
                <g className="illust-figure illust-figure--beanbag-left">
                  {/* Beanbag */}
                  <path d="M35,140 C35,115 75,115 85,130 C95,145 70,160 45,155 C35,152 35,145 35,140 Z" fill="#4A5568" />
                  {/* Torso */}
                  <path d="M50,115 C55,100 75,108 72,128 Z" fill="#3182CE" />
                  {/* Head */}
                  <circle cx="58" cy="98" r="8" fill="#FEEBC8" />
                  <path d="M52,94 C52,90 64,90 64,94 Z" fill="#1A202C" />
                  {/* Leg relaxed */}
                  <path d="M68,128 Q88,132 98,146" fill="none" stroke="#3182CE" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Right Figure on Beanbag */}
                <g className="illust-figure illust-figure--beanbag-right">
                  {/* Beanbag */}
                  <path d="M205,140 C205,115 165,115 155,130 C145,145 170,160 195,155 C205,152 205,145 205,140 Z" fill="#4A5568" />
                  {/* Torso */}
                  <path d="M190,115 C185,100 165,108 168,128 Z" fill="#38A169" />
                  {/* Head */}
                  <circle cx="182" cy="98" r="8" fill="#FEEBC8" />
                  <path d="M176,94 C176,90 188,90 188,94 Z" fill="#D69E2E" />
                  {/* Leg relaxed */}
                  <path d="M172,128 Q152,132 142,146" fill="none" stroke="#38A169" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Speech bubbles / Communication icons floating */}
                <g className="illust-chat">
                  {/* Left speech bubble */}
                  <path d="M85,75 C85,65 105,65 105,75 C105,82 98,82 95,85 L95,89 L91,85 C85,85 85,80 85,75 Z" fill="#E2E8F0" />
                  <circle cx="92" cy="75" r="1.5" fill="#4A5568" />
                  <circle cx="97" cy="75" r="1.5" fill="#4A5568" />
                  
                  {/* Right speech bubble */}
                  <path d="M155,70 C155,60 135,60 135,70 C135,77 142,77 145,80 L145,84 L149,80 C155,80 155,75 155,70 Z" fill="#273c68" />
                  <circle cx="148" cy="70" r="1.5" fill="#FFF" />
                  <circle cx="143" cy="70" r="1.5" fill="#FFF" />
                </g>
              </svg>
            </div>
            <p className="stands-out__desc">
              Regular Communication with Parents and Students.
            </p>
          </div>

          {/* Card 3 */}
          <div className="stands-out__card">
            <div className="stands-out__illustration-container">
              {/* Soft orange/pink organic blob background */}
              <div className="stands-out__blob stands-out__blob--orange" />
              
              {/* Modern vector illustration: Studying & Exam Sheets */}
              <svg viewBox="0 0 240 180" className="stands-out__svg" xmlns="http://www.w3.org/2000/svg">
                {/* Floor shadow */}
                <ellipse cx="120" cy="155" rx="75" ry="8" fill="rgba(0,0,0,0.04)" />
                
                {/* Stack of books */}
                <g className="illust-books">
                  {/* Book 1 (Bottom, Blue) */}
                  <rect x="75" y="136" width="90" height="14" rx="2" fill="#273c68" />
                  <rect x="80" y="139" width="85" height="8" fill="#FFF" opacity="0.9" />
                  
                  {/* Book 2 (Middle, Gold) */}
                  <rect x="83" y="122" width="74" height="14" rx="2" fill="#d3a62c" />
                  <rect x="87" y="125" width="70" height="8" fill="#FFF" opacity="0.9" />

                  {/* Book 3 (Top, Green) */}
                  <rect x="90" y="108" width="60" height="14" rx="2" fill="#38A169" />
                  <rect x="94" y="111" width="56" height="8" fill="#FFF" opacity="0.9" />
                </g>

                {/* Exam sheet leaning on the books */}
                <g className="illust-examsheet">
                  <path d="M125,75 L165,70 L178,135 L138,140 Z" fill="#FFF" stroke="#CBD5E0" strokeWidth="2.5" />
                  {/* Lines of text on exam sheet */}
                  <line x1="135" y1="84" x2="155" y2="81" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
                  <line x1="137" y1="96" x2="162" y2="92" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
                  <line x1="139" y1="108" x2="164" y2="104" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
                  <line x1="141" y1="120" x2="156" y2="117" stroke="#A0AEC0" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Big Gold star mark / Checkmark badge */}
                  <circle cx="168" cy="80" r="10" fill="#E53E3E" />
                  <path d="M165,80 L167,82 L172,77" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* Lightbulb (Idea / Excellence symbol) */}
                <g className="illust-bulb">
                  <path d="M120,40 C112,40 108,46 108,52 C108,58 113,60 115,64 L125,64 C127,60 132,58 132,52 C132,46 128,40 120,40 Z" fill="#FFF" stroke="#d3a62c" strokeWidth="2" />
                  <rect x="117" y="64" width="6" height="3" fill="#A0AEC0" />
                  <line x1="120" y1="36" x2="120" y2="30" stroke="#d3a62c" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="104" y1="46" x2="100" y2="44" stroke="#d3a62c" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="136" y1="46" x2="140" y2="44" stroke="#d3a62c" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <p className="stands-out__desc">
              Test Series, Mock Series, DPPs for regular practice.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
