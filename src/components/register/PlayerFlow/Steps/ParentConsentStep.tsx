import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const parentConsentSchema = z.object({
  parentName: z.string().min(2, 'Parent/Guardian name is required'),
  parentRelationship: z.string().min(2, 'Relationship is required'),
  parentPhone: z.string().min(5, 'Phone number is required'),
  parentEmail: z.string().email('Valid email is required'),
  parentAddress: z.string().min(5, 'Address is required'),
  parentConsentedToParticipation: z.literal(true, {
    message: 'You must consent to participation',
  }),
  parentSignature: z.string().min(2, 'Parent/Guardian signature is required'),
});

type ParentConsentFormValues = z.infer<typeof parentConsentSchema>;

interface ParentConsentStepProps {
  initialData: any;
  onNext: (data: ParentConsentFormValues) => void;
  onBack: () => void;
}

export const ParentConsentStep: React.FC<ParentConsentStepProps> = ({ initialData, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ParentConsentFormValues>({
    resolver: zodResolver(parentConsentSchema),
    defaultValues: {
      parentName: initialData?.parentName || '',
      parentRelationship: initialData?.parentRelationship || '',
      parentPhone: initialData?.parentPhone || '',
      parentEmail: initialData?.parentEmail || '',
      parentAddress: initialData?.parentAddress || '',
      parentConsentedToParticipation: initialData?.parentConsentedToParticipation || false,
      parentSignature: initialData?.parentSignature || '',
    },
  });

  const onSubmit = (data: ParentConsentFormValues) => {
    onNext(data);
  };

  const parentConsentedValue = watch('parentConsentedToParticipation');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <div className="inline-block px-3 py-1 bg-rose-50 text-rose-650 text-xs font-bold uppercase tracking-wider rounded-md mb-2">
          Under 18 Player
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Parent/Guardian Consent</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">As you are under 18 years of age, a parent or legal guardian must complete this consent section.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Parent Name */}
        <div className="space-y-2">
          <Label htmlFor="parentName">Parent/Guardian Full Name *</Label>
          <Input id="parentName" placeholder="e.g. Richard Ronaldo" {...register('parentName')} className="h-10" />
          {errors.parentName && (
            <p className="text-red-500 text-xs mt-1">{errors.parentName.message}</p>
          )}
        </div>

        {/* Relationship */}
        <div className="space-y-2">
          <Label htmlFor="parentRelationship">Relationship to Player *</Label>
          <Input id="parentRelationship" placeholder="e.g. Father, Mother" {...register('parentRelationship')} className="h-10" />
          {errors.parentRelationship && (
            <p className="text-red-500 text-xs mt-1">{errors.parentRelationship.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="parentPhone">Phone Number *</Label>
          <Input id="parentPhone" placeholder="e.g. +44 7987 654321" {...register('parentPhone')} className="h-10" />
          {errors.parentPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.parentPhone.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="parentEmail">Email Address *</Label>
          <Input id="parentEmail" type="email" placeholder="e.g. parent@example.com" {...register('parentEmail')} className="h-10" />
          {errors.parentEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.parentEmail.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="parentAddress">Parent/Guardian Address *</Label>
          <Input id="parentAddress" placeholder="e.g. 456 Park Avenue, London" {...register('parentAddress')} className="h-10" />
          {errors.parentAddress && (
            <p className="text-red-500 text-xs mt-1">{errors.parentAddress.message}</p>
          )}
        </div>

        {/* Consents */}
        <div className="md:col-span-2 space-y-3 pt-2">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="parentConsentedToParticipation" 
              checked={!!parentConsentedValue} 
              onCheckedChange={(checked) => setValue('parentConsentedToParticipation', (checked === true) as any)} 
            />
            <div className="space-y-1">
              <Label htmlFor="parentConsentedToParticipation" className="text-sm font-medium text-slate-700 leading-none">
                I consent to the player participating in TPL & agree to injury risk & media policies *
              </Label>
              {errors.parentConsentedToParticipation && (
                <p className="text-red-500 text-xs mt-1">{errors.parentConsentedToParticipation.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="space-y-2">
          <Label htmlFor="parentSignature">Parent/Guardian Signature (Type Name) *</Label>
          <Input id="parentSignature" placeholder="Parent Signature" {...register('parentSignature')} className="h-10" />
          {errors.parentSignature && (
            <p className="text-red-500 text-xs mt-1">{errors.parentSignature.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentSignatureDate">Date</Label>
          <Input id="parentSignatureDate" value={new Date().toLocaleDateString()} disabled className="h-10 bg-slate-50 text-slate-500" />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-100 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl px-8 py-3 text-sm font-bold transition-all"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
