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
- No routing, but on a larger project, routing with react-router would be a must.
- Also nice would be to have the token stored in sessionStorage instead of only in Redux state tree so that it could persist across refreshes.
