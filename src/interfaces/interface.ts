export interface StatusProps {
  loading: boolean;
  error: boolean;
  message: string;

}

export const CountryList = [
  {value: 'argentina', label: '🇦🇷 Argentina'},
  {value: 'australia', label: '🇦🇺 Australia'},
  {value: 'belgium', label: '🇧🇪 Belgium'},
  {value: 'brazil', label: '🇧🇷 Brazil'},
  {value: 'canada', label: '🇨🇦 Canada'},
  {value: 'china', label: '🇨🇳 China'},
  {value: 'denmark', label: '🇩🇰 Denmark'},
  {value: 'finland', label: '🇫🇮 Finland'},
  {value: 'france', label: '🇫🇷 France'},
  {value: 'germany', label: '🇩🇪 Germany'},
  {value: 'india', label: '🇮🇳 India'},
  {value: 'indonesia', label: '🇮🇩 Indonesia'},
  {value: 'israel', label: '🇮🇱 Israel'},
  {value: 'italy', label: '🇮🇹 Italy'},
  {value: 'japan', label: '🇯🇵 Japan'},
  {value: 'south-korea', label: '🇰🇷 South Korea'},
  {value: 'mexico', label: '🇲🇽 Mexico'},
  {value: 'netherlands', label: '🇳🇱 Netherlands'},
  {value: 'norway', label: '🇳🇴 Norway'},
  {value: 'portugal', label: '🇵🇹 Portugal'},
  {value: 'russia', label: '🇷🇺 Russia'},
  {value: 'saudi-arabia', label: '🇸🇦 Saudi Arabia'},
  {value: 'singapore', label: '🇸🇬 Singapore'},
  {value: 'south-africa', label: '🇿🇦 South Africa'},
  {value: 'spain', label: '🇪🇸 Spain'},
  {value: 'sweden', label: '🇸🇪 Sweden'},
  {value: 'switzerland', label: '🇨🇭 Switzerland'},
  {value: 'turkey', label: '🇹🇷 Turkey'},
  {value: 'united-kingdom', label: '🇬🇧 United Kingdom'},
  {value: 'united-states', label: '🇺🇸 United States'}
]

export interface OptionType {
  value: string,
  label: string
}

export interface UserInformationProps {
  id: string;
  country: string;
  plan: string;
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
}

export interface TeamInfoProps {
  id: string;
  name: string;
  createdAt: string;
  owner: string;
  plan: string;
  registrationCode: string;
  group: string[];
  members: string[];
}