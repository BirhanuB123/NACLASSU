export type Language = 'en' | 'am';

export interface Translations {
  hero: {
    title: string;
    subtitle: string;
  };
  welcome: {
    title: string;
    content: string;
  };
  // We'll add more translations as we identify text in other components
}

const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union',
      subtitle: 'Nurturing faith and education in our Orthodox community',
    },
    welcome: {
      title: 'Welcome to NASSU',
      content: 'Welcome message content in English...',
    },
  },
  am: {
    hero: {
      title: 'በኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስትያን የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አህጉረ ስብከት የሰንበት ትምህርት ቤቶች ህብረት',
      subtitle: 'ሃይማኖታዊ እምነት እና ትምህርትን በኦርቶዶክስ ማህበረሰባችን ውስጥ ማሳደግ',
    },
    welcome: {
      title: 'እንኳን ወደ NASSU ደህና መጡ ',
      content: 'የእንኳን ደህና መጡ መልእክት በአማርኛ...',
    },
  },
};

export default translations;
