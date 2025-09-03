import React from 'react';

export interface EventCardData {
  date: string;
  title: string;
  location: string;
  image: string;
}

function formatMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
}
function formatDay(dateStr: string) {
  const date = new Date(dateStr);
  return date.getDate();
}

export const EventCard: React.FC<EventCardData> = ({ date, title, location, image }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-sm flex flex-col hover:shadow-xl transition-shadow duration-300">
    <img src={image} alt={title} className="w-full h-[48] object-cover rounded-t-xl" />
    <div className="flex flex-row items-start gap-4 px-6 py-4">
      <div className="flex flex-col items-center min-w-[40px]">
        <span className="text-xs font-bold text-zinc-500 tracking-widest">{formatMonth(date)}</span>
        <span className="text-xl font-extrabold text-zinc-900 leading-none">{formatDay(date)}</span>
      </div>
      <div className="flex-1">
        <div className="font-bold text-zinc-900 text-lg leading-tight mb-2">{title}</div>
        <div className="text-sm text-zinc-500 font-medium">{location}</div>
      </div>
    </div>
  </div>
); 