import React, { createContext, useContext, useState, ReactNode } from 'react';

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

// Define translations outside the component
const translations = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    values: 'Values',
    values_page: {
      title: 'Our Values',
      subtitle: 'The principles that guide our work',
      core_values_title: 'Core Values',
      core_values_description: 'At North American Sunday School Union, our work is guided by a set of core values that reflect our commitment to Orthodox Christian education and the spiritual formation of children and youth.',
      
      educational_excellence: {
        title: 'Educational Excellence',
        description: 'We strive for the highest quality in educational content and methodology. Our resources are developed by experienced educators who understand both Orthodox theology and effective teaching practices for different age groups.'
      },
      community: {
        title: 'Community',
        description: 'We believe in the power of community and relationships. Our programs foster connections between students, families, and parishes, creating a supportive network for spiritual growth and faith development.'
      },
      inclusivity: {
        title: 'Inclusivity',
        description: 'Within the bounds of Orthodox teaching, we welcome all who seek to learn and grow in the faith. We strive to create materials and programs that respect the diversity of Orthodox jurisdictions while emphasizing our common faith.'
      },
      service: {
        title: 'Service',
        description: 'Following Christ\'s example, we value service to others. We encourage students to put faith into action through service projects and outreach, learning to express their faith through love for others.'
      },
      lifelong_learning: {
        title: 'Lifelong Learning',
        description: 'We believe that Orthodox education is a lifelong journey. We support spiritual formation from childhood through adulthood, providing age-appropriate resources that grow with students throughout their lives.'
      },
      values: {
        orthodox_faith: {
          title: 'Orthodox Faith',
          description: 'We are committed to authentic Orthodox Christian teaching, maintaining fidelity to the traditions, theology, and practices of the Orthodox Church. All our materials and programs are developed with guidance from Orthodox clergy and theologians.'
        },
        educational_excellence: {
          title: 'Educational Excellence',
          description: 'We strive for the highest quality in educational content and methodology. Our resources are developed by experienced educators who understand both Orthodox theology and effective teaching practices for different age groups.'
        },
        community: {
          title: 'Community',
          description: 'We believe in the power of community and relationships. Our programs foster connections between students, families, and parishes, creating a supportive network for spiritual growth and faith development.'
        },
        inclusivity: {
          title: 'Inclusivity',
          description: 'Within the bounds of Orthodox teaching, we welcome all who seek to learn and grow in the faith. We strive to create materials and programs that respect the diversity of Orthodox jurisdictions while emphasizing our common faith.'
        },
        service: {
          title: 'Service',
          description: 'Following Christ\'s example, we value service to others. We encourage students to put faith into action through service projects and outreach, learning to express their faith through love for others.'
        },
        lifelong_learning: {
          title: 'Lifelong Learning',
          description: 'We believe that Orthodox education is a lifelong journey. We support spiritual formation from childhood through adulthood, providing age-appropriate resources that grow with students throughout their lives.'
        }
      },
      approach: {
        title: 'Our Approach',
        intro: 'Our approach to Orthodox Christian education is holistic, recognizing that faith formation involves the whole person—mind, body, and spirit. We believe that Sunday School should be more than just an academic exercise; it should be a transformative experience that helps children and youth develop a living relationship with Christ and His Church.',
        engage_title: 'Engage the Whole Person',
        engage_content: 'We design our educational materials to engage students intellectually, emotionally, and spiritually. Through a combination of Scripture study, Church history, lives of the saints, liturgical education, and practical application, we help students develop a well-rounded understanding of the Orthodox faith.',
        tradition_title: 'Connect with Tradition',
        tradition_content: 'We help students connect with the rich tradition of Orthodoxy in ways that are meaningful and accessible. By incorporating icons, hymns, prayers, and the liturgical calendar into our curriculum, we create an educational experience that is authentically Orthodox and deeply rooted in the life of the Church.',
        growth_title: 'Foster Personal Growth',
        growth_content: 'We recognize that each student is on their own spiritual journey. Our materials and programs are designed to meet students where they are, addressing their questions and concerns while guiding them toward a deeper understanding of the faith and a more intimate relationship with Christ.',
        families_title: 'Support Families',
        families_content: 'We believe that parents are the primary educators of their children in the faith. Our resources include components for family participation, helping parents continue the educational process at home and integrate Orthodox practices into family life.'
      },
      living_values: {
        title: 'Living Our Values',
        paragraph1: 'Our values are not just words on a page—they guide everything we do at NASSU. From curriculum development to teacher training, from youth events to parish consultation, we strive to embody these values in all aspects of our work.',
        paragraph2: 'We invite you to join us in this important mission of nurturing the faith of the next generation. Together, we can help children and youth develop a strong foundation in the Orthodox faith that will support them throughout their lives.'
      }
    },
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
        subtitle: 'Supporting Orthodox Christian Education',
        what_we_offer: {
          title: 'What We Provide',
          description: 'NASSU offers comprehensive support for Orthodox Christian education through various programs and resources. Our services are designed to nurture faith, knowledge, and spiritual growth for all ages within the Orthodox community.'
        },
        services: [
          {
            title: 'Sunday School Curriculum',
            description: 'Age-appropriate Orthodox Christian educational materials for children from preschool through high school, aligned with Church teachings.'
          },
          {
            title: 'Teacher Training',
            description: 'Professional development programs, workshops, and resources to enhance teaching effectiveness and Orthodox knowledge.'
          },
          {
            title: 'Youth Ministry Programs',
            description: 'Engaging activities, retreats, and events that foster spiritual growth and Orthodox community among youth.'
          },
          {
            title: 'Educational Resources',
            description: 'A wide range of teaching materials, activity books, and digital content to support Christian education.'
          },
          {
            title: 'Online Learning',
            description: 'Interactive webinars and recorded sessions on Orthodox faith and practice for students, teachers, and parents.'
          },
          {
            title: 'Family Faith Resources',
            description: 'Guidance and materials to help parents nurture their children\'s spiritual development at home.'
          },
          {
            title: 'Multimedia Library',
            description: 'Audio recordings of Orthodox hymns, Bible stories, and teachings for educational and devotional use.'
          },
          {
            title: 'Parish Support',
            description: 'Consultation and resources to help Orthodox parishes develop and enhance their educational programs.'
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
    join_us: 'በተልዕኳችን ውስጥ ይቀላቀሉ',
    about: 'ስለ እኛ',
    values_page: {
      title: 'የእኛ እሴቶች',
      subtitle: 'ሥራችንን የሚመሩ መርሆዎች',
      core_values_title: 'ዋና ዋና እሴቶች',
      core_values_description: 'በሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት ሥራችን በኦርቶዶክስ ክርስቲያናዊ ትምህርት እና የሕጻናት እና ወጣቶች መንፈሳዊ እድገት ላይ ያለን ቁርጠኝነት የሚያንፀባርቁ ዋና ዋና እሴቶች ይመራሉ።',
      values: {
        orthodox_faith: {
          title: 'የኦርቶዶክስ እምነት',
          description: 'በእውነተኛ የኦርቶዶክስ ክርስቲያናዊ ትምህርት ተስፋጽተናል፣ የኦርቶዶክስ ቤተክርስቲያንን ትምህርቶች፣ ንጽሕናዎች እና ልምዶች በታማኝነት እንከታተላለን። ሁሉም የእኛ የትምህርት እቃዎች እና ፕሮግራሞች ከኦርቶዶክስ ቄሳውንት እና ንጽሕና ተመራማሪዎች መመሪያ ጋር ተዘጋጅተዋል።'
        },
        community: {
          title: 'ማህበረሰብ',
          description: 'በማህበረሰብ እና በግንኙነቶች ኃይል እናምናለን። ፕሮግራሞቻችን በተማሪዎች፣ ቤተሰቦች እና ቤተክርስቲያኖች መካከል የሚያገናኙ ሲሆን ለመንፈሳዊ እድገት እና ለእምነት እድገት የሚደግፍ አውታረመረብ ይፈጥራሉ።'
        },
        inclusivity: {
          title: 'አካታችነት',
          description: 'በኦርቶዶክስ ትምህርት ውስጥ የሚገኙ እኛ የምንቀበላቸው ሁሉ በእምነት ውስጥ ለመማር እና ለመድረስ የሚፈልጉ ናቸው። የተለያዩ የኦርቶዶክስ ቤተክርስቲያኖችን ልዩነቶች የሚከበሩ እና የጋራ እምነታችንን የሚያበረታቱ የትምህርት እቃዎች እና ፕሮግራሞችን ለመፍጠር እንሞክራለን።'
        },
        service: {
          title: 'አገልግሎት',
          description: 'የክርስቶስን ምሳሌ በመከተል ለሌሎች የምናደርገው አገልግሎት እናስባለን። ተማሪዎች እምነታቸውን በስራ እንዲገልጹ በአገልግሎት ፕሮጀክቶች እና በማህበራዊ አገልግሎቶች በኩል እንበረታታለን፣ እምነታቸውን በሌሎች ፍቅር እንዲገልጹ እናስተምራለን።'
        },
        lifelong_learning: {
          title: 'ዘላቂ ትምህርት',
          description: 'የኦርቶዶክስ ትምህርት ዘላቂ ጉዞ ነው ብለን እናምናለን። ከሕፃንነት እስከ ወቅታዊ ዕድሜ ድረስ የሚያገለግል የመንፈሳዊ እድገት እናስተዳድራለን፣ በተማሪዎች ዕድሜ ልክ የሚሆኑ እና በህይወታቸው ሁሉ የሚያስተምሯቸው ምንጮችን እናቀርባለን።'
        }
      },
      approach: {
        title: 'የእኛ አቀራረብ',
        intro: 'የእኛ የኦርቶዶክስ ክርስቲያናዊ ትምህርት አቀራረብ አጠቃላይ ነው፣ የእምነት እድገት ሙሉውን ሰው - አእምሮ፣ አካል እና ነፍስ - እንደሚያካትት ይለውጣል። የሰንበት ት/ቤት ከአካዳሚክ ልምምድ በላይ መሆን አለበት ብለን እናምናለን፤ ልጆችን እና ወጣቶችን ከክርስቶስ እና ከቤተክርስቲያኑ ጋር ሕያው ግንኙነት እንዲያድርጉ የሚረዳ ተለዋዋጭ ተሞክሮ መሆን አለበት።',
        engage_title: 'ሙሉውን ሰው ያነቃቅሱ',
        engage_content: 'የትምህርታችንን እቃዎች ተማሪዎች አስተሳሰባዊ፣ ስሜታዊ እና መንፈሳዊ ለማነቃቃት እንዲሁም ለማሳደግ እንንቀሳቀሳለን። በመጽሐፍ ቅዱስ ጥናት፣ የቤተክርስቲያን ታሪክ፣ የቅዱሳን ሕይወቶች፣ ሊትርጊካዊ ትምህርት እና ተግባራዊ አተገባበሮች በኩል ተማሪዎች የኦርቶዶክስ እምነትን ጠቃሚ ማወቅ እንዲችሉ እናስተምራለን።',
        tradition_title: 'ከትውፊታችን ጋር ይተሳሰሩ',
        tradition_content: 'ተማሪዎች ከኦርቶዶክስ ትውፊት ጋር ትርጉም ያለው እና ተደራሽ በሆነ መንገድ እንዲተሳሰሩ እናበረታታለን። አዶዎችን፣ መዝሙራትን፣ ጸሎቶችን እና የሊተርጊ የቀን መቁጠሪያችንን በኩሪኩሎችአችን ውስጥ በማስገባት እውነተኛ የሆነ የኦርቶዶክስ ትምህርታዊ ተሞክሮ እንፈጥራለን።',
        growth_title: 'የግል እድገትን ያበረታቱ',
        growth_content: 'እያንዳንዱ ተማሪ በራሱ መንፈሳዊ ጉዞ ላይ እንደሚገኝ እናስተውላለን። የእኛ የትምህርት እቃዎች እና ፕሮግራሞች ተማሪዎች የሚገኙበትን ሁኔታ ለመድረስ የተቀየሱ ሲሆን ጥያቄዎቻቸውን እና ጉጉቶቻቸውን በማንቋሸሽ ወደ የእምነት ጥልቀት እና ወደ ክርስቶስ ጋር ወዳለ ግንኙነት እናቅረባቸዋለን።',
        families_title: 'ቤተሰቦችን ያበረታቱ',
        families_content: 'ወላጆች የልጆቻቸው ዋና አስተማሪዎች ናቸው ብለን እናምናለን። የእኛ ምንጮች የቤተሰብ ተሳትፎን የሚያካትቱ ክፍሎችን ያካትታሉ፣ ወላጆች የትምህርት ሂደቱን በቤት ውስጥ እንዲቀጥሉ እና የኦርቶዶክስ ልምዶችን በቤተሰብ ሕይወት ውስጥ እንዲያዋህሩ ይረዳሉ።'
      },
      living_values: {
        title: 'እሴቶቻችንን በሕይወት መተግበር',
        paragraph1: 'የእኛ እሴቶች በገጽ ላይ ያሉ ቃላት ብቻ አይደሉም - በናሱ ውስጥ በምናደርገው ሁሉ ይመራሉ። ከኩርክዮሎም እድገት እስከ መምህራን ስልጠና፣ ከወጣቶች ክስተቶች እስከ ቤተክርስቲያን ምክር እስከሚሰጥ በስራችን ሁሉ እነዚህን እሴቶች ለመከተል እንሞክራለን።',
        paragraph2: 'በዚህ አስፈላጊ ተልዕኮ ውስጥ የሚቀጥለውን ትውልድ እምነት ለማዳበር እንድትቀላቀሉ እንጋብዛችኋለን። በጋራ ልጆች እና ወጣቶች በኦርቶዶክስ እምነት ውስጥ ጠንካራ መሠረት እንዲኖራቸው እና በህይወታቸው ሁሉ የሚያበረታታቸው እናስችላለን።'
      }
    },
    services: 'አገልግሎቶች',
    values: 'እሴቶች',
    team: 'አባሎች',
    sponsors: 'ስፖንሰሮች',
    news: 'ዜና እና መልዕክት',
    gallery: 'የምስል ስብስቦች',
    
    // Common UI
    home_title: 'የሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት',
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
    
    // Core Values Section
    educational_excellence: 'ትምህርታዊ ሙሉነት',
    orthodox_faith: 'የኦርቶዶክስ እምነት',
    community: 'ማህበረሰብ',
    
    
    // Services Section
    services_section: {
      services_page: {
        title: 'የእኛ አገልግሎቶች',
        subtitle: 'የኦርቶዶክስ ክርስቲያናዊ ትምህርትን በማገዝ ላይ',
        what_we_offer: {
          title: 'የምናቀርባቸው አገልግሎቶች',
          description: 'ናሱ በኦርቶዶክስ ክርስቲያናዊ ትምህርት ስርዓት ውስጥ የተለያዩ ድጋፎችን ያቀርባል። የእኛ አገልግሎቶች የሚያበረታቱት እምነት፣ እውቀት እና መንፈሳዊ እድገት ለሁሉም ዕድሜ ቡድኖች በኦርቶዶክስ ማህበረሰብ ውስጥ ነው።'
        },
        services: [
          {
            title: 'የእሁድ ት/ቤት ሥርዓተ-ትምህርት',
            description: 'ለህፃናት እና ወጣቶች የተዘጋጁ የኦርቶዶክስ ክርስቲያናዊ ትምህርት ቁሳቁሶች፣ ከመዋለ ህፃናት እስከ ሁለተኛ ደረጃ ተማሪዎች ድረስ።'
          },
          {
            title: 'የመምህራን ስልጠና',
            description: 'ለእሁድ ት/ቤት አስተማሪዎች የሚያስፈልጋቸውን የትምህርት ዘዴዎች እና የኦርቶዶክስ እውቀት ለማሳደግ የሚያግዙ ስልጠናዎች፣ የመስክ ስልጠናዎች እና ምንጮች።'
          },
          {
            title: 'የወጣቶች ፕሮግራሞች',
            description: 'ወጣቶች ለመንፈሳዊ እድገታቸው እና የኦርቶዶክስ ማህበረሰባዊ ግንኙነት የሚጠቀሙባቸው እንቅስቃሴዎች፣ የመከላከያ እና የጉብኝት ፕሮግራሞች።'
          },
          {
            title: 'የትምህርት ምንጮች',
            description: 'ለክርስቲያናዊ ትምህርት የሚያግዙ የተለያዩ የትምህርት እርዳታዎች፣ የእንቅስቃሴ መጽሐፎች እና ዲጂታል ይዘቶች።'
          },
          {
            title: 'የመስመር ላይ ትምህርት',
            description: 'ለተማሪዎች፣ ለመምህራን እና ለወላጆች የሚያስተምሩ በኦርቶዶክስ እምነት እና ልምድ ዙሪያ ያሉ በይነመረብ ዌብናሮች እና የተቀዳሚ የትምህርት ክፍሎች።'
          },
          {
            title: 'የቤተሰብ እምነት ምንጮች',
            description: 'ወላጆች የእምነት ትምህርትን በቤታቸው በተግባር ለማስተማር እና የልጆቻቸውን መንፈሳዊ እድገት ለማገዝ የሚያግዛቸው መመሪያዎች እና የትምህርት እርዳታዎች።'
          },
          {
            title: 'የመልቲሚዲያ ቤተ-መጽሐፍት',
            description: 'ለትምህርታዊ እና ለመንፈሳዊ አጠቃቀም የተዘጋጁ የኦርቶዶክስ መዝሙራት፣ የመጽሐፍ ቅዱስ ታሪኮች እና የሃይማኖት ትምህርቶች ድምፃዊ ቅጂዎች።'
          },
          {
            title: 'የቤተክርስቲያን ድጋፍ',
            description: 'ኦርቶዶክስ ቤተክርስቲያናት የትምህርት ፕሮግራሞቻቸውን እንዲያሻሽሉ እና እንዲያዳብሩ የሚያግዛቸው የባለሙያ ምክር እና ምንጮች።'
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
    // Events Section
    events: {
      upcoming_events: 'የሚቀርቡ ዝግጅቶች',
      subtitle: 'በእነዚህ አስደሳች የሚቀርቡ ዝግጅቶች ውስጥ ይቀላቀሉ። ከማህበረሰባችን ጋር ተገናኝተው ይቆዩ።',
      learn_more: 'ተጨማሪ ይወቁ',
      view_all: 'ሁሉንም ዝግጅቶች ይመልከቱ',
      
      annual_youth_conference: {
        title: 'ዓመታዊ ወጣቶች ስብሰባ 2017 ዓ.ም',
        date: 'ሐምሌ 15-18, 2017 ዓ.ም',
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
        'የሰሜን አሜሪካ የእሁድ ት/ቤት ህብረት (ናሱ) በ2002 ዓ.ም. በሰሜን አሜሪካ ውስጥ የእሁድ ት/ቤት ትምህርትን በተመሳሳይ መልኩ ለማስተማር የሚያስችል ዘዴ እንዲኖር የሚያስችል ሲሆን በተለያዩ የእምነት ቤተክርስቲያናት የሚገኙ ተማሪዎችን ለማስተማር የሚዘጋጁ መምህራንን ያካተተ ጉባዔ ነበር። ይህ ጉባዔ ወደ አሁኑ የሰሜን አሜሪካ የእሁድ ት/ቤት ህብረት (ናሱ) ተለወጠ።',
        'ለ10 አመታት በላይ ሲሆን የተማሪዎችን የኦርቶዶክስ ክርስቲያናዊ ትምህርት ለማስተማር የሚያስችሉ የትምህርት እቃዎችን እያዘጋጀን ነው። ይህም የተለያዩ የኦርቶዶክስ ቤተክርስቲያናት ተማሪዎችን ለማስተማር የሚዘጋጁ መምህራንን አስተምሯል።',
        'በአሁኑ ጊዜ ናሱ በሺዎች የሚቆጠሩ ተማሪዎችን የሚያገለግል ሲሆን በኦርቶዶክስ እምነት ውስጥ ያሉትን የተለያዩ ትምህርቶች እና ባህሎች በማስተማር ላይ ያተኮረ ነው።'
      ],
      at_a_glance: 'በአጭሩ',
      stats: {
        founded: 'የተመሰረተው በ2002 ዓ.ም. ነው',
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
        title: 'በተልዕኳችን ውስጥ ይታቀፉ',
        description: 'ድጋፍዎ በሰሜን አሜሪካ ውስጥ ለሚገኙ የእሁድ ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመቀጠል ይረዳናል።'
      }
    },
    our_mission: 'ተልዕኳችን',
    our_vision: 'ራዕያችን',
    join_our_mission: 'በተልዕኳችን ውስጥ ይታቀፉ',
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
    donate_cta: 'ድጋፋችሁ የሰንበት ት/ቤቶችን በሰሜን አሜሪካ ለማገዝ ምንጮችንና ስልጠናን ለመቀጠል ይረዳናል።',
    donation_helps: 'ልገሳችሁ በሰሜን አሜሪካ ውስጥ ለቅዱሳን ቤተክርስቲያናት ጥሩ የኦርቶዶክስ ትምህርት ምንጮችን ለማቅረብ ይረዳናል።',
    passionate_individuals: 'በኦርቶዶክስ ትምህርት ላይ የተሰጡ በፍቅር የሚሰሩ ሰዎችን ለህጻናትና ለወጣቶች ሕይወት ለመለወጥ እንፈልጋለን።',
    nassu_leadership: 'ናሱ በኦርቶዶክስ ትምህርት፣ ፋይናንስ፣ ኮሚዩኒኬሽንና ስትራቴጂ አቅድ የተሞሉ ባለሙያዎች ቡድን ይመራዋል።',
    
    // Homepage translations
    hero: {
      title: 'የሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት',
      subtitle: 'በኦርቶዶክስ ማህበረሰባችን ውስጥ ዕምነትን፣ ትምህርትን እና አገልግሎትን ማሳደግ።'
    },
    
    // Call to Action Section - Amharic
    cta: {
      title: 'በተልዕኳችን ውስጥ ይቀላቀሉ',
      description: 'የሚቀጥለውን ትውልድ እምነት ለማሳደግ ይርዱን። ድጋፋችሁ ስራችንን የሚቻል ያደርገዋል።'
    },
    // Add more translations here if needed
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, args: Record<string, any> = {}): string | string[] | any => {
    const keys = key.split('.');
    let translation: any = translations[language];

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
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
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
