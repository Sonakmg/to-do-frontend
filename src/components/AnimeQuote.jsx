import React from 'react';

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "The moment you think of giving up, think of the reason why you held on so long.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "The only way to do great work is to love what you do.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "The moment you think of giving up, think of the reason why you held on so long.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "The only way to do great work is to love what you do.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  },
  {
    text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
    anime: "Naruto",
    character: "Naruto Uzumaki"
  }
];

const AnimeQuote = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="anime-quote">
      <div className="quote-text">"{randomQuote.text}"</div>
      <div className="quote-attribution">
        <span className="character">{randomQuote.character}</span>
        <span className="anime">{randomQuote.anime}</span>
      </div>
    </div>
  );
};

export default AnimeQuote; 