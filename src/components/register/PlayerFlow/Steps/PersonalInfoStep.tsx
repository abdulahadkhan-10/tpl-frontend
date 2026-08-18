import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostcodeLookup } from '@/components/PostcodeLookup';
import { Check } from 'lucide-react';

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Valid date of birth is required',
  }),
  nationality: z.string().min(2, 'Nationality is required'),
  homeAddress: z.string().min(5, 'Home address is required'),
  mobileNumber: z.string().min(5, 'Mobile number is required'),
  email: z.string().email('Valid email is required'),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoStepProps {
  initialData: any;
  onNext: (data: PersonalInfoFormValues) => void;
  onBack: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ initialData, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: initialData?.fullName || '',
      dateOfBirth: initialData?.dateOfBirth || '',
      nationality: initialData?.nationality || '',
      homeAddress: initialData?.homeAddress || '',
      mobileNumber: initialData?.mobileNumber || '',
      email: initialData?.email || '',
    },
  });

  const onSubmit = (data: PersonalInfoFormValues) => {
    onNext(data);
  };

  const handleAddressSelected = (address: string) => {
    setValue('homeAddress', address, { shouldDirty: true, shouldValidate: true });
    trigger('homeAddress');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Personal Information</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Please enter your personal details below.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <div className="relative">
            <Input 
              id="fullName" 
              placeholder="e.g. Cristiano Ronaldo" 
              {...register('fullName')} 
              className={`h-10 pr-10 font-outfit ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.fullName && !errors.fullName && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <div className="relative">
            <Input 
              id="dateOfBirth" 
              type="date" 
              {...register('dateOfBirth')} 
              className={`h-10 pr-10 font-outfit ${errors.dateOfBirth ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.dateOfBirth && !errors.dateOfBirth && (
              <span className="absolute right-10 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality *</Label>
          <div className="relative">
            <Input 
              id="nationality" 
              placeholder="e.g. British" 
              {...register('nationality')} 
              className={`h-10 pr-10 font-outfit ${errors.nationality ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.nationality && !errors.nationality && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.nationality && (
            <p className="text-red-500 text-xs mt-1">{errors.nationality.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <Label htmlFor="mobileNumber">Mobile Number *</Label>
          <div className="relative">
            <Input 
              id="mobileNumber" 
              placeholder="e.g. +44 7123 456789" 
              {...register('mobileNumber')} 
              className={`h-10 pr-10 font-outfit ${errors.mobileNumber ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.mobileNumber && !errors.mobileNumber && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Input 
              id="email" 
              type="email" 
              placeholder="e.g. player@example.com" 
              {...register('email')} 
              className={`h-10 pr-10 font-outfit ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.email && !errors.email && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Postcode Lookup Tool */}
        <div className="md:col-span-2 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
          <PostcodeLookup onAddressSelected={handleAddressSelected} />
          
          {/* Home Address Output */}
          <div className="space-y-2">
            <Label htmlFor="homeAddress">Selected Address Line *</Label>
            <div className="relative">
              <Input 
                id="homeAddress" 
                placeholder="Lookup your postcode or enter manually here..." 
                {...register('homeAddress')} 
                className={`h-10 pr-10 font-outfit bg-white ${errors.homeAddress ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
              />
              {dirtyFields.homeAddress && !errors.homeAddress && (
                <span className="absolute right-3 top-3 text-emerald-500">
                  <Check className="w-4 h-4" />
                </span>
              )}
            </div>
            {errors.homeAddress && (
              <p className="text-red-500 text-xs mt-1">{errors.homeAddress.message}</p>
            )}
          </div>
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
