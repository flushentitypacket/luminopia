# luminopia

## start

```
npm install && npm start
```

The server will be running on **localhost:3001**. (NOT 3000)

## test

```
npm test
```

I didn't spend time to write as many tests as I normally would, but I wrote a few that I think were the most important tests to have, with the added purpose of demonstrating my proficiency.

## other notes

- The [FilterList](src/components/FilterList/index.js) component I think is pretty cool. It takes a comparator function and render-children, so you can easily reuse this guy across a codebase and adapt it to whatever structure of items and DOM you're feeding it.
- There's a waiting spinner, but it waits 1 second before it appears. You can see it if you throttle your connection severely. (I checked it by creating a custom throttling profile with 5s of latency in Chrome developer tools.)
- No routing, but on a larger project, routing with react-router would be a must.
- Also nice would be to have the token stored in sessionStorage instead of only in Redux state tree so that it could persist across refreshes.
- Another nice-to-have is different styling for mobile devices (and nicer styling in general!).
