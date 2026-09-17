const buildItActivity = {
  type: "build",
  id: "to-be-001",

  title: "Build It",
  instruction: "Toca las palabras y forma la oración correcta.",

  hint: {
    title: "HELP",
    formula: "PRONOUN + TO BE + COMPLEMENT",
    example: "She + is + a girl"
  },

  starsPerExercise: 3,

  exercises: [
    {
      sentence: ["She", "is", "a", "girl"]
    },
    {
      sentence: ["He", "is", "a", "boy"]
    },
    {
      sentence: ["I", "am", "a", "boy"]
    },
    {
      sentence: ["I", "am", "a", "girl"]
    },
    {
      sentence: ["They", "are", "friends"]
    }
  ]
};
