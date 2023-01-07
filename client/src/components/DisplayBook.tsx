import React from 'react';

//types
import { BookInfo, DbBookInfo } from '../types';


export const DisplayDbBook: ({ item, format }: { item: DbBookInfo; format: string }) => JSX.Element = ({ item, format }: { item: DbBookInfo; format: string }) => {
  // displays book of Google Books format

  // split string of authors & genres
  const authors:string[] | undefined = item.author?.split(",");

  const genres:string[] | undefined = item.genre?.split(",");


  return (
    // short display: Img / Title / Subtitle / Authors / Genres / Status / Date Read
    <div className='bookInfo' key={item.id}>
      <div className="shortFormat">
        {item.img ? 
          <img
            src={item.img}
            alt={`Cover of ${item.title}`}
          />
          : null}
        <h2>{item.title}</h2>
        {item.subtitle ? <h3>{item.subtitle }</h3> :null}
        {authors
          ? authors.map((author: string, index:number) => (
              <h3 key={index+item.id!}>
              {index === 0 ?<span>By: </span> : <span>& </span>}
                {author}
              </h3>
            ))
          : null}
        {genres
          ? genres.map((genre: string, index:number) => (
              <h4 key={index+item.id!}>
                <span>Genre: </span>
                {genre}
              </h4>
            ))
          : null}
      </div>

      
      {/* Full Display: Page Count / Language / Published Date / Description / Preview Link */}
        {format && format === "full"
          ? <div className="fullFormat">
            {item.pageCount ? <h4>Pages: {item.pageCount}</h4> : null}
            {item.language ? <h4>Language: {item.language}</h4> : null}
            {item.publishedDate ?<h4>Date Published: {item.publishedDate}</h4> :null}
            {item.desc ? <p>Description: {item.desc}</p> : null}
            {item.previewLink ? <a href={ item.previewLink}  target="_blank" rel="noreferrer">Preview on Google Books</a> :null}
          </div>
        :null}
              </div>
    );
};

export const DisplayGoogleBook: ({ item, format }: { item: BookInfo; format: string }) => JSX.Element = ({ item, format }: { item: BookInfo; format: string }) => {
  // displays book of Google Books format
    return (
      <div className='bookInfo' key={item.id}>
        {/* short display: Img / Title / Subtitle / Authors / Genres */}
        <div className="shortFormat">

          {item.volumeInfo.imageLinks ? 
            <img
              src={item.volumeInfo.imageLinks.smallThumbnail}
              alt={`Cover of ${item.volumeInfo.title}`}
            />
            : null}
          <h2>{item.volumeInfo.title}</h2>
          {item.volumeInfo.subtitle ? 
          <h3>{item.volumeInfo.subtitle }</h3>
            : null}
          {item.volumeInfo.authors
            ? item.volumeInfo.authors.map((author: string, index:number) => (
                <h3 key={index+item.id}>
                  {index === 0 ?<span>By: </span> : <span>& </span>}
                  {author}
                </h3>
              ))
            : null}
          {item.volumeInfo.categories
            ? item.volumeInfo.categories.map((genre: string, index:number) => (
                <h4 key={index+item.id}>
                  {index === 0 ?<span>Genre: </span> : <span>/ </span>}
                  {genre}
                </h4>
              ))
            : null}
        </div>
        {format && format === "full"
          // Full Display: Page Count / Language / Published Date / Description / Preview Link 
          ? <div className='fullFormat'>
            {item.volumeInfo.pageCount ? <h4>Pages: {item.volumeInfo.pageCount}</h4> : null}
            {item.volumeInfo.language ? <h4>Language: {item.volumeInfo.language}</h4> : null}
            {item.volumeInfo.publishedDate ? <h4>Date Published: {item.volumeInfo.publishedDate}</h4> : null}
            {item.volumeInfo.description ? <p>Description: {item.volumeInfo.description}</p> : null}
            {item.volumeInfo.previewLink ? <a href={ item.volumeInfo.previewLink}  target="_blank" rel="noreferrer">Preview on Google Books</a> :null}
          </div>
        :null}
     </div>
    );
};