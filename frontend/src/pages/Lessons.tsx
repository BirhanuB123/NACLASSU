import { useEffect, useState } from 'react';
import API from '../api/axios';

interface Lesson {
  _id: string;
  title: string;
  content: string;
  date: string;
}

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    API.get<Lesson[]>('/lessons').then(res => setLessons(res.data));
  }, []);

  return (
    <div className="p-4">
      {lessons.map(lesson => (
        <div key={lesson._id} className="mb-6">
          <h2 className="text-2xl font-semibold">{lesson.title}</h2>
          <p className="text-gray-600 text-sm">{new Date(lesson.date).toLocaleDateString()}</p>
          <div className="mt-2">{lesson.content}</div>
        </div>
      ))}
    </div>
  );
}