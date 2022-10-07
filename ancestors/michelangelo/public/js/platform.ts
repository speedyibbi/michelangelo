
/**
 * Displays game content when page loaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // selecting elements
  const display: HTMLDivElement = document.querySelector('.displayer')!;
  const loader: HTMLDivElement = document.querySelector('.loader')!;
  const goBack: HTMLAnchorElement = document.querySelector('.goBack')!;
  const heading: HTMLHeadingElement =
  document.querySelector('.platformHeading')!;
  // adding classes to elements
  display.classList.add('hidden');
  loader.classList.add('on');
  // setting go back link href
  goBack.href = `${protocol}://${new URL(host).host}/`;
  // selecting platform id
  let platformID = location.href;
  const index = platformID.indexOf('/platform/') + 10;
  platformID = platformID.slice(index);
  platformID = platformID.replace(/\D/g, '');
  // setting platform heading
  if (platformID == '6') {
    fetch(`${host}/platforms/${platformID}/name?pc=true`)
        .then((responseRaw) => {
          return responseRaw.json();
        })
        .then((response) => {
          heading.innerHTML = `${response.name} Games`;
        });
  } else {
    fetch(`${host}/platforms/${platformID}/name`)
        .then((responseRaw) => {
          return responseRaw.json();
        })
        .then((response) => {
          heading.innerHTML = `${response.name} Games`;
        });
  };
  // making fetch request for platform games data to display
  getPlatformGames(platformID, loader, display);
});
