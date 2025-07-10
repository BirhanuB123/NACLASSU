import React, { createContext, useContext, useState, ReactNode, FC } from 'react';


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

interface LanguageProviderProps {
  children: ReactNode;
}

const translations: Record<string, any> = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    values: 'Values',
    team: 'Team',
    sponsors: 'Sponsors',
    news: 'News & Messages',
    news_am: 'ዜና እና መልዕክቶች',
    gallery: 'Gallery',
    join: 'Join',
    login: 'Login',
    vision: {
      title: 'Our Vision',
      description: 'We envision a future where the next generation thrives in faith, knowledge, and happiness. We want every Orthodox child in North America to have access to quality, authentic Orthodox education.'
    },
    join_mission: {
      title: 'Join Our Mission',
      description: 'Your support helps us continue providing resources and training for Sunday Schools across North America.'
    },
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
    create_account_action: 'Create Account',
    login_successful: 'Login successful!',
    welcome_back: 'Welcome back!',
    login_failed: 'Login failed',
    login_error: 'Invalid credentials',
    signup_successful: 'Signup successful!',
    home_title: 'North American Sunday School Union',
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
    

    
    // Core Values Section
    core_values: 'Our Core Values',
    educational_excellence: 'Educational Excellence',
    orthodox_faith: 'Orthodox Faith',
    community: 'Community',
    core_values_section: {
      educational_excellence: 'We are committed to providing the highest quality Orthodox Christian education that nurtures both the mind and soul of every student.',
      orthodox_faith: 'Our teachings are deeply rooted in the Holy Tradition of the Orthodox Church, preserving and passing on the faith to future generations.',
      community: 'We foster a strong sense of belonging and support among students, families, and the wider Orthodox community.',
      learn_more: 'Learn More About Our Values'
    },
    

    
    // Services Section
    services_section: {
      services_page: {
        title: 'Our Services',
        subtitle: 'Supporting Orthodox Education in North America',
        what_we_offer: {
          title: 'What We Offer',
          description: 'NASSU provides a wide range of services designed to support Orthodox Christian education in parishes across North America. Our offerings are developed by experienced educators and clergy to ensure theological accuracy and educational effectiveness.'
        },
        services: [
          {
            title: 'Sunday School Curriculum',
            description: 'Comprehensive, age-appropriate Orthodox Christian education materials for children from preschool through high school.'
          },
          {
            title: 'Teacher Training',
            description: 'Workshops, webinars, and resources to equip Sunday School teachers with effective teaching methods and Orthodox knowledge.'
          },
          {
            title: 'Youth Events',
            description: 'Retreats, camps, and activities that bring Orthodox youth together for fellowship and spiritual growth.'
          },
          {
            title: 'Resource Development',
            description: 'Creation of teaching aids, activity books, and digital resources to enhance the Sunday School experience.'
          },
          {
            title: 'Webinars and Online Classes',
            description: 'Live and recorded educational sessions for students, teachers, and parents on various aspects of Orthodox faith.'
          },
          {
            title: 'Parent Support',
            description: 'Resources and guidance to help parents continue faith education at home and support their children\'s spiritual journey.'
          },
          {
            title: 'Audio Resources',
            description: 'Orthodox music, stories, and teachings in audio format for use in Sunday School and at home.'
          },
          {
            title: 'Parish Consultation',
            description: 'Expert guidance to help parishes establish and strengthen their Sunday School programs.'
          }
        ],
        how_we_help: 'How We Can Help Your Parish',
        our_process: 'Our Process',
        process_steps: [
          {
            title: 'Consultation',
            description: 'We begin by understanding your parish\'s specific needs, goals, and current Sunday School structure. This helps us tailor our recommendations and support.'
          },
          {
            title: 'Curriculum Selection',
            description: 'Based on your needs, we help you select or develop appropriate curriculum materials for each age group in your Sunday School program.'
          },
          {
            title: 'Teacher Training',
            description: 'We provide training for your Sunday School teachers, equipping them with teaching methods, classroom management skills, and deeper knowledge of Orthodox theology.'
          },
          {
            title: 'Ongoing Support',
            description: 'We offer continued support through regular check-ins, additional resources as needed, and opportunities for your teachers and youth to participate in NASSU events.'
          }
        ],
        request_services: 'Request Our Services',
        request_description: 'Interested in bringing NASSU resources to your parish? Reach out to us today to discuss how we can support your Sunday School program.',
        form_labels: {
          parish_name: 'Parish Name',
          parish_name_placeholder: 'Enter your parish name',
          your_name: 'Your Name',
          your_name_placeholder: 'Enter your full name',
          email: 'Email',
          email_placeholder: 'Enter your email address',
          phone: 'Phone',
          phone_placeholder: 'Enter your phone number',
          message: 'Message',
          message_placeholder: 'Enter your question or comment',
          submit: 'Send Message'
        }
      }
    },
    
    // Call to Action Section
    cta: {
      title: 'Join Our Mission',
      description: 'Help us nurture the faith of the next generation. Your support makes our work possible.'
    },
    // Homepage translations
    hero: {
      title: 'North America Sunday School Union',
      subtitle: 'Nurturing faith and education in our Orthodox community'
    },
    // Events Section
    events: {
      upcoming_events: 'Upcoming Events',
      subtitle: 'Join us for these exciting upcoming events. Stay connected with our community.',
      learn_more: 'Learn More',
      view_all: 'View All Events',
      
      annual_youth_conference: {
        title: 'Annual Youth Conference 2025',
        date: 'July 15-18, 2025',
        time: '9:00 AM - 5:00 PM',
        excerpt: 'Join us for our biggest youth event of the year with inspiring speakers and workshops.'
      },
      
      bible_study_workshop: {
        title: 'Bible Study Workshop',
        date: 'July 22, 2025',
        time: '6:00 PM - 8:00 PM',
        excerpt: 'Deepen your understanding of the Scriptures with our weekly Bible study sessions.'
      },
      
      community_service_day: {
        title: 'Community Service Day',
        date: 'August 5, 2025',
        time: '8:00 AM - 3:00 PM',
        excerpt: 'Join us as we give back to our local community through various service projects.'
      }
    },
    
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
    }
  },
  am: {
    // Navigation
    home: 'ዋና ገጽ',
    join_us: 'በተልዕኮአችን ውስጥ ይቀላቀሉ',
    about: 'ስለ እኛ',
    services: 'አገልግሎቶች',
    values: 'እሴቶች',
    team: 'አባሎች',
    sponsors: 'ስፖንሰሮች',
    news: 'ዜና እና መልዕክት',
    gallery: 'የምስል ስብስቦች',
    
    // Common UI
    join: 'ይቀላቀሉ',
    login: 'ግባ',
    signup: 'ይመዝገቡ',
    donate: 'ለግሱ',
    contact: 'አግኙን',
    
    // Page specific
    about_us: 'ስለ እኛ',
    our_story: 'ታሪካችን',
    
    // Vision and Mission
    vision: {
      title: 'የእኛ ራእይ',
      description: 'የሚቀጥለው ትውልድ በእምነት፣ በእውቀት እና በደስታ የሚያድግበትን የወደፊቱን እያየን ነው። በሰሜን አሜሪካ ያለ እያንዳንዱ ኦርቶዶክስ ልጅ ጥራት ያለው፣ እውነተኛ የኦርቶዶክስ ትምህርት እንዲኖረው እንፈልጋለን።'
    },
    join_mission: {
      title: 'በተልዕኮአችን ውስጥ ይቀላቀሉ',
      description: 'ድጋፍዎ በሰሜን አሜሪካ ዙሪያ ለሚገኙ የእሁድ ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመስጠት እንድንቀጥል ይረዳናል።'
    },
    
    // Homepage translations
    hero: {
      title: 'የሰሜን አሜሪካ የእሁድ ት/ቤት ህብረት',
      subtitle: 'በኦርቶዶክስ ማህበረሰባችን ውስጥ እምነትን እና ትምህርትን ማጎልበት'
    },
    
    // About Page
    about_page: {
      title: 'ስለ እኛ',
      subtitle: 'ስለ ታሪካችን፣ ተልዕኮችን እና ራእይ ይወቁ',
      our_story: 'የእኛ ታሪክ',
      story_paragraphs: [
        'የሰሜን አሜሪካ የእሁድ ት/ቤት ህብረት (ናሱ) በ2010 ዓ.ም. በሰሜን አሜሪካ ውስጥ የአንድነት ያለው የእሁድ ት/ቤት ትምህርት አስፈላጊነቱን ያስተዋሉ የነበሩ በተለያዩ የሃይማኖት ተቋማት ውስጥ የሚገኙ ተገዢ የኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስቲያን ቄሳማት እና ተማሪዎች ተቋቁመዋል። ከተለያዩ የሃይማኖት ተቋማት የመጡ አስተማሪዎች በሚሳተፉበት ትንሽ ስብሰባ ሆኖ የጀመረው አሁን በሙሉ የሰሜን አሜሪካ ውስጥ የሚገኙ የእሁድ ት/ቤቶችን የሚደግፍ የተሟላ ምንጭ ማዕከል ሆኗል።',
        'ለ10 አመታት በላይ ያህል የትምህርት ዕቃዎችን በመዘጋጀት፣ ለመምህራን ስልጠናዎችን በማዘጋጀት እና ለልጆች እና ለወጣቶች የሚያስተምሩ የክርስቲያናዊ ትምህርት ዕቃዎችን በማዘጋጀት ላይ ነን። የእኛ ስራ በብዙ የኦርቶዶክስ ክርስቲያናት ዙሪያ ይከናወናል የሃይማኖታችንን ባህል እና ትምህርቶች ወደ አዲስ ትውልድ ለማስተላለፍ የሚያስችል ነው።',
        'ዛሬ፣ ናሱ በበርካታ መቶ የሚቆጠሩ ቤተክርስቲያናትን ያገለግላል እና በየሳምንቱ በሺዎች የሚቆጠሩ ልጆችን ይደርሳል። በእምነታችን የማይለዋወጥ እውነታዎች ላይ በጥብቅ ተጽእኖ ባለው ሁኔታ የኦርቶዶክስ ማህበረሰቦች የሚቀየሩትን ፍላጎቶች ለመደገፍ እየሰራን እና የምናስተላልፋቸውን ነገሮች እያሳደግን ነው።'
      ],
      at_a_glance: 'በአጠቃላይ እይታ',
      stats: {
        founded: 'በ2010 ዓ.ም. ተመሠረተ',
        years_of_service: 'ከ10 አመት በላይ አገልግሎት',
        parishes_served: '350+ የተገለገሉ ቤተክርስቲያናት',
        across_jurisdictions: 'በበርካታ ቤተክርስቲያናት ውስጥ',
        north_america_wide: 'በሙሉ ሰሜን አሜሪካ ውስጥ',
        countries: 'ዩናይትድ ስቴትስ እና ኢትዮጵያ'
      },
      mission_vision: 'የእኛ ተልዕኮ እና ራእይ',
      mission: {
        title: 'የእኛ ተልዕኮ',
        description: 'ልጆችን እና ወጣቶችን ከእምነታቸው፣ ከቤተክርስቲያናቸው ማህበረሰብ እና ከኦርቶዶክስ ትምህርቶች ጋር ጥልቅ ግንኙነት እንዲያደርጉ የሚያግዛቸውን ጥራት ያለው ክርስቲያናዊ ትምህርት ለመስጠት ለኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያናት ድጋፍ ማድረግ።'
      },
      vision: {
        title: 'የእኛ ራእይ',
        description: 'በእምነት፣ በእውቀት እና በደስታ የሚሞሉ የወደፊቱን ትውልድ እያየን ነን። በሰሜን አሜሪካ ያለ እያንዳንዱ ኦርቶዶክስ ልጅ በጥራት ያለው፣ እውነተኛ የኦርቶዶክስ ትምህርት እንዲኖረው እንፈልጋለን።'
      },
      join_mission: {
        title: 'በተልዕኮአችን ውስጥ ይቀላቀሉ',
        description: 'ድጋፍዎ በሰሜን አሜሪካ ዙሪያ ለሚገኙ የእሁድ ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመስጠት እንድንቀጥል ይረዳናል።'
      }
    },
    
    // Core Values Section
    educational_excellence: 'ትምህርታዊ ሙሉነት',
    orthodox_faith: 'የኦርቶዶክስ እምነት',
    community: 'ማህበረሰብ',
    
    core_values_section: {
      educational_excellence: 'በእምነታችን ውስጥ የተጠለቀ እውነተኛ የኦርቶዶክስ ክርስቲያናዊ ትምህርት ለመስጠት ቁርጠኛ ነን።',
      orthodox_faith: 'ልጆች እና ወጣቶች ከክርስቶስ ጋር ግላዊ ግንኙነት እንዲፈጥሩ የሚያግዛቸውን ጥልቅ እና ዘላቂ እምነት እናሳድጋለን።',
      community: 'በወጣቶቻችን መካከል የመኖሪያ እና የግንኙነት ስሜት እንፈጥራለን፣ ከእሁድ ት/ቤት በላይ የሚያራምድ የምታነጽበት ማህበረሰብ እንፈጥራለን።',
      learn_more: 'ስለ እሴቶቻችን ተጨማሪ ይወቁ'
    },
    
    // Services Section
    services_section: {
      services_page: {
        title: 'የእኛ አገልግሎቶች',
        subtitle: 'በሰሜን አሜሪካ ውስጥ የኦርቶዶክስ ትምህርትን በማገዝ ላይ',
        what_we_offer: {
          title: 'ምን እናቀርባለን',
          description: 'ናሱ በሰሜን አሜሪካ ውስጥ ባሉ የኦርቶዶክስ ቤተክርስቲያናት ውስጥ የክርስቲያናዊ ትምህርትን ለማገዝ የተዘጋጁ የተለያዩ አገልግሎቶችን ያቀርባል። የእኛ አገልግሎቶች በልምድ ያላቸው አስተማሪዎች እና ቄሳማት የተዘጋጁ ሲሆኑ በኦርቶዶክስ እምነት መሰረት ትክክለኛ እና ውጤታማ እንዲሆኑ የተዘጋጁ ናቸው።'
        },
        services: [
          {
            title: 'የሰንበት ት/ቤት ሥርዓተ-ትምህርት',
            description: 'ለመነሻ እስከ ሁለተኛ ደረጃ ድረስ ለልጆች የተዘጋጀ የኦርቶዶክስ ክርስቲያናዊ ትምህርት ቁሳቁሶች።'
          },
          {
            title: 'የመምህራን ስልጠና',
            description: 'ለእሁድ ት/ቤት መምህራን ውጤታማ የትምህርት ዘዴዎችን እና የኦርቶዶክስ እውቀትን ለማስተማር የሚያግዙ የስልጠና አዘገጃጀቶች፣ ዌብናሮች እና ምንጮች።'
          },
          {
            title: 'የወጣቶች ክስተቶች',
            description: 'ኦርቶዶክስ ወጣቶች ለጋርነት እና ለመንፈሳዊ እድገት የሚሰበሰቡባቸው የመከላከያ፣ ካምፖች እና እንቅስቃሴዎች።'
          },
          {
            title: 'የምንጭ ልማት',
            description: 'የትምህርት እርዳታዎችን፣ የእንቅስተ-ክርስትና መጽሐፍትን እና ዲጂታል ምንጮችን ለማዘጋጀት የሚያስችሉ መሳሪያዎች።'
          },
          {
            title: 'ዌብናሮች እና የመስመር ላይ ክፍሎች',
            description: 'ለተማሪዎች፣ ለመምህራን እና ለወላጆች የሚዘጋጁ በቀጥታ እና የተቀዳሰ የትምህርት ክፍሎች።'
          },
          {
            title: 'የወላጆች ድጋፍ',
            description: 'ወላጆች በቤታቸው የእምነት ትምህርትን እንዲቀጥሉ እና ልጆቻቸውን በመንፈሳዊ ጉዞ ላይ እንዲደግፉ የሚያግዙ ምንጮች እና መመሪያዎች።'
          },
          {
            title: 'የድምፅ ምንጮች',
            description: 'የኦርቶዶክስ ሙዚቃ፣ ታሪኮች እና ትምህርቶች በድምፅ ቅርጸት ለሰንበት ት/ቤት እና ለቤት አጠቃቀም።'
          },
          {
            title: 'የቤተክርስቲያን የምክር አገልግሎት',
            description: 'ቤተክርስቲያናት የሰንበት ት/ቤት ፕሮግራሞቻቸውን እንዲያቋቁሙ እና እንዲጠነክሩ የሚያግዛቸው የባለሙያ ምክር አገልግሎት።'
          }
        ],
        how_we_help: 'የእርስዎን ቤተክርስቲያን እንዴት ልናግዝ እንደምንችል',
        our_process: 'የእኛ ሂደት',
        process_steps: [
          {
            title: 'ምክር ስብሰባ',
            description: 'የቤተክርስቲያንዎን የተለየ ፍላጎቶች፣ ግቦች እና የአሁኑን የሰንበት ት/ቤት አወቃቀር በመረዳት እንጀምራለን። ይህ ምክሮቻችንን እና ድጋፋችንን እንድናበጃጅም ይረዳናል።'
          },
          {
            title: 'የትምህርት ሥርዓት ምርጫ',
            description: 'በፍላጎትዎ ላይ በመመስረት፣ በሰንበት ት/ቤት ፕሮግራምዎ ውስጥ ለእያንዳንዱ ዕድሜ ቡድን ተስማማ የትምህርት እቃዎችን ለመምረጥ ወይም ለማዳበር እናግዝዎታለን።'
          },
          {
            title: 'የመምህራን ስልጠና',
            description: 'ለሰንበት ት/ቤት መምህራን የትምህርት ዘዴዎችን፣ የክፍል አስተዳደር ክህሎቶችን እና የኦርቶዶክስ ቲዮሎጂ የበለጠ እውቀትን የሚሰጡ ስልጠናዎችን እናቀርባለን።'
          },
          {
            title: 'ቀጣይነት ያለው ድጋፍ',
            description: 'በየጊዜው የምናደርጋቸውን የተለያዩ ተግባራት፣ በሚያስፈልግ ጊዜ ተጨማሪ ምንጮችን እና ለእርስዎ መምህራን እና ለወጣቶች በናሱ ዝግጅቶች ውስጥ የመሳተፍ እድሎችን በመስጠት ቀጣይነት ያለው ድጋፍ እናቀርባለን።'
          }
        ],
        request_services: 'አገልግሎታችንን ይጠይቁ',
        request_description: 'የናሱን ምንጮች ወደ ቤተክርስቲያንዎ ማምጣት ይፈልጋሉ? የሰንበት ት/ቤት ፕሮግራምዎን እንዴት ልናግዝ እንደምንችል ለመወያየት ዛሬ ያግኙን።',
        form_labels: {
          parish_name: 'የቤተክርስቲያን ስም',
          parish_name_placeholder: 'የቤተክርስቲያንዎን ስም ያስገቡ',
          your_name: 'ስምዎ',
          your_name_placeholder: 'ሙሉ ስምዎን ያስገቡ',
          email: 'ኢሜይል',
          email_placeholder: 'ኢሜይል አድራሻዎን ያስገቡ',
          phone: 'ስልክ ቁጥር',
          phone_placeholder: 'ስልክ ቁጥርዎን ያስገቡ',
          message: 'መልእክት',
          message_placeholder: 'ጥያቄዎን ወይም አስተያየትዎን ይጻፉ',
          submit: 'ጥያቄ ይላኩ'
        }
      }
    },
    
    // Call to Action Section
    cta: {
      title: 'በተልዕኮአችን ውስጥ ይቀላቀሉ',
      description: 'የሚቀጥለውን ትውልድ እምነት ለማሳደግ ይርዱን። ድጋፋችሁ ስራችንን የሚቻል ያደርገዋል።'
    },
    
    // Events Section
    events: {
      upcoming_events: 'የሚቀርቡ ዝግጅቶች',
      subtitle: 'በእነዚህ አስደሳች የሚቀርቡ ዝግጅቶች ውስጥ ይቀላቀሉ። ከማህበረሰባችን ጋር ተገናኝተው ይቆዩ።',
      learn_more: 'ተጨማሪ ይወቁ',
      view_all: 'ሁሉንም ዝግጅቶች ይመልከቱ',
      
      annual_youth_conference: {
        title: 'ዓመታዊ ወጣቶች ስብሰባ 2025',
        date: 'ጁላይ 15-18, 2025',
        time: 'ጠዋት 9:00 - ምሽት 5:00',
        excerpt: 'ከፈለግነው ንግግር አድርጎች እና የስልጠና ክፍሎች ጋር በዓመቱ ትልቁ የወጣቶች ዝግጅት ይሳተፉ።'
      },
      
      bible_study_workshop: {
        title: 'የመጽሐፍ ቅዱስ ጥናት ስልጠና',
        date: 'ጁላይ 22, 2025',
        time: 'ምሽት 6:00 - 8:00',
        excerpt: 'በየሳምንቱ በምናዘጋጃቸው የመጽሐፍ ቅዱስ ጥናት ክፍሎች የመጽሐፍ ቅዱስን ግንዛቤዎን ያብሉ።'
      },
      
      community_service_day: {
        title: 'የማህበረሰብ አገልግሎት ቀን',
        date: 'ኦገስት 5, 2025',
        time: 'ጠዋት 8:00 - ከሰዓት 3:00',
        excerpt: 'በተለያዩ የማህበረሰብ አገልግሎት ፕሮጀክቶች በአካባቢያችን ለማህበረሰባችን የምንመልስበት ቀን ይሁን።'
      }
    },
    
    // About Page
    about_page: {
      title: 'ስለ እኛ',
      subtitle: 'ስለ ታሪካችን፣ ተልእኮችን እና ራዕያችንን ይወቁ',
      our_story: 'ታሪካችን',
      story_paragraphs: [
        'የሰሜን አሜሪካ የእሁድ ት/ቤት ህብረት (ናሱ) በ2010 ዓ.ም. በሰሜን አሜሪካ ውስጥ የእሁድ ት/ቤት ትምህርትን በተመሳሳይ መልኩ ለማስተማር የሚያስችል ዘዴ እንዲኖር የሚያስችል ሲሆን በተለያዩ የእምነት ቤተክርስቲያናት የሚገኙ ተማሪዎችን ለማስተማር የሚዘጋጁ መምህራንን ያካተተ ጉባዔ ነበር። ይህ ጉባዔ ወደ አሁኑ የሰሜን አሜሪካ የእሁድ ት/ቤት ህብረት (ናሱ) ተለወጠ።',
        'ለ10 አመታት በላይ ሲሆን የተማሪዎችን የኦርቶዶክስ ክርስቲያናዊ ትምህርት ለማስተማር የሚያስችሉ የትምህርት እቃዎችን እያዘጋጀን ነው። ይህም የተለያዩ የኦርቶዶክስ ቤተክርስቲያናት ተማሪዎችን ለማስተማር የሚዘጋጁ መምህራንን አስተምሯል።',
        'በአሁኑ ጊዜ ናሱ በሺዎች የሚቆጠሩ ተማሪዎችን የሚያገለግል ሲሆን በኦርቶዶክስ እምነት ውስጥ ያሉትን የተለያዩ ትምህርቶች እና ባህሎች በማስተማር ላይ ያተኮረ ነው።'
      ],
      at_a_glance: 'በአጭሩ',
      stats: {
        founded: 'የተመሰረተው በ2010 ነው',
        years_of_service: 'ከ10 አመት በላይ አገልግሎት',
        parishes_served: '350+ ቤተክርስቲያናት ያገለገሉ',
        across_jurisdictions: 'በተለያዩ የእምነት ቤተክርስቲያናት ውስጥ',
        north_america_wide: 'በሙሉ ሰሜን አሜሪካ',
        countries: 'በአሜሪካ እና በኢትዮጵያ'
      },
      mission_vision: 'የእኛ ተልእኮ እና ራዕይ',
      mission: {
        title: 'የእኛ ተልእኮ',
        description: 'የኢትዮጵያ ኦርቶዶክስ ቤተክርስቲያናትን ልጆችን እና ወጣቶችን በእምነት፣ በቤተክርስቲያን ማህበረሰብ እና በኦርቶዶክስ ባህል ውስጥ የሚያሳድግ ጥራት ያለው ክርስቲያናዊ ትምህርት እንዲሰጡ ለመርዳት።'
      },
      vision: {
        title: 'የእኛ ራዕይ',
        description: 'በሰሜን አሜሪካ ያለ እያንዳንዱ ኦርቶዶክስ ልጅ በራስ ተስፋ፣ በእውቀት እና በደስታ እምነታቸውን እንዲኖሩበት የሚያስችል ገባሪ፣ እውነተኛ የኦርቶዶክስ ትምህርት እንዲኖረው እናምናለን።'
      },
      join_mission: {
        title: 'በተልእኮያችን ውስጥ ይታቀፉ',
        description: 'ድጋፍዎ በሰሜን አሜሪካ ውስጥ ለሚገኙ የእሁድ ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመቀጠል ይረዳናል።'
      }
    },
    our_mission: 'ተልዕኮናችን',
    our_vision: 'ራዕያችን',
    join_our_mission: 'በተልዕኮናችን ውስጥ ይታቀፉ',
    our_leadership: 'አመራሮቻችን',
    meet_the_team: 'ቡድኑን ያግኙ',
    team_dedicated: 'የናሱን ተገዳዳዮች ሙያዎች',
    join_our_team: 'ቡድናችንን ይቀላቀሉ',
    support_our_work: 'ስራችንን ደግፉ',
    
    // Values and principles
    core_values: 'ዋና እሴቶች',
    our_values: 'እሴቶቻችን',
    core_values_section: {
      educational_excellence: 'በእያንዳንዱ ተማሪ አእምሮ እና ነፍስ ላይ የሚያብብ ከፍተኛ ደረጃ ያለው የኦርቶዶክስ ክርስቲያናዊ ትምህርት ለመስጠት ቁርጠኛ ነን።',
      orthodox_faith: 'ትምህርቶቻችን በቅዱስ ቤተክርስቲያን ቅዱስ ትምህርት ሥር የተደረጁ ሲሆን እምነቱን ለወደፊት ትውልድ እንዲያስተላልፍ የሚያስችሉ ናቸው።',
      community: 'በተማሪዎች፣ ቤተሰቦች እና በሰፊው የኦርቶዶክስ ማህበረሰብ መካከል ጠንካራ የመወያየት እና የድጋፍ ስሜት እንፈጥራለን።',
      learn_more: 'ስለ እሴቶቻችን ተጨማሪ ይወቁ'
    },
    principles_guide: 'ስራችንን የሚመራው መሰረታዊ እሴቶች',
    our_approach: 'አቅጣጫችን',
    engage_whole_person: 'በሙሉ ሰው ላይ ተሳትፎ',
    connect_tradition: 'ከባህላችን ጋር ይገናኙ',
    foster_growth: 'የግል እድገትን ይደግፉ',
    support_families: 'ቤተሰቦችን ደግፉ',
    living_our_values: 'እሴቶቻችንን በሕይወት ውስጥ',
    inclusivity: 'አካባቢነት',
    service: 'አገልግሎት',
    lifelong_learning: 'የሕይወት ሙሉ ትምህርት',
    
    // Call to action
    donate_cta: 'ድጋፋችሁ የእሁድ ት/ቤቶችን በሰሜን አሜሪካ ለማገዝ ምንጮችንና ስልጠናን ለመቀጠል ይረዳናል።',
    donation_helps: 'ልገሳችሁ በሰሜን አሜሪካ ውስጥ ለቅዱሳን ቤተክርስቲያናት ጥሩ የኦርቶዶክስ ትምህርት ምንጮችን ለማቅረብ ይረዳናል።',
    passionate_individuals: 'በኦርቶዶክስ ትምህርት ላይ የተሰጡ በፍቅር የሚሰሩ ሰዎችን ለህጻናትና ለወጣቶች ሕይወት ለመለወጥ እንፈልጋለን።',
    nassu_leadership: 'ናሱ በኦርቶዶክስ ትምህርት፣ ፋይናንስ፣ ኮሚዩኒኬሽንና ስትራቴጂ አቅድ የተሞሉ ባለሙያዎች ቡድን ይመራዋል።',
    
    // Homepage translations
    hero: {
      title: 'የሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት',
      subtitle: 'በኦርቶዶክስ ማህበረሰባችን ውስጥ ዕምነትን፣ ትምህርትን እና አገልግሎትን ማሳደግ።'
    },
    
    // Services Section
    services_section: {
      services_page: {
        title: 'አገልግሎቶቻችን',
        subtitle: 'በሰሜን አሜሪካ ውስጥ የኦርቶዶክስ ትምህርትን በማገዝ',
        what_we_offer: {
          title: 'ምን እናቀርባለን',
          description: 'ናሱ በሰሜን አሜሪካ ውስጥ ባሉ የኦርቶዶክስ ቤተክርስቲያናት ውስጥ የክርስቲያናዊ ትምህርትን ለማገዝ የተዘጋጁ የተለያዩ አገልግሎቶችን ያቀርባል። የእኛ አገልግሎቶች በልምድ ያላቸው አስተማሪዎች እና ቄሳማት የተዘጋጁ ሲሆን በኦርቶዶክስ እምነት መሰረት ትክክለኛ እና ውጤታማ እንዲሆኑ የተዘጋጁ ናቸው።'
        },
        services: [
          {
            title: 'የሰንበት ት/ቤት ሥርዓተ ትምህርት',
            description: 'ለመነሻ እስከ ሁለተኛ ደረጃ ድረስ ለልጆች የተዘጋጀ የኦርቶዶክስ ክርስቲያናዊ ትምህርት ቁሳቁሶች።'
          },
          {
            title: 'ለመምህራን ስልጠና',
            description: 'የስልጠና ክፍሎች፣ የድረ-ገጽ ስልጠናዎች እና ምንጮች ለሰንበት ት/ቤት መምህራን ውጤታማ የትምህርት ዘዴዎችን እና የኦርቶዶክስ እውቀትን ለማግኘት ያስችላቸዋል።'
          },
          {
            title: 'የወጣቶች ዝግጅቶች',
            description: 'ለኦርቶዶክስ ወጣቶች የሚያገለግሉ የምሽት ስብሰባዎች፣ ካምፖች እና እንቅስቃሴዎች ለጋርነት እና ለመንፈሳዊ እድገት።'
          },
          {
            title: 'የመማሪያ ስርዓተ-ትምህርት ልማት',
            description: 'የትምህርት እርዳታዎች፣ የእንቅስቃሴ መጽሐፍቶች እና ዲጂታል ምንጮችን በማዘጋጀት የእሁድ ት/ቤት ልምድ ለማሻሻል የሚያገለግሉ ምንጮች።'
          },
          {
            title: 'ዌብናር እና የመስመር ላይ ክፍሎች',
            description: 'ለተማሪዎች፣ ለመምህራን እና ለወላጆች የሚዘጋጁ የቀጥታ እና የተቀዳሰ የትምህርት ክፍሎች በኦርቶዶክስ እምነት የተለያዩ ገጽታዎች ላይ።'
          },
          {
            title: 'ለወላጆች ድጋፍ',
            description: 'ወላጆች በቤታቸው የእምነት ትምህርትን እንዲቀጥሉ እና የልጆቻቸውን መንፈሳዊ ጉዞ እንዲደግፉ የሚያግዙ ምንጮች እና መመሪያዎች።'
          },
          {
            title: 'የድምፅ ምንጮች',
            description: 'የኦርቶዶክስ ሙዚቃ፣ ታሪኮች እና ትምህርቶች በድምፅ ቅርጸት ለእሁድ ት/ቤት እና ለቤት አጠቃቀም።'
          },
          {
            title: 'ለቤተክርስቲያን ኮንሰልቴሽን',
            description: 'ቤተክርስቲያናት የእሁድ ት/ቤት ፕሮግራሞቻቸውን እንዲያቋቁሙ እና እንዲያጠናክሩ የሚያግዛቸው የባለሙያ መመሪያ።'
          }
        ],
        how_we_help: {
          title: 'የእርስዎን ቤተክርስቲያን እንዴት እንደምናግዝ',
          process_title: 'የእኛ ሂደት',
          steps: [
            'የእርስዎን ፍላጎት እና ፍላጎቶች እንገልፃለን',
            'በተገቢው የአገልግሎት ጥቅል ላይ እንስማማለን',
            'በመስፈርያ በተመሰረተ ስልጠና እና ድጋፍ እናቀርባለን',
            'የእድገት እና የውጤት መገምገሚያዎችን እናካሂዳለን',
            'ዘላቂ ድጋፍ እና ምክር እናቀርባለን'
          ]
        },
        contact_section: {
          title: 'ተጨማሪ መረጃ ያግኙ',
          description: 'ስለ አገልግሎቶቻችን ተጨማሪ ለማወቅ ወይም ለቤተክርስቲያንዎ የተለየ አገልግሎት ለማዘዝ ዛሬ ያግኙን።',
          button: 'እንግለጫ ለማወሳሰብ',
          form: {
            name: 'ስም',
            email: 'ኢሜይል',
            message: 'መልዕክት',
            submit_button: 'ጥያቄ ላክ',
            success_message: 'መልእክትዎ ተልኳል! በቅርቡ እንገናኝዎታለን።'
          }
        },
        events: {
          title: 'የወጣቶች ዝግጅቶች',
          description: 'ኦርቶዶክስ ወጣቶችን ለጋርነት እና ለመንፈሳዊ እድገት የሚያጣምሩ የመከላከያ፣ ካምፖች እና እንቅስቃሴዎች።'
        }
      }
    },
    
    // Call to Action Section - Amharic
    cta: {
      title: 'በተልዕኳችን ውስጥ ይቀላቀሉ',
      description: 'የሚቀጥለውን ትውልድ እምነት ለማሳደግ ይርዱን። ድጋፋችሁ ስራችንን የሚቻል ያደርገዋል።'
    },
    
    // Events Section - Amharic
    events: {
      upcoming_events: 'የሚቀረቡ ዝግጅቶች',
      subtitle: 'በእነዚህ አስደሳች የሚቀርቡ ዝግጅቶች ውስጥ ይቀላቀሉ። ከማህበረሰባችን ጋር ተገናኝተው ይቆዩ።',
      learn_more: 'ተጨማሪ ይወቁ',
      view_all: 'ሁሉንም ዝግጅቶች ይመልከቱ',
      
      annual_youth_conference: {
        title: 'ዓመታዊ ወጣቶች ስብሰባ 2025',
        date: 'ጁላይ 15-18, 2025',
        time: 'ጠዋት 9:00 - ምሽት 5:00',
        excerpt: 'ከፈለግነው ንግግር አድርጎች እና የስልጠና ክፍሎች ጋር በዓመቱ ትልቁ የወጣቶች ዝግጅት ይሳተፉ።'
      },
      
      bible_study_workshop: {
        title: 'የመጽሐፍ ቅዱስ ጥናት ስልጠና',
        date: 'ጁላይ 22, 2025',
        time: 'ምሽት 6:00 - 8:00',
        excerpt: 'በየሳምንቱ በምናዘጋጃቸው የመጽሐፍ ቅዱስ ጥናት ክፍሎች የመጽሐፍ ቅዱስን ግንዛቤዎን ያብሉ።'
      },
      
      community_service_day: {
        title: 'የማህበረሰብ አገልግሎት ቀን',
        date: 'ኦገስት 5, 2025',
        time: 'ጠዋት 8:00 - ከሰዓት 3:00',
        excerpt: 'በተለያዩ የማህበረሰብ አገልግሎት ፕሮጀክቶች በአካባቢያችን ለማህበረሰባችን የምንመልስበት ቀን ይሁን።'
      }
    },
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
    login_error: 'ያልተሳካ ምዝገባ',
    signup_successful: 'በተሳካ ሁኔታ ተመዝግበዋል!',
    home_title: 'የሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት'
  }
};

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, args: Record<string, string> = {}) => {
    const keys = key.split('.');
    let translation: any = translations[language];
    
    // Navigate through the nested object
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        console.warn(`Translation key '${key}' not found`);
        return key; // Return the key if translation not found
      }
    }
    
    // Handle string replacements if args are provided and translation is a string
    if (typeof translation === 'string' && Object.keys(args).length > 0) {
      let result = translation;
      for (const [key, value] of Object.entries(args)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
      }
      return result;
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
