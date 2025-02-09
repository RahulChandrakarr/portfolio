import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram, faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';

type SocialIconsProps = {
  flex?: 'row' | 'column';
  position?: 'relative' | 'absolute';
};

export default function SocialIcons({ flex = 'column', position = 'absolute' }: SocialIconsProps) {
  return (
    <div className={`${position} right-0 top-10`}>
      <ul
        className={`flex ${flex === 'row' ? 'flex-row space-x-4' : 'flex-col gap-4'}`}
      >
        <li>
          <a href="https://www.facebook.com/profile.php?id=61565884160713" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="rrahulchandrakar1@gmail.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGoogle} className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/Rahulchandrakar08/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="https://github.com/RahulChandrakarr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/rahul-kumar-a71518240/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6" />
          </a>
        </li>
        
      </ul>
    </div>
  );
}
