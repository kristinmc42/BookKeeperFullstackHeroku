

//types
import { BookInfo } from '../types';

const DisplayBook: ({ item, format }: { item: BookInfo; format: string }) => JSX.Element = ({ item, format }: { item: BookInfo; format: string }) => {

    return (
        <div className='bookInfo' key={item.id}>
                {item.volumeInfo.imageLinks ? 
                  <img
                    src={item.volumeInfo.imageLinks.smallThumbnail}
                    alt={`Cover of ${item.volumeInfo.title}`}
                  />
                 : null}
                <h2>{item.volumeInfo.title}</h2>
                {item.volumeInfo.authors
                  ? item.volumeInfo.authors.map((author: string, index:number) => (
                      <h3 key={index+item.id}>
                        <span>By: </span>
                        {author}
                      </h3>
                    ))
                  : null}
                {item.volumeInfo.categories
                  ? item.volumeInfo.categories.map((genre: string, index:number) => (
                      <h4 key={index+item.id}>
                        <span>Genre: </span>
                        {genre}
                      </h4>
                    ))
          : null}
        {format && format === "full"
          ? <>
            {/* // data.id; data.volumeInfo.title; data.volumeInfo.subtitle; data.volumeInfo.authors; data.volumeInfo.categories; data.volumeInfo.imageLinks.smallThumbnail; data.volumeInfo.description; data.volumeInfo.pageCount; data.volumeInfo.previewLink;data.volumeInfo.language;data.volumeInfo.publishedDate; */}
            {item.volumeInfo.pageCount ? <h4>Pages: {item.volumeInfo.pageCount}</h4> : null}
            {item.volumeInfo.language ? <h4>Language: {item.volumeInfo.language}</h4> : null}
            {item.volumeInfo.publishedDate ? <h4>Date Published: {item.volumeInfo.publishedDate}</h4> : null}
            {item.volumeInfo.description ? <p>Description: {item.volumeInfo.description}</p> : null}
            {item.volumeInfo.previewLink ? <a href={ item.volumeInfo.previewLink}  target="_blank" rel="noreferrer">Preview on Google Books</a> :null}
          </>
        :null}
              </div>
    );
};

export default DisplayBook;