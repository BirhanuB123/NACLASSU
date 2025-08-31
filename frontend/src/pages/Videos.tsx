import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Play, X, Search, Filter, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from '@/components/PageHeader';

interface VideoItem {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
}

const Videos: React.FC = () => {
  const { t } = useLanguage();
  const [openVideo, setOpenVideo] = useState<VideoItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const videos: VideoItem[] = [
    {
      url: "https://www.youtube.com/watch?v=Z8IfciRBjy0",
      title: t('videos_page.video_titles.sunday_school_lesson'),
      description: t('videos_page.video_descriptions.sunday_school_lesson'),
      thumbnail: "https://img.youtube.com/vi/Z8IfciRBjy0/maxresdefault.jpg",
      videoId: "Z8IfciRBjy0"
    },
    {
      url: "https://www.youtube.com/watch?v=Ffg4jWnW41g",
      title: t('videos_page.video_titles.youth_ministry'), 
      description: t('videos_page.video_descriptions.youth_ministry'),
      thumbnail: "https://img.youtube.com/vi/Ffg4jWnW41g/maxresdefault.jpg",
      videoId: "Ffg4jWnW41g"
    },
    {
      url: "https://www.youtube.com/watch?v=nQoSa6Oa-hg",
      title: t('videos_page.video_titles.community_outreach'),
      description: t('videos_page.video_descriptions.community_outreach'), 
      thumbnail: "https://img.youtube.com/vi/EJHQYkBCJpE/maxresdefault.jpg",
      videoId: "nQoSa6Oa-hg"
    },
    {
      url: "https://www.youtube.com/watch?v=jnfpr3zIV48",
      title: t('videos_page.video_titles.teacher_training'),
      description: t('videos_page.video_descriptions.teacher_training'),
      thumbnail: "https://img.youtube.com/vi/jnfpr3zIV48/maxresdefault.jpg", 
      videoId: "jnfpr3zIV48"
    },
    {
      url: "https://www.youtube.com/watch?v=t9XfIPS4bi0",
      title: t('videos_page.video_titles.orthodox_traditions'),
      description: t('videos_page.video_descriptions.orthodox_traditions'),
      thumbnail: "https://img.youtube.com/vi/t9XfIPS4bi0/maxresdefault.jpg",
      videoId: "t9XfIPS4bi0"
    },
    {
      url: "https://www.youtube.com/watch?v=lm-Yw7nXHR8", 
      title: t('videos_page.video_titles.family_faith'),
      description: t('videos_page.video_descriptions.family_faith'),
      thumbnail: "https://img.youtube.com/vi/lm-Yw7nXHR8/maxresdefault.jpg",
      videoId: "lm-Yw7nXHR8"
    },
    {
      url: "https://www.youtube.com/watch?v=4W0-ozfV5_k",
      title: t('videos_page.video_titles.annual_conference'),
      description: t('videos_page.video_descriptions.annual_conference'),
      thumbnail: "https://img.youtube.com/vi/4W0-ozfV5_k/maxresdefault.jpg",
      videoId: "4W0-ozfV5_k"
    },
    {
      url: "https://www.youtube.com/watch?v=2or4NQ08WhA",
      title: t('videos_page.video_titles.prayer_worship'), 
      description: t('videos_page.video_descriptions.prayer_worship'),
      thumbnail: "https://img.youtube.com/vi/2or4NQ08WhA/maxresdefault.jpg",
      videoId: "2or4NQ08WhA"
    },
    {
      url: "https://www.youtube.com/watch?v=EJHQYkBCJpE",
      title: t('videos_page.video_titles.children_ministry'),
      description: t('videos_page.video_descriptions.children_ministry'),
      thumbnail: "https://img.youtube.com/vi/EJHQYkBCJpE/maxresdefault.jpg",
      videoId: "EJHQYkBCJpE"
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <PageHeader title={t('videos_page.title')}>
        <p className="text-lg text-gray-100 font-light">{t('videos_page.subtitle')}</p>
      </PageHeader>
      
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {t('videos_page.section_title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('videos_page.section_description')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('videos_page.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="all">{t('videos_page.categories.all')}</option>
              <option value="church">{t('videos_page.categories.church')}</option>
              <option value="sunday_school">{t('videos_page.categories.sunday_school')}</option>
              <option value="youth">{t('videos_page.categories.youth')}</option>
              <option value="community">{t('videos_page.categories.community')}</option>
              <option value="events">{t('videos_page.categories.events')}</option>
            </select>
          </div>

          {/* No Results Message */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('videos_page.no_results.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('videos_page.no_results.description')}
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                {t('videos_page.no_results.clear_filters')}
              </button>
            </div>
          )}

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.videoId}
                className="shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white border-0 rounded-xl transform hover:-translate-y-1 overflow-hidden"
                onClick={() => setOpenVideo(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const currentSrc = target.src;
                      
                      // Try different thumbnail qualities as fallbacks
                      if (currentSrc.includes('maxresdefault.jpg')) {
                        target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      } else if (currentSrc.includes('hqdefault.jpg')) {
                        target.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
                      } else if (currentSrc.includes('mqdefault.jpg')) {
                        target.src = `https://img.youtube.com/vi/${video.videoId}/sddefault.jpg`;
                      } else if (currentSrc.includes('sddefault.jpg')) {
                        target.src = `https://img.youtube.com/vi/${video.videoId}/default.jpg`;
                      } else if (currentSrc.includes('default.jpg')) {
                        target.src = `https://img.youtube.com/vi/${video.videoId}/0.jpg`;
                      } else {
                        // Final fallback to placeholder
                        target.src = '/placeholder.svg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    #{index + 1}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Video Count */}
          <div className="text-center text-gray-600 mb-8">
            {t('videos_page.video_count', { count: filteredVideos.length, total: videos.length })}
          </div>

          {/* NASSU YouTube Channel Button */}
          <div className="text-center">
            <a
              href="https://www.youtube.com/@eotcnassumedia6934"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-lg font-semibold">
                {t('videos_page.youtube_channel_button')}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          <button
            onClick={() => setOpenVideo(null)}
            className="absolute top-6 right-6 z-20 bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/90 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="bg-gradient-to-br from-gray-900 to-black p-8">
            <div className="aspect-video w-full">
              {openVideo && (
                <iframe
                  src={`https://www.youtube.com/embed/${openVideo.videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&fs=1`}
                  title={openVideo.title}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                  onError={() => {
                    console.error('Failed to load YouTube video');
                  }}
                />
              )}
            </div>
          </div>
          
          <div className="p-8 bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {openVideo?.title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {openVideo?.description || t('videos_page.no_description')}
            </p>
            {openVideo && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  If the video doesn't load, you can watch it directly on{' '}
                  <a 
                    href={openVideo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-900"
                  >
                    YouTube
                  </a>
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos;
