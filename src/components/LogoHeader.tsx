import logoUrl from '../../assets/image-small.png';

export function LogoHeader() {
  return (
    <header className="logo-header">
      <a className="brand" href="/" aria-label="Vaxmarks Ontario home">
        <img src={logoUrl} alt="" className="brand__logo" />
        <span className="brand__text">Vaxmarks Ontario</span>
      </a>
      <div className="header-copy">
        <p className="eyebrow">Ontario immunization milestones</p>
        <h1>Data Explorer</h1>
        <p>
          Browse a structured record of vaccine policy, approval, eligibility,
          and program milestones for Ontario.
        </p>
      </div>
    </header>
  );
}
