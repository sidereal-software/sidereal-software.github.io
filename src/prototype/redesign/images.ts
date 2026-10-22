// PROTOTYPE - throwaway. Kuiper, Perkins, LONEOS and Mt. Lemmon have no openly licensed photo.
import bok from './img/bok.jpg'
import geminiNorth from './img/gemini-north.jpg'
import geminiSouth from './img/gemini-south.jpg'
import ldt from './img/ldt.jpg'
import m27 from './img/m27.jpg'
import mmt from './img/mmt.jpg'
import spherex from './img/spherex.jpg'
import vatt from './img/vatt.jpg'

export interface CreditedImage {
  src: string
  name: string
  location: string
  credit: string
  license: string
  licenseUrl: string
  sourceUrl: string
  width: number
  height: number
  daytime?: boolean
}

export const heroImage: CreditedImage = {
  src: m27,
  name: 'M27, the Dumbbell Nebula',
  location: 'Mayall 4-m Telescope, Kitt Peak, Arizona',
  credit:
    'T.A. Rector (University of Alaska Anchorage) and H. Schweiker (WIYN and NOIRLab/NSF/AURA)',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  sourceUrl: 'https://noirlab.edu/public/images/noao-m27-kpno-mayall-4-m/',
  width: 2800,
  height: 2351,
}

export const telescopes: Record<string, CreditedImage> = {
  'gemini-north': {
    src: geminiNorth,
    name: 'Gemini North',
    location: "Maunakea, Hawai'i",
    credit: 'International Gemini Observatory/NOIRLab/NSF/AURA/J. Warner',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://noirlab.edu/public/images/iotw2541a/',
    width: 1800,
    height: 1200,
  },
  'gemini-south': {
    src: geminiSouth,
    name: 'Gemini South',
    location: 'Cerro Pachón, Chile',
    credit: 'International Gemini Observatory/NOIRLab/NSF/AURA/B. Tafreshi',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://noirlab.edu/public/images/iotw2015a/',
    width: 1800,
    height: 1350,
  },
  bok: {
    src: bok,
    name: 'Bok 90"',
    location: 'Kitt Peak, Arizona',
    credit: 'KPNO/NOIRLab/NSF/AURA/R.T. Sparks',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://noirlab.edu/public/images/6V6A9200-CC/',
    width: 1800,
    height: 1200,
  },
  mmt: {
    src: mmt,
    name: 'MMT',
    location: 'Mt. Hopkins, Arizona',
    credit: 'Pyronordicman, via Wikimedia Commons',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:MMT_Observatory.jpg',
    width: 1639,
    height: 1800,
  },
  vatt: {
    src: vatt,
    name: 'VATT',
    location: 'Mt. Graham, Arizona',
    credit: 'Vatican Observatory (photo: Jjstott), via Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:VaticanObservatory_VATT.jpg',
    width: 1800,
    height: 1197,
    daytime: true,
  },
  ldt: {
    src: ldt,
    name: 'Lowell Discovery Telescope',
    location: 'Happy Jack, Arizona',
    credit: 'SSR2000, via Wikimedia Commons',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:The_Dome_of_Discovery_Channel_Telecope.JPG',
    width: 1800,
    height: 1350,
    daytime: true,
  },
  spherex: {
    src: spherex,
    name: 'SPHEREx',
    location: 'Low Earth orbit (artist rendering)',
    credit: 'NASA/JPL-Caltech',
    license: 'Public domain',
    licenseUrl: 'https://www.nasa.gov/nasa-brand-center/images-and-media/',
    sourceUrl: 'https://svs.gsfc.nasa.gov/14966/',
    width: 1800,
    height: 1013,
  },
}

export function telescopeImages(keys: string[]) {
  return keys.flatMap((key) => (telescopes[key] ? [telescopes[key]] : []))
}
