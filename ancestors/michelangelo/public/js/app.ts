
/* eslint-disable no-unused-vars */

// const host = 'http://localhost:3000/api';
// const protocol = 'http';

const host = 'https://michelangelo-igdb.herokuapp.com/api';
const protocol = 'https';

const gamesPerSearch = 20;
const gamesPerLoadMore = 50;
enum gameDisplayType {
  displayLink,
  displayAll
};

/**
 * Set nav heading href on page load
 */

document.addEventListener('DOMContentLoaded', async () => {
  const heading: HTMLAnchorElement = document.querySelector('nav a')!;
  heading.href = host.replace('/api', '/');
});

/**
 * Display game data
 */

const displayGameData = (game: any, displayer: HTMLDivElement,
    type: number) => {
  if (type === gameDisplayType.displayLink) {
    // creating HTML elements
    const container = document.createElement('a');
    const overlay = document.createElement('div');
    const name = document.createElement('p');
    const rating = document.createElement('p');
    // adding classes to elements
    container.classList.add('game-container');
    overlay.classList.add('game-container-overlay');
    name.classList.add('game-name');
    rating.classList.add('game-rating');
    // setting element content
    name.innerHTML = game.name;
    rating.innerHTML = game.total_rating;
    // appending elements to container element
    container.appendChild(overlay);
    container.appendChild(name);
    container.appendChild(rating);
    // setting container background
    container.style.backgroundImage = `url(${game.image})`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    // setting container href
    container.href = host.replace('api', `game/${game.id}`);
    // adding container element to displayer element
    displayer.appendChild(container);
  } else if (type == gameDisplayType.displayAll) {
    // selecting elements
    const name = document.querySelector(`.${displayer.className} 
    ._game-name`)!;
    const rating = document.querySelector(`.${displayer.className} 
    ._game-rating`)!;
    const releaseDate = document.querySelector(`.${displayer.className}
     ._game-release-date`)!;
    const platforms = document.querySelector(`.${displayer.className}
    ._game-platforms`)!;
    const genres = document.querySelector(`.${displayer.className} 
    ._game-genres`)!;
    const gameModes = document.querySelector(`.${displayer.className} 
    ._game-modes`)!;
    const companies = document.querySelector(`.${displayer.className}
    ._game-companies`)!;
    const summary = document.querySelector(`.${displayer.className} 
    ._game-summary`)!;
    const image: HTMLImageElement = document.querySelector(`#${displayer.id} 
    img`)!;
    // setting elements content
    name.innerHTML = game.name;
    rating.innerHTML = game.total_rating;
    releaseDate.innerHTML = game.release_date;
    for (const slug in game.platforms) {
      if (Object.prototype.hasOwnProperty.call(game.platforms, slug)) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const platformInfo = document.createElement('p');
        img.src = `/images/platforms/${slug}.png`;
        for (let i = 0; i < game.platforms[slug].length; i++) {
          if (i > 0) {
            platformInfo.innerHTML = `${platformInfo.innerHTML}, 
            ${game.platforms[slug][i]}`;
          } else {
            platformInfo.innerHTML = game.platforms[slug][0];
          };
        };
        li.appendChild(img);
        li.appendChild(platformInfo);
        if (slug == 'sega' || slug == 'nintendo') {
          li.classList.add('enlarge');
        };
        platforms.appendChild(li);
      }
    }
    for (const genre of game.genres) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      const genreName = document.createElement('p');
      img.src = `/images/genres/${genre.slug}.png`;
      genreName.innerHTML = genre.name;
      li.appendChild(img);
      li.appendChild(genreName);
      genres.appendChild(li);
    };
    for (const mode of game.game_modes) {
      const li = document.createElement('li');
      li.innerHTML = mode;
      gameModes.appendChild(li);
    };
    for (const company of game.involved_companies) {
      const li = document.createElement('li');
      li.innerHTML = company;
      companies.appendChild(li);
    };
    summary.innerHTML = `<span>Summary: </span>${game.summary}`;
    image.src = game.image;
  };
};

/**
 * Data retrievers
 */

const getGenreGames = (genreID: string, loader: HTMLDivElement,
    display: HTMLDivElement) => {
  fetch(`${host}/genres/${genreID}
  ?number=${gamesPerLoadMore}&offset=0`)
      .then((responseRaw) => {
        return responseRaw.json();
      })
      .then((response) => {
        loader.classList.remove('on');
        display.classList.remove('hidden');
        for (const game of response) {
          displayGameData(game, display, gameDisplayType.displayLink);
        };
        const loadMore = document.createElement('h5');
        loadMore.innerHTML = 'Load More';
        loadMore.classList.add('loadMore');
        loadMoreEventListener(loadMore, display,
            genreID, gamesPerLoadMore);
        display.appendChild(loadMore);
      })
      .catch(() => {
        document.body.innerHTML = 'Something went wrong';
      });
};

const getPlatformGames = (platformID: string, loader: HTMLDivElement,
    display: HTMLDivElement) => {
  if (platformID == '6') {
    fetch(`${host}/platforms/${platformID}
    ?number=${gamesPerLoadMore}&offset=0&pc=true`)
        .then((responseRaw) => {
          return responseRaw.json();
        })
        .then((response) => {
          loader.classList.remove('on');
          display.classList.remove('hidden');
          for (const game of response) {
            displayGameData(game, display, gameDisplayType.displayLink);
          };
          const loadMore = document.createElement('h5');
          loadMore.innerHTML = 'Load More';
          loadMore.classList.add('loadMore');
          loadMoreEventListener(loadMore, display,
              platformID, gamesPerLoadMore);
          display.appendChild(loadMore);
        })
        .catch(() => {
          document.body.innerHTML = 'Something went wrong';
        });
  } else {
    fetch(`${host}/platforms/${platformID}
      ?number=${gamesPerLoadMore}&offset=0`)
        .then((responseRaw) => {
          return responseRaw.json();
        })
        .then((response) => {
          loader.classList.remove('on');
          display.classList.remove('hidden');
          for (const game of response) {
            displayGameData(game, display, gameDisplayType.displayLink);
          };
          const loadMore = document.createElement('h5');
          loadMore.innerHTML = 'Load More';
          loadMore.classList.add('loadMore');
          loadMoreEventListener(loadMore, display,
              platformID, gamesPerLoadMore);
          display.appendChild(loadMore);
        })
        .catch(() => {
          document.body.innerHTML = 'Something went wrong';
        });
  };
};

/**
 * Add loader event listeners
 */

const loadMoreEventListener = (_loader: HTMLElement,
    displayer: HTMLDivElement, id: string, offset: number) => {
  _loader.addEventListener('click', () => {
    _loader.remove();
    const loader = document.createElement('div');
    loader.classList.add('subloader');
    displayer.appendChild(loader);
    fetch(`${host}/genres/${id}
    ?number=${gamesPerLoadMore}&offset=${offset}`)
        .then((responseRaw) => {
          return responseRaw.json();
        })
        .then((response) => {
          const games = response;
          loader.remove();
          if (games.length > 0) {
            for (const game of games) {
              displayGameData(game, displayer, gameDisplayType.displayLink);
            };
            const loadMore = document.createElement('h5');
            loadMore.innerHTML = 'Load More';
            loadMore.classList.add('loadMore');
            loadMoreEventListener(loadMore, displayer, id,
                offset + gamesPerLoadMore);
            displayer.appendChild(loadMore);
          };
        });
  });
};
