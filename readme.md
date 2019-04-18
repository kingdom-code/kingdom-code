# Kingdom Code

## Editing the events

Events are stored in `src/_data/events.json`

Add new events at the top in the format:

```
  {
    "name": "Meetup",
    "date": "2018-10-18",
    "url": "https://eventbrite.com/…",
    "description": "This is an event description"
  },
```

## Adding people

People are stored in `src/_data/people.json`

Add a new person with the format:

```
  {
    "name": "Patrick Bokšan-Cullen",
    "team": ["London"],
    "img": "patrick.jpg",
    "bio": "Patrick looks after microBUILD in London."
  },
```

Avatars should be saved to `src/_assets/_img/people`

## Development

To get this up and running on your own computer you need to have Node and NPM installed. [Find out how here](https://www.npmjs.com/get-npm).

Once you have installed NPM in the command line run the following line in this folder:

- `npm install`
- `npm run dev`

You'll now have a local server running at [http://localhost:8080](http://localhost:8080).

This is built on top of [Eleventy](https://www.11ty.io) because it is great. One of the nice things about 11ty is it's [super simple documentation](https://www.11ty.io/docs/).

Behind the scenes Webpack is handling JS (`src/_assets/_js`) and SCSS (`src/_assets/_scss`).

## Deploy

`npm run build`
