export const weatherTranslate = (weather, time) => {
    if (weather.main === 'Thunderstorm') return `11${time}.png`
    if (['Drizzle', 'Rain'].includes(weather.main)) return `10${time}.png`
    if (weather.main === 'Snow') return `13${time}.png`
    if (['Smog', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash'].includes(weather.main)) return 'unknown.png'
    if (weather.main === 'Squall') return `50${time}.png`
    if (weather.main === 'Tornado') return `50${time}.png`
    if (weather.main === 'Clear') return `01${time}.png`
    if (weather.main === 'Clouds') {
        if (['few clouds', 'scattered clouds', 'broken clouds'].includes(weather.description))
            return `02${time}.png`
        return `04${time}.png`
    }
}