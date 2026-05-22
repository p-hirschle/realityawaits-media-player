export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
  visual: string;
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Psycho Shit",
    artist: "The Strokes",
    src:"", //"/music/psycho.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 2,
    title: "Dine N' Dash",
    artist: "The Strokes",
    src:"", //"/music/dine.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 3,
    title: "Lonely in the Future",
    artist: "The Strokes",
    src:"", //"/music/lonely.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 4,
    title: "Falling out of Love",
    artist: "The Strokes",
    src: "/music/out-of-love.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 5,
    title: "Going to Babble On",
    artist: "The Strokes",
    src:"", //"/music/babble.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 6,
    title: "Going Shopping",
    artist: "The Strokes",
    src: "/music/shopping.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 7,
    title: "Liar's Remorse",
    artist: "The Strokes",
    src:"", //"/music/remorse.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 8,
    title: "The Fruits of Conquest",
    artist: "The Strokes",
    src:"", //"/music/fruits.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
  {
    id: 9,
    title: "Tyrants of the Mellow Moon",
    artist: "The Strokes",
    src:"", //"/music/tyrants.mp3",
    cover: "/visuals/cover-icon.jpg",
    visual: "/visuals/cowboy-bg.jpg"
  },
];
