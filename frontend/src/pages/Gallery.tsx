import { useState, useEffect } from "react";
import { useLanguage } from '@/context/LanguageContext';
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Search, Loader2, Image as ImageIcon } from "lucide-react";
import axios from "axios";

interface PhotoItem {
  _id?: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Gallery = () => {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openImage, setOpenImage] = useState<PhotoItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let res;
        try {
          res = await axios.get(`${API_BASE_URL}/photos`);
        } catch (initialErr) {
          // If direct API_BASE_URL failed and was absolute, try relative proxy endpoint /api/photos
          if (API_BASE_URL.startsWith('http')) {
            console.warn('Direct API URL failed, falling back to Vite proxy /api/photos:', initialErr);
            res = await axios.get('/api/photos');
          } else {
            throw initialErr;
          }
        }

        if (isMounted && res?.data) {
          if (res.data?.success && Array.isArray(res.data.data)) {
            setPhotos(res.data.data);
          } else if (Array.isArray(res.data)) {
            setPhotos(res.data);
          }
        }
      } catch (err: any) {
        console.error("Failed to load gallery photos:", err?.response?.data || err?.message || err);
        if (isMounted) {
          const errMsg = err?.response?.data?.error?.message || err?.message || "Failed to load photos from cloud storage.";
          setError(`Error connecting to server (${errMsg}). Ensure backend server is running on port 5000.`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredImages = photos.filter((image) => {
    const matchesSearch =
      (image.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (image.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (image.category || "").toLowerCase() === selectedCategory.toLowerCase() ||
      (image.title || "").toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHeader
        title={t('gallery_page.title')}
        description={t('gallery_page.subtitle')}
        showActions={false}
      />

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              {t('gallery_page.section_title')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed font-light">
              {t('gallery_page.section_description')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t('gallery_page.search_placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">{t('gallery_page.categories.all')}</option>
              <option value="church">{t('gallery_page.categories.church')}</option>
              <option value="sunday_school">{t('gallery_page.categories.sunday_school')}</option>
              <option value="youth">{t('gallery_page.categories.youth')}</option>
              <option value="community">{t('gallery_page.categories.community')}</option>
              <option value="events">{t('gallery_page.categories.events')}</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-amber-600 animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Loading gallery photos from cloud...</p>
            </div>
          )}

          {/* Error / Empty State */}
          {!loading && error && (
            <div className="text-center py-12 bg-amber-50 rounded-2xl border border-amber-200 max-w-md mx-auto">
              <p className="text-amber-800 font-medium mb-2">{error}</p>
              <p className="text-amber-600 text-sm">Please check your backend connection or run the migration script.</p>
            </div>
          )}

          {!loading && !error && filteredImages.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">{t('gallery_page.no_photos_found') || 'No photos found'}</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or category filter.</p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && filteredImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <Card
                  key={image._id || `${image.url}-${index}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer border-0 bg-white"
                  onClick={() => setOpenImage(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="font-serif text-xl font-bold text-white mb-2 leading-tight">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-gray-200 text-sm line-clamp-2 leading-relaxed">
                          {image.description}
                        </p>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs font-medium text-gray-700">#{index + 1}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredImages.length > 0 && (
            <div className="text-center mt-16">
              <p className="text-gray-500 text-sm">
                {t('gallery_page.photo_count', {
                  filtered: filteredImages.length,
                  total: photos.length,
                })}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
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
                <h3 className="font-serif text-3xl font-bold mb-4 text-gray-900">
                  {openImage?.title}
                </h3>
                {openImage?.description ? (
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {openImage.description}
                  </p>
                ) : (
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