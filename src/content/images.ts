import bok from '@/assets/images/bok.jpg'
import geminiNorth from '@/assets/images/gemini-north.jpg'
import ldt from '@/assets/images/ldt.jpg'
import m27Small from '@/assets/images/m27-1200.jpg'
import m27 from '@/assets/images/m27.jpg'
import spherex from '@/assets/images/spherex.jpg'
import vatt from '@/assets/images/vatt.jpg'

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
}

// Captions name the subject and place only, so each credit appears once, in the footer; licenses must allow commercial use.
// index.html preloads the same candidates and sizes; src/head.test.ts keeps the two in step.
export const heroImage: CreditedImage & { smallSrc: string; sizes: string } = {
  src: m27,
  smallSrc: m27Small,
  sizes: '(min-width: 768px) 92vw, 100vw',
  name: 'M27, the Dumbbell Nebula',
  location: 'Mayall 4-m Telescope, Kitt Peak, Arizona',
  credit:
    'T.A. Rector (University of Alaska Anchorage) and H. Schweiker (WIYN and NOIRLab/NSF/AURA)',
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  sourceUrl: 'https://noirlab.edu/public/images/noao-m27-kpno-mayall-4-m/',
  width: 2400,
  height: 2015,
}

export const telescopes = {
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
    height: 1012,
  },
} satisfies Record<string, CreditedImage>

export type TelescopeKey = keyof typeof telescopes

export const creditedImages: CreditedImage[] = [heroImage, ...Object.values(telescopes)]
