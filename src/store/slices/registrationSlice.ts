import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerData {
  id: string; // temp local ID
  fullName: string;
  email: string;
}

export interface TeamRegistrationData {
  teamName?: string;
  email?: string;
  password?: string;
  logoUrl?: string;
  cityOrTown?: string;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    twitter?: string;
  };
  manager?: {
    fullName?: string;
    dateOfBirth?: string;
    contactNumber?: string;
    email?: string;
    homeAddress?: string;
    emergencyContactName?: string;
    emergencyContactRelation?: string;
    emergencyContactPhone?: string;
    agreedToManagerAgreement?: boolean;
    agreedToTournamentRules?: boolean;
    acceptedTerms?: boolean;
  };
  players?: PlayerData[]; // Initial 15 players
}

export interface PlayerRegistrationData {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  homeAddress?: string;
  mobileNumber?: string;
  email?: string;
  
  // Emergency contact details
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: string;

  // Medical info
  medicalConditions?: string;
  allergies?: string;
  medicationDetails?: string;
  gpName?: string;

  // Football & Sizing info
  position?: string;
  previousClub?: string;
  shirtSize?: string;
  shortsSize?: string;
  sockSize?: string;

  // Social media
  instagramUsername?: string;
  tiktokUsername?: string;
  youtubeChannel?: string;

  // Signatures / Consents
  confirmedInfoCorrect?: boolean;
  understandsInjuryRisk?: boolean;
  understandsNotResponsibleForInjuries?: boolean;
  acceptedPlayerAgreement?: boolean;
  understandsFeesNonRefundable?: boolean;
  understandsFalseIdentityExpulsion?: boolean;
  agreedToSocialSubscription?: boolean;
  consentedToMediaUse?: boolean;
  agreedToSafeguardingRules?: boolean;
  understandsExpulsionForConduct?: boolean;
  signature?: string;
  signatureDate?: string;

  // Parent/Guardian (Under 18)
  parentName?: string;
  parentRelationship?: string;
  parentPhone?: string;
  parentEmail?: string;
  parentAddress?: string;
  parentConsentedToParticipation?: boolean;
  parentAcceptedAgreement?: boolean;
  parentUnderstandsInjuryRisk?: boolean;
  parentConsentedToMedia?: boolean;
  parentSignature?: string;
  parentSignatureDate?: string;
}

interface RegistrationState {
  teamRegistration: TeamRegistrationData;
  playerRegistration: PlayerRegistrationData;
  currentStep: number;
}

const initialState: RegistrationState = {
  teamRegistration: {
    players: [],
  },
  playerRegistration: {},
  currentStep: 1,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setTeamRegistrationData: (state, action: PayloadAction<Partial<TeamRegistrationData>>) => {
      state.teamRegistration = { ...state.teamRegistration, ...action.payload };
    },
    setPlayerRegistrationData: (state, action: PayloadAction<Partial<PlayerRegistrationData>>) => {
      state.playerRegistration = { ...state.playerRegistration, ...action.payload };
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetRegistration: (state) => {
      state.teamRegistration = { players: [] };
      state.playerRegistration = {};
      state.currentStep = 1;
    },
  },
});

export const { 
  setTeamRegistrationData, 
  setPlayerRegistrationData, 
  setStep, 
  nextStep, 
  prevStep,
  resetRegistration
} = registrationSlice.actions;

export default registrationSlice.reducer;
