export interface PlayerFeature {
  id: string;
  name: string;
  handle: string;
  age: number;
  location: string;
  category: string;
  image: string;
  writeup: string;
  isLatest?: boolean;
}

export const PLAYER_FEATURES: PlayerFeature[] = [
  {
    id: '5',
    name: 'Mohammed Zayan "Moezee" Saley',
    handle: '@moezee',
    age: 13,
    location: 'Gauteng',
    category: 'u14',
    image: 'https://storage.googleapis.com/test-platform-static/user_content/input_file_6.png',
    isLatest: true,
    writeup: `This month we’re shining the spotlight on a young padel star who’s been putting in serious work on the court.

At just 13, Moezee has impressed everyone with his focus, confidence, and determination to keep leveling up. He’s chasing higher rankings and proving that hard work really does pay off. 

What stands out most is his attitude, a mix of grit, discipline, and a love for the game that makes him one to watch. 

Moezee is also open to sponsorship opportunities as he continues to grow and compete at bigger stages. 

His journey is only beginning, and we can’t wait to see how far he goes.`
  },
  {
    id: '4',
    name: 'Muhammad Kardamey',
    handle: '@muhammad_k',
    age: 11,
    location: 'Gauteng',
    category: 'u12/u14',
    image: 'https://storage.googleapis.com/test-platform-static/user_content/input_file_5.png',
    writeup: `Some players show promise… and some show the mindset of a champion from a young age.
Muhammad Kardamey is doing exactly that.

Currently Africa and South Africa’s No.1 ranked FIP Under-12 player, Muhammad has already made his mark through determination, powerful shot-making, and a true passion for the game.

Supported by Babolat, Muhammad is working tirelessly to grow his game and compete at the highest level, carrying the future of South African padel onto the international stage.

Keep going, Muhammad. The journey is just beginning, and we’re excited to watch where your talent and dedication take you next`
  },
  {
    id: '3',
    name: 'Ryden Forsyth',
    handle: '@ryden_forsyth27',
    age: 12,
    location: 'Gauteng',
    category: 'u14',
    image: 'https://storage.googleapis.com/test-platform-static/user_content/input_file_4.png',
    writeup: `Some players discover padel early.
Others find it… and never look back.
Ryden is the second kind.

After starting out as a soccer player, Ryden picked up a padel racket just over a year ago, and instantly fell in love with the speed, intensity, and competitive edge of the game. Since then, he hasn’t looked back.

What stands out isn’t just how quickly he’s progressed…
It’s how committed he is to the journey.
Training five times a week, Ryden shows up with focus, energy, and a real hunger to push himself and improve.

A left-sided player with a love for competition, Ryden thrives in match play and enjoys testing himself against strong opponents. His passion and dedication have also seen him become a proud Qurtuba Padel Ambassador, representing the values of hard work and growth on and off the court

Chosen by the SA Padel Youth Hub community, Ryden stood out through the support, encouragement, and recognition shown by players, friends, teammates, and family from across South Africa

Keep pushing, Ryden
The journey is just getting started.`
  },
  {
    id: '2',
    name: 'Raheemah Hansrod',
    handle: '@raheemah_18',
    age: 16,
    location: 'Gauteng',
    category: 'u18',
    image: 'https://storage.googleapis.com/test-platform-static/user_content/input_file_2.png',
    writeup: `Some players bring skill.
Some bring heart.
Raheemah brings both, every time she steps onto the court.

What stands out isn’t just her level…
It’s her fierce determination to keep getting better.
She works, she learns, she shows up, even when no one’s watching. 

Padel is a journey, and the strongest players are the ones who:
• Stay hungry to improve
• Keep a positive mindset
• Support the people around them
• And love the game deeply

At just 16, Raheemah is already showing the qualities of a young athlete with a big future ahead. 

Chosen by the SA Padel Youth Hub community, Raheemah stood out through the support, love, and recognition shown by players, friends, teammates, and family from across SA

Keep shining, Raheemah
This is just the beginning, the next chapter is yours.`
  },
  {
    id: '1',
    name: 'Nader Karime',
    handle: '@naderfkarime',
    age: 15,
    location: 'Gauteng',
    category: 'u16',
    image: 'https://storage.googleapis.com/test-platform-static/user_content/input_file_1.png',
    writeup: `There are players who show up to play… and there are players who show up to improve.
Nader is the second one.
Consistent. Positive. Focused. Hungry for growth.

Whether it’s training, match play, or just hitting for fun, he steps onto the court with intention, and that’s something we love to see in young athletes

Padel isn’t just about winning points.
It’s about: • Learning the game
• Building confidence
• Developing discipline
• And enjoying every moment on court

And at just 15 years old, Nader is already showing the mindset of someone who is building a long-term journey in the sport

Keep going, Nader
We’re proud to spotlight you today.
The future is bright. The future is yours`
  }
];

export interface RankingEntry {
  rank: number;
  name: string;
  points: number;
  category: string;
  gender: 'male' | 'female';
}

export const RANKINGS: RankingEntry[] = [];
