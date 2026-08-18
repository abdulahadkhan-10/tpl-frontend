import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostcodeLookup } from '@/components/PostcodeLookup';
import { Check } from 'lucide-react';

const managerInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Valid date of birth is required',
  }),
  contactNumber: z.string().min(5, 'Mobile number is required'),
  email: z.string().email('Valid email is required'),
  homeAddress: z.string().min(5, 'Home address is required'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactRelation: z.string().min(2, 'Relationship is required'),
  emergencyContactPhone: z.string().min(5, 'Emergency contact phone is required'),
});

type ManagerInfoFormValues = z.infer<typeof managerInfoSchema>;

interface ManagerInfoStepProps {
  initialData: any;
  onNext: (data: ManagerInfoFormValues) => void;
  onBack: () => void;
}

export const ManagerInfoStep: React.FC<ManagerInfoStepProps> = ({ initialData, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<ManagerInfoFormValues>({
    resolver: zodResolver(managerInfoSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: initialData?.manager?.fullName || '',
      dateOfBirth: initialData?.manager?.dateOfBirth || '',
      contactNumber: initialData?.manager?.contactNumber || '',
      email: initialData?.manager?.email || '',
      homeAddress: initialData?.manager?.homeAddress || '',
      emergencyContactName: initialData?.manager?.emergencyContactName || '',
      emergencyContactRelation: initialData?.manager?.emergencyContactRelation || '',
      emergencyContactPhone: initialData?.manager?.emergencyContactPhone || '',
    },
  });

  const onSubmit = (data: ManagerInfoFormValues) => {
    onNext(data);
  };

  const handleAddressSelected = (address: string) => {
    setValue('homeAddress', address, { shouldDirty: true, shouldValidate: true });
    trigger('homeAddress');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Team Manager Information</h3>
        <p className="text-slate-500 text-sm mb-6">Enter your contact, address, and emergency details.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <div className="relative">
            <Input 
              id="fullName" 
              placeholder="e.g. John Doe" 
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

        {/* Contact Number */}
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Mobile Number *</Label>
          <div className="relative">
            <Input 
              id="contactNumber" 
              placeholder="e.g. +44 7123 456789" 
              {...register('contactNumber')} 
              className={`h-10 pr-10 font-outfit ${errors.contactNumber ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.contactNumber && !errors.contactNumber && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Input 
              id="email" 
              type="email" 
              placeholder="e.g. manager@example.com" 
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

        {/* Home Address postcode lookup container */}
        <div className="md:col-span-2 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
          <PostcodeLookup onAddressSelected={handleAddressSelected} />
          
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

        {/* Emergency Contact */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 mt-4 mb-3 border-b border-slate-100 pb-1 uppercase tracking-wide">Emergency Contact Details</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="emergencyContactName">Contact Name *</Label>
              <div className="relative">
                <Input 
                  id="emergencyContactName" 
                  placeholder="e.g. Jane Doe" 
                  {...register('emergencyContactName')} 
                  className={`h-10 pr-10 font-outfit ${errors.emergencyContactName ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                />
                {dirtyFields.emergencyContactName && !errors.emergencyContactName && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
              {errors.emergencyContactName && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContactName.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emergencyContactRelation">Relationship *</Label>
              <div className="relative">
                <Input 
                  id="emergencyContactRelation" 
                  placeholder="e.g. Spouse" 
                  {...register('emergencyContactRelation')} 
                  className={`h-10 pr-10 font-outfit ${errors.emergencyContactRelation ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                />
                {dirtyFields.emergencyContactRelation && !errors.emergencyContactRelation && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
              {errors.emergencyContactRelation && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContactRelation.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emergencyContactPhone">Phone Number *</Label>
              <div className="relative">
                <Input 
                  id="emergencyContactPhone" 
                  placeholder="e.g. +44 7987 654321" 
                  {...register('emergencyContactPhone')} 
                  className={`h-10 pr-10 font-outfit ${errors.emergencyContactPhone ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
                />
                {dirtyFields.emergencyContactPhone && !errors.emergencyContactPhone && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
              {errors.emergencyContactPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.emergencyContactPhone.message}</p>
              )}
            </div>
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
          className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
