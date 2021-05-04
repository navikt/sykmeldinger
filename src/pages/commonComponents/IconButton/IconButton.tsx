import { Element } from 'nav-frontend-typografi';
import './IconButton.less';

interface IconButtonProps {
    type: 'cross' | 'pluss';
    tekst: string;
    htmlType?: 'submit' | 'button' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton: React.FC<IconButtonProps> = ({ type, tekst, htmlType = 'button', onClick }) => {
    return (
        <button className="iconbutton" onClick={onClick} type={htmlType}>
            {type === 'cross' && (
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm3.571 7L17 8.429 13.428 12 17 15.571 15.571 17 12 13.428 8.429 17 7 15.571 10.572 12 7 8.429 8.429 7 12 10.572 15.571 7z"
                        fill="#a13a28"
                    ></path>
                </svg>
            )}
            {type === 'pluss' && (
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm1 6v5h5v2h-5v5h-2v-5H6v-2h5V6h2z"
                        fill="#0067C5"
                    ></path>
                </svg>
            )}
            <Element className={`iconbutton__tekst iconbutton__tekst--${type}`}>{tekst}</Element>
        </button>
    );
};

export default IconButton;
