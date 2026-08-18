import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

const medicalInfoSchema = z.object({
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactRelation: z.string().min(2, 'Relationship is required'),
  emergencyContactPhone: z.string().min(5, 'Emergency contact phone is required'),
  medicalConditions: z.string().optional(),
  allergies: z.string().optional(),
  medicationDetails: z.string().optional(),
  gpName: z.string().optional(),
});

type MedicalInfoFormValues = z.infer<typeof medicalInfoSchema>;

interface MedicalInfoStepProps {
  initialData: any;
  onNext: (data: MedicalInfoFormValues) => void;
  onBack: () => void;
}

export const MedicalInfoStep: React.FC<MedicalInfoStepProps> = ({ initialData, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<MedicalInfoFormValues>({
    resolver: zodResolver(medicalInfoSchema),
    mode: 'onChange',
    defaultValues: {
      emergencyContactName: initialData?.emergencyContactName || '',
      emergencyContactRelation: initialData?.emergencyContactRelation || '',
      emergencyContactPhone: initialData?.emergencyContactPhone || '',
      medicalConditions: initialData?.medicalConditions || '',
      allergies: initialData?.allergies || '',
      medicationDetails: initialData?.medicationDetails || '',
      gpName: initialData?.gpName || '',
    },
  });

  const onSubmit = (data: MedicalInfoFormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Emergency & Medical Info</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Please provide your emergency contacts and health records.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Emergency Contact */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-1 uppercase tracking-wide">Emergency Contact</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="emergencyContactName">Contact Name *</Label>
              <div className="relative">
                <Input 
                  id="emergencyContactName" 
                  placeholder="e.g. Mary Ronaldo" 
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
                  placeholder="e.g. Parent" 
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

        {/* Medical History */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-1 uppercase tracking-wide">Medical Details</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="medicalConditions">Medical Conditions / Health Issues</Label>
              <div className="relative">
                <Input 
                  id="medicalConditions" 
                  placeholder="e.g. Asthma (None if none)" 
                  {...register('medicalConditions')} 
                  className="h-10 pr-10 font-outfit" 
                />
                {dirtyFields.medicalConditions && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="allergies">Allergies</Label>
              <div className="relative">
                <Input 
                  id="allergies" 
                  placeholder="e.g. Peanuts, Penicillin" 
                  {...register('allergies')} 
                  className="h-10 pr-10 font-outfit" 
                />
                {dirtyFields.allergies && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="medicationDetails">Current Medication Details</Label>
              <div className="relative">
                <Input 
                  id="medicationDetails" 
                  placeholder="e.g. Inhaler daily" 
                  {...register('medicationDetails')} 
                  className="h-10 pr-10 font-outfit" 
                />
                {dirtyFields.medicationDetails && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="gpName">GP/Doctor Name (Optional)</Label>
              <div className="relative">
                <Input 
                  id="gpName" 
                  placeholder="e.g. Dr. Watson" 
                  {...register('gpName')} 
                  className="h-10 pr-10 font-outfit" 
                />
                {dirtyFields.gpName && (
                  <span className="absolute right-3 top-3 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
