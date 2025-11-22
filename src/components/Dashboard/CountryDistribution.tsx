"use client";

import { Globe } from "lucide-react";

interface CountryStat {
  country: string;
  count: number;
  meanScore: number;
}

interface CountryDistributionProps {
  countries: CountryStat[];
}

const countryFlags: Record<string, string> = {
  'JP': '🇯🇵',
  'CN': '🇨🇳',
  'KR': '🇰🇷',
  'TW': '🇹🇼',
};

const countryNames: Record<string, string> = {
  'JP': 'Japan',
  'CN': 'China',
  'KR': 'South Korea',
  'TW': 'Taiwan',
};

export function CountryDistribution({ countries }: CountryDistributionProps) {
  const sortedCountries = [...countries].sort((a, b) => b.count - a.count);
  const maxCount = sortedCountries[0]?.count || 1;

  return (
    <div className="rounded-xl bg-gray-900 p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-emerald-500" />
        <h3 className="text-xl font-bold text-white">By Country</h3>
      </div>
      <div className="space-y-4">
        {sortedCountries.map((country) => {
          const percentage = (country.count / maxCount) * 100;
          const flag = countryFlags[country.country] || '🌐';
          const name = countryNames[country.country] || country.country;

          return (
            <div key={country.country} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{flag}</span>
                  <span className="text-gray-300 font-medium">{name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">{country.count}</span>
                  <span className="text-yellow-500 font-semibold w-12 text-right">
                    {country.meanScore > 0 ? `★ ${country.meanScore.toFixed(0)}` : '—'}
                  </span>
                </div>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
