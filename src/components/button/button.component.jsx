import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			className={`button-container ${
				BUTTON_TYPE_CLASSES[buttonType] || BUTTON_TYPE_CLASSES.base
			}`}
			disabled={isLoading}
			{...otherProps}>
			{isLoading ? <div className="button-spinner" /> : children}
		</button>
	);
};

export default Button;
