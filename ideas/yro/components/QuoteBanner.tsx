import React, { useState, useEffect } from 'react';
import { people } from '../assets/images';

interface Quote {
  text: string;
  author: string;
}

const QuoteBanner: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [randomIndex, setRandomIndex] = useState<number>(0);

  useEffect(() => {
    fetch('/data/quotes.json')
      .then((res) => res.json())
      .then((data: Quote[]) => {
        setQuotes(data);
        setRandomIndex(Math.floor(Math.random() * data.length));
      });
  }, []);

  const randomQuote = quotes[randomIndex];

  return (
    <section className="w-full bg-gray-100 py-12 px-4 flex flex-col md:flex-row items-center justify-center mb-16">
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <img src={people} alt="People waiting for interview" className="rounded-md object-cover max-w-md w-full h-48 md:h-56 lg:h-64 shadow" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-4">
        {randomQuote && (
          <>
            <span className="text-4xl text-gray-400 mb-2">&ldquo;</span>
            <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">{randomQuote.text}</p>
            <div className="w-8 h-px bg-gray-300 mx-auto mb-2" />
            <span className="text-black text-base font-semibold">{randomQuote.author}</span>
          </>
        )}
      </div>
    </section>
  );
};

export default QuoteBanner; 