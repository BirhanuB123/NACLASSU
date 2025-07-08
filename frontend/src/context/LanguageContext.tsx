import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, args?: Record<string, any>) => string | string[] | any;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    values: 'Values',
    team: 'Team',
    sponsors: 'Sponsors',
    news: 'News & Messages',
    gallery: 'Gallery',
    join: 'Join',
    login: 'Login',
    signup: 'Sign Up',
    donate: 'Donate',
    contact: 'Contact',
    create_account: 'Create Account',
    sign_in: 'Sign In',
    email_address: 'Email Address',
    password: 'Password',
    first_name: 'First Name',
    last_name: 'Last Name',
    sign_in_action: 'Sign in',
    sign_up_action: 'Sign up',
    processing: 'Processing...',
    already_have_account: 'Already have an account?',
    new_here: 'New here?',
    create_account_action: 'Create an account',
    login_successful: 'Login successful!',
    welcome_back: 'Welcome back!',
    login_failed: 'Login failed',
    login_error: 'Invalid credentials',
    signup_successful: 'Signup successful!',
    check_email: 'Please check your email to verify your account.',
    signup_failed: 'Signup failed',
    signup_error: 'An error occurred during signup.',
    provider_not_enabled: 'The {provider} provider is not enabled. Please contact support.',
    or: 'Or',
    continue_with_google: 'Continue with Google',
    continue_with_apple: 'Continue with Apple',
    forgot_password: "Forgot Password",
    forgot_password_description: "Enter your email address and we'll send you a link to reset your password.",
    enter_email_reset: "Please enter your email address",
    reset_email_sent: "Reset Email Sent",
    check_email_reset: "Please check your email for password reset instructions",
    reset_failed: "Reset Failed",
    reset_error: "Failed to send password reset email",
    back_to_login: "Back to Login",
    send_reset_email: "Send Reset Email",
    account_created: "Your account has been created successfully!",
    error: "Error",
    logout: 'Logout',
    about_page: {
      title: 'About Us',
      subtitle: 'Learn about our history, mission, and vision',
      our_story: 'Our Story',
      story_paragraphs: [
        'The North America Sunday School Union (NASSU) was founded in 2010 by a group of dedicated Ethiopian Orthodox priests and educators who recognized the need for a unified approach to Sunday School education across North America. What began as a small gathering of educators from various jurisdictions has grown into a comprehensive resource center supporting Sunday Schools throughout the continent.',
        'For over 10 years, we have been developing curriculum materials, organizing teacher training workshops, and creating resources that help parishes provide quality Orthodox Christian education to children and youth. Our work spans across multiple Orthodox jurisdictions, bringing together the rich traditions and teachings of our faith.',
        'Today, NASSU serves hundreds of parishes, reaching thousands of children each week. We continue to expand our offerings and adapt to the changing needs of Orthodox communities while remaining firmly rooted in the unchanging truths of our faith.'
      ],
      at_a_glance: 'At a Glance',
      stats: {
        founded: 'Founded in 2010',
        years_of_service: 'Over 10 years of service',
        parishes_served: '350+ Parishes Served',
        across_jurisdictions: 'Across multiple jurisdictions',
        north_america_wide: 'North America Wide',
        countries: 'United States and Ethiopia'
      },
      mission_vision: 'Our Mission & Vision',
      mission: {
        title: 'Our Mission',
        description: 'To support Ethiopian Orthodox parishes in providing quality Christian education that nurtures the spiritual growth of children and youth, fostering a deep connection to their faith, church community, and Orthodox tradition.'
      },
      vision: {
        title: 'Our Vision',
        description: 'We envision a future where every Orthodox child in North America has access to engaging, authentic Orthodox education that prepares them to live out their faith with confidence, knowledge, and joy.'
      },
      join_mission: {
        title: 'Join Us in Our Mission',
        description: 'Your support helps us continue providing resources and training to Sunday Schools across North America.'
      }
    },
  },
  am: {
    home: 'ዋና ገጽ',
    about: 'ስለ እኛ',
    services: 'አገልግሎቶች',
    values: 'እሴቶች',
    team: 'አባሎች',
    sponsors: 'ስፖንሰሮች',
    news: 'ዜና እና መልዕክት',
    gallery: 'የምስል ስብስቦች',
    message: 'ዜና እና መልዕክት',
    home_title: 'የሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት',
    nassu: 'ናሱ',
    about_us: 'ስለ እኛ',
    learn_about_us: 'ስለ ታሪካችን፣ ተልዕኮናችንና ራዕያችን ይወቁ',
    our_story: 'ታሪካችን',
    our_mission: 'ተልዕኮናችን',
    our_vision: 'ራዕያችን',
    join_our_mission: 'በተልዕኮናችን ውስጥ ይታቀፉ',
    our_leadership: 'አመራሮቻችን',
    meet_the_team: 'ቡድኑን ያግኙ',
    team_dedicated: 'የናሱን ተገዳዳዮች ሙያዎች',
    join_our_team: 'ቡድናችንን ይቀላቀሉ',
    support_our_work: 'ስራችንን ደግፉ',
    core_values: 'ዋና እሴቶች',
    our_values: 'እሴቶቻችን',
    principles_guide: 'ስራችንን የሚመራው መሰረታዊ እሴቶች',
    our_approach: 'አቅጣጫችን',
    engage_whole_person: 'በሙሉ ሰው ላይ ተሳትፎ',
    connect_tradition: 'ከባህላችን ጋር ይገናኙ',
    foster_growth: 'የግል እድገትን ይደግፉ',
    support_families: 'ቤተሰቦችን ደግፉ',
    living_our_values: 'እሴቶቻችንን በሕይወት ውስጥ',
    inclusivity: 'አካባቢነት',
    community: 'ማህበረሰብ',
    educational_excellence: 'የትምህርት ብልጽግና',
    orthodox_faith: 'ኦርቶዶክስ እምነት',
    service: 'አገልግሎት',
    lifelong_learning: 'የሕይወት ሙሉ ትምህርት',
    donate_cta: 'ድጋፋችሁ የእሁድ ት/ቤቶችን በሰሜን አሜሪካ ለማገዝ ምንጮችንና ስልጠናን ለመቀጠል ይረዳናል።',
    donation_helps: 'ልገሳችሁ በሰሜን አሜሪካ ውስጥ ለቅዱሳን ቤተክርስቲያናት ጥሩ የኦርቶዶክስ ትምህርት ምንጮችን ለማቅረብ ይረዳናል።',
    passionate_individuals: 'በኦርቶዶክስ ትምህርት ላይ የተሰጡ በፍቅር የሚሰሩ ሰዎችን ለህጻናትና ለወጣቶች ሕይወት ለመለወጥ እንፈልጋለን።',
    nassu_leadership: 'ናሱ በኦርቶዶክስ ትምህርት፣ ፋይናንስ፣ ኮሚዩኒኬሽንና ስትራቴጂ አቅድ የተሞሉ ባለሙያዎች ቡድን ይመራዋል።',

    join: 'ይቀላቀሉ',
    login: 'ግባ',
    signup: 'ይመዝገቡ',
    donate: 'ለግሱ',
    contact: 'አግኙን',
    create_account: 'መለያ ይፍጠሩ',
    sign_in: 'ግባ',
    email_address: 'የኢሜል አድራሻ',
    password: 'የይለፍ ቃል',
    first_name: 'የመጀመሪያ ስም',
    last_name: 'የአባት ስም',
    sign_in_action: 'ግባ',
    sign_up_action: 'ይመዝገቡ',
    processing: 'በማስኬድ ላይ...',
    already_have_account: 'ቀድሞውኑ መለያ አለዎት?',
    new_here: 'እዚህ አዲስ?',
    create_account_action: 'መለያ ይፍጠሩ',
    login_successful: 'መግባት ተሳክቷል!',
    welcome_back: 'እንኳን ደህና መጡ!',
    login_failed: 'መግባት አልተሳካም',
    login_error: 'ልክ ያልሆኑ ምስክርነቶች',
    signup_successful: 'ምዝገባ ተሳክቷል!',
    check_email: 'እባክዎን መለያዎን ለማረጋገጥ ኢሜልዎን ያረጋግጡ።',
    signup_failed: 'ምዝገባ አልተሳካም',
    signup_error: 'በምዝገባ ወቅት ስህተት ተከስቷል።',
    provider_not_enabled: 'የ {provider} አቅራቢው አልነቃም። እባክዎን ድጋፍን ያነጋግሩ።',
    or: 'ወይም',
    continue_with_google: 'በ Google ይቀጥሉ',
    continue_with_apple: 'በ Apple ይቀጥሉ',
    forgot_password: "የይለፍ ቃል ረሳሁ",
    forgot_password_description: "የኢሜል አድራሻዎን ያስገቡ እና የይለፍ ቃል እንዲዳግሙ አገናኝ እንልክልዎታለን።",
    enter_email_reset: "እባክዎ የኢሜል አድራሻዎን ያስገቡ",
    reset_email_sent: "የዳግም አቀናበር ኢሜል ተልኳል",
    check_email_reset: "እባክዎ የይለፍ ቃል ዳግም ማቀናበር መመሪያዎችን ኢሜልዎን ይመልከቱ",
    reset_failed: "ዳግም ማቀናበር አልተሳካም",
    reset_error: "የይለፍ ቃል ዳግም አቀናበር ኢሜል መላክ አልተሳካም",
    back_to_login: "ወደ መግቢያ ተመለስ",
    send_reset_email: "የዳግም አቀናበር ኢሜል ላክ",
    account_created: "መለያዎ በተሳካ ሁኔታ ተፈጥሯል!",
    error: "ስህተት",
    logout: 'ውጣ',
    about_page: {
      title: 'ስለ እኛ',
      subtitle: 'ስለ ታሪካችን፣ ተልዕኮዎቻችን እና ራዕያችን ይወቁ',
      our_story: 'የእኛ ታሪክ',
      story_paragraphs: [
        'የሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት (ናሱ) በ2010 ዓ.ም. በሰሜን አሜሪካ ውስጥ የሰንበት ት/ቤት ትምህርት ላይ የተቀናጀ አቀራረብ እንዲኖር ያስተዋሉ የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን ካህናት እና ትምህርታዊ ባለሙያዎች ቡድን ተሰብስቦ ተመሠርቷል። ከተለያዩ የአስተዳደር ክልሎች የመጡ ተማሪዎች በሚሰበሰቡበት ትንሽ ስብሰባ የጀመረው ይህ ድርጅት አሁን በሁሉ አህጉር ላይ የሚገኙ የሰንበት ት/ቤቶችን የሚደግፍ የተሟላ ምንጭ ማዕከል ሆኗል።',
        'ለ10 አመታት በላይ ያህል ከሆነ ጊዜ ያህል የትምህርት ዕቅዶችን ቁሳቁሶችን በመዘጋጀት፣ ለመምህራን የስልጠና ስራ ሰልፎችን በማዘጋጀት እና በልጆችና በወጣቶች ጥሩ የኦርቶዶክስ ክርስቲያናዊ ትምህርት እንዲሰጥ የሚያስችሉ ምንጮችን በመፍጠር ላይ ነን። ሥራችን በብዙ የኦርቶዶክስ አስተዳደር ክልሎች የሚገኙ አባላትን በማስተባበር የእምነታችንን ሃይማኖታዊ ትምህርቶች እና ባህሎች አንድ ላይ ያመጣል።',
        'ዛሬ፣ ናሱ በመቶዎች የሚቆጠሩ ቤተክርስቲያናትን በማገልገል በየሳምንቱ በሺዎች የሚቆጠሩ ልጆችን ይደርሳል። በአምላካዊው እውነታ ላይ ተጽእኖ ሳናደርግ ለኦርቶዶክስ ማህበረሰቦች የሚያስፈልጋቸውን አገልግሎቶች ለማቅረብ እያሰፋን እና እየተስተካከልን እንገኛለን።'
      ],
      at_a_glance: 'በአጭሩ',
      stats: {
        founded: 'በ2010 ዓ.ም. ተመሠረተ',
        years_of_service: 'ከ10 አመት በላይ አገልግሎት',
        parishes_served: '350+ ቤተክርስቲያናት የተገለገሉ',
        across_jurisdictions: 'በተለያዩ የአስተዳደር ክልሎች',
        north_america_wide: 'በሙሉ ሰሜን አሜሪካ',
        countries: 'ዩናይትድ ስቴትስ እና ኢትዮጵያ'
      },
      mission_vision: 'ተልዕኮ እና ራዕያችን',
      mission: {
        title: 'ተልዕኮያችን',
        description: 'የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያናትን ልጆችን እና ወጣቶችን በመማር በማስተማር ረገድ የሚያግዙ ጥራት ያለው የክርስትና ትምህርት እንዲሰጡ በማገዝ፣ በእምነታቸው፣ በቤተክርስቲያናቸው ማህበረሰብ እና በኦርቶዶክስ ትምህርታቸው ጥልቀት ያለው ግንኙነት እንዲኖራቸው ለማድረግ ነው።'
      },
      vision: {
        title: 'ራዕያችን',
        description: 'የሚቀጥለውን ትውልድ በእምነት፣ በእውቀት እና በደስታ የሚኖሩበትን የወደፊት ዕቅድ እናስባለን። በሰሜን አሜሪካ ውስጥ ያለ እያንዳንዱ ኦርቶዶክስ ልጅ የሚያስደስት፣ እውነተኛ የኦርቶዶክስ ትምህርት እንዲያገኝ እንፈልጋለን።'
      },
      join_mission: {
        title: 'በተልዕኮያችን ውስጥ ይታቀፉ',
        description: 'ድጋፍዎ በሰሜን አሜሪካ ውስጥ ለሚገኙ የሰንበት ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመቀጠል ይረዳናል።'
      }
    },
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, args: Record<string, string> = {}) => {
    let translation = translations[language][key] || key;
    
    for (const arg in args) {
      translation = translation.replace(`{${arg}}`, args[arg]);
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
