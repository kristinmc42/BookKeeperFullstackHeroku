export default function convertGenres(
  item: string[] | undefined
): string | undefined {
  let newGenreString: string | undefined;

  if (item) {
    const genre: string = item.join("/");
    const newGenres: string = genre?.replace(/\W+/g, "/");
    const genreArray: string[] = newGenres?.trim().split("/");
    const genreSet: Set<string> = new Set(genreArray);
    const newGenreArray: string[] | undefined = Array.from(genreSet.values());
    newGenreString = newGenreArray.join(" / ");
  }
  return newGenreString;
}
