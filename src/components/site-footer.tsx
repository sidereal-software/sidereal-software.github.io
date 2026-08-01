export function SiteFooter() {
  return (
    <footer className="bg-background/80 border-t backdrop-blur-md">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-10 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p>
          &copy; {new Date().getFullYear()} Sidereal Software · Los Angeles, California
        </p>
        <p className="font-serif tracking-wide">Engineering the night sky</p>
      </div>
    </footer>
  )
}
