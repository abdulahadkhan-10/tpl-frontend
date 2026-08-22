"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Shield, LayoutTemplate, Users, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useGetTacticsQuery, useSaveTacticsMutation, useGetMeQuery } from '@/store/slices/loginApi';

const initialPlayers = [
  { id: 1, name: 'D. De Gea', number: 1, type: 'GK' },
  { id: 2, name: 'A. Wan-Bissaka', number: 29, type: 'DEF' },
  { id: 3, name: 'R. Varane', number: 19, type: 'DEF' },
  { id: 4, name: 'L. Martínez', number: 6, type: 'DEF' },
  { id: 5, name: 'L. Shaw', number: 23, type: 'DEF' },
  { id: 6, name: 'Casemiro', number: 18, type: 'MID' },
  { id: 7, name: 'B. Fernandes', number: 8, type: 'MID' },
  { id: 8, name: 'C. Eriksen', number: 14, type: 'MID' },
  { id: 9, name: 'Antony', number: 21, type: 'FWD' },
  { id: 10, name: 'M. Rashford', number: 10, type: 'FWD' },
  { id: 11, name: 'A. Martial', number: 9, type: 'FWD' },
  { id: 12, name: 'H. Maguire', number: 5, type: 'DEF' },
  { id: 13, name: 'S. McTominay', number: 39, type: 'MID' },
  { id: 14, name: 'J. Sancho', number: 25, type: 'FWD' },
  { id: 15, name: 'A. Garnacho', number: 17, type: 'FWD' },
  { id: 16, name: 'T. Malacia', number: 12, type: 'DEF' },
];

const formations: Record<string, any[]> = {
  '4-3-3': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'CDM', top: '55%', left: '50%' },
    { posId: 7, role: 'CM', top: '45%', left: '75%' },
    { posId: 8, role: 'CM', top: '45%', left: '25%' },
    { posId: 9, role: 'RW', top: '20%', left: '80%' },
    { posId: 10, role: 'LW', top: '20%', left: '20%' },
    { posId: 11, role: 'ST', top: '15%', left: '50%' },
  ],
  '4-4-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'RM', top: '45%', left: '85%' },
    { posId: 7, role: 'CM', top: '45%', left: '60%' },
    { posId: 8, role: 'CM', top: '45%', left: '40%' },
    { posId: 9, role: 'LM', top: '45%', left: '15%' },
    { posId: 10, role: 'ST', top: '20%', left: '60%' },
    { posId: 11, role: 'ST', top: '20%', left: '40%' },
  ],
  '3-5-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'CB', top: '75%', left: '80%' },
    { posId: 3, role: 'CB', top: '75%', left: '50%' },
    { posId: 4, role: 'CB', top: '75%', left: '20%' },
    { posId: 5, role: 'RWB', top: '55%', left: '90%' },
    { posId: 6, role: 'LWB', top: '55%', left: '10%' },
    { posId: 7, role: 'CM', top: '50%', left: '65%' },
    { posId: 8, role: 'CM', top: '50%', left: '35%' },
    { posId: 9, role: 'CAM', top: '35%', left: '50%' },
    { posId: 10, role: 'ST', top: '15%', left: '65%' },
    { posId: 11, role: 'ST', top: '15%', left: '35%' },
  ],
  '4-2-3-1': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'CDM', top: '55%', left: '65%' },
    { posId: 7, role: 'CDM', top: '55%', left: '35%' },
    { posId: 8, role: 'RAM', top: '35%', left: '80%' },
    { posId: 9, role: 'CAM', top: '40%', left: '50%' },
    { posId: 10, role: 'LAM', top: '35%', left: '20%' },
    { posId: 11, role: 'ST', top: '15%', left: '50%' },
  ],
  '4-1-2-1-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'CDM', top: '60%', left: '50%' },
    { posId: 7, role: 'RCM', top: '45%', left: '70%' },
    { posId: 8, role: 'LCM', top: '45%', left: '30%' },
    { posId: 9, role: 'CAM', top: '35%', left: '50%' },
    { posId: 10, role: 'RS', top: '20%', left: '60%' },
    { posId: 11, role: 'LS', top: '20%', left: '40%' },
  ],
  '5-3-2': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RWB', top: '65%', left: '90%' },
    { posId: 3, role: 'RCB', top: '75%', left: '70%' },
    { posId: 4, role: 'CB', top: '75%', left: '50%' },
    { posId: 5, role: 'LCB', top: '75%', left: '30%' },
    { posId: 6, role: 'LWB', top: '65%', left: '10%' },
    { posId: 7, role: 'RCM', top: '45%', left: '70%' },
    { posId: 8, role: 'CM', top: '50%', left: '50%' },
    { posId: 9, role: 'LCM', top: '45%', left: '30%' },
    { posId: 10, role: 'RS', top: '20%', left: '65%' },
    { posId: 11, role: 'LS', top: '20%', left: '35%' },
  ],
  '3-4-3': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RCB', top: '75%', left: '75%' },
    { posId: 3, role: 'CB', top: '75%', left: '50%' },
    { posId: 4, role: 'LCB', top: '75%', left: '25%' },
    { posId: 5, role: 'RM', top: '50%', left: '85%' },
    { posId: 6, role: 'RCM', top: '50%', left: '60%' },
    { posId: 7, role: 'LCM', top: '50%', left: '40%' },
    { posId: 8, role: 'LM', top: '50%', left: '15%' },
    { posId: 9, role: 'RW', top: '20%', left: '80%' },
    { posId: 10, role: 'ST', top: '15%', left: '50%' },
    { posId: 11, role: 'LW', top: '20%', left: '20%' },
  ],
  '4-3-2-1': [
    { posId: 1, role: 'GK', top: '85%', left: '50%' },
    { posId: 2, role: 'RB', top: '70%', left: '85%' },
    { posId: 3, role: 'CB', top: '75%', left: '62%' },
    { posId: 4, role: 'CB', top: '75%', left: '38%' },
    { posId: 5, role: 'LB', top: '70%', left: '15%' },
    { posId: 6, role: 'RCM', top: '50%', left: '75%' },
    { posId: 7, role: 'CM', top: '55%', left: '50%' },
    { posId: 8, role: 'LCM', top: '50%', left: '25%' },
    { posId: 9, role: 'RAM', top: '35%', left: '65%' },
    { posId: 10, role: 'LAM', top: '35%', left: '35%' },
    { posId: 11, role: 'ST', top: '15%', left: '50%' },
  ]
};

export default function TacticsBuilder() {
  const [formation, setFormation] = useState('4-3-3');
  
  // Initialize state
  const [startingXI, setStartingXI] = useState<Record<number, any>>({
    1: initialPlayers[0],
    2: initialPlayers[1],
    3: initialPlayers[2],
    4: initialPlayers[3],
    5: initialPlayers[4],
    6: initialPlayers[5],
    7: initialPlayers[6],
    8: initialPlayers[7],
    9: initialPlayers[8],
    10: initialPlayers[9],
    11: initialPlayers[10],
  });
  
  const [bench, setBench] = useState<any[]>(initialPlayers.slice(11));
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Backend Queries & Mutations
  const { data: tacticsData } = useGetTacticsQuery();
  const [saveTacticsMutation, { isLoading: isSavingBackend }] = useSaveTacticsMutation();

  useEffect(() => {
    if (tacticsData?.tactics) {
      const { savedFormation, savedStartingXI, savedBench } = tacticsData.tactics;
      if (savedFormation && formations[savedFormation]) {
        setFormation(savedFormation);
      }
      if (savedStartingXI) setStartingXI(savedStartingXI);
      if (savedBench) setBench(savedBench);
    } else {
      const savedData = localStorage.getItem('tpl_tactics');
      if (savedData) {
        try {
          const { savedFormation, savedStartingXI, savedBench } = JSON.parse(savedData);
          if (savedFormation && formations[savedFormation]) {
            setFormation(savedFormation);
          }
          if (savedStartingXI) setStartingXI(savedStartingXI);
          if (savedBench) setBench(savedBench);
        } catch (e) {
          console.error("Failed to parse saved tactics", e);
        }
      }
    }
    setMounted(true);
  }, [tacticsData]);

  const handleDragStart = (e: React.DragEvent, player: any, sourcePosId: string) => {
    e.dataTransfer.setData('player', JSON.stringify(player));
    e.dataTransfer.setData('sourcePosId', sourcePosId);
  };

  const handleDropOnPitch = (e: React.DragEvent, targetPosId: number) => {
    e.preventDefault();
    const playerData = e.dataTransfer.getData('player');
    if (!playerData) return;
    
    const player = JSON.parse(playerData);
    const sourcePosId = e.dataTransfer.getData('sourcePosId');
    
    if (sourcePosId === targetPosId.toString()) return;

    const existingPlayer = startingXI[targetPosId];
    const newStartingXI = { ...startingXI };
    let newBench = [...bench];

    if (sourcePosId === 'bench') {
      newStartingXI[targetPosId] = player;
      newBench = newBench.filter(p => p.id !== player.id);
      if (existingPlayer) {
        newBench.push(existingPlayer);
      }
    } else {
      newStartingXI[targetPosId] = player;
      if (existingPlayer) {
        newStartingXI[parseInt(sourcePosId)] = existingPlayer;
      } else {
        delete newStartingXI[parseInt(sourcePosId)];
      }
    }

    setStartingXI(newStartingXI);
    setBench(newBench);
    setIsSaved(false);
  };

  const handleDropOnBench = (e: React.DragEvent) => {
    e.preventDefault();
    const playerData = e.dataTransfer.getData('player');
    if (!playerData) return;

    const player = JSON.parse(playerData);
    const sourcePosId = e.dataTransfer.getData('sourcePosId');

    if (sourcePosId === 'bench') return;

    const newStartingXI = { ...startingXI };
    delete newStartingXI[parseInt(sourcePosId)];
    
    setStartingXI(newStartingXI);
    setBench([...bench, player]);
    setIsSaved(false);
  };

  const saveTactics = async () => {
    const payload = {
      savedFormation: formation,
      savedStartingXI: startingXI,
      savedBench: bench
    };

    localStorage.setItem('tpl_tactics', JSON.stringify(payload));

    try {
      await saveTacticsMutation({ tactics: payload }).unwrap();
    } catch (e) {
      console.error("Backend tactics save error:", e);
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1A1C1C] font-montserrat tracking-tight">Tactics Builder</h1>
            <p className="text-sm text-slate-500 font-medium">Drag and drop players to arrange your starting XI.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={formation}
            onChange={(e) => setFormation(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent cursor-pointer"
          >
            {Object.keys(formations).map(f => (
              <option key={f} value={f}>{f} Formation</option>
            ))}
          </select>

          <button 
            onClick={saveTactics}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold font-montserrat uppercase tracking-wider transition-all flex items-center gap-2 ${
              isSaved ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-[#1A1C1C] hover:bg-black text-white shadow-sm'
            }`}
          >
            <Save size={16} />
            {isSaved ? 'Saved!' : 'Save Setup'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tactical Board */}
        <div className="flex-1 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider flex items-center gap-2">
              <LayoutTemplate size={18} className="text-[#FFB800]" />
              The Pitch
            </h2>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 py-1 bg-slate-100 rounded-full">
              {Object.keys(startingXI).length} / 11 Players Placed
            </div>
          </div>

          <div className="relative w-full aspect-[3/4] sm:aspect-square md:aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3] bg-emerald-600 rounded-xl border-[4px] border-emerald-500 shadow-inner mx-auto max-w-3xl">
            {/* Pitch Lines */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-white/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/30 rounded-full" />
            
            {/* Penalty Areas */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[15%] border-4 border-white/30 border-t-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[15%] border-4 border-white/30 border-b-0" />
            
            {/* 6-Yard Boxes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[5%] border-4 border-white/30 border-t-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-[5%] border-4 border-white/30 border-b-0" />

            {/* Drop Zones / Player Nodes */}
            {formations[formation].map((pos) => {
              const player = startingXI[pos.posId];
              return (
                <div 
                  key={pos.posId}
                  className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 z-10 transition-all duration-300"
                  style={{ top: pos.top, left: pos.left }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDropOnPitch(e, pos.posId)}
                >
                  <div className="text-[10px] font-black text-white/80 uppercase drop-shadow-md bg-black/30 px-1.5 rounded">{pos.role}</div>
                  
                  {player ? (
                    <div 
                      draggable
                      onDragStart={(e) => handleDragStart(e, player, pos.posId.toString())}
                      className={`relative w-10 h-10 rounded-full border-2 shadow-lg cursor-grab hover:scale-110 transition-transform flex items-center justify-center active:cursor-grabbing group ${
                        player.type === 'GK' ? 'bg-[#FACC15] border-white text-slate-900' : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-xs font-black">{player.number}</span>
                      
                      {/* Name Tooltip */}
                      <div className="absolute top-full mt-2 w-max px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl border border-slate-700">
                        {player.name}
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/50 bg-white/10 flex items-center justify-center">
                      <span className="text-white/50 text-lg font-bold">+</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Roster Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div 
            className="flex-1 bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnBench}
          >
            <h2 className="text-base font-extrabold font-montserrat text-[#1A1C1C] uppercase tracking-wider flex items-center gap-2 mb-4">
              <Users size={18} className="text-[#FFB800]" />
              Substitutes
            </h2>
            
            <div className="flex-1 min-h-[300px] max-h-[600px] bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col gap-2 overflow-y-auto">
              {bench.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <Shield size={32} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium">All players are on the pitch.</p>
                </div>
              ) : (
                bench.map((player) => (
                  <div 
                    key={player.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, player, 'bench')}
                    className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:border-[#FFB800] hover:shadow-md transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors ${
                      player.type === 'GK' ? 'bg-[#FACC15] text-slate-900' : 'bg-slate-100 text-slate-700 group-hover:bg-[#FFF9E6] group-hover:text-[#7C5800]'
                    }`}>
                      {player.number}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{player.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{player.type}</p>
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium">Drag</div>
                  </div>
                ))
              )}
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-4 font-medium">
              Drag players between the pitch and the bench to substitute.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
