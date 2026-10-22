import logo from '@/assets/logo.png'
import { creditedImages } from '@/content/images'

const linkClass =
  'decoration-border hover:text-foreground hover:decoration-primary underline underline-offset-4 transition-colors'

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="" className="size-10 invert" width={40} height={40} />
            <div>
              <p className="text-sm">Sidereal Software · Los Angeles, California</p>
              <p className="text-dim mt-1 text-sm">
                Software that does the heavy lifting
              </p>
            </div>
          </div>
          <a
            href="#home"
            className="text-muted-foreground hover:text-foreground self-start text-sm underline underline-offset-[6px] transition-colors md:self-auto">
            Back to top
          </a>
        </div>
        <div className="border-border mt-14 border-t pt-8">
          <h2
            id="image-credits"
            className="text-dim text-xs font-medium tracking-[0.32em] uppercase">
            Image credits
          </h2>
          <ul
            aria-labelledby="image-credits"
            className="text-dim mt-5 grid gap-3 text-xs leading-relaxed md:grid-cols-2 md:gap-x-12">
            {creditedImages.map((image) => (
              <li key={image.name}>
                <a
                  href={image.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-muted-foreground ${linkClass}`}>
                  {image.name}
                </a>
                : {image.credit} ·{' '}
                <a
                  href={image.licenseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}>
                  {image.license}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
