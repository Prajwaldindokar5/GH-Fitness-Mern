import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contactUs">
        <div className="contact-us">
          <div className="logo contact-logo">
            <strong>GH</strong>
            <span>Fitness</span>
          </div>
          <div className="contact-info">
            <p className="some-info">
              I'm a exprinced health Advisor,I help people to stay healthy.
            </p>
            <div className="info">
              <span className="material-symbols-outlined location-icon info-icon">
                location_on
              </span>
              <span>Maharashtra,India.</span>
            </div>
            <div className="info">
              <span className="material-symbols-outlined mail-icon info-icon">
                mail
              </span>
              <span>prajwaldindokar4@gmail.com</span>
            </div>
            <div className="info">
              <span className="material-symbols-outlined call-icon info-icon">
                call
              </span>
              <span>9876232387</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
