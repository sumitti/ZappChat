
const avatars = [
  "/avatar1.png",
  "/avatar2.png"
];

export function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}
