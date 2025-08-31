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
    home_title_line1: 'Ethiopia Orthodox Tewahedo Church',
    home_title_line2: 'North America Caribbean Latin America Archdiocese Sunday Schools Union',
    home: 'Home',
    about: 'About',
    services: 'Services',
    values: 'Values',
    videos: 'Videos',
    values_page: {
      title: 'Our Values',
      subtitle: 'The principles that guide our work',
      core_values_title: 'Core Values',
      core_values_description: 'At Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union, our work is guided by a set of core values that reflect our commitment to Orthodox Christian education and the spiritual formation of children and youth.',
      
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
    team_page: {
      title: 'Meet the Team',
      subtitle: 'Meet the dedicated individuals guiding our mission',
      leadership_title: 'Our Leadership Team',
      leadership_description: 'NASSU is led by a team of dedicated professionals who bring diverse expertise in Orthodox education, finance, communications, and strategic planning to our organization.',
      team_members: {
        abraham: {
          name: 'Wise Chronicler Abraham',
          title: 'Chairman',
          bio: 'Wise Chronicler Abraham brings over 10 years of experience in leader and leadership management to NASSU.'
        },
        sara: {
          name: 'Sara',
          title: 'Finance Director',
          bio: 'Ms. Sara brings over 8 years of experience in finance and non-profit management to NASSU. As our Finance Director, he oversees budgeting, financial planning, and ensures the responsible stewardship of our resources.'
        },
        mintesnot: {
          name: 'Mintesnot',
          title: 'Secretary',
          bio: 'With a background in education and curriculum development, Mintesnot coordinates all NASSU programs, ensuring they meet the highest standards of Orthodox teaching while engaging students of all ages.'
        },
        yared: {
          name: 'Yared',
          title: 'Communication Lead',
          bio: 'Yared manages all communication efforts for NASSU, from our website and social media presence to newsletters and educational materials. He ensures our message reaches the Orthodox community effectively.'
        },
        wosen: {
          name: 'Wosen',
          title: 'Plan and Strategy Director',
          bio: 'Wosen has served Orthodox parishes for over five years. He leads our strategic planning initiatives, ensuring our work remains focused on our mission and values.'
        },
        biniyam: {
          name: 'Biniyam',
          title: 'Hymn Section',
          bio: 'Biniyam oversees our communications strategy and public relations. With a background in marketing and Orthodox theology, she helps articulate our mission to parishes, donors, and the broader Orthodox community.'
        },
        eskedar: {
          name: 'Eskedar',
          title: 'Communication Director',
          bio: 'Eskedar oversees our communications strategy and public relations. With a background in marketing and Orthodox theology, she helps articulate our mission to parishes, donors, and the broader Orthodox community.'
        },
        betelhem: {
          name: 'Betelhem',
          title: 'Child and Youth Section',
          bio: 'Ms Betelhem oversees our child and youth participation and managing. With a background in marketing and Orthodox theology, she helps articulate our mission to parishes, donors, and the broader Orthodox community.'
        },
        tinsae: {
          name: 'Tinsae',
          title: 'IT Director',
          bio: 'Mr. Tinsae oversees our IT operations and management. With a background in marketing and Orthodox theology, he helps articulate our mission to parishes, donors, and the broader Orthodox community.'
        }
      },
      join_team: {
        title: 'Join Our Team',
        description: 'We\'re always looking for passionate individuals who share our commitment to Orthodox education and want to make a difference in the lives of children and youth.'
      },
      support_work: {
        title: 'Support Our Work',
        description: 'Your donation helps us continue providing quality Orthodox education resources to parishes across North America.'
      }
    },
    sponsors_page: {
      title: 'Sponsors & Partners',
      subtitle: 'The organizations that make our work possible',
      major_sponsors: {
        title: 'Our Major Sponsors',
        description: 'NASSU\'s work would not be possible without the generous support of our major sponsors. These organizations share our commitment to Orthodox education and have made significant contributions to our mission.'
      },
      partners: {
        title: 'Our Partners',
        description: 'We collaborate with numerous Orthodox organizations across North America to advance our shared mission of providing quality Orthodox Christian education.'
      },
      become_sponsor: {
        title: 'Become a Sponsor or Partner',
        description: 'Support from organizations like yours helps us reach more parishes and provide better resources for Orthodox Christian education. By becoming a sponsor or partner, you\'ll be making a significant contribution to the spiritual formation of Orthodox youth across North America.'
      },
      sponsorship_benefits: {
        title: 'Sponsorship Benefits',
        benefits: [
          'Recognition on our website and publications',
          'Opportunities to connect with Orthodox parishes',
          'Input on educational initiatives',
          'Support Orthodox education across North America'
        ]
      },
      partnership_opportunities: {
        title: 'Partnership Opportunities',
        opportunities: [
          'Collaborative educational projects',
          'Resource sharing and development',
          'Joint events and programs',
          'Networking with Orthodox organizations'
        ]
      },
      visit_website: 'Visit Website'
    },
    news_page: {
      title: 'News & Messages',
      subtitle: 'Stay updated with the latest news, events, and resources from the Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union',
      tabs: {
        all: 'All',
        events: 'Events',
        announcements: 'Announcements',
        resources: 'Resources',
        documents: 'Documents'
      },
      news_items: {
        annual_conference: {
          title: 'Annual Conference Dates Announced',
          excerpt: 'Join us for our 2025 Annual Conference focused on innovative approaches to Orthodox education.',
          reading_time: '4 min read'
        },
        new_curriculum: {
          title: 'New Curriculum Resources Released',
          excerpt: 'Explore our newly released curriculum materials designed for middle school Sunday School classes.',
          reading_time: '3 min read'
        },
        teacher_training: {
          title: 'Teacher Training Workshop Series',
          excerpt: 'Register for our spring teacher training workshops offered online and in several major cities.',
          reading_time: '5 min read'
        },
        partnership: {
          title: 'NASSU Partners with Orthodox Publisher',
          excerpt: 'We\'re excited to announce our new partnership with Byzantine Press to develop Sunday School materials.',
          reading_time: '2 min read'
        },
        summer_camp: {
          title: 'Summer Youth Camp Registration Open',
          excerpt: 'Register your children for our annual Orthodox summer youth camp with specialized programs for all ages.',
          reading_time: '6 min read'
        },
        new_board: {
          title: 'New Board Members Welcomed',
          excerpt: 'NASSU welcomes three new board members bringing expertise in education, finance, and technology.',
          reading_time: '4 min read'
        },
        digital_library: {
          title: 'Digital Resource Library Expanded',
          excerpt: 'Our digital library now includes over 500 resources for Orthodox Sunday Schools, with new materials for all age groups.',
          reading_time: '3 min read'
        },
        regional_conference: {
          title: 'Regional Conference Success',
          excerpt: 'Over 200 Sunday School teachers gathered for our Midwest regional conference focused on engaging Orthodox youth.',
          reading_time: '5 min read'
        }
      },
      actions: {
        read_more: 'Read More →',
        load_more: 'Load More',
        download: 'Download',
        subscribe: 'Subscribe'
      },
      newsletter: {
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter to receive the latest news, events, and resources directly in your inbox.',
        form: {
          first_name: 'First Name',
          first_name_placeholder: 'first name',
          last_name: 'Last Name',
          last_name_placeholder: 'last name',
          email: 'Email Address',
          email_placeholder: 'you@example.com',
          agreement: 'I agree to receive email communications from NASSU'
        }
      },
      upcoming_events: {
        title: 'Upcoming Events',
        subtitle: 'Mark your calendar for these important upcoming NASSU events and gatherings.',
        teacher_workshop: {
          title: 'Teacher Training Workshop',
          description: 'A comprehensive workshop designed to equip Sunday School teachers with effective teaching methods, classroom management strategies, and engaging activities for Orthodox education.',
          location: 'Chicago, IL',
          type: 'In-Person',
          audience: 'Teachers'
        },
        annual_conference: {
          title: 'Annual Conference',
          description: 'NASSU\'s flagship event bringing together Orthodox educators, clergy, and experts for three days of learning, networking, and inspiration. Registration includes all sessions, materials, and meals.',
          location: 'Boston, MA',
          type: 'In-Person',
          audience: 'All Educators'
        },
        youth_camp: {
          title: 'Youth Summer Camp',
          description: 'A week-long immersive camp experience for Orthodox youth ages 9-16. Activities include daily church services, religious education, sports, crafts, music, and outdoor adventures.',
          location: 'New York State',
          type: 'Residential',
          audience: 'Youth Ages 9-16'
        },
        view_calendar: 'View Full Calendar'
      },
      social_media: {
        title: 'Connect With Us',
        description: 'Follow us on social media for daily updates, resources, and inspiration for Orthodox Sunday Schools.'
      },
      document_types: {
        pdf_document: 'PDF Document'
      }
    },
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
          home_title: 'Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union',
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
            title: 'Harp and Kirar Training',
            description: 'Age-appropriate Orthodox Christian educational materials for children from preschool through high school, aligned with Church teachings.'
          },
          {
            title: 'Raising Childrens with in Orthodoxy Faith',
            description: 'Professional development programs, workshops, and resources to enhance teaching effectiveness and Orthodox knowledge.'
          },
          {
            title: 'Strengthening the Unity of the Sunday School',
            description: 'Engaging activities, retreats, and events that foster spiritual growth and Orthodox community among youth.'
          },
          {
            title: 'Supporting Monastries',
            description: 'Supporting monastries in their spiritual growth and development.'
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
      title: 'Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union',
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
        'The Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union (NASSU) was founded in September 2/ 2001 by a group of dedicated Ethiopian Orthodox priests and educators who recognized the need for a unified approach to Sunday School education across North America, Caribbean, and Latin America. What began as a small gathering of educators from various jurisdictions has grown into a comprehensive resource center supporting Sunday Schools throughout the continent.',
        'For over 20 years, we have been developing curriculum materials, organizing teacher training workshops, and creating resources that help parishes provide quality Orthodox Christian education to children and youth. Our work spans across multiple Orthodox jurisdictions, bringing together the rich traditions and teachings of our faith.',
        'Today, NASSU serves hundreds of parishes, reaching thousands of children each week. We continue to expand our offerings and adapt to the changing needs of Orthodox communities while remaining firmly rooted in the unchanging truths of our faith.'
      ],
      at_a_glance: 'At a Glance',
      stats: {
        founded: 'Founded in September 2/ 2001',
        years_of_service: 'Over 30 years of service',
        parishes_served: '350+ Parishes Served',
        across_jurisdictions: 'Across multiple jurisdictions',
        north_america_wide: 'North America Wide',
        countries: 'United States and Ethiopia'
      },
      mission_vision: 'Our Mission & Vision',
      mission: {
        title: 'Our Mission',
        description: [
        'NASSU aims to: Restore the authentic St. Yared hymns in church singing.', 
        'Support and develop monastic establishments and religious congregations financially.', 
        'Establish educational institutions for foundational Church teaching in Ethiopia.',
        'Educate Northern American youth about Church teachings and traditions.',
        'Encourage youth to join Sunday Schools and serve the Church.',
        'Coordinate and promote the gospel teaching across Northern American churchs.',
        'Assist dioceses in meeting their operational needs.'
      ]
      },
      vision: {
        title: 'Our Vision',
        description: 'We envision a future where every Orthodox child in North America has access to engaging, authentic Orthodox education Prepares them to live out their faith with confidence, knowledge, and joy'
      },
      join_mission: {
        title: 'Join Us in Our Mission',
        description: 'Your support helps us continue providing resources and training to Sunday Schools across North America.'
      }
    },
    // Gallery page translations
    gallery_page: {
      title: 'Photo Gallery',
      subtitle: 'Images from our EOTC NASSU community and events',
      section_title: 'Our Orthodox Community',
      section_description: 'Explore images from Sunday School classes, teacher workshops, youth events, and more from the Ethiopia Orthodox Tewahedo Church North America Caribbean Latin America Archdiocese Sunday Schools Union community.',
      search_placeholder: 'Search photos...',
      categories: {
        all: 'All Categories',
        church: 'Church',
        sunday_school: 'Sunday School',
        youth: 'Youth Events',
        community: 'Community Outreach',
        events: 'NASSU Events'
      },
      no_results: {
        title: 'No photos found',
        description: 'Try adjusting your search terms or category filter.',
        clear_filters: 'Clear filters'
      },
      photo_count: '{filtered} of {total} photos • Click any image to view larger',
      no_description: 'No description available',
      youtube_section: {
        title: 'Watch NASSU Videos on YouTube',
        description: 'Discover our Sunday School lessons, Orthodox teachings, youth activities, and community events through our video content.',
        visit_channel: 'Visit YouTube Channel',
        subscribe: 'Subscribe',
        latest_videos: 'Latest videos: Sunday School lessons, Youth activities, Orthodox teachings'
      },
      image_titles: {
        church_exterior: 'Church Exterior',
        church_interior: 'Church Interior',
        sunday_school_class: 'Sunday School Class',
        teacher_workshop: 'Teacher Workshop',
        youth_camp: 'Youth Camp',
        community_outreach: 'Community Outreach',
        nassu_events: 'NASSU Events'
      },
      image_descriptions: {
        church_exterior: 'A beautiful Orthodox church exterior.',
        church_interior: 'The interior of our Orthodox church.',
        sunday_school_class: 'Students learning about Orthodox faith.',
        teacher_workshop: 'Teachers participating in professional development.',
        youth_camp: 'Youth engaging in spiritual activities.',
        community_outreach: 'NASSU volunteers participating in community service'
      }
    },
    // Videos page translations
    videos_page: {
      title: 'Video Gallery',
      subtitle: 'Watch NASSU videos and teachings',
      section_title: 'Our Video Collection',
      section_description: 'Discover our Sunday School lessons, Orthodox teachings, youth activities, and community events through our video content.',
      search_placeholder: 'Search videos...',
      categories: {
        all: 'All Categories',
        church: 'Church',
        sunday_school: 'Sunday School',
        youth: 'Youth Events',
        community: 'Community Outreach',
        events: 'NASSU Events'
      },
      no_results: {
        title: 'No videos found',
        description: 'Try adjusting your search terms or category filter.',
        clear_filters: 'Clear filters'
      },
      video_count: '{count} of {total} videos • Click any video to watch',
      no_description: 'No description available',
      youtube_channel_button: 'Visit NASSU YouTube Channel',
      video_titles: {
        sunday_school_lesson: 'Sunday School Lesson - Orthodox Faith',
        youth_ministry: 'Youth Ministry Activities',
        community_outreach: 'Community Outreach Program',
        teacher_training: 'Teacher Training Workshop',
        orthodox_traditions: 'Orthodox Traditions & Customs',
        family_faith: 'Family Faith Formation',
        annual_conference: 'NASSU Annual Conference',
        prayer_worship: 'Prayer & Worship Guide',
        children_ministry: 'Children\'s Ministry Resources'
      },
      video_descriptions: {
        sunday_school_lesson: 'Learn about the fundamentals of Orthodox Christianity in this engaging Sunday School lesson',
        youth_ministry: 'Discover exciting youth activities and spiritual development programs at NASSU',
        community_outreach: 'See how NASSU serves the community through various outreach initiatives',
        teacher_training: 'Professional development session for Sunday School teachers and volunteers',
        orthodox_traditions: 'Explore the rich traditions and customs of the Orthodox Church',
        family_faith: 'Guidance for families on incorporating Orthodox practices into daily life',
        annual_conference: 'Highlights from our annual conference featuring speakers and workshops',
        prayer_worship: 'Learn about Orthodox prayer practices and worship traditions',
        children_ministry: 'Educational resources and activities for teaching Orthodox faith to children'
      }
    },
    // Donate page translations
    donate_page: {
      title: 'Donate to Orthodox Union Sunday School',
      subtitle: 'Support Orthodox education for the next generation.',
      description: 'Your generous donation helps us continue providing quality Orthodox education resources and training to Sunday Schools across North America.',
      select_amount: {
        title: 'Select Donation Amount',
        subtitle: 'Choose your donation amount',
        custom_amount: 'Enter Custom Amount',
        custom_placeholder: 'Enter amount',
        valid_amount: '✓ Valid amount: $',
        invalid_amount: 'Please enter a valid amount greater than $0'
      },
      make_donation: {
        title: 'Make a Donation',
        frequency: 'Frequency',
        one_time: 'One Time',
        monthly: 'Monthly',
        designation: 'Donation Designation',
        designation_options: {
          general: 'General Fund (Greatest Need)',
          curriculum: 'Curriculum Development',
          teacher_training: 'Teacher Training Programs',
          technology: 'Digital Resources & Technology',
          scholarship: 'Youth Scholarships'
        },
        note: 'Note (Optional)',
        note_placeholder: 'Add a personal note with your donation'
      },
      payment_methods: {
        paypal: 'PayPal',
        bank_transfer: 'Bank Transfer',
        zelle: 'Zelle',
        credit_card: 'Credit Card'
      },
      validation: {
        enter_custom_amount: 'Please enter a custom amount',
        enter_valid_amount: 'Enter a valid amount above to proceed with your donation.'
      },
      zelle: {
        title: 'Send via Zelle',
        subtitle: 'Send your donation to:',
        email: 'Nassupay@gmail.com',
        copy_email: 'Copy Email',
        email_copied: '✓ Email copied!',
        email_copied_desc: 'Paste it into your Zelle app to complete your donation.',
        important: 'Important: Include your name and email in the payment memo/note.',
        confirmation: 'You\'ll receive a confirmation email within 24-48 hours after we process your donation.',
        secure_title: 'Secure & Easy Donation',
        secure_desc: 'Your donation is processed securely through Zelle\'s trusted payment network. No account registration required.'
      },
      impact: {
        title: 'Your Impact',
        amount_25: '$25 provides:',
        amount_25_items: [
          'Training materials for one Sunday School teacher',
          'Educational resources for 5 students'
        ],
        amount_50: '$50 provides:',
        amount_50_items: [
          'A complete curriculum kit for one classroom',
          'Scholarships for two teachers to attend workshops'
        ],
        amount_100: '$100 provides:',
        amount_100_items: [
          'Digital resources for an entire parish',
          'Materials for regional teacher training events',
          'Scholarships for youth camp participants'
        ],
        amount_250: '$250+ provides:',
        amount_250_items: [
          'Complete Sunday School program support for a small parish',
          'Development of new curriculum materials',
          'Technology upgrades for digital resource delivery'
        ],
        tax_deductible: 'NASSU is a 501(c)(3) non-profit organization. Your donation is tax-deductible to the extent allowed by law.'
      },
      success: {
        title: 'Thank you for your donation!',
        description: 'Your donation will support Orthodox Sunday School education.',
        error_title: 'Error processing donation',
        error_description: 'Your payment was processed but we couldn\'t record it. Please contact support.',
        payment_failed: 'Payment failed',
        payment_error: 'An error occurred during payment processing. Please try again.'
      }
    },
    admin_page: {
      title: 'Admin Access',
      subtitle: 'Sign in to access the administration dashboard',
      admin_access: 'Admin Access',
      sign_in_dashboard: 'Sign in to access the administration dashboard',
      back_to_main: '← Back to main site',
      admin_email: 'Admin Email',
      admin_password: 'Admin Password',
      email_placeholder: 'admin@nassu.org',
      access_dashboard: 'Access Admin Dashboard',
      authenticating: 'Authenticating...',
      authorized_only: 'Only authorized administrators can access this area!',
      validation: {
        enter_both: 'Please enter both email and password',
        invalid_credentials: 'Invalid email or password',
        too_many_attempts: 'Too many failed attempts. Please try again later.',
        general_error: 'An error occurred during login'
      },
      access_denied: 'Access Denied',
      no_admin_privileges: 'You don\'t have admin privileges.',
      login_successful: 'Login successful',
      redirecting_dashboard: 'Redirecting to admin dashboard...',
      login_failed: 'Login Failed'
    },
    admin_dashboard: {
      title: 'Admin Dashboard',
      welcome_back: 'Welcome back, {email}',
      settings: 'Settings',
      sign_out: 'Sign Out',
      loading_dashboard: 'Loading dashboard...',
      stats: {
        total_users: 'Total Users',
        active_users: 'active users',
        donations: 'Donations',
        pending: 'pending',
        monthly_goal: 'Monthly Goal',
        target: 'Target: {amount}',
        recent_activity: 'Recent Activity',
        activities_today: 'activities today'
      },
      recent_users: {
        title: 'Recent Users',
        description: 'Latest registered users',
        invite_user: 'Invite User',
        view_all_users: 'View all users',
        role: {
          admin: 'Admin',
          editor: 'Editor',
          viewer: 'Viewer'
        },
        status: {
          active: 'active',
          inactive: 'inactive'
        }
      },
      recent_donations: {
        title: 'Recent Donations',
        description: 'Latest donations received',
        view_all_donations: 'View all donations',
        status: {
          completed: 'completed',
          pending: 'pending'
        }
      },
      recent_activity: {
        title: 'Recent Activity',
        description: 'Latest activities in the system',
        loading_activities: 'Loading activities...',
        no_activities: 'No recent activities.',
        failed_to_load: 'Failed to load activity logs',
        unknown_user: 'Unknown'
      },
      error_messages: {
        access_denied: 'Access Denied',
        no_permission: 'You do not have permission to access the admin dashboard.',
        failed_to_load_data: 'Failed to load dashboard data'
      }
    },
    login_page: {
      title: 'Welcome Back',
      subtitle: 'Sign In to continue:',
      email: 'Email',
      password: 'Password',
      forgot_password: 'Forgot password',
      sign_in: 'Sign in',
      signing_in: 'Signing in...',
      or_continue_with: 'or continue with:',
      continue_with_google: 'Continue with Google',
      continue_with_apple: 'Continue with Apple',
      no_account: 'Have not an account?',
      sign_up: 'Sign Up',
      terms_and_privacy: 'By signing in, you agree to our {terms} and {privacy}',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      reset_password: 'Reset Password',
      enter_email_for_reset: 'Enter your email address and we will send you a link to reset your password.',
      your_email_placeholder: 'your@email.com',
      send_reset_link: 'Send Reset Link',
      sending: 'Sending...',
      back_to_login: 'Back to Login',
      error: 'Error',
      success: 'Success',
      email_required: 'Email Required',
      please_fill_fields: 'Please fill in all fields',
      logged_in_successfully: 'Logged in successfully!',
      login_failed: 'Login Failed',
      failed_to_sign_in: 'Failed to sign in',
      logged_in_with_google: 'Logged in with Google!',
      failed_google_sign_in: 'Failed to sign in with Google',
      logged_in_with_apple: 'Logged in with Apple!',
      failed_apple_sign_in: 'Failed to sign in with Apple',
      password_reset_sent: 'Password reset email sent. Please check your inbox.',
      failed_to_send_reset: 'Failed to send reset email',
      name_email_placeholder: 'name@example.com'
    },
    signup_page: {
      title: 'Create your account',
      subtitle: 'Join our community today',
      first_name: 'First Name',
      last_name: 'Last Name',
      email_address: 'Email address',
      password: 'Password',
      confirm_password: 'Confirm Password',
      sign_up: 'Sign up',
      creating_account: 'Creating Account...',
      or_continue_with: 'Or continue with',
      continue_with_google: 'Continue with Google',
      continue_with_apple: 'Continue with Apple',
      already_have_account: 'Already have an account?',
      sign_in: 'Sign in',
      terms_privacy_text: 'By signing up, you agree to our {terms} and {privacy}.',
      terms: 'Terms',
      privacy: 'Privacy Policy',
      // Form validation and messages
      passwords_not_match: 'Passwords do not match',
      sign_up_successful: 'Sign up successful',
      verification_email_sent: 'A verification email has been sent to {email}.',
      verify_email_before_login: 'Please verify your email before logging in.',
      sign_up_failed: 'Sign up failed',
      sign_up_error: 'Sign up error',
      account_created_successfully: 'Account created successfully',
      account_created: 'Account created',
      google_sign_up_failed: 'Google sign up failed',
      // Placeholders
      first_name_placeholder: 'John',
      last_name_placeholder: 'Doe',
      email_placeholder: 'your@email.com',
      password_placeholder: '••••••••'
    }
  },
  am: {
    // Navigation
    home_title_line1: 'በኢትዮጵያ ኦርቶዶክስ ተዋህዶ ቤተክርስትያን',
    home_title_line2: 'የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አህጉረ ስብከት የሰንበት ትምህርት ቤቶች ህብረት',
    home: 'ዋና ገጽ',
    join_us: 'በተልዕኳችን ውስጥ ይቀላቀሉ',
    'Join Us': 'በተልዕኳችን ውስጥ ይቀላቀሉ',
    about: 'ስለ እኛ',
    videos: 'ቪዲዮዎች',
    values_page: {
      title: 'የእኛ እሴቶች',
      subtitle: 'ሥራችንን የሚመሩ መርሆዎች',
      core_values_title: 'ዋና ዋና እሴቶች',
      core_values_description: 'በየኢትዮጵያ ኦርቶዶክስ ቴዋሕዶ ቤተክርስቲያን የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አርክዲዮሴስ የሰንበት ት/ቤቶች ህብረት ሥራችን በኦርቶዶክስ ክርስቲያናዊ ትምህርት እና የሕጻናት እና ወጣቶች መንፈሳዊ እድገት ላይ ያለን ቁርጠኝነት የሚያንፀባርቁ ዋና ዋና እሴቶች ይመራሉ።',
      values: {
        orthodox_faith: {
          title: 'የኦርቶዶክስ እምነት',
          description: 'በእውነተኛ የኦርቶዶክስ ክርስቲያናዊ ትምህርት ተስፋጽተናል፣ የኦርቶዶክስ ቤተክርስቲያንን ትምህርቶች፣ ንጽሕናዎች እና ልምዶች በታማኝነት እንከታተላለን። ሁሉም የእኛ የትምህርት እቃዎች እና ፕሮግራሞች ከኦርቶዶክስ ቄሳውንት እና ንጽሕና ተመራማሪዎች መመሪያ ጋር ተዘጋጅተዋል።'
        },
        educational_excellence: {
          title: 'ትምህርታዊ ሙሉነት',
          description: 'በትምህርታዊ ይዘት እና በዘዴ ላይ ከፍተኛ ጥራት እንዲኖረን እንሞክራለን። የእኛ ምንጮች ኦርቶዶክስ ቲዮሎጂ እና የተለያዩ ዕድሜ ቡድኖች ለማስተማር የሚያግዙ ውጤታማ የትምህርት ልምዶችን የሚያውቁ ባለስልጠና ተማሪዎች ያዘጋጁ ናቸው።'
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
    team_page: {
      title: 'ቡድኑን ያግኙ',
      subtitle: 'ተልዕኳችንን የሚመሩ ተሰጥኦ ያላቸው ሰዎችን ያግኙ',
      leadership_title: 'የእኛ የመሪነት ቡድን',
      leadership_description: 'ናሱ በኦርቶዶክስ ትምህርት፣ ፋይናንስ፣ ኮሚዩኒኬሽን እና ስትራቴጂ አቅድ ላይ የተለያዩ ስፔሻሊቲዎች ያሏቸው ተሰጥኦ ያላቸው ባለሙያዎች ቡድን ይመራዋል።',
      team_members: {
        abraham: {
          name: 'ጸሀፌ ጥበብ አብርሃም',
          title: 'ፕሬዚደንት',
          bio: 'ጸሀፌ ጥበብ አብርሃም በናሱ ውስጥ በመሪነት እና በመሪነት አስተዳደር ላይ ከ10 ዓመት በላይ ስራ ልምድ ያለው ነው።'
        },
        sara: {
          name: 'ሳራ',
          title: 'የፋይናንስ ዳይሬክተር',
          bio: 'ወ/ሮ ሳራ በናሱ ውስጥ በፋይናንስ እና በስራ ላይ ያልተመሰረተ አስተዳደር ላይ ከ8 ዓመት በላይ ስራ ልምድ ያለው ነው። እንደ የፋይናንስ ዳይሬክተር የገንዘብ አድራሻ፣ የፋይናንስ እቅድ እና የሀብታችን ተጠያቂ አስተዳደር ያረጋግጣል።'
        },
        mintesnot: {
          name: 'ምንተስኖት',
          title: 'ጸሐፊ',
          bio: 'በትምህርት እና በኩርክዮሎም እድገት ላይ ያለው የስራ ልምድ ጋር፣ ምንተስኖት ሁሉንም የናሱ ፕሮግራሞች ያስተባብራል፣ ከፍተኛ የኦርቶዶክስ ትምህርት መመዘኛዎችን እያሟሉ ለሁሉም ዕድሜ ተማሪዎች የሚያስማሙ እንዲሆኑ ያደርጋሉ።'
        },
        yared: {
          name: 'ያሬድ',
          title: 'የኮሚዩኒኬሽን መሪ',
          bio: 'ያሬድ ለናሱ የሚደረጉ ሁሉንም የኮሚዩኒኬሽን ጥረቶች ያስተዳድራል፣ ከድህረ ገጻችን እና ከማህበራዊ ሚዲያ ተገኝነት እስከ ዜና መጽሐፍት እና የትምህርት እቃዎች ድረስ። መልእክታችን ወደ ኦርቶዶክስ ማህበረሰብ በውጤታማ ሁኔታ እንዲደርስ ያረጋግጣል።'
        },
        wosen: {
          name: 'ወሰን',
          title: 'የእቅድ እና ስትራቴጂ ዳይሬክተር',
          bio: 'ወሰን ከ5 ዓመት በላይ ለኦርቶዶክስ ቤተክርስቲያናት አገልግሏል። የእኛ ስትራቴጂ እቅድ ተነሳሽነቶችን ያስመራል፣ የስራችን ተልዕኳችን እና እሴቶቻችን ላይ እንዲሰተኩ ያደርጋል።'
        },
        biniyam: {
          name: 'ቢንያም',
          title: 'የመዝሙር ክፍል',
          bio: 'ቢንያም የእኛ የኮሚዩኒኬሽን ስትራቴጂ እና የህዝብ ግንኙነት ያስተዳድራል። በግብይት እና በኦርቶዶክስ ንጽሕና ላይ ያለው የስራ ልምድ ጋር፣ ተልዕኳችንን ወደ ቤተክርስቲያናት፣ ወደ ለግሱ ሰዎች እና ወደ ሰፊው ኦርቶዶክስ ማህበረሰብ ለመግለጽ ያግዛል።'
        },
        eskedar: {
          name: 'እስከዳር',
          title: 'የኮሚዩኒኬሽን ዳይሬክተር',
          bio: 'እስከዳር የእኛ የኮሚዩኒኬሽን ስትራቴጂ እና የህዝብ ግንኙነት ያስተዳድራል። በግብይት እና በኦርቶዶክስ ንጽሕና ላይ ያለው የስራ ልምድ ጋር፣ ተልዕኳችንን ወደ ቤተክርስቲያናት፣ ወደ ለግሱ ሰዎች እና ወደ ሰፊው ኦርቶዶክስ ማህበረሰብ ለመግለጽ ያግዛል።'
        },
        betelhem: {
          name: 'ቤተልሄም',
          title: 'የልጆች እና ወጣቶች ክፍል',
          bio: 'ወ/ሮ ቤተልሄም የልጆቻችን እና የወጣቶቻችን ተሳታፊነት እና አስተዳደር ያስተዳድራል። በግብይት እና በኦርቶዶክስ ንጽሕና ላይ ያለው የስራ ልምድ ጋር፣ ተልዕኳችንን ወደ ቤተክርስቲያናት፣ ወደ ለግሱ ሰዎች እና ወደ ሰፊው ኦርቶዶክስ ማህበረሰብ ለመግለጽ ያግዛል።'
        },
        tinsae: {
          name: 'ትንሳኤ',
          title: 'የአይቲ ዳይሬክተር',
          bio: 'የእኛ የአይቲ ስራዎችን እና አስተዳደር ያስተዳድራል። በግብይት እና በኦርቶዶክስ ንጽሕና ላይ ያለው የስራ ልምድ ጋር፣ ተልዕኳችንን ወደ ቤተክርስቲያናት፣ ወደ ለግሱ ሰዎች እና ወደ ሰፊው ኦርቶዶክስ ማህበረሰብ ለመግለጽ ያግዛል።'
        }
      },
      join_team: {
        title: 'ቡድናችንን ይቀላቀሉ',
        description: 'በኦርቶዶክስ ትምህርት ላይ የሚያለውን ቁርጠኝነታችን የሚያጋሩ እና በልጆች እና ወጣቶች ሕይወት ላይ ለውጥ ለማድረግ የሚፈልጉ ተሰጥኦ ያላቸው ሰዎችን ሁልጊዜ እንፈልጋለን።'
      },
      support_work: {
        title: 'ስራችንን ደግፉ',
        description: 'የእርስዎ ልገሳ በሰሜን አሜሪካ ውስጥ ለሚገኙ ቤተክርስቲያናት ጥራት ያለው የኦርቶዶክስ ትምህርት ምንጮችን ለመቀጠል ይረዳናል።'
      }
    },
    sponsors_page: {
      title: 'ደጋፊዎች እና አጋሮች',
      subtitle: 'ስራችንን የሚያስችሉ ድርጅቶች',
      major_sponsors: {
        title: 'ዋና ደጋፊዎቻችን',
        description: 'የናሱ ስራ ያለ የእነዚህ ዋና ደጋፊዎቻችን ተሰጥኦ ያለው ድጋፍ አይቻልም። እነዚህ ድርጅቶች በኦርቶዶክስ ትምህርት ላይ ያለውን ቁርጠኝነታችን ያጋራሉ እና ለተልዕኳችን አስፈላጊ አስተዋፅዖ አድርገዋል።'
      },
      partners: {
        title: 'አጋሮቻችን',
        description: 'በሰሜን አሜሪካ ውስጥ ጥራት ያለው የኦርቶዶክስ ክርስቲያናዊ ትምህርት ለመስጠት የጋራ ተልዕኳችንን ለማሳደግ ከብዙ የኦርቶዶክስ ድርጅቶች ጋር እንተባበራለን።'
      },
      become_sponsor: {
        title: 'ደጋፊ ወይም አጋር ይሁኑ',
        description: 'እንደ እርስዎ ያሉ ድርጅቶች ድጋፍ ተጨማሪ ቤተክርስቲያናትን ለማድረስ እና ለኦርቶዶክስ ክርስቲያናዊ ትምህርት የተሻለ ምንጮችን ለመስጠት ያስችለናል። ደጋፊ ወይም አጋር በመሆን በሰሜን አሜሪካ ውስጥ ለሚገኙ የኦርቶዶክስ ወጣቶች መንፈሳዊ እድገት ላይ አስፈላጊ አስተዋፅዖ እያደረጉ ነው።'
      },
      sponsorship_benefits: {
        title: 'የደጋፍ ጥቅሞች',
        benefits: [
          'በድህረ ገጻችን እና በግማሽ ሰነዶች ላይ መታወቅ',
          'ከኦርቶዶክስ ቤተክርስቲያናት ጋር የመገናኘት እድሎች',
          'በትምህርታዊ ተነሳሽነቶች ላይ አስተያየት',
          'በሰሜን አሜሪካ ውስጥ የኦርቶዶክስ ትምህርትን ድጋፍ'
        ]
      },
      partnership_opportunities: {
        title: 'የአጋርነት እድሎች',
        opportunities: [
          'የትብብር ትምህርታዊ ፕሮጀክቶች',
          'የምንጭ መጋራት እና እድገት',
          'የጋራ ክስተቶች እና ፕሮግራሞች',
          'ከኦርቶዶክስ ድርጅቶች ጋር የመደራጀት'
        ]
      },
      visit_website: 'ድህረ ገጽ ይጎብዙ'
    },
    news_page: {
      title: 'ዜና እና መልዕክቶች',
      subtitle: 'ከሰሜን አሜሪካ የሰንበት ት/ቤት ህብረት የቅርብ ዜናዎችን፣ ዝግጅቶችን እና ምንጮችን ለማወቅ ይቀጥሉ',
      tabs: {
        all: 'ሁሉም',
        events: 'ዝግጅቶች',
        announcements: 'ማስታወቂያዎች',
        resources: 'ምንጮች',
        documents: 'ሰነዶች'
      },
      news_items: {
        annual_conference: {
          title: 'ዓመታዊ ስብሰባ የተወሰነ ቀን ተገለጸ',
          excerpt: 'በኦርቶዶክስ ትምህርት ላይ ያተኩረ የ2025 ዓመታችንን ዓመታዊ ስብሰባ ይቀላቀሉ።',
          reading_time: '4 ደቂቃ ያነብባል'
        },
        new_curriculum: {
          title: 'አዲስ የትምህርት ምንጮች ተለቀቁ',
          excerpt: 'ለመካከለኛ ደረጃ የሰንበት ት/ቤት ክፍሎች የተዘጋጁ አዲሶቻችንን የትምህርት እቃዎች ያስሱ።',
          reading_time: '3 ደቂቃ ያነብባል'
        },
        teacher_training: {
          title: 'የመምህራን ስልጠና የስራ አደረጃጀት ተከታታይ',
          excerpt: 'በመስመር ላይ እና በብዙ ዋና ከተማዎች ውስጥ የሚቀርቡ የጸደይ የመምህራን ስልጠና የስራ አደረጃጀቶችን ይመዝገቡ።',
          reading_time: '5 ደቂቃ ያነብባል'
        },
        partnership: {
          title: 'ናሱ ከኦርቶዶክስ አሳታሚ ጋር ተጣምሯል',
          excerpt: 'የሰንበት ት/ቤት እቃዎችን ለማዳበር ከባይዛንቲን ፕሬስ ጋር ያለውን አዲስ አጋርነታችን ለማስታወቅ ተስማምተናል።',
          reading_time: '2 ደቂቃ ያነብባል'
        },
        summer_camp: {
          title: 'የጸደይ ወጣቶች ካምፕ ምዝገባ ተከፍቷል',
          excerpt: 'ለሁሉም ዕድሜ ቡድኖች የተዘጋጁ ልዩ ፕሮግራሞች ያሉትን የዓመታችንን የኦርቶዶክስ የጸደይ ወጣቶች ካምፕ ለልጆቻችሁ ይመዝገቡ።',
          reading_time: '6 ደቂቃ ያነብባል'
        },
        new_board: {
          title: 'አዲሶች የቦርድ አባላት ተቀብለዋል',
          excerpt: 'ናሱ በትምህርት፣ በፋይናንስ እና በቴክኖሎጂ ላይ ያለውን ስፔሻሊቲ ያላቸው ሶስት አዲሶች የቦርድ አባላትን ያቀበለ።',
          reading_time: '4 ደቂቃ ያነብባል'
        },
        digital_library: {
          title: 'ዲጂታል የምንጭ ቤተ-መጽሐፍት ተስፋጽቷል',
          excerpt: 'የእኛ ዲጂታል ቤተ-መጽሐፍት አሁን ለኦርቶዶክስ የሰንበት ት/ቤቶች ከ500 በላይ ምንጮችን ያካትታል፣ ለሁሉም ዕድሜ ቡድኖች አዲስ እቃዎች አሉ።',
          reading_time: '3 ደቂቃ ያነብባል'
        },
        regional_conference: {
          title: 'የክልል ስብሰባ ስኬት',
          excerpt: 'ከ200 በላይ የሰንበት ት/ቤት መምህራን በኦርቶዶክስ ወጣቶችን ለማነቃቃት ያተኩረ የእኛን የምዕራብ ክልል ስብሰባ ሰብስበዋል።',
          reading_time: '5 ደቂቃ ያነብባል'
        }
      },
      actions: {
        read_more: 'ተጨማሪ ያንብቡ →',
        load_more: 'ተጨማሪ ያስገኙ',
        download: 'ያውርዱ',
        subscribe: 'ይመዝገቡ'
      },
      newsletter: {
        title: 'ወቅታዊ ይሁኑ',
        description: 'የቅርብ ዜናዎችን፣ ዝግጅቶችን እና ምንጮችን በቀጥታ በድህረ ገጻችሁ ለመቀበል የዜና መጽሐፍታችንን ይመዝገቡ።',
        form: {
          first_name: 'የመጀመሪያ ስም',
          first_name_placeholder: 'የመጀመሪያ ስም',
          last_name: 'የመጨረሻ ስም',
          last_name_placeholder: 'የመጨረሻ ስም',
          email: 'የኢሜይል አድራሻ',
          email_placeholder: 'እርስዎ@ምሳሌ.com',
          agreement: 'ከናሱ የኢሜይል ግንኙነቶችን ለመቀበል እስማማለሁ'
        }
      },
      upcoming_events: {
        title: 'የሚቀርቡ ዝግጅቶች',
        subtitle: 'እነዚህን አስፈላጊ የሚቀርቡ የናሱ ዝግጅቶችን እና ስብሰባዎችን ለማስታወስ የቀን መቁጠሪያዎችዎን ምልክት ያድርጉ።',
        teacher_workshop: {
          title: 'የመምህራን ስልጠና የስራ አደረጃጀት',
          description: 'የሰንበት ት/ቤት መምህራንን ውጤታማ የመማሪያ ዘዴዎችን፣ የክፍል አስተዳደር ስትራቴጂዎችን እና ለኦርቶዶክስ ትምህርት የሚያነቃቁ እንቅስቃሴዎችን ለማስታጠቅ የተዘጋጀ ሁለገብ የስራ አደረጃጀት ነው።',
          location: 'ቺካጎ፣ አይኤል',
          type: 'በግል',
          audience: 'መምህራን'
        },
        annual_conference: {
          title: 'ዓመታዊ ስብሰባ',
          description: 'የናሱ ዋና ዝግጅት ኦርቶዶክስ ትምህርት ሰጪዎችን፣ ቄሳውንትን እና ባለሙያዎችን ለማገናኘት የሚያገለግል ሶስት ቀናት የመማር፣ የመደራጀት እና የመነሳሳት ነው። ምዝገባ ሁሉንም ክፍሎች፣ እቃዎች እና ምግቦች ያካትታል።',
          location: 'ቦስተን፣ ኤምኤ',
          type: 'በግል',
          audience: 'ሁሉም ትምህርት ሰጪዎች'
        },
        youth_camp: {
          title: 'የወጣቶች የጸደይ ካምፕ',
          description: 'ለ9-16 ዓመት የሚሆኑ የኦርቶዶክስ ወጣቶች የሳምንት ሙሉ የሚሆን የመሳተፍ ካምፕ ልምድ ነው። እንቅስቃሴዎች የዕለት ቤተክርስቲያን አገልግሎቶችን፣ የሃይማኖት ትምህርትን፣ ስፖርትን፣ የእጅ ስራን፣ ሙዚቃን እና የውጪ ድንጋይ ላይ የሚደረጉ ድንቅ ነገሮችን ያካትታሉ።',
          location: 'የኒዮርክ ግዛት',
          type: 'የመኖሪያ ቤት',
          audience: 'ወጣቶች 9-16 ዓመት'
        },
        view_calendar: 'ሙሉ የቀን መቁጠሪያ ይመልከቱ'
      },
      social_media: {
        title: 'ከእኛ ጋር ይገናኙ',
        description: 'ለኦርቶዶክስ የሰንበት ት/ቤቶች የዕለት ዜናዎችን፣ ምንጮችን እና መነሳሳትን ለማግኘት በማህበራዊ ሚዲያ ይከተሉን።'
      },
      document_types: {
        pdf_document: 'የፒዲኤፍ ሰነድ'
      }
    },
    sponsors: 'ስፖንሰሮች',
    news: 'ዜና እና መልዕክት',
    gallery: 'የምስል ስብስቦች',
    
    // Common UI
    home_title: 'የኢትዮጵያ ኦርቶዶክስ ቴዋሕዶ ቤተክርስቲያን የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አርክዲዮሴስ የሰንበት ት/ቤቶች ህብረት',
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
      description: 'የሚቀጥለው ትውልድ በእምነት፣ በእውቀት እና በደስታ የሚያድግበትን የወደፊቱን እያየን ነው። በሰሜን አሜሪካ ያለ እያንዳንዱ ኦርቶዶክስ ልጅ ጥራት ያለው፣ እውነተኛ የኦርቶዶክስ ትምህርት እንዲኖረው እናምናለን።'
    },
    join_mission: {
      title: 'በተልዕኳችን ውስጥ ይቀላቀሉ',
      description: 'ድጋፍዎ በሰሜን አሜሪካ ዙሪያ ለሚገኙ የሰንበት ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመስጠት እንድንቀጥል ይረዳናል።'
    },
    
    // Services Section
    services_section: {
      services_page: {
        title: 'የእኛ አገልግሎቶች',
        subtitle: 'የኦርቶዶክስ ክርስቲያናዊ ትምህርትን በማገዝ ላይ',
        what_we_offer: {
          title: 'የምናቀርባቸው አገልግሎቶች',
          description: 'የሰንበት ትምህርት ቤት ጉባኤው በኦርቶዶክስ ክርስቲያናዊ ትምህርት ስርዓት ውስጥ የተለያዩ ድጋፎችን ያቀርባል። የእኛ አገልግሎቶች የሚያበረታቱት እምነት፣ እውቀት እና መንፈሳዊ እድገት ለሁሉም ዕድሜ ቡድኖች በኦርቶዶክስ ማህበረሰብ ውስጥ ነው።'
        },
        services: [
          {
            title: 'በገና ፣ ክራርና መሰንቆ ስልጠና',
            description: 'አገልግሎቶችን የሚያበረታቱት እምነት፣ እውቀት እና መንፈሳዊ እድገት ለሁሉም ዕድሜ ቡድኖች በኦርቶዶክስ ማህበረሰብ ውስጥ ነው።'
          },
          {
            title: 'ህጻናትን በሃይማኖት ማነጽ',
            description: 'ለሰንበት ት/ቤት ህጻናት የሚያስፈልጋቸውን የትምህርት ዘዴዎች እና የኦርቶዶክስ እውቀት ለማሳደግ የሚያግዙ ስልጠናዎች፣ የመስክ ስልጠናዎች እና ምንጮች።'
          },
          {
            title: 'የሰንበት ትምህርት ቤቶችን አንድነት ማጠናከር',
            description: 'የሰንበት ትምህርት ቤቶችን አንድነት ማጠናከር የሚያስፈልጋቸውን የትምህርት ዘዴዎች እና የኦርቶዶክስ እውቀት ለማሳደግ የሚያግዙ ስልጠናዎች፣ የመስክ ስልጠናዎች እና ምንጮች።'
          },
          {
            title: 'ገዳማትን መራዳት',
            description: 'ለክርስቲያናዊ ትምህርት የሚያግዙ የተለያዩ የትምህርት እርዳታዎች፣ የእንቅስቃሴ መጽሐፎች እና ዲጂታል ይዘቶች።'
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
        date: 'ሐምሌ 05, 2017 ዓ.ም',
        time: 'ምሽት 6:00 - 8:00',
        excerpt: 'በየሳምንቱ በምናዘጋጃቸው የመጽሐፍ ቅዱስ ጥናት ክፍሎች የመጽሐፍ ቅዱስን ግንዛቤዎን ያብሉ።'
      },
      
      community_service_day: {
        title: 'የማህበረሰብ አገልግሎት ቀን',
        date: 'ሐምሌ 29, 2017 ዓ.ም',
        time: 'ጠዋት 8:00 - ከሰዓት 3:00',
        excerpt: 'በተለያዩ የማህበረሰብ አገልግሎት ፕሮጀክቶች በአካባቢያችን ለማህበረሰባችን የምንመልስበት ቀን ይሁን።'
      }
    },
    
    // About Page
    about_page: {
      title: 'ስለ እኛ',
      subtitle: 'ስለ ታሪካችን፣ ተልዕኳችን እና ራዕያችንን ይወቁ',
      our_story: 'ታሪካችን',
      story_paragraphs: [
        'የኢትዮጵያ ኦርቶዶክስ ቴዋሕዶ ቤተክርስቲያን የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አርክዲዮሴስ የሰንበት ት/ቤቶች ህብረት (ናሱ) ነሃሴ 27 / 1993 ዓ.ም. በሰሜን አሜሪካ፣ ካሪቢያን እና ላቲን አሜሪካ ውስጥ ተመሰረተ። የሰንበት ት/ቤቱ ትምህርትን በተመሳሳይ መልኩ ለማስተማር የሚያስችል ዘዴ እንዲኖር የሚያስችል ሲሆን በተለያዩ የዕምነት ቤተክርስቲያናት የሚገኙ ተማሪዎችን ለማስተማር የሚዘጋጁ መምህራንን ያካተተ ጉባዔ ነው።',
        'ከተመሰረተ ከ30 ዓመታት በላይ ሲሆን የተማሪዎችን የኦርቶዶክስ ክርስቲያናዊ ትምህርት ለማስተማር የሚያስችሉ የትምህርት እቃዎችን እያዘጋጀን ነው። ይህም የተለያዩ የኦርቶዶክስ ቤተክርስቲያናት ተማሪዎችን ለማስተማር የሚዘጋጁ መምህራንን አስተምሯል።',
        'በአሁኑ ጊዜ ናሱ በሺዎች የሚቆጠሩ ተማሪዎችን የሚያገለግል ሲሆን በኦርቶዶክስ እምነት ውስጥ ያሉትን የተለያዩ ትምህርቶች እና ባህሎች በማስተማር ላይ ያተኮረ ነው።'
      ],
      at_a_glance: 'በአጭሩ',
      stats: {
        founded: 'የተመሰረተው ነሃሴ 27 / 1993 ዓ.ም. ነው',
        years_of_service: 'ከ20 ዓመት በላይ አገልግሎት',
        parishes_served: '350+ ቤተክርስቲያናት ያገለገሉ',
        across_jurisdictions: 'በተለያዩ የእምነት ቤተክርስቲያናት ውስጥ',
        north_america_wide: 'በሙሉ ሰሜን አሜሪካ',
        countries: 'በአሜሪካ እና በኢትዮጵያ'
      },
      mission_vision: 'የእኛ ተልእኮ እና ራዕይ',
      mission: {
        title: 'የእኛ ተልእኮ',
        description: [
          'በኢትዮጵያ የሚገኙ ገዳማትና አድባራትን፣ የአብነት ትምህርት ቤቶችን በገንዘብ ለመደገፍ።',
          'በሰሜን አሜሪካ የሚገኙ ወጣቶች የቤተክርስቲያን ትምህርተ ሃይማኖትን፣ ሥርዓተ ቤተክርስትያንን እና ትውፊትን ከአባቶች ተምረው ለተተኪው ትውልድ እንዲያስተላልፉ።',
          'በሰሜን አሜሪካ ባሉት አብያተ ክርስትያናት ወጣቱ ትውልድ የሰ/ት/ቤት አባል ሁኖ ቅድስት ቤተክርስትያንን እንዲያገለግል።',
          'በሰሜን አሜሪካ አብያተ ክርስትያናት ስብከተ ወንጌልን በተጠናከረ ሁኔታ እንዲሰጥ ማስተባበር።',
          'የአህጉረ ስብከቶችን እንቅስቃሴ በሚያስፈልገው ሁሉ መርዳት።'
        ]
      },
      vision: {
        title: 'የእኛ ራዕይ',
        description: 'በሰሜን አሜሪካ ያለ እያንዳንዱ ኦርቶዶክስ ልጅ በራስ ተስፋ፣ በእውቀት እና በደስታ እምነታቸውን እንዲኖሩበት የሚያስችል ገባሪ፣ እውነተኛ የኦርቶዶክስ ትምህርት እንዲኖረው እናምናለን።'
      },
      join_mission: {
        title: 'በተልዕኳችን ውስጥ ይታቀፉ',
        description: 'ድጋፍዎ በሰሜን አሜሪካ ውስጥ ለሚገኙ የሰንበት ት/ቤቶች ምንጮችን እና ስልጠናዎችን ለመቀጠል ይረዳናል።'
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
      title: 'የኢትዮጵያ ኦርቶዶክስ ቴዋሕዶ ቤተክርስቲያን የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አርክዲዮሴስ የሰንበት ት/ቤቶች ህብረት',
      subtitle: 'በኦርቶዶክስ ማህበረሰባችን ውስጥ ዕምነትን፣ ትምህርትን እና አገልግሎትን ማሳደግ።'
    },
    
    // Call to Action Section - Amharic
    cta: {
      title: 'በተልዕኳችን ውስጥ ይቀላቀሉ',
      description: 'የሚቀጥለውን ትውልድ እምነት ለማሳደግ ይርዱን። ድጋፋችሁ ስራችንን የሚቻል ያደርገዋል።'
    },
    // Gallery page translations - Amharic
    gallery_page: {
      title: 'የፎቶ ጋለሪ',
      subtitle: 'ከየኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ናሱ ማህበረሰብ እና እንቅስቃሴዎች የተወሰዱ ምስሎች',
      section_title: 'የእኛ ኦርቶዶክስ ማህበረሰብ',
      section_description: 'ከሰንበት ት/ቤት ክፍሎች፣ ከመምህራን ስልጠናዎች፣ ከወጣት እንቅስቃሴዎች እና ከየኢትዮጵያ ኦርቶዶክስ ቴዋሕዶ ቤተክርስቲያን የሰሜን አሜሪካ ካሪቢያን ላቲን አሜሪካ አርክዲዮሴስ የሰንበት ት/ቤቶች ህብረት ማህበረሰብ ሌሎች እንቅስቃሴዎች የተወሰዱ ምስሎችን ይመልከቱ።',
      search_placeholder: 'ፎቶዎችን ይፈልጉ...',
      categories: {
        all: 'ሁሉም ምድቦች',
        church: 'ቤተክርስቲያን',
        sunday_school: 'ሰንበት ት/ቤት',
        youth: 'የወጣቶች እንቅስቃሴዎች',
        community: 'የማህበረሰብ አገልግሎት',
        events: 'የናሱ እንቅስቃሴዎች'
      },
      no_results: {
        title: 'ምንም ፎቶ አልተገኘም',
        description: 'የፍለጋ ቃላትዎን ወይም የምድብ አጣራሪዎን ያስተካክሉ።',
        clear_filters: 'አጣራሪዎችን ያጽዱ'
      },
      photo_count: '{filtered} ከ {total} ፎቶዎች • ለትልቅ እይታ ማንኛውንም ምስል ይጫኑ',
      no_description: 'ምንም መግለጫ አይደለም',
      youtube_section: {
        title: 'የናሱ ቪዲዮዎችን በዩቱብ ይመልከቱ',
        description: 'የሰንበት ት/ቤት ትምህርቶቻችንን፣ የኦርቶዶክስ ትምህርቶችን፣ የወጣት እንቅስቃሴዎችን እና የማህበረሰብ ክስተቶችን በቪዲዮ ይዘታችን ይወቁ።',
        visit_channel: 'የዩቱብ ቻነል ይጎብኙ',
        subscribe: 'ይመዝገቡ',
        latest_videos: 'የቅርብ ጊዜ ቪዲዮዎች: የሰንበት ት/ቤት ትምህርቶች፣ የወጣት እንቅስቃሴዎች፣ የኦርቶዶክስ ትምህርቶች'
      },
      image_titles: {
        church_exterior: 'የቤተክርስቲያን ውጫዊ ክፍል',
        church_interior: 'የቤተክርስቲያን ውስጣዊ ክፍል',
        sunday_school_class: 'የሰንበት ት/ቤት ክፍል',
        teacher_workshop: 'የመምህራን ስልጠና',
        youth_camp: 'የወጣቶች ካምፕ',
        community_outreach: 'የማህበረሰብ አገልግሎት',
        nassu_events: 'የናሱ እንቅስቃሴዎች'
      },
      image_descriptions: {
        church_exterior: 'ውብ የኦርቶዶክስ ቤተክርስቲያን ውጫዊ ክፍል።',
        church_interior: 'የእኛ ኦርቶዶክስ ቤተክርስቲያን ውስጣዊ ክፍል።',
        sunday_school_class: 'ተማሪዎች ስለ ኦርቶዶክስ እምነት በመማር ላይ።',
        teacher_workshop: 'መምህራን በሙያ ማሳደጊያ ስልጠናዎች ላይ ተሳትፈዋል።',
        youth_camp: 'ወጣቶች በመንፈሳዊ እንቅስቃሴዎች ላይ ተሳትፈዋል።',
        community_outreach: 'የናሱ በፈቃደኝነት የሚሰሩ ሰዎች በማህበረሰብ አገልግሎት ላይ ተሳትፈዋል።'
      }
    },
    // Videos page translations - Amharic
    videos_page: {
      title: 'የቪዲዮ ጋለሪ',
      subtitle: 'የናሱ ቪዲዮዎችን እና ትምህርቶችን ይመልከቱ',
      section_title: 'የቪዲዮ ስብስባችን',
      section_description: 'የሰንበት ት/ቤት ትምህርቶቻችንን፣ የኦርቶዶክስ ትምህርቶችን፣ የወጣት እንቅስቃሴዎችን እና የማህበረሰብ ክስተቶችን በቪዲዮ ይዘታችን ይወቁ።',
      search_placeholder: 'ቪዲዮዎችን ይፈልጉ...',
      categories: {
        all: 'ሁሉም ምድቦች',
        church: 'ቤተክርስቲያን',
        sunday_school: 'ሰንበት ት/ቤት',
        youth: 'የወጣቶች እንቅስቃሴዎች',
        community: 'የማህበረሰብ አገልግሎት',
        events: 'የናሱ እንቅስቃሴዎች'
      },
      no_results: {
        title: 'ምንም ቪዲዮ አልተገኘም',
        description: 'የፍለጋ ቃላትዎን ወይም የምድብ አጣራሪዎን ያስተካክሉ።',
        clear_filters: 'አጣራሪዎችን ያጽዱ'
      },
      video_count: '{count} ከ {total} ቪዲዮዎች • ለመመልከት ማንኛውንም ቪዲዮ ይጫኑ',
      no_description: 'ምንም መግለጫ አይደለም',
      youtube_channel_button: 'የናሱ ዩቱብ ቻነል ይጎብኙ',
      video_titles: {
        sunday_school_lesson: 'የሰንበት ት/ቤት ትምህርት - የኦርቶዶክስ እምነት',
        youth_ministry: 'የወጣቶች አገልግሎት እንቅስቃሴዎች',
        community_outreach: 'የማህበረሰብ አገልግሎት ፕሮግራም',
        teacher_training: 'የመምህራን ስልጠና ስራ ቤት',
        orthodox_traditions: 'የኦርቶዶክስ ትውፊቶች እና ልማዶች',
        family_faith: 'የቤተሰብ እምነት እድገት',
        annual_conference: 'የናሱ የዓመት ኮንፈረንስ',
        prayer_worship: 'የጸሎት እና የመስገድ መመሪያ',
        children_ministry: 'የልጆች አገልግሎት ምንጮች'
      },
      video_descriptions: {
        sunday_school_lesson: 'በዚህ የሚያሳስብ የሰንበት ት/ቤት ትምህርት ውስጥ የኦርቶዶክስ ክርስቲያናዊ እምነት መሰረታዊ ነገሮችን ይማሩ',
        youth_ministry: 'በናሱ ውስጥ የሚደረጉ አዝናኝ የወጣቶች እንቅስቃሴዎችን እና የመንፈሳዊ እድገት ፕሮግራሞችን ያግኙ',
        community_outreach: 'ናሱ በተለያዩ የማህበራዊ አገልግሎት ተነሳሽነቶች በኩል ማህበረሰብን እንዴት እንደሚያገለግል ይመልከቱ',
        teacher_training: 'ለሰንበት ት/ቤት መምህራን እና በፈቃደኝነት የሚሰሩ ሰዎች የሙያ እድገት ክፍል',
        orthodox_traditions: 'የኦርቶዶክስ ቤተክርስቲያን ባለው ባለ ጥልቀት ትውፊቶች እና ልማዶች ይጎበኙ',
        family_faith: 'የኦርቶዶክስ ልማዶችን በዕለት ተዕለት ሕይወት ውስጥ ለማዋህድ ለቤተሰቦች መመሪያ',
        annual_conference: 'ከተናጋሪዎች እና ከስራ ቤቶች ጋር የሚደረገው የእኛ የዓመት ኮንፈረንስ ዋና ነጥቦች',
        prayer_worship: 'የኦርቶዶክስ የጸሎት ልምዶችን እና የመስገድ ትውፊቶችን ይማሩ',
        children_ministry: 'ለልጆች የኦርቶዶክስ እምነትን ለመማር የሚያገለግሉ የትምህርት ምንጮች እና እንቅስቃሴዎች'
      }
    },
    // Donate page translations - Amharic
    donate_page: {
      title: 'የኦርቶዶክስ ህብረት ሰንበት ት/ቤት ለማገዝ ይለጥፉ',
      subtitle: 'የሚቀጥለውን ትውልድ የኦርቶዶክስ ትምህርት ደግፉ።',
      description: 'የእርስዎ በጎ ልገሳ በሰሜን አሜሪካ ውስጥ ለሚገኙ የሰንበት ት/ቤቶች ጥራት ያለው የኦርቶዶክስ ትምህርት ምንጮችን እና ስልጠናዎችን ለመቀጠል ይረዳናል።',
      select_amount: {
        title: 'የልገሳ መጠን ይምረጡ',
        subtitle: 'የልገሳዎችን መጠን ይምረጡ',
        custom_amount: 'የግል መጠን ያስገቡ',
        custom_placeholder: 'መጠን ያስገቡ',
        valid_amount: '✓ ትክክለኛ መጠን: $',
        invalid_amount: 'እባክዎ ከ$0 በላይ የሆነ ትክክለኛ መጠን ያስገቡ'
      },
      make_donation: {
        title: 'ልገሳ ያድርጉ',
        frequency: 'ድግግሞሽ',
        one_time: 'አንድ ጊዜ',
        monthly: 'ወርሃዊ',
        designation: 'የልገሳ አድራሻ',
        designation_options: {
          general: 'የጥቅም ፈንድ (ትልቁ ፍላጎት)',
          curriculum: 'የኩርክዮሎም እድገት',
          teacher_training: 'የመምህራን ስልጠና ፕሮግራሞች',
          technology: 'ዲጂታል ምንጮች እና ቴክኖሎጂ',
          scholarship: 'የወጣቶች ስኮላርሺፖች'
        },
        note: 'ማስታወሻ (አማራጭ)',
        note_placeholder: 'ከልገሳዎ ጋር የግል ማስታወሻ ያክሉ'
      },
      payment_methods: {
        paypal: 'ፔይፓል',
        bank_transfer: 'የባንክ ማስተላለፊያ',
        zelle: 'ዘሌ',
        credit_card: 'የክሬዲት ካርድ'
      },
      validation: {
        enter_custom_amount: 'እባክዎ የግል መጠን ያስገቡ',
        enter_valid_amount: 'ልገሳዎችን ለመቀጠል ከላይ ትክክለኛ መጠን ያስገቡ።'
      },
      zelle: {
        title: 'በዘሌ ይላኩ',
        subtitle: 'የልገሳዎችን ወደዚህ ያስተላልፉ:',
        email: 'Nassupay@gmail.com',
        copy_email: 'ኢሜይል ያውዱ',
        email_copied: '✓ ኢሜይል ተወድዷል!',
        email_copied_desc: 'የልገሳዎችን ለመጨረስ ዘሌ መተግበሪያዎ ውስጥ ያስገቡት።',
        important: 'አስፈላጊ: በክፍያ ማስታወሻ/ማስታወሻ ውስጥ ስምዎን እና ኢሜይልዎን ያካትቱ።',
        confirmation: 'የልገሳዎችን ካደረግን በኋላ በ24-48 ሰዓታት ውስጥ የማረጋገጫ ኢሜይል ያገኛሉ።',
        secure_title: 'ደህንነቱ የተጠበቀ እና ቀላል ልገሳ',
        secure_desc: 'የልገሳዎች የሚደረገው በዘሌ የተጠበቀ የክፍያ አውታረመረብ በኩል በደህንነት ይሰራል። የመለያ ምዝገባ አያስፈልግም።'
      },
      impact: {
        title: 'የእርስዎ ተጽዕኖ',
        amount_25: '$25 የሚያቀርበው:',
        amount_25_items: [
          'ለአንድ የሰንበት ት/ቤት መምህር የስልጠና ቁሳቁሶች',
          'ለ5 ተማሪዎች የትምህርት ምንጮች'
        ],
        amount_50: '$50 የሚያቀርበው:',
        amount_50_items: [
          'ለአንድ ክፍል ሙሉ የኩርክዮሎም ኪት',
          'ለሁለት መምህራን ወርክሾፖች ለመገኘት ስኮላርሺፖች'
        ],
        amount_100: '$100 የሚያቀርበው:',
        amount_100_items: [
          'ለሙሉ ቤተክርስቲያን ዲጂታል ምንጮች',
          'ለክልላዊ የመምህራን ስልጠና ክስተቶች ቁሳቁሶች',
          'ለወጣት ካምፕ ተሳታፊዎች ስኮላርሺፖች'
        ],
        amount_250: '$250+ የሚያቀርበው:',
        amount_250_items: [
          'ለትንሽ ቤተክርስቲያን ሙሉ የሰንበት ት/ቤት ፕሮግራም ድጋፍ',
          'የአዲስ ኩርክዮሎም ቁሳቁሶች እድገት',
          'የዲጂታል ምንጮች ለመላክ ቴክኖሎጂ ዓመት'
        ],
        tax_deductible: 'ናሱ የ501(c)(3) ለትርፍ ያልተቋቋመ ድርጅት ነው። የልገሳዎች በህግ የተፈቀደ መጠን ውስጥ ከግብር ይቀንሳል።'
      },
      success: {
        title: 'ልገሳዎን ስላደረጉ እናመሰግናለን!',
        description: 'የልገሳዎች የኦርቶዶክስ ሰንበት ት/ቤት ትምህርትን ያደጋል።',
        error_title: 'የልገሳ ማደረጊያ ስህተት',
        error_description: 'የክፍያዎች ተሰራ ነበር ነገር ግን ማስታወስ አልተቻለም። እባክዎ ድጋፍ ያግኙ።',
        payment_failed: 'ክፍያ አልተሳካ ም',
        payment_error: 'በክፍያ ማደረጊያ ሂደት ውስጥ ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።'
      }
    },
    admin_page: {
      title: 'የአስተዳደር መዳረሻ',
      subtitle: 'የአስተዳደር ዳሽቦርድ ለመድረስ ይግቡ',
      admin_access: 'የአስተዳደር መዳረሻ',
      sign_in_dashboard: 'የአስተዳደር ዳሽቦርድ ለመድረስ ይግቡ',
      back_to_main: '← ወደ ዋና ጣቢያ ይመለሱ',
      admin_email: 'የአስተዳደር ኢሜይል',
      admin_password: 'የአስተዳደር ይለፍ ቃል',
      email_placeholder: 'admin@nassu.org',
      access_dashboard: 'የአስተዳደር ዳሽቦርድ ያግኙ',
      authenticating: 'የሚሰራጭ...',
      authorized_only: 'ይህን አካባቢ የሚያገኙ የሚያውቁ አስተዳደሮች ብቻ ናቸው!',
      validation: {
        enter_both: 'እባክዎ ኢሜይል እና ይለፍ ቃል ያስገቡ',
        invalid_credentials: 'ልክ ያልሆነ ኢሜይል ወይም ይለፍ ቃል',
        too_many_attempts: 'በጣም ብዙ ያልተሳካ ሙከራዎች። እባክዎ በኋላ ይሞክሩ።',
        general_error: 'በግብይት ሂደት ውስጥ ስህተት ተከስቷል'
      },
      access_denied: 'መዳረሻ ተከልዷል',
      no_admin_privileges: 'የአስተዳደር መብቶች የሉዎትም።',
      login_successful: 'ግብይቱ ተሳክቷል',
      redirecting_dashboard: 'ወደ የአስተዳደር ዳሽቦርድ ይዛወራል...',
      login_failed: 'ግብይቱ አልተሳካም'
    },
    admin_dashboard: {
      title: 'የአስተዳደር ዳሽቦርድ',
      welcome_back: 'እንኳን ደህና መጡ፣ {email}',
      settings: 'ቅንብሮች',
      sign_out: 'ይውጡ',
      loading_dashboard: 'ዳሽቦርድ እያጫወተ ነው...',
      stats: {
        total_users: 'ጠቅላላ ተጠቃሚዎች',
        active_users: 'ንቁ ተጠቃሚዎች',
        donations: 'ልገሳዎች',
        pending: 'በጥበቃ ላይ',
        monthly_goal: 'ወርሃዊ ግብ',
        target: 'ዓላማ: {amount}',
        recent_activity: 'የቅርብ ጊዜ እንቅስቃሴ',
        activities_today: 'ዛሬ ያሉ እንቅስቃሴዎች'
      },
      recent_users: {
        title: 'የቅርብ ጊዜ ተጠቃሚዎች',
        description: 'የቅርብ ጊዜ የተቀበሉ ልገሳዎች',
        view_all_users: 'ሁሉንም ልገሳዎች ይመልከቱ',
        role: {
          admin: 'አስተዳደር',
          editor: 'አዘራጫ',
          viewer: 'ደጋፊ'
        },
        status: {
          active: 'ንቁ',
          inactive: 'ንቁ አይደለም'
        }
      },
      recent_donations: {
        title: 'የቅርብ ጊዜ ልገሳዎች',
        description: 'የቅርብ ጊዜ የተቀበሉ ልገሳዎች',
        view_all_donations: 'ሁሉንም ልገሳዎች ይመልከቱ',
        status: {
          completed: 'ተጠናቅቋል',
          pending: 'በጥበቃ ላይ'
        }
      },
      recent_activity: {
        title: 'የቅርብ ጊዜ እንቅስቃሴ',
        description: 'በስርዓቱ ውስጥ ያሉ የቅርብ ጊዜ እንቅስቃሴዎች',
        loading_activities: 'እንቅስቃሴዎች እያጫወቱ ናቸው...',
        no_activities: 'የቅርብ ጊዜ እንቅስቃሴዎች የሉም።',
        failed_to_load: 'የእንቅስቃሴ መዝገቦች ማጫወት አልተሳካም',
        unknown_user: 'ያልታወቀ'
      },
      error_messages: {
        access_denied: 'መዳረሻ ተከልዷል',
        no_permission: 'የአስተዳደር ዳሽቦርድ ለመድረስ ፈቃድ የለዎትም።',
        failed_to_load_data: 'የዳሽቦርድ ዳሰሳ ማጫወት አልተሳካም'
      }
    },
    login_page: {
      title: 'እንኳን ደህና መጡ!',
      subtitle: 'የሚቀጥል ለመሆን ይግቡ:',
      email: 'ኢሜይል',
      password: 'ይለፍ ቃል',
      forgot_password: 'ይለፍ ቃል ረሳዎት?',
      sign_in: 'ይግቡ',
      signing_in: 'የሚገባ ነው...',
      or_continue_with: 'ወይም ይቀጥሉ:',
      continue_with_google: 'በ Google ይቀጥሉ',
      continue_with_apple: 'በ Apple ይቀጥሉ',
      no_account: 'መለያ የለዎትም?',
      sign_up: 'ይመዝገቡ',
      terms_and_privacy: 'በመግቢያ ላይ፣ የእኛን {terms} እና {privacy} እንደምትስማሙ ያረጋግጣሉ',
      terms: 'የአገልግሎት ውል',
      privacy: 'የግል መረጃ ፖሊሲ',
      // Password reset form
      reset_password: 'ይለፍ ቃል ዳግም ያዘዝ',
      enter_email_for_reset: 'የእርስዎን የኢሜይል አድራሻ ያስገቡ እና ይለፍ ቃልዎን ለመዳገም አገናኝ እንልካለን።',
      your_email_placeholder: 'your@email.com',
      send_reset_link: 'ዳግም የማዘዝ አገናኝ ላክ',
      sending: 'የሚልክ ነው...',
      back_to_login: 'ወደ ግብይት ይመለሱ',
      // Form validation and messages
      error: 'ስህተት',
      success: 'ተሳክቷል',
      email_required: 'ኢሜይል ያስፈልጋል',
      please_fill_fields: 'እባክዎ ሁሉንም መስኮች ያስገቡ',
      logged_in_successfully: 'በተሳካ ገብተዋል!',
      login_failed: 'ግብይቱ አልተሳካም',
      failed_to_sign_in: 'መግቢያ አልተሳካም',
      logged_in_with_google: 'በ Google በተሳካ ገብተዋል!',
      failed_google_sign_in: 'በ Google መግቢያ አልተሳካም',
      logged_in_with_apple: 'በ Apple በተሳካ ገብተዋል!',
      failed_apple_sign_in: 'በ Apple መግቢያ አልተሳካም',
      password_reset_sent: 'የይለፍ ቃል ዳግም የማዘዝ ኢሜይል ተልኳል። እባክዎ የግብይት ሳጥንዎን ያረጋግጡ።',
      failed_to_send_reset: 'የዳግም የማዘዝ ኢሜይል ማስተላለፍ አልተሳካም',
      name_email_placeholder: 'name@example.com'
    },
    signup_page: {
      title: 'መለያዎን ይፍጠሩ',
      subtitle: 'ዛሬ በማህበራችን ውስጥ ይቀላቀሉ',
      first_name: 'የመጀመሪያ ስም',
      last_name: 'የመጨረሻ ስም',
      email_address: 'የኢሜይል አድራሻ',
      password: 'ይለፍ ቃል',
      confirm_password: 'ይለፍ ቃል ያረጋግጡ',
      sign_up: 'ይመዝገቡ',
      creating_account: 'መለያ የሚፈጥር ነው...',
      or_continue_with: 'ወይም ይቀጥሉ',
      continue_with_google: 'በ Google ይቀጥሉ',
      continue_with_apple: 'በ Apple ይቀጥሉ',
      already_have_account: 'መለያ አለዎት?',
      sign_in: 'ይግቡ',
      terms_privacy_text: 'በመመዝገብ ላይ፣ የእኛን {terms} እና {privacy} እንደምትስማሙ ያረጋግጣሉ።',
      terms: 'ውል',
      privacy: 'የግል መረጃ ፖሊሲ',
      // Form validation and messages
      passwords_not_match: 'ይለፍ ቃሎች አይጣጣሙም',
      sign_up_successful: 'መመዝገብ ተሳክቷል',
      verification_email_sent: 'የማረጋገጫ ኢሜይል ወደ {email} ተልኳል።',
      verify_email_before_login: 'እባክዎ ከመግቢያ በፊት ኢሜይልዎን ያረጋግጡ።',
      sign_up_failed: 'መመዝገብ አልተሳካም',
      sign_up_error: 'የመመዝገብ ስህተት',
      account_created_successfully: 'መለያ በተሳካ ተፈጥሯል',
      account_created: 'መለያ ተፈጥሯል',
      google_sign_up_failed: 'በ Google መመዝገብ አልተሳካም',
      // Placeholders
      first_name_placeholder: 'ዮሐንስ',
      last_name_placeholder: 'ዶው',
      email_placeholder: 'your@email.com',
      password_placeholder: '••••••••'
    }
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
