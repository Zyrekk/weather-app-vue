export const weatherTranslate = (weather) => {
    if (weather.main === 'Thunderstorm') return '11d.png'
    if (['Drizzle', 'Rain'].includes(weather.main)) return '10d.png'
    if (weather.main === 'Snow') return '13d.png'
    if (['Smog', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Dust', 'Ash'].includes(weather.main)) return 'unknown.png'
    if (weather.main === 'Squall') return '50d.png'
    if (weather.main === 'Tornado') return '50d.png'
    if (weather.main === 'Clear') return '01d.png'
    if (weather.main === 'Clouds') {
        if (['few clouds', 'scattered clouds', 'broken clouds'].includes(weather.description))
            return '02d.png'
        return '04d.png'
    }
}