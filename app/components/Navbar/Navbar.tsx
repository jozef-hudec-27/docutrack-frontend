function Navbar({ big }: { big?: boolean }) {
  return (
    <nav className={`navbar ${big ? 'navbar--big' : 'navbar--small'}`}>
      <p className="text-4xl sm:text-5xl font-bold text-black-100 cursor-default">🔎 DocuTrack</p>
    </nav>
  )
}

export default Navbar
