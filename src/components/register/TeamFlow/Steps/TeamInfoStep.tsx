import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PostcodeLookup } from '@/components/PostcodeLookup';
import { Check, UploadCloud, Trash2 } from 'lucide-react';

const teamInfoSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  cityOrTown: z.string().min(2, 'City/Town is required'),
  logoUrl: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
});

type TeamInfoFormValues = z.infer<typeof teamInfoSchema>;

interface TeamInfoStepProps {
  initialData: any;
  onNext: (data: TeamInfoFormValues) => void;
  onBack: () => void;
}

export const TeamInfoStep: React.FC<TeamInfoStepProps> = ({ initialData, onNext, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<TeamInfoFormValues>({
    resolver: zodResolver(teamInfoSchema),
    mode: 'onChange',
    defaultValues: {
      teamName: initialData?.teamName || '',
      email: initialData?.email || '',
      password: initialData?.password || '',
      cityOrTown: initialData?.cityOrTown || '',
      logoUrl: initialData?.logoUrl || '',
      instagram: initialData?.socialLinks?.instagram || '',
      tiktok: initialData?.socialLinks?.tiktok || '',
      facebook: initialData?.socialLinks?.facebook || '',
      twitter: initialData?.socialLinks?.twitter || '',
    },
  });

  const logoUrlValue = watch('logoUrl');

  const onSubmit = (data: TeamInfoFormValues) => {
    onNext(data);
  };

  const handleAddressSelected = (address: string) => {
    // Extract city/town from standard UK address string (usually the element before postcode)
    // E.g. "Buckingham Palace, London, SW1A 1AA" -> London
    const parts = address.split(',');
    if (parts.length >= 2) {
      const cityPart = parts[parts.length - 2].trim();
      setValue('cityOrTown', cityPart, { shouldDirty: true, shouldValidate: true });
      trigger('cityOrTown');
    }
  };

  // Drag and Drop Logo Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setValue('logoUrl', event.target.result as string, { shouldDirty: true, shouldValidate: true });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Team Details</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Provide the basic details and credentials for your team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Team Name */}
        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name *</Label>
          <div className="relative">
            <Input 
              id="teamName" 
              placeholder="e.g. London FC" 
              {...register('teamName')} 
              className={`h-10 pr-10 font-outfit ${errors.teamName ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.teamName && !errors.teamName && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.teamName && (
            <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>
          )}
        </div>

        {/* Team Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Team Email *</Label>
          <div className="relative">
            <Input 
              id="email" 
              type="email"
              placeholder="e.g. contact@londonfc.com" 
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

        {/* Team Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
            <Input 
              id="password" 
              type="password"
              placeholder="Enter secure password" 
              {...register('password')} 
              className={`h-10 pr-10 font-outfit ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.password && !errors.password && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* City/Town Lookup / Manual Field */}
        <div className="space-y-2 relative">
          <Label htmlFor="cityOrTown">City/Town *</Label>
          <div className="relative">
            <Input 
              id="cityOrTown" 
              placeholder="e.g. London" 
              {...register('cityOrTown')} 
              className={`h-10 pr-10 font-outfit ${errors.cityOrTown ? 'border-red-500 focus-visible:ring-red-500' : ''}`} 
            />
            {dirtyFields.cityOrTown && !errors.cityOrTown && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
          {errors.cityOrTown && (
            <p className="text-red-500 text-xs mt-1">{errors.cityOrTown.message}</p>
          )}
        </div>

        {/* Optional City Lookup */}
        <div className="md:col-span-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          <PostcodeLookup onAddressSelected={handleAddressSelected} label="City/Town Autocomplete" placeholder="Enter postcode to extract city (e.g. M1 1AE)" />
        </div>

        {/* Drag & Drop Logo Upload Container */}
        <div className="md:col-span-2 space-y-2">
          <Label>Team Logo (Optional)</Label>
          {logoUrlValue ? (
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 animate-fade-in">
              <img 
                src={logoUrlValue} 
                alt="Uploaded Logo Preview" 
                className="w-16 h-16 rounded-full border border-slate-200 object-cover shadow-sm bg-white" 
              />
              <div className="flex-1">
                <span className="text-sm font-semibold text-slate-800 block">Logo Uploaded Successfully</span>
                <span className="text-xs text-slate-400">Your logo will represent your team in matches and stats page.</span>
              </div>
              <button 
                type="button" 
                onClick={() => setValue('logoUrl', '')}
                className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isDragging 
                  ? 'border-amber-500 bg-amber-50/30' 
                  : 'border-slate-200 hover:border-amber-500 hover:bg-slate-50/50'
              }`}
              onClick={() => document.getElementById('logo-file-input')?.click()}
            >
              <input 
                id="logo-file-input" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileInput} 
              />
              <UploadCloud className={`w-10 h-10 mb-3 transition-colors ${isDragging ? 'text-amber-500' : 'text-slate-400'}`} />
              <span className="text-sm font-bold text-slate-700">Drag & drop team logo here</span>
              <span className="text-xs text-slate-400 mt-1">Accepts images up to 5MB (PNG, JPG, SVG)</span>
            </div>
          )}
        </div>

        {/* Social Media Links */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 mt-4 mb-3 border-b border-slate-100 pb-1 uppercase tracking-wide">Social Media Links</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" placeholder="@instagram_handle" {...register('instagram')} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tiktok">TikTok</Label>
              <Input id="tiktok" placeholder="@tiktok_handle" {...register('tiktok')} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" placeholder="facebook.com/team" {...register('facebook')} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="twitter">X (Twitter)</Label>
              <Input id="twitter" placeholder="@twitter_handle" {...register('twitter')} className="h-10" />
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
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 py-3 text-sm font-bold shadow-sm transition-all"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
