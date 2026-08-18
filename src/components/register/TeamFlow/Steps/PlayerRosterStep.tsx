import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const playerSchema = z.object({
  fullName: z.string().min(2, 'Player full name is required'),
  email: z.string().email('Valid player email is required'),
});

const rosterSchema = z.object({
  players: z.array(playerSchema).length(15, 'Exactly 15 players must be listed'),
});

type RosterFormValues = z.infer<typeof rosterSchema>;

interface PlayerRosterStepProps {
  initialData: any;
  onNext: (data: RosterFormValues) => void;
  onBack: () => void;
}

export const PlayerRosterStep: React.FC<PlayerRosterStepProps> = ({ initialData, onNext, onBack }) => {
  // Initialize with 15 empty slots or previous data
  const defaultPlayers = Array.from({ length: 15 }, (_, i) => ({
    fullName: initialData?.players?.[i]?.fullName || '',
    email: initialData?.players?.[i]?.email || '',
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RosterFormValues>({
    resolver: zodResolver(rosterSchema),
    defaultValues: {
      players: defaultPlayers,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'players',
  });

  const onSubmit = (data: RosterFormValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Team Roster (15 Players)</h3>
        <p className="text-slate-500 text-sm mb-6">
          Provide the name and email for each of the 15 players. They will receive invitation links to complete their registration.
        </p>
      </div>

      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-y border-slate-100 py-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Player {index + 1}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor={`players.${index}.fullName`}>Full Name *</Label>
                <Input
                  id={`players.${index}.fullName`}
                  placeholder="Player Full Name"
                  {...register(`players.${index}.fullName` as const)}
                  className="h-10 bg-white"
                />
                {errors.players?.[index]?.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.players[index]?.fullName?.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`players.${index}.email`}>Email Address *</Label>
                <Input
                  id={`players.${index}.email`}
                  type="email"
                  placeholder="player@example.com"
                  {...register(`players.${index}.email` as const)}
                  className="h-10 bg-white"
                />
                {errors.players?.[index]?.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.players[index]?.email?.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}
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
