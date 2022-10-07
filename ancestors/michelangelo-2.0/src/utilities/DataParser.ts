export default (data: any, type: number): any => {
  const parsedData = data
  if (type === 1) {
    // setting rating
    parsedData.total_rating = data.total_rating.toFixed(1)
    // setting image
    parsedData.image = data.cover.url
    const url = parsedData.image.replace('t_thumb', 't_cover_big')
    parsedData.image = url
    delete parsedData.cover
  } else if (type === 2) {
    // setting rating
    parsedData.total_rating = data.total_rating.toFixed(1)
    // setting release data
    parsedData.release_dates = data.release_dates.filter((releaseDate: any) => {
      return (releaseDate.region === 2 || releaseDate.region === 8)
    })
    if (parsedData.release_dates !== null) {
      parsedData.release_date = parsedData.release_dates.human
      delete parsedData.release_dates
    } else delete parsedData.release_dates
    // setting platforms
    let platforms_ = data.platforms.map((platform: any) => {
      try {
        if (platform.platform_family.id !== 4) {
          return { name: platform.name, slug: platform.platform_family.slug }
        } else {
          return null
        }
      } catch {
        if (platform.id === 6) {
          return { name: platform.name, slug: platform.slug }
        } else {
          return { name: platform.name, slug: 'other' }
        }
      }
    })
    let filteredPlatforms_ = platforms_.filter((platform: any) => {
      return platform != null
    })
    platforms_ = {}
    filteredPlatforms_.forEach((platform: any) => {
      platforms_[platform.slug] = filteredPlatforms_.map(
        (filteredPlatform: any) => {
          if (filteredPlatform.slug === platform.slug) {
            return filteredPlatform.name
          } else {
            return null
          }
        })
    })
    filteredPlatforms_ = {}
    for (const slug in platforms_) {
      if (Object.prototype.hasOwnProperty.call(platforms_, slug)) {
        filteredPlatforms_[slug] = platforms_[slug].filter((platform: any) => {
          return platform !== undefined || null
        })
      }
    }
    parsedData.platforms = filteredPlatforms_
    // setting genres
    parsedData.genres = data.genres.map((genre: any) => {
      return { name: genre.name, slug: genre.slug }
    })
    // setting game modes
    parsedData.game_modes = data.game_modes.map((mode: any) => {
      return mode.name
    })
    // setting developer name
    if (parsedData.involved_companies !== null) {
      const developers =
    data.involved_companies.map((company: any) => {
      if (company.developer === true) {
        return company.company.name
      } else return null
    })
      parsedData.involved_companies = developers.filter((company: any) => {
        return company !== undefined || null
      })
    } else {
      parsedData.involved_companies = ['None Found']
    }
    // setting image
    parsedData.image = data.cover.url
    const url = parsedData.image.replace('t_thumb', 't_cover_big')
    parsedData.image = url
    delete parsedData.cover
  }
  // returning data
  return parsedData
}
