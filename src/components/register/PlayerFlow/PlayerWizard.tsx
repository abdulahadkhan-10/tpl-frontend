"use client";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { RootState } from '@/store';
import { setPlayerRegistrationData, setStep, nextStep, prevStep, resetRegistration } from '@/store/slices/registrationSlice';
import { PersonalInfoStep } from './Steps/PersonalInfoStep';
import { MedicalInfoStep } from './Steps/MedicalInfoStep';
import { FootballInfoStep } from './Steps/FootballInfoStep';
import { ParentConsentStep } from './Steps/ParentConsentStep';
import { AgreementsStep } from './Steps/AgreementsStep';

export const PlayerWizard = () => {
  const currentStep = useSelector((state: RootState) => state.registration.currentStep);
  const playerData = useSelector((state: RootState) => state.registration.playerRegistration);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check for stored draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('tpl_player_registration_draft');
    if (draft) {
      try {
        const { data, step } = JSON.parse(draft);
        if (data && Object.keys(data).length > 0) {
          dispatch(setPlayerRegistrationData(data));
          dispatch(setStep(step));
          setHasRestoredDraft(true);
        }
      } catch (e) {
        console.error('Error parsing draft', e);
      }
    }
    setIsReady(true);
  }, [dispatch]);

  // Save draft whenever playerData or currentStep changes
  useEffect(() => {
    if (isReady && playerData && Object.keys(playerData).length > 0 && !isCompleted) {
      localStorage.setItem('tpl_player_registration_draft', JSON.stringify({
        data: playerData,
        step: currentStep
      }));
    }
  }, [playerData, currentStep, isCompleted, isReady]);

  const handleStartOver = () => {
    localStorage.removeItem('tpl_player_registration_draft');
    dispatch(resetRegistration());
    setHasRestoredDraft(false);
  };

  // Helper to determine if player is under 18
  const isUnder18 = (() => {
    if (!playerData?.dateOfBirth) return false;
    const dob = new Date(playerData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age < 18;
  })();

  const totalSteps = isUnder18 ? 5 : 4;

  const handlePersonalInfoSubmit = (data: any) => {
    dispatch(setPlayerRegistrationData(data));
    dispatch(nextStep());
  };

  const handleMedicalInfoSubmit = (data: any) => {
    dispatch(setPlayerRegistrationData(data));
    dispatch(nextStep());
  };

  const handleFootballInfoSubmit = (data: any) => {
    dispatch(setPlayerRegistrationData(data));
    dispatch(nextStep());
  };

  const handleParentConsentSubmit = (data: any) => {
    dispatch(setPlayerRegistrationData(data));
    dispatch(nextStep());
  };

  const handleFinalSubmit = (data: any) => {
    dispatch(setPlayerRegistrationData(data));
    localStorage.removeItem('tpl_player_registration_draft');
    setIsCompleted(true);
  };

  // Determine what component to render for each logic step
  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <PersonalInfoStep 
          initialData={playerData} 
          onNext={handlePersonalInfoSubmit} 
          onBack={() => router.push('/register')}
        />
      );
    }
    if (currentStep === 2) {
      return (
        <MedicalInfoStep 
          initialData={playerData} 
          onNext={handleMedicalInfoSubmit} 
          onBack={() => dispatch(prevStep())} 
        />
      );
    }
    if (currentStep === 3) {
      return (
        <FootballInfoStep 
          initialData={playerData} 
          onNext={handleFootballInfoSubmit} 
          onBack={() => dispatch(prevStep())} 
        />
      );
    }
    if (isUnder18) {
      if (currentStep === 4) {
        return (
          <ParentConsentStep 
            initialData={playerData} 
            onNext={handleParentConsentSubmit} 
            onBack={() => dispatch(prevStep())} 
          />
        );
      }
      if (currentStep === 5) {
        return (
          <AgreementsStep 
            initialData={playerData} 
            onNext={handleFinalSubmit} 
            onBack={() => dispatch(prevStep())} 
          />
        );
      }
    } else {
      if (currentStep === 4) {
        return (
          <AgreementsStep 
            initialData={playerData} 
            onNext={handleFinalSubmit} 
            onBack={() => dispatch(prevStep())} 
          />
        );
      }
    }
    return null;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-slate-50 bg-[url('/images/stadium-bg.png')] bg-cover bg-center bg-fixed bg-no-repeat font-outfit py-12 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-650 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Registration Complete!</h2>
          <p className="text-slate-500">
            Thank you, <span className="font-bold text-slate-800">{playerData?.fullName}</span>. Your details have been submitted and you are registered for the Talent Pro League.
          </p>

          <button 
            onClick={() => {
              dispatch(setStep(1));
              window.location.href = '/';
            }}
            className="mt-6 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Go to Homepage
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
        <div className="max-w-3xl mx-auto mb-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-indigo-900 text-sm font-medium">
            <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You are continuing from a saved registration draft.</span>
          </div>
          <button 
            onClick={handleStartOver}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
          >
            Start Over
          </button>
        </div>
      )}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header Progress */}
        <div className="bg-indigo-600 p-8 text-white relative">
          <h2 className="text-3xl font-extrabold mb-1">Player Registration</h2>
          <p className="text-indigo-100 text-sm">Step {currentStep} of {totalSteps}: {
            currentStep === 1 ? 'Personal Info' :
            currentStep === 2 ? 'Emergency & Medical' :
            currentStep === 3 ? 'Football & Kit' :
            isUnder18 && currentStep === 4 ? 'Parent Consent' : 'Agreements'
          }</p>
          <div className="w-full bg-indigo-850/40 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-white h-full rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-12">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};
