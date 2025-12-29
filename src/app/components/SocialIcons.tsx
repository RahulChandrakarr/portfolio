import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
          <a href="https://www.linkedin.com/in/rahul-kumar-a71518240/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
          </a>
        </li>
        <li>
          <a href="https://github.com/RahulChandrakarr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
          </a>
        </li>
        <li>
          <a href="mailto:rrahulchandrakar1@gmail.com">
            <FontAwesomeIcon icon={faGoogle} className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
          </a>
        </li>
      </ul>
    </div>
  );
}
