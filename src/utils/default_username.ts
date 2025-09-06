export function generateDefaultUsername() {
  const prefixes = ["DJ", "MC", "Lil", "Big", "Yung", "Kid", "The"];
  const middles = ["Flow", "Beat", "Rhyme", "Verse", "Synth", "Mix", "Track", "Vibe", "Wave", "Sound"];
  const suffixes = ["King", "Queen", "God", "Goddess", "Master", "Wizard", "Guru", "Legend", "Icon", "Star"]; // More impactful

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomMiddle = middles[Math.floor(Math.random() * middles.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)]; // Use suffix

  let username = "";

  // Randomly include or exclude parts for variation:
  if (Math.random() < 0.5) username += randomPrefix; // 50% chance of prefix
  username += randomMiddle;
  if (Math.random() < 0.7) username += randomSuffix; // 70% chance of suffix
  username += Math.floor(Math.random() * 1000); // Still good to have a number

  return username.toLowerCase();
}
