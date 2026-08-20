"use client";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { RootState } from '@/store';
import { setPlayerRegistrationData, setStep, nextStep, prevStep, resetRegistration } from '@/store/slices/registrationSlice';
import { useRegisterUserMutation } from '@/store/slices/loginApi';
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

  const [registerUserApi, { isLoading: isRegistering }] = useRegisterUserMutation();

  const [isCompleted, setIsCompleted] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleFinalSubmit = async (agreementsData: any) => {
    const fullPayload = { ...playerData, ...agreementsData };
    dispatch(setPlayerRegistrationData(fullPayload));
    setSubmitError(null);

    try {
      await registerUserApi({
        email: fullPayload.email,
        password: fullPayload.password,
        fullName: fullPayload.fullName,
        roleType: 'PLAYER',
        profileData: {
          position: fullPayload.preferredPosition || fullPayload.position || 'Forward',
          dateOfBirth: fullPayload.dateOfBirth,
          pricingTier: 'Standard',
          nationality: fullPayload.nationality,
          homeAddress: fullPayload.homeAddress,
          mobileNumber: fullPayload.mobileNumber,
          emergencyContactName: fullPayload.emergencyContactName,
          emergencyContactRelation: fullPayload.emergencyContactRelation,
          emergencyContactPhone: fullPayload.emergencyContactPhone,
          medicalConditions: fullPayload.medicalConditions,
          allergies: fullPayload.allergies,
          medicationDetails: fullPayload.medicationDetails,
          gpName: fullPayload.gpName,
          previousClub: fullPayload.previousClub,
          shirtSize: fullPayload.shirtSize,
          shortsSize: fullPayload.shortsSize,
          sockSize: fullPayload.sockSize,
          instagramUsername: fullPayload.instagramUsername,
          tiktokUsername: fullPayload.tiktokUsername,
          youtubeChannel: fullPayload.youtubeChannel,
          confirmedInfoCorrect: fullPayload.confirmedInfoCorrect ?? true,
          acceptedPlayerAgreement: fullPayload.acceptedPlayerAgreement ?? true,
          signature: fullPayload.signature,
          parentName: fullPayload.parentName,
          parentRelationship: fullPayload.parentRelationship,
          parentPhone: fullPayload.parentPhone,
          parentEmail: fullPayload.parentEmail,
        },
      }).unwrap();

      localStorage.removeItem('tpl_player_registration_draft');
      setIsCompleted(true);
    } catch (err: any) {
      setSubmitError(err?.data?.error || 'Registration failed. Please try again.');
    }
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
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Registration Complete!</h2>
          <p className="text-slate-600">
            Welcome to the Talent Pro League, <strong className="text-slate-900">{playerData?.fullName}</strong>!
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs font-montserrat space-y-2">
            <div className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Your Login Credentials</div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Registered Email:</span>
              <span className="font-bold text-slate-800">{playerData?.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Role:</span>
              <span className="font-bold text-[#7C5800]">Player</span>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              ✨ An official confirmation email with your login credentials has also been sent to your email address.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button 
              onClick={() => {
                dispatch(resetRegistration());
                router.push('/login');
              }}
              className="px-8 py-3.5 bg-[#1A1C1C] hover:bg-black text-[#FFB800] font-black font-montserrat uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              Log In to Player Portal
            </button>
            <button 
              onClick={() => {
                dispatch(resetRegistration());
                router.push('/');
              }}
              className="px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold font-montserrat uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>
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
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 cursor-pointer"
          >
            Start Over
          </button>
        </div>
      )}

      {submitError && (
        <div className="max-w-3xl mx-auto mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs font-bold font-montserrat flex items-center justify-between">
          <span>{submitError}</span>
          <button onClick={() => setSubmitError(null)} className="text-red-500 hover:text-red-800 cursor-pointer">✕</button>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header Progress */}
        <div className="bg-[#1A1C1C] p-8 text-white relative border-b-2 border-[#FFB800]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-black font-montserrat uppercase tracking-tight text-white mb-1">
                Player Registration
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Step {currentStep} of {totalSteps}: {
                  currentStep === 1 ? 'Personal & Account Info' :
                  currentStep === 2 ? 'Emergency & Medical' :
                  currentStep === 3 ? 'Football & Kit' :
                  isUnder18 && currentStep === 4 ? 'Parent Consent' : 'Agreements'
                }
              </p>
            </div>
            {isRegistering && (
              <div className="flex items-center gap-2 text-xs font-bold text-[#FFB800]">
                <Loader2 className="animate-spin" size={16} />
                <span>Creating Profile...</span>
              </div>
            )}
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-[#FFB800] h-full rounded-full transition-all duration-300" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
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
