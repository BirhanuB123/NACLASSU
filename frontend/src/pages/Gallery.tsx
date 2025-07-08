
import { useState } from "react";
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";



const Gallery = () => {
  const { t } = useLanguage();
  const [openImage, setOpenImage] = useState(null);

  const images = [
    {
      url: "images/photo_2024-02-02_15-42-04.jpg",
      title: "Church Exterior",
      description: "A beautiful Orthodox church exterior."
    },
    {
      url: "images/photo_2024-02-02_15-42-08.jpg",
      title: t('gallery_church_interior'), // add 'gallery_church_interior' to translations
      description: t('gallery_church_interior_desc') // add 'gallery_church_interior_desc' to translations
    },
    {
      url: "images/photo_2024-02-02_15-42-20.jpg",
      title: t('gallery_sunday_school_class'), // add 'gallery_sunday_school_class' to translations
      description: t('gallery_sunday_school_class_desc') // add 'gallery_sunday_school_class_desc' to translations
    },
    {
      url: "images/photo_2024-02-02_15-42-28.jpg",
      title: t('gallery_teacher_workshop'), // add 'gallery_teacher_workshop' to translations
      description: t('gallery_teacher_workshop_desc') // add 'gallery_teacher_workshop_desc' to translations
    },
    {
      url: "images/photo_2024-02-02_15-42-33.jpg",
      title: t('gallery_youth_camp'), // add 'gallery_youth_camp' to translations
      description: t('gallery_youth_camp_desc') // add 'gallery_youth_camp_desc' to translations
    },
    {
      url: "images/2.jpg",
      title: t('gallery_youth_camp'),
      description: t('gallery_youth_camp_desc')
    },
    {
      url: "images/3.jpg",
      title: t('gallery_teacher_workshop'),
      description: t('gallery_teacher_workshop_desc')
    },
    {
      url: "images/new1.jpeg",
      title: t('gallery_community_outreach'), // add 'gallery_community_outreach' to translations
      description: t('gallery_community_outreach_desc') // add 'gallery_community_outreach_desc' to translations
    },
    {
      url: "images/new6.jpeg",
      title: t('gallery_community_outreach'),
      description: t('gallery_community_outreach_desc')
    },
    {
      url: "images/new3.jpeg",
      title: t('gallery_community_outreach'),
      description: t('gallery_community_outreach_desc')
    },
    {
      url: "images/new10.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new2.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new11.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new12.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new13.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new14.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new15.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new16.jpeg",
      title: "Community Outreach",
      description: "NASSU volunteers participating in community service"
    },
    {
      url: "images/new17.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new18.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new19.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new20.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new21.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new22.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new23.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new24.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new25.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new26.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new27.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new28.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new29.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new30.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new31.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new32.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new33.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new34.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new35.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new45.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new36.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new37.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new38.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new39.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new40.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new41.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new42.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new43.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new44.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new46.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new47.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new48.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new49.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new50.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new51.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new52.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new53.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new54.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new55.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new56.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new57.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new58.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new59.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new60.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new61.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new62.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new63.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new64.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new65.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new66.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new67.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new68.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new69.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new70.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new71.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new72.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new73.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new74.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new75.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new76.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new77.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new78.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new79.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new80.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new81.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new82.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new83.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new84.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new85.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new86.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new87.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new88.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new89.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new90.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new91.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new92.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new93.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new94.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new95.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new96.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new97.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new98.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new99.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new100.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new101.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new102.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new103.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new104.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new105.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/new106.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/1a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/2a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/3a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/4a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/5a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/6a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/7a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/8a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/9a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/10a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/11a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/12a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/13a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/14a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/15a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/16a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/17a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/18a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/19a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/20a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/21a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/22a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/23a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/24a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/25a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/26a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/27a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/28a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/29a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/30a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/31a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/32a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/33a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/34a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/35a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/36a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/37a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/38a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/39a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/40a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/41a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/42a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/43a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/44a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/45a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/46a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/47a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/48a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/49a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/50a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/51a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/52a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/53a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/54a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/55a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/56a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/57a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/58a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/59a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/60a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/61a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/62a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/63a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/64a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/65a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/66a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/67a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/68a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/69a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/70a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/71a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/72a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/73a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/74a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/75a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/b.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/4.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/5.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/6.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/7.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/8.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/9.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/10.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/11.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/12.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/13.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/14.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/15.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/16.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/17.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/18.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/19.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/20.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/21.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/22.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/23.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/24.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/25.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/26.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/76a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/77a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/78a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/79a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/80a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/81a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/82a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/83a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/84a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/85a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/86a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/87a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/88a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/89a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/90a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/91a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/92a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/93a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/94a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/95a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/96a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/97a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/98a.jpg",
      title: "NASSU Events",
      description: ""
    }
    ,
    {
      url: "images/99a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/100a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/101a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/102a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/103a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/104a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/105a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/106a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/107a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/108a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/109a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/110a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/111a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/112a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/113a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/114a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/115a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/116a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/117a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/118a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/119a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/120a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/121a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/122a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/123a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/124a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/125a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/126a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/127a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/128a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/129a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/130a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/131a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/132a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/133a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/134a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/135a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/136a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/137a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/138a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/139a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/140a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/141a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/142a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/143a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/144a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/145a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/146a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/147a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/148a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/149a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/150a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/151a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/152a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/153a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/154a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/155a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/156a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/157a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/158a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/159a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/160a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/161a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/162a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/163a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/164a.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/165a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/166a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/167a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/168a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/169a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/170a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/171a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/172a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/173a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/174a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/175a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/176a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/177a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/178a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/179a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/180a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/181a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/182a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/183a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/184a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/185a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/186a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/187a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/188a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/189a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/190a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/191a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/192a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/193a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/194a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/195a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/196a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/197a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/198a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/199a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/200a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/201a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/202a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/203a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/204a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/205a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/206a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/207a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/208a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/209a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/210a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/211a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/212a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/213a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/214a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/215a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/216a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/217a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/218a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/219a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/220a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/221a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/222a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/223a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/224a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/225a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/226a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/227a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/228a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/229a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/230a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/231a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/232a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/233a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/234a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/235a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/236a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/237a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/238a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/239a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/240a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/241a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/242a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/243a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/244a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/245a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/246a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/247a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/248a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/249a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/250a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/251a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/252a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/253a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/254a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/255a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/256a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/257a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/258a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/259a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/260a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/261a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/262a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/263a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/264a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/265a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/266a.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x1.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x2.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x3.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x4.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x5.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x6.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x7.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x8.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x9.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x10.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x11.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x12.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x13.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x14.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x15.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x16.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x17.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x18.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x19.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x20.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x21.jpeg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x1.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x2.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x3.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x4.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x5.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x6.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x7.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x8.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x9.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x10.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x11.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x12.jpg",
      title: "NASSU Events",
      description: ""
    }
  ];

  return (
    <>
      <PageHeader title="Photo Gallery" background="">
        <p className="text-lg text-gray-100">Images from our EOTC NASSU community and events</p>
      </PageHeader>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Our Orthodox Community</h2>
            <p className="text-lg text-gray-700">
              Explore images from Sunday School classes, teacher workshops, youth events, and more from the North America Sunday School Union community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => setOpenImage(image)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-serif font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <button 
              className="absolute top-4 right-4 z-10 bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors"
              onClick={() => setOpenImage(null)}
            >
              <X className="text-white" size={20} />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={openImage?.url} 
                alt={openImage?.title} 
                className="w-full h-auto max-h-[70vh] object-contain bg-black"
              />
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold mb-2">{openImage?.title}</h3>
                <p className="text-gray-700">{openImage?.description}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
