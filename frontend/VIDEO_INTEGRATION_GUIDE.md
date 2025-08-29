# NASSU Gallery Video Integration Guide

## Overview
This guide explains how to update the gallery page with actual YouTube videos from the NASSU YouTube channel.

## Current Implementation
The gallery page now supports both images and videos with the following features:
- **Tab Navigation**: Switch between All Media, Videos, and Images
- **Video Thumbnails**: Display video thumbnails with play buttons
- **YouTube Integration**: Click videos to open them on YouTube
- **Video Metadata**: Show duration, views, and publication date
- **YouTube Icon**: Red YouTube icon on video thumbnails
- **Channel Link**: Button to visit the NASSU YouTube channel

## How to Update with Real Videos

### 1. Find NASSU YouTube Videos
Visit the NASSU YouTube channel: https://www.youtube.com/@eotcnassumedia6934

### 2. Extract Video Information
For each video you want to add, collect:
- **Video ID**: The part after `v=` in the YouTube URL
- **Title**: Video title
- **Description**: Brief description of the video content
- **Duration**: Video length (e.g., "5:32")
- **Views**: Number of views (e.g., "1.2K")
- **Published Date**: When the video was published

### 3. Update Video Data
Edit `frontend/src/data/galleryVideos.ts` and replace the placeholder content:

```typescript
{
  id: "unique-video-id",
  title: "Actual Video Title",
  description: "Real description of the video content",
  thumbnail: "https://img.youtube.com/vi/ACTUAL_VIDEO_ID/maxresdefault.jpg",
  youtubeUrl: "https://www.youtube.com/watch?v=ACTUAL_VIDEO_ID",
  duration: "5:32",
  views: "1.2K",
  publishedDate: "2024-01-15",
  aspectRatio: 16/9
}
```

### 4. Thumbnail URLs
YouTube automatically generates thumbnails. Use this format:
- **High Quality**: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`
- **Medium Quality**: `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`
- **Standard Quality**: `https://img.youtube.com/vi/VIDEO_ID/sddefault.jpg`

### 5. Recommended Video Categories
Based on NASSU's mission, consider adding videos about:
- Sunday School lessons and curriculum
- Orthodox Church traditions and teachings
- Youth activities and camps
- Teacher training and workshops
- Community events and celebrations
- Orthodox hymns and worship
- Parent engagement and family activities
- Orthodox calendar and feast days

## Example of Real Video Integration

```typescript
{
  id: "nassu-sunday-school-2024",
  title: "Sunday School Lesson: The Orthodox Way of Life",
  description: "Join us for an engaging Sunday School lesson about living according to Orthodox Christian principles",
  thumbnail: "https://img.youtube.com/vi/REAL_VIDEO_ID_HERE/maxresdefault.jpg",
  youtubeUrl: "https://www.youtube.com/watch?v=REAL_VIDEO_ID_HERE",
  duration: "18:45",
  views: "2.3K",
  publishedDate: "2024-02-20",
  aspectRatio: 16/9
}
```

## Features Available

### Video Display
- ✅ Video thumbnails with hover effects
- ✅ Play button overlay on hover
- ✅ Duration badge
- ✅ YouTube icon indicator
- ✅ View count display
- ✅ Publication date

### User Experience
- ✅ Click videos to open on YouTube
- ✅ Tab navigation between media types
- ✅ Responsive grid layout
- ✅ Loading states and animations
- ✅ YouTube channel link button

### Technical Features
- ✅ TypeScript support for videos
- ✅ Lazy loading for performance
- ✅ Responsive design
- ✅ Accessibility features
- ✅ SEO-friendly structure

## Maintenance

### Regular Updates
- Update video data monthly with new content
- Remove outdated videos
- Update view counts and engagement metrics
- Add new video categories as needed

### Performance Optimization
- Use appropriate thumbnail quality
- Monitor loading performance
- Update video metadata regularly
- Optimize thumbnail sizes

## Troubleshooting

### Common Issues
1. **Thumbnails not loading**: Check video ID and thumbnail URL format
2. **Videos not opening**: Verify YouTube URL format
3. **Layout issues**: Check aspect ratio values
4. **Performance problems**: Optimize thumbnail quality and loading

### Best Practices
- Use descriptive video IDs
- Write engaging descriptions
- Keep titles concise but informative
- Update metadata regularly
- Test video links periodically

## Support
For technical issues or questions about video integration, refer to the main project documentation or contact the development team.
