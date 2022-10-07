
const loaders = document.querySelectorAll('.loader')!;
const arrows = document.querySelectorAll('.arrow')!;

const popularGames: HTMLDivElement = document.querySelector('#popular')!;
const recentGames: HTMLDivElement = document.querySelector('#recent')!;
const genres: HTMLUListElement = document.querySelector('#genres')!;
const platforms: HTMLUListElement = document.querySelector('#platforms')!;

/**
 * Displays popular + recent games and genres when home page loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  loaders[0].classList.add('on');
  loaders[1].classList.add('on');
  loaders[2].classList.add('on');
  fetch(`${host}/games?type=popular&number=${gamesPerSearch}`)
      .then((responseRaw) => {
        return responseRaw.json();
      })
      .then((response) => {
        const games = response;
        for (const game of games) {
          displayGameData(game, popularGames, gameDisplayType.displayLink);
        };
        addArrowListeners(popularGames, arrows[0], arrows[1]);
        loaders[0].classList.remove('on');
      });
  fetch(`${host}/games?type=recent&number=${gamesPerSearch}`)
      .then((responseRaw) => {
        return responseRaw.json();
      })
      .then((response) => {
        const games = response;
        for (const game of games) {
          displayGameData(game, recentGames, gameDisplayType.displayLink);
        };
        addArrowListeners(recentGames, arrows[2], arrows[3]);
        loaders[1].classList.remove('on');
      });
  fetch(`${host}/genres`)
      .then((responseRaw) => {
        return responseRaw.json();
      })
      .then((response) => {
        for (const genre of response) {
          displayGenre(genre, genres);
        };
        loaders[2].classList.remove('on');
      });
  setPlatformLinks(platforms);
});

/**
 * Defining behaviour for popular arrows
 */

const addArrowListeners =
(container: any, firstArrow: any, secondArrow: any) => {
  firstArrow.addEventListener('click', () => {
    shiftElements(container, 0);
  }, true);
  secondArrow.addEventListener('click', () => {
    shiftElements(container, 1);
  }, true);
};

/**
 * Carousel shifting, either shifts right (0) or left (>0),
 * Container needs an id attribute
 */

const shiftElements = (container: any, shift: number) => {
  if (container.children.length > 2) {
    if (!shift) {
      const element = container.lastChild!;
      container.removeChild(element);
      container.insertBefore(element, container.children[2]);
    } else {
      const element: HTMLElement = document.querySelector(
          `#${container.id} :nth-child(3)`)!;
      container.removeChild(element);
      container.appendChild(element);
    }
  };
};

/**
 * Display genres
 */

const displayGenre = (genre: any, displayer: HTMLElement) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = host.replace('api', `genre/${genre.id}`);
  a.innerHTML = genre.name;
  li.appendChild(a);
  li.classList.add('genre-item');
  displayer.appendChild(li);
};

/**
 * Add platform event listeners
 */

const setPlatformLinks = (container: any) => {
  const platforms = Array.from(document.querySelectorAll(
      `#${container.id} .platform-item`));
  platforms.forEach((platform) => {
    const link = platform.children[0] as HTMLAnchorElement;
    link.href = host.replace('api', `platform/${platform.id}`);
  });
};
