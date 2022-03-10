import { RiSmartphoneFill } from 'react-icons/ri';
import { FaHouseUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { HiCursorClick } from 'react-icons/hi';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-title">
        Pomoc Prawna.Nieruchomości - Usługi Budowlane
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <HiCursorClick /> Tekst zaznaczony kolorem{' '}
          <span className="link">zielonym</span> jest interaktywny
        </div>

        <div className="contact-all">
          <div className="contact-icon">
            <RiSmartphoneFill color="white" size="40px" />
          </div>{' '}
          <span className="contact-number">
            Zadzwoń:{' '} <br />
            PomocPrawna. Nieruchomości <a href="tel:662400919" className="link">
              662 400 919
            </a>{' '}<br />
            
            Usługi Remontowo-Budowlane <a href="tel:692054505" className="link">
              692 054 505
            </a>{' '}<br />

            NEXT1 SERWIS <a href="tel:575177911" className="link">
              575 177 911
            </a>{' '}<br />

            AS Pośrednictwo Kredytowe <a href="tel:515155312" className="link">
            515 155 312

            </a>{' '} 

          </span>
        </div>

        <div className="contact-all">
          <div className="contact-icon">
            {' '}
            <IoMdMail color="white" size="40px" />{' '}
          </div>{' '}
          <span className="contact-number">
            {' '}
            Napisz maila:{' '}
            <a href="mailto: nieruchomosci15@gmail.com" className="link">
              pomoc.nieruchomosci15@gmail.com
            </a>{' '}
          </span>
        </div>

        <div className="contact-all bez-ramki">
          <div className="contact-icon">
            <FaHouseUser color="white" size="40px" />
          </div>{' '}
          <span className="contact-number">
            Agnieszka Adamska
            <br />
            <a
              href="https://www.google.pl/maps/place/Elmet+Sp.+z+o.o./@51.247382,22.511485,17z/data=!4m12!1m6!3m5!1s0x472259c8b82eb211:0xf59e17a7395f2749!2sElmet+Sp.+z+o.o.!8m2!3d51.2474077!4d22.5113118!3m4!1s0x472259c8b82eb211:0xf59e17a7395f2749!8m2!3d51.2474077!4d22.5113118"
              className="link"
              target="_blank"
            >
              ul. Wojciechowska 5 budynek ELMET
            </a>
            <br />
            III piętro, pokój 35 a<br />
            20 - 400 Lublin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
