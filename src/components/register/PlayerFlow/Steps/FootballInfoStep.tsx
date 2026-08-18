import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

const footballInfoSchema = z.object({
  position: z.string().min(1, 'Preferred playing position is required'),
  previousClub: z.string().optional(),
  shirtSize: z.string().min(1, 'Shirt size is required'),
  shortsSize: z.string().min(1, 'Shorts size is required'),
  sockSize: z.string().min(1, 'Sock size is required'),
  instagramUsername: z.string().optional(),
  tiktokUsername: z.string().optional(),
  youtubeChannel: z.string().optional(),
});

type FootballInfoFormValues = z.infer<typeof footballInfoSchema>;

interface FootballInfoStepProps {
  initialData: any;
  onNext: (data: FootballInfoFormValues) => void;
  onBack: () => void;
}

const positions = [
  { id: 'GK', label: 'GK', name: 'Goalkeeper', style: 'bottom-[8%] left-1/2 -translate-x-1/2' },
  { id: 'LB', label: 'LB', name: 'Left Back', style: 'bottom-[28%] left-[15%] -translate-x-1/2' },
  { id: 'LCB', label: 'CB', name: 'Center Back (L)', style: 'bottom-[22%] left-[35%] -translate-x-1/2' },
  { id: 'RCB', label: 'CB', name: 'Center Back (R)', style: 'bottom-[22%] left-[65%] -translate-x-1/2' },
  { id: 'RB', label: 'RB', name: 'Right Back', style: 'bottom-[28%] left-[85%] -translate-x-1/2' },
  { id: 'CDM', label: 'CDM', name: 'Defensive Mid', style: 'bottom-[42%] left-1/2 -translate-x-1/2' },
  { id: 'LCM', label: 'CM', name: 'Central Mid (L)', style: 'bottom-[56%] left-[30%] -translate-x-1/2' },
  { id: 'RCM', label: 'CM', name: 'Central Mid (R)', style: 'bottom-[56%] left-[70%] -translate-x-1/2' },
  { id: 'LW', label: 'LW', name: 'Left Winger', style: 'bottom-[76%] left-[20%] -translate-x-1/2' },
  { id: 'RW', label: 'RW', name: 'Right Winger', style: 'bottom-[76%] left-[80%] -translate-x-1/2' },
  { id: 'ST', label: 'ST', name: 'Striker', style: 'bottom-[85%] left-1/2 -translate-x-1/2' },
];

const sizes = ['S', 'M', 'L', 'XL'];
const sockSizes = ['M (4-7)', 'L (8-11)', 'XL (12+)'];

export const FootballInfoStep: React.FC<FootballInfoStepProps> = ({ initialData, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<FootballInfoFormValues>({
    resolver: zodResolver(footballInfoSchema),
    mode: 'onChange',
    defaultValues: {
      position: initialData?.position || '',
      previousClub: initialData?.previousClub || '',
      shirtSize: initialData?.shirtSize || '',
      shortsSize: initialData?.shortsSize || '',
      sockSize: initialData?.sockSize || '',
      instagramUsername: initialData?.instagramUsername || '',
      tiktokUsername: initialData?.tiktokUsername || '',
      youtubeChannel: initialData?.youtubeChannel || '',
    },
  });

  const selectedPosition = watch('position');
  const selectedShirt = watch('shirtSize');
  const selectedShorts = watch('shortsSize');
  const selectedSocks = watch('sockSize');

  const onSubmit = (data: FootballInfoFormValues) => {
    onNext(data);
  };

  const handlePositionClick = (posName: string) => {
    setValue('position', posName, { shouldDirty: true, shouldValidate: true });
    trigger('position');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Football & Kit Sizing</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Provide your game details, kit sizes, and social media handles.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Interactive Pitch Position Selector */}
        <div className="md:col-span-2 space-y-3">
          <Label className="text-sm font-semibold text-slate-700">Select Playing Position *</Label>
          <div className="relative w-full max-w-lg mx-auto aspect-[3/4] bg-emerald-800 rounded-3xl border-4 border-slate-900 shadow-inner overflow-hidden p-2 flex flex-col justify-between select-none">
            {/* Pitch Markings */}
            <div className="absolute inset-0 border-2 border-emerald-400/40 rounded-2xl pointer-events-none m-2" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-20 border-b-2 border-x-2 border-emerald-400/40 rounded-b-xl pointer-events-none" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-20 border-t-2 border-x-2 border-emerald-400/40 rounded-t-xl pointer-events-none" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-emerald-400/40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-2 border-emerald-400/40 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400/60 rounded-full pointer-events-none" />

            {/* Position Node Markers */}
            {positions.map((pos, idx) => {
              const isActive = selectedPosition === pos.name;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePositionClick(pos.name)}
                  className={`absolute w-12 h-12 rounded-full border-2 font-bold text-xs shadow-md flex items-center justify-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 border-white text-white scale-110 ring-4 ring-indigo-500/30'
                      : 'bg-white hover:bg-slate-50 border-slate-350 text-slate-800 hover:scale-105'
                  } ${pos.style}`}
                >
                  {pos.label}
                </button>
              );
            })}
          </div>

          <div className="text-center">
            {selectedPosition ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-900 text-sm font-semibold border border-indigo-100 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-500" />
                Selected Position: <span className="font-bold">{selectedPosition}</span>
              </span>
            ) : (
              <span className="text-xs text-slate-400">Click a position marker (e.g. GK, CB, ST) on the field map above.</span>
            )}
            {errors.position && (
              <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>
            )}
          </div>
        </div>

        {/* Previous Club */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="previousClub">Previous Club / Team</Label>
          <div className="relative">
            <Input 
              id="previousClub" 
              placeholder="e.g. Manchester Boys" 
              {...register('previousClub')} 
              className="h-10 pr-10 font-outfit" 
            />
            {dirtyFields.previousClub && (
              <span className="absolute right-3 top-3 text-emerald-500">
                <Check className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>

        {/* Kit Sizing Visual Selectors */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-1 uppercase tracking-wide">Kit Sizes</h4>
          
          {/* Shirt Size */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Shirt Size *</Label>
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setValue('shirtSize', sz, { shouldDirty: true, shouldValidate: true });
                    trigger('shirtSize');
                  }}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    selectedShirt === sz
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border-slate-200 hover:border-indigo-600 text-slate-750 hover:bg-slate-50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            {errors.shirtSize && <p className="text-red-500 text-xs mt-1">{errors.shirtSize.message}</p>}
          </div>

          {/* Shorts Size */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Shorts Size *</Label>
            <div className="grid grid-cols-4 gap-3">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setValue('shortsSize', sz, { shouldDirty: true, shouldValidate: true });
                    trigger('shortsSize');
                  }}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    selectedShorts === sz
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border-slate-200 hover:border-indigo-600 text-slate-750 hover:bg-slate-50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            {errors.shortsSize && <p className="text-red-500 text-xs mt-1">{errors.shortsSize.message}</p>}
          </div>

          {/* Sock Size */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sock Size *</Label>
            <div className="grid grid-cols-3 gap-3">
              {sockSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setValue('sockSize', sz, { shouldDirty: true, shouldValidate: true });
                    trigger('sockSize');
                  }}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer text-center ${
                    selectedSocks === sz
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border-slate-200 hover:border-indigo-600 text-slate-750 hover:bg-slate-50'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            {errors.sockSize && <p className="text-red-500 text-xs mt-1">{errors.sockSize.message}</p>}
          </div>
        </div>

        {/* Social Media */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 border-b border-slate-100 pb-1 uppercase tracking-wide">Social Media Handles</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="instagramUsername">Instagram</Label>
              <Input id="instagramUsername" placeholder="@username" {...register('instagramUsername')} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tiktokUsername">TikTok</Label>
              <Input id="tiktokUsername" placeholder="@username" {...register('tiktokUsername')} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="youtubeChannel">YouTube</Label>
              <Input id="youtubeChannel" placeholder="Channel Link/Name" {...register('youtubeChannel')} className="h-10" />
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
