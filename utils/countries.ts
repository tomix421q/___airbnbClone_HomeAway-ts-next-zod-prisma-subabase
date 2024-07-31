import countries from 'world-countries'

export const formattedContries = countries.map((item) => {
  return { code: item.cca2, name: item.name.common, flag: item.flag, location: item.latlng, region: item.region }
})

export const findCountryByCode = (code: string) => {
  return formattedContries.find((item) => item.code === code)
}

