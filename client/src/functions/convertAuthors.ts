export default function convertAuthors(
  item: string | undefined
): string | undefined {
  let newAuthorString: string | undefined;

  if (item) {
    const author: string = item;
    newAuthorString = author?.replace(/,/g, ", ");
  }
  return newAuthorString;
}
