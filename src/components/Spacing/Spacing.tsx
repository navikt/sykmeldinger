import './Spacing.less';

interface SpacingProps {
    direction?: 'top' | 'bottom';
    amount?: 'x-small' | 'small' | 'medium' | 'large';
}

const Spacing: React.FC<SpacingProps> = ({ direction = 'bottom', amount = 'medium', children }) => {
    return <div className={`spacing--${direction}-${amount}`}>{children}</div>;
};

export default Spacing;
