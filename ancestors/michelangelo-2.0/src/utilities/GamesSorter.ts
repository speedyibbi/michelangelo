enum GamesSorter {
  Newest = 'first_release_date desc',
  Oldest = 'first_release_date asc',
  Popular = 'total_rating_count desc',
  Unpopular = 'total_rating_count asc'
}

export default GamesSorter
