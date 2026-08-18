"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Check, Loader2 } from 'lucide-react';

interface PostcodeLookupProps {
  onAddressSelected: (address: string) => void;
  label?: string;
  placeholder?: string;
}

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({ 
  onAddressSelected, 
  label = "Home Address", 
  placeholder = "Enter your postcode (e.g. SW1A 1AA)" 
}) => {
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [hasLookedUp, setHasLookedUp] = useState(false);

  const handleLookup = async () => {
    if (!postcode.trim()) return;
    setLoading(true);
    setAddresses([]);
    setHasLookedUp(false);

    // Simulate database lookup latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pcClean = postcode.trim().toUpperCase();
    
    // Detailed Mock database of UK addresses
    const mockDB: Record<string, string[]> = {
      'SW1A 1AA': [
        'Buckingham Palace, London, SW1A 1AA',
        'Privy Purse Office, Buckingham Palace, London, SW1A 1AA',
      ],
      'M1 1AE': [
        '1 Piccadilly, Manchester, M1 1AE',
        '12 Newton Street, Manchester, M1 1AE',
        'Flat 4, Piccadilly Basin, Manchester, M1 1AE',
      ],
      'L4 0TH': [
        'Anfield Stadium, Anfield Road, Liverpool, L4 0TH',
        'LFC Club Shop, Anfield Road, Liverpool, L4 0TH',
        '20 Anfield Road, Liverpool, L4 0TH',
      ],
      'E20 2ST': [
        'London Stadium, Queen Elizabeth Olympic Park, London, E20 2ST',
        'West Ham United Store, Queen Elizabeth Olympic Park, London, E20 2ST',
      ],
      'CF10 1DD': [
        'Cardiff Castle, Castle Street, Cardiff, CF10 1DD',
        'The Keep Tower, Cardiff Castle, Castle Street, Cardiff, CF10 1DD',
      ],
    };

    if (mockDB[pcClean]) {
      setAddresses(mockDB[pcClean]);
    } else {
      // Dynamic fallback mock generator for any postcode
      setAddresses([
        `10 High Street, City Center, ${pcClean}`,
        `Flat 5, Stadium View Court, ${pcClean}`,
        `24 Station Road, Riverside, ${pcClean}`,
      ]);
    }
    
    setLoading(false);
    setHasLookedUp(true);
  };

  const selectAddress = (addr: string) => {
    setSelectedAddress(addr);
    onAddressSelected(addr);
    setAddresses([]); // Clear list
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
        <MapPin className="w-4 h-4 text-indigo-500" />
        <span>{label} Search</span>
      </Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder={placeholder}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="h-10 pr-10 font-outfit"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleLookup())}
          />
          <Search className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
        </div>
        <Button 
          type="button" 
          onClick={handleLookup} 
          disabled={loading || !postcode}
          className="h-10 bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all px-4 cursor-pointer shrink-0"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Find Address'}
        </Button>
      </div>

      {/* Lookup Dropdown */}
      {addresses.length > 0 && (
        <div className="border border-slate-200 rounded-xl bg-white shadow-lg overflow-hidden animate-fade-in z-20 relative max-h-60 overflow-y-auto">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select Address ({addresses.length} results found)
          </div>
          <ul className="divide-y divide-slate-100">
            {addresses.map((addr, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => selectAddress(addr)}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>{addr}</span>
                  <Check className="h-4 w-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasLookedUp && addresses.length === 0 && (
        <p className="text-xs text-red-500 mt-1 font-medium">No addresses found. Enter address manually below.</p>
      )}

      {selectedAddress && (
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 flex items-center justify-between text-xs text-indigo-900 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Selected: {selectedAddress}</span>
          </div>
          <button 
            type="button" 
            onClick={() => {
              setSelectedAddress('');
              onAddressSelected('');
            }}
            className="text-slate-400 hover:text-red-500 font-bold"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
