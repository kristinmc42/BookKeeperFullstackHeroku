import React from "react";
import styled from "styled-components";


//types
import { BookInfo, DbBookInfo } from "../types";
// styles

// : ({ item, format }: { item: DbBookInfo; format: string }) => JSX.Element

// displays book of Google Books format
export const DisplayDbBook = ({
  item,
  format,
}: {
  item: DbBookInfo;
  format: string;
}) => {


  // const [descArray, setDescArray] = useState<string[] | undefined>();
  // // move this inside convertBookToDb
  // // let descArray: string[] | undefined;
  // useEffect(() => {
  //   if (item.desc) {
  //     setDescArray((item.desc).split("<br><br>"));
  //     // console.log(descArray)
      
  //   }

  // },[])



  // turn string of genres into a string of unique genres
  // const newGenreString: string | undefined = convertGenres(item.genre);

  return (
    // short display: Img / Title / Subtitle / Authors / Genres / Status / Date Read
    <BookInfoCard key={item.id}>
      <ShortFormBookInfo>
        {item.img ? (
          <img src={item.img} alt={`Cover of ${item.title}`} />
        ) : null}
        <div>
        <h2>{item.title}</h2>
        {item.subtitle ? <h3>{item.subtitle}</h3> : null}
        {item.author ? <h3>By: {item.author}</h3> : null}
        {item.genre ? <h4>{item.genre}</h4> : null}
        </div>
      </ShortFormBookInfo>

      {/* Full Display: Page Count / Language / Published Date / Description / Preview Link */}
      {format && format === "full" ? (
        <FullFormBookInfo>
          {item.pageCount ? <h4>Pages: {item.pageCount}</h4> : null}
          {item.language ? <h4>Language: {item.language}</h4> : null}
          {item.publishedDate ? (
            <h4>Date Published: {item.publishedDate}</h4>
          ) : null}
          {item.desc ? <p>Description: {item.desc}</p> : null}
          {/* {descArray ? <>
            { descArray.map((paragraph, index) => {
              <p key={index}>{ paragraph }</p>
          })} */}
          {/* </> */}
          {/* :null} */}
          {item.previewLink ? (
            <a href={item.previewLink} target="_blank" rel="noreferrer">
              Preview on Google Books
            </a>
          ) : null}
        </FullFormBookInfo>
      ) : null}
    </BookInfoCard>
  );
};

// displays book of Google Books format
export const DisplayGoogleBook = ({
  item,
  format,
}: {
  item: BookInfo;
  format: string;
}) => {
  return (
    <BookInfoCard key={item.id}>
      {/* short display: Img / Title / Subtitle / Authors / Genres */}
      <ShortFormBookInfo>
        {item.volumeInfo.imageLinks ? (
          <img
            src={item.volumeInfo.imageLinks.smallThumbnail}
            alt={`Cover of ${item.volumeInfo.title}`}
          />
        ) : null}
        <h2>{item.volumeInfo.title}</h2>
        {item.volumeInfo.subtitle ? <h3>{item.volumeInfo.subtitle}</h3> : null}
        {item.volumeInfo.authors
          ? item.volumeInfo.authors.map((author: string, index: number) => (
              <h3 key={index + item.id}>
                {index === 0 ? <span>By: </span> : <span>& </span>}
                {author}
              </h3>
            ))
          : null}
        {item.volumeInfo.categories
          ? item.volumeInfo.categories.map((genre: string, index: number) => (
              <h4 key={index + item.id}>
                {index === 0 ? <span>Genre: </span> : <span>/ </span>}
                {genre}
              </h4>
            ))
          : null}
      </ShortFormBookInfo>
      {format && format === "full" ? (
        // Full Display: Page Count / Language / Published Date / Description / Preview Link
        <FullFormBookInfo>
          {item.volumeInfo.pageCount ? (
            <h4>Pages: {item.volumeInfo.pageCount}</h4>
          ) : null}
          {item.volumeInfo.language ? (
            <h4>Language: {item.volumeInfo.language}</h4>
          ) : null}
          {item.volumeInfo.publishedDate ? (
            <h4>Date Published: {item.volumeInfo.publishedDate}</h4>
          ) : null}
          {item.volumeInfo.description ? (
            <p>Description: {item.volumeInfo.description}</p>
          ) : null}
          {item.volumeInfo.previewLink ? (
            <a
              href={item.volumeInfo.previewLink}
              target="_blank"
              rel="noreferrer"
            >
              Preview on Google Books
            </a>
          ) : null}
        </FullFormBookInfo>
      ) : null}
    </BookInfoCard>
  );
};

// styled components
const BookInfoCard = styled.article`
  color: ${(props) => props.theme.colors.whiteText};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  height: 87%
`;
const ShortFormBookInfo = styled.section`
  display: flex;
  align-items: flex-start;
  gap: .8em;
  padding: .5em;

  img{
    width: 85px;
    padding-top: .8em;
  }

  h2, h3, h4{
    padding: .3em 0;
    line-height: 1.3;
    font-size: 1.2rem;
  }

  h3{
    font-size: 1rem;
  }
  h4{
    font-size: .7rem;
  }
`;

const FullFormBookInfo = styled.section`
display: flex;
flex-direction: column;
gap: .8em;
padding: .5em;

h4, p, a{
  font-size: .8rem;
}
a{
  color: ${props => props.theme.colors.secondary}
}
`