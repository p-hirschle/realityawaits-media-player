export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
  visual: string;
  lyrics?: string;
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
    visual: "/visuals/cowboy-bg.jpg",
    lyrics:
    `
    I took you out to my hometown
    Where I learned to be alone
    Ridin' up the mountainside
    Where all the world's here
    Linger on to praise the dawn
    Different boots, same old song
    I'm in love with a ghost
    I'll be always and never alone

    I denied, for a while
    Fallin' out of love for the first time
    Some things are flawed by design
    But I'm fine for the first time
    Dancin' in acid rain alone it's new
    But I don't wanna do it anymore
    I guess I'll sing alone

    There once was a boy turned to Lucifer
    He haunted many spaces,
    got lost down many streets
    Mmm, sailed the seven seas,
    hunted wild rhinocer-es
    Please don't call me ma'am,
    I'm no fancy fallen angel
    Finally fell in love, finally found some relief
    Finally found his lover in the arms of a thief
    Mostly found an angle, holding on for now

    I denied, for a while
    Fallin' out of love for the first time
    Some things are flawed by design
    But I'm fine for the first time
    Dancin' in acid rain, alone it's new
    But I don't wanna do it anymore
    I guess I'll sing alone

    Two things can be true, 
    good times I had with you
    To the cozy, cotton bedded sheets
    at night looked dread
    Past the hall of judging heads, 
    family portraits of the dead
    I know they felt the same power
    Sitting in the shadow, count my blessings
    No one gotta find out why
    I guess you wanna know
    In a way, this could be big news

    Let her cry, let her lie
    Fallin' out of love for the first time
    Some thing's flawed or by design
    But I'm fine for the first time
    Dancin' in acid rain, alone with you
    But I don't wanna face it anymore, 
    know I’m immature
    Over time, overnight
    'Cause I can't go through it anymore
    Hollywood here I come
    I know what it was, why it was
    Lookin' for something else

    Someone please call it in on the radio
    We got a problem here
    Oh-oh-oh, oh-oh-oh, oh-oh-oh, oh-oh-oh
    Oh-oh-oh, oh-oh-oh, oh-oh-oh, oh-oh-oh
    Be an adult, you're bein' a child
    No one wants to play
    Grindin' your gear
    I know it's not enough
    We didn't wanna hear another lecture
    Oh, puttin' on a show
    Grindin' your gear...
    `,
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
