// FullWidthNavLink.tsx
import styles from '@/styles/FullWidthNavLink.module.css'; // You will create this CSS module

type FullWidthNavLinkProps = {
	isSelected: boolean; // This prop indicates if the link is currently selected
	onClick: () => void; // This prop is the click handler
	children: React.ReactNode; // Children components (e.g., icon, text)
};

const FullWidthNavLink = ({ isSelected, onClick, children }: FullWidthNavLinkProps) => {
	const linkStyle = isSelected ? `${styles.navLink} ${styles.selected}` : styles.navLink;

	return (
		<div className={linkStyle} onClick={onClick}>
			{children}
		</div>
	);
};

export default FullWidthNavLink;
