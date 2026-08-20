import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostcodeLookup } from '@/components/PostcodeLookup';
import { Check, Eye, EyeOff, Lock } from 'lucide-react';

const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Valid date of birth is required',
  }),
  nationality: z.string().min(2, 'Nationality is required'),
  homeAddress: z.string().min(5, 'Home address is required'),
  mobileNumber: z.string().min(5, 'Mobile number is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword'],
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoStepProps {
  initialData: any;
  onNext: (data: PersonalInfoFormValues) => void;
  onBack: () => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ initialData, onNext, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      password: initialData?.password || '',
      confirmPassword: initialData?.confirmPassword || initialData?.password || '',
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
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Personal & Account Information</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">
          Please enter your identity details and set a secure password for your Player Dashboard.
        </p>
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

        {/* Email Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email">Email Address (Login ID) *</Label>
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
          <p className="text-[11px] text-slate-400">Your official login credentials will be dispatched to this email address.</p>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Create Password *</Label>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 6 characters" 
              {...register('password')} 
              className={`h-10 pr-10 font-outfit ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <div className="relative">
            <Input 
              id="confirmPassword" 
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password" 
              {...register('confirmPassword')} 
              className={`h-10 pr-10 font-outfit ${errors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
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
          className="border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl px-8 py-3 text-sm font-bold transition-all cursor-pointer"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
