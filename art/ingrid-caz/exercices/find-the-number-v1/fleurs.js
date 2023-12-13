const fleurs = [
    'pivoine',
    'rose',
    'lys',
    'muguet',
    'chrysanthème',
    'iris',
    'marguerite',
    'tulipe',
    'hibiscus',
    'hortensia',
    'lilas',
    'jacinthe',
    'jonquille',
    'pissenlit',
    'camomille',
    'pâquerette',
    'coquelicot',
    'narcisse',
    'pensée',
    'géranium',
    'orchidée',
    'violette',
    'lavande',
    'mimosa',
    'oeillet',
    'primvère',
    'bleuet',
    'gardenia',
    'glycine',
    'jasmin',
]

export function getRandomFleur() {
    const fleurIndex = Math.floor(Math.random() * fleurs.length);
    return fleurs[fleurIndex];
}
