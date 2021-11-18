export function getYoutubeEmbedUrl(ytid: string) {
  return `https://www.youtube.com/embed/${ytid}?autoplay=1&modestbranding=1&playsinline=1&color=white`;
  // return `https://www.youtube-nocookie.com/embed/${ytid}?autoplay=1&controls=0`;
}
