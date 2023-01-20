Revisiting my earlier bookKeeper app and adding a backend.

This was a passion project for me as I am an avid reader. I wanted to see if I could create a simplified version of what Goodreads does.

I also wanted to use some of the skills I have been working on.

This uses React with Typescript in the front end. I used React Query to handle the calls to the backend API. 

It gave me a chance to redesign the look of the site as well. I used Styled Components to style it. I really liked being able to compartmentalize the styles and that you can use SCSS-like syntax. 

I built the back end with NodeJS, Express, and MySQL for the database. For authentication I used jwt and bcrypt. I used Typescript in the back end as well. MySQL Workbench was very handy for interacting with the db.

The book information is from the Google Books API. Currently it limits search results to 40 results which may not cover an author's whole catalogue in many cases. I am also still trying to decide how to handle styling the content from the api without having to completely redo it.

This is a work in progress and I am continuing to see what else I can do with it!

Enjoy!
