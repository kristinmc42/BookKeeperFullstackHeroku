import React from 'react';

const BookInfo = ({ item }: { item: any }) => {
    return (
        <li key={item.id}>
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
                      <h3 key={index+item.id}>
                        <span>Genre: </span>
                        {genre}
                      </h3>
                    ))
                  : null}
              </li>
    );
};

export default BookInfo;