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
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-sm flex flex-col items-center hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 mx-auto">
    <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover rounded-t-2xl transition-all duration-300" />
    </div>
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 px-4 sm:px-6 py-4 w-full">
      <div className="flex flex-row sm:flex-col items-center sm:items-center min-w-[40px] mb-2 sm:mb-0">
        <span className="text-xs font-bold text-zinc-500 tracking-widest">{formatMonth(date)}</span>
        <span className="text-2xl font-extrabold text-zinc-900 leading-none ml-2 sm:ml-0">{formatDay(date)}</span>
      </div>
      <div className="flex-1 text-center sm:text-left">
        <div className="font-bold text-zinc-900 text-lg sm:text-xl leading-tight mb-1 sm:mb-2">{title}</div>
        <div className="text-sm text-zinc-500 font-medium">{location}</div>
      </div>
    </div>
  </div>
); 