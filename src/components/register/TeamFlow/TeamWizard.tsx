"use client";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { RootState } from '@/store';
import { setTeamRegistrationData, setStep, nextStep, prevStep, resetRegistration } from '@/store/slices/registrationSlice';
import { TeamInfoStep } from './Steps/TeamInfoStep';
import { ManagerInfoStep } from './Steps/ManagerInfoStep';
import { PlayerRosterStep } from './Steps/PlayerRosterStep';
import { ReviewAndPayStep } from './Steps/ReviewAndPayStep';

export const TeamWizard = () => {
  const currentStep = useSelector((state: RootState) => state.registration.currentStep);
  const teamData = useSelector((state: RootState) => state.registration.teamRegistration);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check for stored draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('tpl_team_registration_draft');
    if (draft) {
      try {
        const { data, step } = JSON.parse(draft);
        if (data && Object.keys(data).length > 0) {
          dispatch(setTeamRegistrationData(data));
          dispatch(setStep(step));
          setHasRestoredDraft(true);
        }
      } catch (e) {
        console.error('Error parsing draft', e);
      }
    }
    setIsReady(true);
  }, [dispatch]);

  // Save draft whenever teamData or currentStep changes
  useEffect(() => {
    if (isReady && teamData && Object.keys(teamData).length > 0 && !isCompleted) {
      localStorage.setItem('tpl_team_registration_draft', JSON.stringify({
        data: teamData,
        step: currentStep
      }));
    }
  }, [teamData, currentStep, isCompleted, isReady]);

  const handleStartOver = () => {
    localStorage.removeItem('tpl_team_registration_draft');
    dispatch(resetRegistration());
    setHasRestoredDraft(false);
  };

  const handleTeamInfoSubmit = (data: any) => {
    dispatch(setTeamRegistrationData({
      teamName: data.teamName,
      email: data.email,
      password: data.password,
      cityOrTown: data.cityOrTown,
      logoUrl: data.logoUrl,
      socialLinks: {
        instagram: data.instagram,
        tiktok: data.tiktok,
        facebook: data.facebook,
        twitter: data.twitter,
      }
    }));
    dispatch(nextStep());
  };

  const handleManagerInfoSubmit = (data: any) => {
    dispatch(setTeamRegistrationData({
      manager: {
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        contactNumber: data.contactNumber,
        email: data.email,
        homeAddress: data.homeAddress,
        emergencyContactName: data.emergencyContactName,
        emergencyContactRelation: data.emergencyContactRelation,
        emergencyContactPhone: data.emergencyContactPhone,
      }
    }));
    dispatch(nextStep());
  };

  const handleRosterSubmit = (data: any) => {
    dispatch(setTeamRegistrationData({
      players: data.players,
    }));
    dispatch(nextStep());
  };

  const handleFinalSubmit = () => {
    // Save signature
    dispatch(setTeamRegistrationData({
      manager: {
        ...teamData.manager,
        agreedToManagerAgreement: true,
        agreedToTournamentRules: true,
        acceptedTerms: true,
      }
    }));
    localStorage.removeItem('tpl_team_registration_draft');
    setIsCompleted(true);
  };

  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/register/player?teamName=${encodeURIComponent(teamData?.teamName || '')}` : '';

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-outfit py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Registration Successful!</h2>
          <p className="text-slate-500">
            Your team <span className="font-bold text-slate-800">{teamData?.teamName}</span> is now registered for the Talent Pro League.
          </p>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase">Share this Invite Link with your 15 Players:</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={inviteLink}
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none"
              />
              <button 
                onClick={() => navigator.clipboard.writeText(inviteLink)}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Copy Link
              </button>
            </div>
            <p className="text-xs text-slate-400">
              When players use this link, they will be registered and linked directly to your team roster.
            </p>
          </div>

          <button 
            onClick={() => {
              dispatch(setStep(1));
              window.location.href = '/tpl';
            }}
            className="mt-6 px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-outfit py-12 px-4 relative">
      {/* Top Left Back Button (Outside Card) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <button 
          onClick={() => {
            if (currentStep === 1) {
              router.push('/register');
            } else {
              dispatch(prevStep());
            }
          }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-all text-sm cursor-pointer group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
      </div>

      {hasRestoredDraft && (
        <div className="max-w-3xl mx-auto mb-4 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-amber-900 text-sm font-medium">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You are continuing from a saved team registration draft.</span>
          </div>
          <button 
            onClick={handleStartOver}
            className="text-xs font-bold text-amber-600 hover:text-amber-800 underline underline-offset-2"
          >
            Start Over
          </button>
        </div>
      )}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header Progress */}
        <div className="bg-amber-500 p-8 text-white relative">
          <h2 className="text-3xl font-extrabold mb-1">Team Registration</h2>
          <p className="text-amber-100 text-sm">Step {currentStep} of 4: {
            currentStep === 1 ? 'Manager Info' :
            currentStep === 2 ? 'Team Details' :
            currentStep === 3 ? 'Player Roster' : 'Review & Pay'
          }</p>
          <div className="w-full bg-amber-700/40 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-white h-full rounded-full transition-all duration-300" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12">
          {currentStep === 1 && (
            <ManagerInfoStep 
              initialData={teamData} 
              onNext={handleManagerInfoSubmit} 
              onBack={() => router.push('/register')} 
            />
          )}

          {currentStep === 2 && (
            <TeamInfoStep 
              initialData={teamData} 
              onNext={handleTeamInfoSubmit} 
              onBack={() => dispatch(prevStep())}
            />
          )}

          {currentStep === 3 && (
            <PlayerRosterStep 
              initialData={teamData} 
              onNext={handleRosterSubmit} 
              onBack={() => dispatch(prevStep())} 
            />
          )}

          {currentStep === 4 && (
            <ReviewAndPayStep 
              data={teamData} 
              onNext={handleFinalSubmit} 
              onBack={() => dispatch(prevStep())} 
            />
          )}
        </div>
      </div>
    </div>
  );
};
