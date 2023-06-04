export const voivodeshipTranslator=(text)=> {
    const voivodeships = {
        'greater poland voivodeship': 'Wielkopolskie',
        'kuyavian-pomeranian voivodeship': 'Kujawsko-Pomorskie',
        'lesser poland voivodeship': 'Małopolskie',
        'łódź voivodeship': 'Łódzkie',
        'lower silesian voivodeship': 'Dolnośląskie',
        'lublin voivodeship': 'Lubelskie',
        'lubusz voivodeship': 'Lubuskie',
        'masovian voivodeship': 'Mazowieckie',
        'opole voivodeship': 'Opolskie',
        'podkarpackie voivodeship': 'Podkarpackie',
        'podlaskie voivodeship': 'Podlaskie',
        'pomeranian voivodeship': 'Pomorskie',
        'silesian voivodeship': 'Śląskie',
        'subcarpathian voivodeship': 'Podkarpackie',
        'swietokrzyskie voivodeship': 'Świętokrzyskie',
        'warmian-masurian voivodeship': 'Warmińsko-Mazurskie',
        'west pomeranian voivodeship': 'Zachodniopomorskie'
    };

    return voivodeships[text.toLowerCase()]
}