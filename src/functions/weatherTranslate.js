export const weatherTranslate = (weather) => {
    if (weather.main === 'Thunderstorm') return 'cloud-bolt'
    if (['Drizzle', 'Rain'].includes(weather.main)) return 'cloud-showers-heavy'
    if (weather.main === 'Snow') return 'snowflake'
    if (['Smog', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash'].includes(weather.main)) return 'smog'
    if (weather.main === 'Squall') return 'wind'
    if (weather.main === 'Tornado') return 'tornado'
    if (weather.main === 'Clear') return 'sun'
    if (weather.main === 'Clouds') {
        if (['few clouds', 'scattered clouds', 'broken clouds'].includes(weather.description))
            return 'cloud-sun'
        return 'cloud'
    }
}