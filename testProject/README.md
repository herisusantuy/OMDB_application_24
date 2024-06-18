![Preview](https://github.com/herisusantuy/OMDB_application_24/blob/main/testProject/movie_searcher.gif)
# Movie Searcher 

## Description

App to search list of movies from Open Movie Database as part of Test Assignment for Cloudfit.io as a Senior Front End Developer specializing in React Native.

## Key Features:
- Search movies by keyword
- Load more 
- Show detail movie

## Improvements
- Custom hooks
  - useFetch: hook that encapsulates the logic for making HTTP requests and managing the associated states like loading, error, and data. This hook simplifies the process of fetching data in functional components, making your code cleaner and more reusable
  - useDebounce: hooks to delay a function call until a certain amount of time has passed since the last time it was invoked. This is particularly useful for performance optimization when dealing with user input, like search fields or resizing events, where you want to avoid making API calls or heavy computations too frequently
- Add folder constants
  It's used to manage constants of the app such as colors, images, icons and other assets that really usefull when working in a big project.
- Create reusable componenents
  to enhances code maintainability, reduces redundancy, and promotes a consistent design throughout the application.
- Add env file in order to manage important resource of the app
- Use Flatlist instead of Scrollview in order to show list of movies. Flatlist will renders the items that are currently visible on the screen and a few items beyond, improving performance when dealing with large datasets.

  

 
