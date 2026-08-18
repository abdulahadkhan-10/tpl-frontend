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
import { useRegisterTeamMutation } from '@/store/slices/loginApi';
import { setCredentials } from '@/store/slices/authSlice';

const reviewSchema = z.object({
  confirmTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms & conditions',
  }),
  signature: z.string().min(2, 'Signature name is required'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewAndPayStepProps {
  data: any;
  onNext: (data: ReviewFormValues) => void;
  onBack: () => void;
}

export const ReviewAndPayStep: React.FC<ReviewAndPayStepProps> = ({ data, onNext, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [registerTeam] = useRegisterTeamMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      confirmTerms: false,
      signature: '',
    },
  });

  const confirmTermsValue = watch('confirmTerms');

  const onSubmit = async (formValues: ReviewFormValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const payload = {
        team: {
          name: data.teamName,
          email: data.email,
          password: data.password,
          region: data.cityOrTown || 'Unknown',
          ageGroup: 'Open',
          logoUrl: data.logoUrl,
          cityOrTown: data.cityOrTown,
          socialLinks: data.socialLinks,
        },
        teamManager: {
          fullName: data.manager?.fullName || '',
          contactNumber: data.manager?.contactNumber || '',
          dateOfBirth: data.manager?.dateOfBirth,
          homeAddress: data.manager?.homeAddress,
          emergencyContactName: data.manager?.emergencyContactName,
          emergencyContactRelation: data.manager?.emergencyContactRelation,
          emergencyContactPhone: data.manager?.emergencyContactPhone,
          agreedToManagerAgreement: true,
          agreedToTournamentRules: true,
          acceptedTerms: true,
          signature: formValues.signature,
          signatureDate: new Date().toISOString(),
        },
        players: (data.players || []).map((p: any) => ({
          fullName: p.fullName,
          email: p.email,
        })),
      };

      const result = await registerTeam(payload).unwrap();

      // Dispatch details to Redux Store
      dispatch(setCredentials({
        user: result.team,
        role: 'team',
        token: result.token,
      }));

      // Store in cookies manually for backup/dev flow
      document.cookie = `token=${result.token}; path=/; max-age=${24 * 60 * 60}; sameSite=lax`;

      onNext(formValues);
    } catch (err: any) {
      setErrorMsg(
        err?.data?.error || 
        err?.data?.message || 
        err?.message || 
        'An error occurred during registration. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Review & Submit</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Review your registration details before confirming.</p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold animate-fadeIn">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Review Summary Accordions */}
      <div className="space-y-3 mb-8">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Review Team Application</h4>
        
        {/* Accordion 1: Team Info */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div 
            onClick={() => toggleSection('team')} 
            className="flex items-center justify-between px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold text-slate-800">1. Team Details</span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); dispatch(setStep(1)); }} 
                className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:border-amber-200 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeSection === 'team' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {activeSection === 'team' && (
            <div className="p-4 border-t border-slate-100 bg-white grid md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 font-outfit">
              <p><span className="font-semibold text-slate-800 block">Team Name</span> {data?.teamName}</p>
              <p><span className="font-semibold text-slate-800 block">City/Town</span> {data?.cityOrTown}</p>
              {data?.logoUrl && (
                <div className="md:col-span-2">
                  <span className="font-semibold text-slate-800 block mb-1">Team Logo</span>
                  <img src={data.logoUrl} alt="Logo" className="w-12 h-12 rounded-full border border-slate-200 object-cover shadow-sm bg-white" />
                </div>
              )}
              <div className="md:col-span-2">
                <span className="font-semibold text-slate-800 block mb-1">Social Media Handles</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <p>Instagram: {data?.socialLinks?.instagram || 'None'}</p>
                  <p>TikTok: {data?.socialLinks?.tiktok || 'None'}</p>
                  <p>Facebook: {data?.socialLinks?.facebook || 'None'}</p>
                  <p>X (Twitter): {data?.socialLinks?.twitter || 'None'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Manager Info */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div 
            onClick={() => toggleSection('manager')} 
            className="flex items-center justify-between px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold text-slate-800">2. Manager Details</span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); dispatch(setStep(2)); }} 
                className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:border-amber-200 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeSection === 'manager' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {activeSection === 'manager' && (
            <div className="p-4 border-t border-slate-100 bg-white grid md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 font-outfit">
              <p><span className="font-semibold text-slate-800 block">Full Name</span> {data?.manager?.fullName}</p>
              <p><span className="font-semibold text-slate-800 block">Date of Birth</span> {data?.manager?.dateOfBirth}</p>
              <p><span className="font-semibold text-slate-800 block">Mobile Number</span> {data?.manager?.contactNumber}</p>
              <p><span className="font-semibold text-slate-800 block">Email Address</span> {data?.manager?.email}</p>
              <p className="md:col-span-2"><span className="font-semibold text-slate-800 block">Home Address</span> {data?.manager?.homeAddress}</p>
              <div className="md:col-span-2">
                <span className="font-semibold text-slate-800 block mb-1">Emergency Contact</span>
                <p>{data?.manager?.emergencyContactName} ({data?.manager?.emergencyContactRelation}) - {data?.manager?.emergencyContactPhone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Roster */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div 
            onClick={() => toggleSection('roster')} 
            className="flex items-center justify-between px-4 py-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold text-slate-800">3. Player Roster ({data?.players?.length || 0}/15 Players)</span>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); dispatch(setStep(3)); }} 
                className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm hover:border-amber-200 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${activeSection === 'roster' ? 'rotate-180' : ''}`} />
            </div>
          </div>
          {activeSection === 'roster' && (
            <div className="p-4 border-t border-slate-100 bg-white text-xs text-slate-600 font-outfit">
              {data?.players && data.players.length > 0 ? (
                <ul className="list-decimal pl-5 space-y-1.5 font-medium text-slate-700">
                  {data.players.map((player: any, idx: number) => (
                    <li key={idx}>
                      {player.fullName} <span className="text-slate-400 font-normal">({player.email})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-405 italic">No players registered in roster yet.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Agreements Checkbox list */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-sm font-bold text-slate-900 uppercase">Team Declarations</h4>
        
        <div className="space-y-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-xs text-amber-950 space-y-2">
          <p>• The team will maintain fifteen (15) registered players throughout the tournament.</p>
          <p>• All information provided is accurate and truthful.</p>
          <p>• The team understands that registration fees are non-refundable.</p>
          <p>• The team agrees to comply with safeguarding, conduct, and disciplinary policies.</p>
        </div>

        <div className="flex items-start space-x-3 pt-2">
          <Checkbox 
            id="confirmTerms" 
            checked={!!confirmTermsValue} 
            onCheckedChange={(checked) => setValue('confirmTerms', checked === true)} 
          />
          <div className="space-y-1">
            <Label htmlFor="confirmTerms" className="text-sm font-medium text-slate-700 leading-none">
              I confirm and accept all terms above *
            </Label>
            {errors.confirmTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmTerms.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Signature & Date */}
      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        <div className="space-y-2">
          <Label htmlFor="signature">Manager Signature (Type Full Name) *</Label>
          <Input id="signature" placeholder="Manager Signature" {...register('signature')} className="h-10" />
          {errors.signature && (
            <p className="text-red-500 text-xs mt-1">{errors.signature.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" value={new Date().toLocaleDateString()} disabled className="h-10 bg-slate-50 text-slate-500" />
        </div>
      </div>

      {/* Navigation Buttons */}
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
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing Payment...
            </>
          ) : (
            'Pay Fee & Register Team'
          )}
        </button>
      </div>
    </form>
  );
};
