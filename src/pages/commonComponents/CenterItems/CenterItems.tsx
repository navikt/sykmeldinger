import './CenterItems.less';

interface CenterItemsProps {
    vertical?: boolean;
    horizontal?: boolean;
}

const CenterItems: React.FC<CenterItemsProps> = ({ vertical = false, horizontal = false, children }) => {
    return (
        <div
            className={`center-items ${vertical ? 'center-items--vertical' : ''} ${
                horizontal ? 'center-items--horizontal' : ''
            }`}
        >
            {children}
        </div>
    );
};

export default CenterItems;
