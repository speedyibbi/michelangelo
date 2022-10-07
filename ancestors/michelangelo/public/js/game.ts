
/**
 * Displays game content when page loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // selecting elements
  const display: HTMLDivElement = document.querySelector('.displayer')!;
  const loader: HTMLDivElement = document.querySelector('.loader')!;
  const goBack: HTMLAnchorElement = document.querySelector('.goBack')!;
  // adding classes to elements
  display.classList.add('hidden');
  loader.classList.add('on');
  // setting go back link href
  try {
    const prevUrl = new URL(document.referrer);
    if (prevUrl.hostname == new URL(host).hostname) {
      goBack.href = prevUrl.toString();
    } else {
      goBack.href = `${protocol}://${new URL(host).host}/`;
    }
  } catch (error) {
    goBack.href = `${protocol}://${new URL(host).host}/`;
  };
  // selecting game id
  let gameID = location.href;
  const index = gameID.indexOf('/game/') + 6;
  gameID = gameID.slice(index);
  gameID = gameID.replace(/\D/g, '');
  // making fetch request for game data to display
  fetch(`${host}/games/${gameID}`)
      .then((responseRaw) => {
        return responseRaw.json();
      })
      .then((response) => {
        loader.classList.remove('on');
        display.classList.remove('hidden');
        displayGameData(response, display, gameDisplayType.displayAll);
      })
      .catch(() => {
        document.body.innerHTML = 'Something went wrong';
      });
});
