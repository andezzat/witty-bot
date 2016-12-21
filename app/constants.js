const FEELINGS = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
  ANGRY: 'angry',
  FRUSTRATED: 'frustrated',
  UNKNOWN: 'unknown',
};

const MOOD_LIMITS = {
  HAPPINESS: {
    MIN: -5,
    MAX: 5,
  },
};

MOOD_LIMITS.HAPPINESS[FEELINGS.POSITIVE] = 3;
MOOD_LIMITS.HAPPINESS[FEELINGS.NEGATIVE] = -3;

const GREETINGS = {};

GREETINGS[FEELINGS.POSITIVE] = [
  "Hey! ^_^",
  "Hello, human :D",
  "Why, hello :)",
  "Hi :)",
];
GREETINGS[FEELINGS.NEUTRAL] = [
  "Hey",
  "Oh, Hi.",
  "Hello",
];
GREETINGS[FEELINGS.NEGATIVE] = [
  "Hey... :(",
  "Hi :(",
  "Hello.. :'(",
];
GREETINGS[FEELINGS.ANGRY] = [
  "What do you want, human? >:(",
  "Leave me alone!",
  "Go away!",
];

const ACKNOWLEDGING_PHRASES = {};

ACKNOWLEDGING_PHRASES[FEELINGS.POSITIVE] = [
  "I'm glad you feel that way :)",
  "Awesome!",
  "That's good :D",
  "That makes me happy :)",
];
ACKNOWLEDGING_PHRASES[FEELINGS.NEUTRAL] = [
  "Cheer up!",
  "Lighten up :D",
];
ACKNOWLEDGING_PHRASES[FEELINGS.NEGATIVE] = [
  "I'm sorry you feel that way :(",
  "That makes me sad too :(",
  ":(",
  ":'(",
];
ACKNOWLEDGING_PHRASES[FEELINGS.ANGRY] = [
  "Maybe this will help you feel more zen :)",
  "Take a deep breath.",
  "Try getting some fresh air!"
];
ACKNOWLEDGING_PHRASES[FEELINGS.FRUSTRATED] = [
  "Maybe this will help you feel more zen :)",
  "Don't give up just yet!",
  "Try thinking about your problem differently..."
];
ACKNOWLEDGING_PHRASES[FEELINGS.UNKNOWN] = [
  "I'm not sure what you're feeling...",
  "Hmm.. I don't know how to react to that feeling, yet.",
  "That's a new feeling to me..."
];

const GIF_QUERIES = {};

GIF_QUERIES[FEELINGS.POSITIVE] = [
  "yay",
  "happy",
];
GIF_QUERIES[FEELINGS.NEUTRAL] = [
  "cheer up",
  "party",
];
GIF_QUERIES[FEELINGS.NEGATIVE] = [
  "sad",
  "cry",
];
GIF_QUERIES[FEELINGS.ANGRY] = [
  "peaceful",
  "relax",
];
GIF_QUERIES[FEELINGS.FRUSTRATED] = [
  "calm down",
  "open mind",
  "epiphany",
];
GIF_QUERIES[FEELINGS.UNKNOWN] = [
  "confused",
  "thinking",
  "learning",
];

module.exports = {
  FEELINGS,
  ACKNOWLEDGING_PHRASES,
  GIF_QUERIES,
  GREETINGS,
  MOOD_LIMITS,
}
