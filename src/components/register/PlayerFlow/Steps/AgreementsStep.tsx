import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDispatch } from 'react-redux';
import { setStep } from '@/store/slices/registrationSlice';
import { ChevronDown, Edit3 } from 'lucide-react';

const agreementsSchema = z.object({
  confirmedInfoCorrect: z.literal(true, { message: 'You must confirm information correctness' }),
  understandsInjuryRisk: z.literal(true, { message: 'You must acknowledge injury risk' }),
  understandsNotResponsibleForInjuries: z.literal(true, { message: 'You must accept the liability release' }),
  acceptedPlayerAgreement: z.literal(true, { message: 'You must accept the Player Agreement' }),
  understandsFeesNonRefundable: z.literal(true, { message: 'You must acknowledge non-refundable fees' }),
  understandsFalseIdentityExpulsion: z.literal(true, { message: 'You must acknowledge false identity rules' }),
  agreedToSocialSubscription: z.literal(true, { message: 'You must agree to social media follow requirements' }),
  consentedToMediaUse: z.literal(true, { message: 'You must consent to media recording' }),
  agreedToSafeguardingRules: z.literal(true, { message: 'You must agree to safeguarding rules' }),
  understandsExpulsionForConduct: z.literal(true, { message: 'You must agree to conduct rules' }),
  signature: z.string().min(2, 'Player signature is required'),
});

type AgreementsFormValues = z.infer<typeof agreementsSchema>;

interface AgreementsStepProps {
  initialData: any;
  onNext: (data: AgreementsFormValues) => void;
  onBack: () => void;
}

export const AgreementsStep: React.FC<AgreementsStepProps> = ({ initialData, onNext, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AgreementsFormValues>({
    resolver: zodResolver(agreementsSchema),
    defaultValues: {
      confirmedInfoCorrect: initialData?.confirmedInfoCorrect || false,
      understandsInjuryRisk: initialData?.understandsInjuryRisk || false,
      understandsNotResponsibleForInjuries: initialData?.understandsNotResponsibleForInjuries || false,
      acceptedPlayerAgreement: initialData?.acceptedPlayerAgreement || false,
      understandsFeesNonRefundable: initialData?.understandsFeesNonRefundable || false,
      understandsFalseIdentityExpulsion: initialData?.understandsFalseIdentityExpulsion || false,
      agreedToSocialSubscription: initialData?.agreedToSocialSubscription || false,
      consentedToMediaUse: initialData?.consentedToMediaUse || false,
      agreedToSafeguardingRules: initialData?.agreedToSafeguardingRules || false,
      understandsExpulsionForConduct: initialData?.understandsExpulsionForConduct || false,
      signature: initialData?.signature || '',
    },
  });

  const onSubmit = async (data: AgreementsFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onNext(data);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const watchAll = watch();

  const agreementsList = [
    { key: 'confirmedInfoCorrect', label: 'I confirm that all information provided is correct.' },
    { key: 'understandsInjuryRisk', label: 'I understand football participation involves risk of injury.' },
    { key: 'understandsNotResponsibleForInjuries', label: 'I understand YFHA Group Limited and TPL are not responsible for injuries.' },
    { key: 'acceptedPlayerAgreement', label: 'I have read and accepted the TPL Player Agreement.' },
    { key: 'understandsFeesNonRefundable', label: 'I understand registration fees are non-refundable.' },
    { key: 'understandsFalseIdentityExpulsion', label: 'I understand false age or false identity may result in expulsion.' },
    { key: 'agreedToSocialSubscription', label: 'I agree to remain subscribed/following TPL YouTube, TikTok, and Instagram accounts for 1.5 years.' },
    { key: 'consentedToMediaUse', label: 'I consent to filming, photography, livestreaming, and media use by TPL.' },
    { key: 'agreedToSafeguardingRules', label: 'I agree to follow all TPL safeguarding and conduct rules.' },
    { key: 'understandsExpulsionForConduct', label: 'I understand violent, abusive, or criminal activity results in expulsion.' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Player Agreement & Confirmation</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Please review and confirm your agreements below.</p>
      </div>

      {/* Review Details Accordion */}
      <div className="space-y-3 mb-8">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Review Your Information</h4>
        
        {/* Accordion 1: Personal Info */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div 
            onClick={() => toggleSection('personal')} 
            className="flex items-center justify-between px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold text-slate-800">1. Personal Details</span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); dispatch(setStep(1)); }} 
                className="text-xs font-bold text-indigo-650 hover:text-indigo-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:border-indigo-200 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeSection === 'personal' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {activeSection === 'personal' && (
            <div className="p-4 border-t border-slate-100 bg-white grid md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 font-outfit">
              <p><span className="font-semibold text-slate-800 block">Full Name</span> {initialData?.fullName}</p>
              <p><span className="font-semibold text-slate-800 block">Date of Birth</span> {initialData?.dateOfBirth}</p>
              <p><span className="font-semibold text-slate-800 block">Nationality</span> {initialData?.nationality}</p>
              <p><span className="font-semibold text-slate-800 block">Mobile Number</span> {initialData?.mobileNumber}</p>
              <p><span className="font-semibold text-slate-800 block">Email Address</span> {initialData?.email}</p>
              <p className="md:col-span-2"><span className="font-semibold text-slate-800 block">Home Address</span> {initialData?.homeAddress}</p>
            </div>
          )}
        </div>

        {/* Accordion 2: Medical Info */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div 
            onClick={() => toggleSection('medical')} 
            className="flex items-center justify-between px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold text-slate-800">2. Emergency & Medical Details</span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); dispatch(setStep(2)); }} 
                className="text-xs font-bold text-indigo-650 hover:text-indigo-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:border-indigo-200 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeSection === 'medical' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {activeSection === 'medical' && (
            <div className="p-4 border-t border-slate-100 bg-white grid md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 font-outfit">
              <p><span className="font-semibold text-slate-800 block">Emergency Contact</span> {initialData?.emergencyContactName}</p>
              <p><span className="font-semibold text-slate-800 block">Relationship</span> {initialData?.emergencyContactRelation}</p>
              <p><span className="font-semibold text-slate-800 block">Contact Phone</span> {initialData?.emergencyContactPhone}</p>
              <p><span className="font-semibold text-slate-800 block">Medical Conditions</span> {initialData?.medicalConditions || 'None declared'}</p>
              <p><span className="font-semibold text-slate-800 block">Allergies</span> {initialData?.allergies || 'None declared'}</p>
              <p><span className="font-semibold text-slate-800 block">Current Medications</span> {initialData?.medicationDetails || 'None declared'}</p>
              <p className="md:col-span-2"><span className="font-semibold text-slate-800 block">GP/Doctor Name</span> {initialData?.gpName || 'None declared'}</p>
            </div>
          )}
        </div>

        {/* Accordion 3: Football Details */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div 
            onClick={() => toggleSection('football')} 
            className="flex items-center justify-between px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold text-slate-800">3. Football & Kit Sizes</span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); dispatch(setStep(3)); }} 
                className="text-xs font-bold text-indigo-650 hover:text-indigo-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:border-indigo-200 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeSection === 'football' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {activeSection === 'football' && (
            <div className="p-4 border-t border-slate-100 bg-white grid md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 font-outfit">
              <p><span className="font-semibold text-slate-800 block">Preferred Position</span> {initialData?.position}</p>
              <p><span className="font-semibold text-slate-800 block">Previous Club</span> {initialData?.previousClub || 'None'}</p>
              <p><span className="font-semibold text-slate-800 block">Shirt Size</span> {initialData?.shirtSize}</p>
              <p><span className="font-semibold text-slate-800 block">Shorts Size</span> {initialData?.shortsSize}</p>
              <p><span className="font-semibold text-slate-800 block">Sock Size</span> {initialData?.sockSize}</p>
              <p><span className="font-semibold text-slate-800 block">Instagram</span> {initialData?.instagramUsername || 'None'}</p>
              <p><span className="font-semibold text-slate-800 block">TikTok</span> {initialData?.tiktokUsername || 'None'}</p>
              <p><span className="font-semibold text-slate-800 block">YouTube Channel</span> {initialData?.youtubeChannel || 'None'}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-y border-slate-100 py-4">
        {agreementsList.map((item) => {
          const isChecked = !!(watchAll as any)[item.key];
          const hasError = !!(errors as any)[item.key];
          return (
            <div key={item.key} className="flex items-start space-x-3">
              <Checkbox 
                id={item.key} 
                checked={isChecked} 
                onCheckedChange={(checked) => setValue(item.key as any, checked === true)} 
              />
              <div className="space-y-1">
                <Label htmlFor={item.key} className="text-sm font-medium text-slate-700 leading-none">
                  {item.label}
                </Label>
                {hasError && (
                  <p className="text-red-500 text-xs mt-1">{(errors as any)[item.key]?.message}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Signature & Date */}
      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div className="space-y-2">
          <Label htmlFor="signature">Player Signature (Type Full Name) *</Label>
          <Input id="signature" placeholder="Player Signature" {...register('signature')} className="h-10" />
          {errors.signature && (
            <p className="text-red-500 text-xs mt-1">{errors.signature.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" value={new Date().toLocaleDateString()} disabled className="h-10 bg-slate-50 text-slate-500" />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-100 mt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl px-8 py-3 text-sm font-bold transition-all disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Complete Registration'
          )}
        </button>
      </div>
    </form>
  );
};
