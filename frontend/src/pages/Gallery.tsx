
import { useState } from "react";
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImageItem {
  url: string;
  title: string;
  description: string;
}

const Gallery = () => {
  const { t } = useLanguage();
  const [openImage, setOpenImage] = useState<ImageItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const images = [
    {
      url: "images/photo_2024-02-02_15-42-04.jpg",
      title: t('gallery_page.image_titles.church_exterior'),
      description: t('gallery_page.image_descriptions.church_exterior')
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
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new2.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new11.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new12.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new13.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new14.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new15.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new16.jpeg",
      title: t('gallery_page.image_titles.community_outreach'),
      description: t('gallery_page.image_descriptions.community_outreach')
    },
    {
      url: "images/new17.jpeg",
      title: t('gallery_page.image_titles.nassu_events'),
      description: ""
    },
    {
      url: "images/new18.jpeg",
      title: t('gallery_page.image_titles.nassu_events'),
      description: ""
    },
    {
      url: "images/new19.jpeg",
      title: t('gallery_page.image_titles.nassu_events'),
      description: ""
    },
    {
      url: "images/new20.jpeg",
      title: t('gallery_page.image_titles.nassu_events'),
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
      url: "images/v1.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v2.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v3.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v4.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v5.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v6.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v7.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v8.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v9.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v10.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v11.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v12.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v13.png",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v14.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v15.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/v16.jpg",
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
    },
    {
      url: "images/x22.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x23.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x24.jpg",
      title: "NASSU Events",
      description: ""
    },
    {
      url: "images/x25.jpg",
      title: "NASSU Events",
      description: ""
    }
  ];

  return (
    <>
      <PageHeader title={t('gallery_page.title')} background="">
        <p className="text-lg text-gray-100 font-light">{t('gallery_page.subtitle')}</p>
      </PageHeader>
      
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              {t('gallery_page.section_title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {t('gallery_page.section_description')}
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={t('gallery_page.search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm cursor-pointer"
              >
                <option value="all">{t('gallery_page.categories.all')}</option>
                <option value="church">{t('gallery_page.categories.church')}</option>
                <option value="sunday_school">{t('gallery_page.categories.sunday_school')}</option>
                <option value="youth">{t('gallery_page.categories.youth')}</option>
                <option value="community">{t('gallery_page.categories.community')}</option>
                <option value="events">{t('gallery_page.categories.events')}</option>
              </select>
            </div>
          </div>
          
          {(() => {
            const filteredImages = images.filter((image) => {
              const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  image.description.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesCategory = selectedCategory === "all" || 
                                    (selectedCategory === "church" && image.title.includes("Church")) ||
                                    (selectedCategory === "sunday_school" && image.title.includes("Sunday School")) ||
                                    (selectedCategory === "youth" && image.title.includes("Youth")) ||
                                    (selectedCategory === "community" && image.title.includes("Community")) ||
                                    (selectedCategory === "events" && image.title.includes("NASSU Events"));
              return matchesSearch && matchesCategory;
            });

            if (filteredImages.length === 0) {
                             return (
                 <div className="text-center py-16">
                   <div className="max-w-md mx-auto">
                     <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                       <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                       </svg>
                     </div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('gallery_page.no_results.title')}</h3>
                     <p className="text-gray-600 mb-4">{t('gallery_page.no_results.description')}</p>
                     <button
                       onClick={() => {
                         setSearchTerm("");
                         setSelectedCategory("all");
                       }}
                       className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                     >
                       {t('gallery_page.no_results.clear_filters')}
                     </button>
                   </div>
                 </div>
               );
            }

                          return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map((image, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white border-0 rounded-xl transform hover:-translate-y-1"
                    onClick={() => setOpenImage(image)}
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                        <h3 className="text-white font-serif font-bold text-lg mb-2 drop-shadow-lg">{image.title}</h3>
                        {image.description && (
                          <p className="text-white/90 text-sm leading-relaxed drop-shadow-lg line-clamp-2">{image.description}</p>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-xs font-medium text-gray-700">#{index + 1}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            );
          })()}
          
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm">
              {(() => {
                const filteredImages = images.filter((image) => {
                  const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                      image.description.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCategory = selectedCategory === "all" || 
                                        (selectedCategory === "church" && image.title.includes("Church")) ||
                                        (selectedCategory === "sunday_school" && image.title.includes("Sunday School")) ||
                                        (selectedCategory === "youth" && image.title.includes("Youth")) ||
                                        (selectedCategory === "community" && image.title.includes("Community")) ||
                                        (selectedCategory === "events" && image.title.includes("NASSU Events"));
                  return matchesSearch && matchesCategory;
                });
                return t('gallery_page.photo_count', { 
                  filtered: filteredImages.length, 
                  total: images.length 
                });
              })()}
            </p>
          </div>
        </div>
      </section>

      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <button 
              className="absolute top-6 right-6 z-20 bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/90 transition-all duration-300 hover:scale-110 shadow-lg"
              onClick={() => setOpenImage(null)}
            >
              <X className="text-white" size={24} />
            </button>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8">
                <img 
                  src={openImage?.url} 
                  alt={openImage?.title} 
                  className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                />
              </div>
              <div className="p-8 bg-white">
                <h3 className="font-serif text-3xl font-bold mb-4 text-gray-900">{openImage?.title}</h3>
                {openImage?.description && (
                  <p className="text-gray-600 text-lg leading-relaxed">{openImage?.description}</p>
                )}
                {!openImage?.description && (
                  <p className="text-gray-400 italic">{t('gallery_page.no_description')}</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;