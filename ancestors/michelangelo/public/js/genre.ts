
/**
 * Displays game content when page loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // selecting elements
  const display: HTMLDivElement = document.querySelector('.displayer')!;
  const loader: HTMLDivElement = document.querySelector('.loader')!;
  const goBack: HTMLAnchorElement = document.querySelector('.goBack')!;
  const heading: HTMLHeadingElement = document.querySelector('.genreHeading')!;
  // adding classes to elements
  display.classList.add('hidden');
  loader.classList.add('on');
  // setting go back link href
  goBack.href = `${protocol}://${new URL(host).host}/`;
  // selecting genre id
  let genreID = location.href;
  const index = genreID.indexOf('/genre/') + 7;
  genreID = genreID.slice(index);
  genreID = genreID.replace(/\D/g, '');
  // setting genre heading
  fetch(`${host}/genres/${genreID}/name`)
      .then((responseRaw) => {
        return responseRaw.json();
      })
      .then((response) => {
        heading.innerHTML = `${response.name} Games`;
      });
  // making fetch request for genre games data to display
  getGenreGames(genreID, loader, display);
});
