import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <div style={{ background: 'linear-gradient(145deg, #001a33 0%, #003366 100%)' }}>
      {/* Spacer voor de vaste header — zelfde kleur als Contact sectie zodat er geen lichte band zichtbaar is */}
      <div className="pt-24" />
      <Contact />
    </div>
  )
}
