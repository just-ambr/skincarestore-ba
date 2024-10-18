import slide1 from "../../assets/welcome-section5.png";

import "./image-slider.styles.scss";

const ImageSlider = () => {
	return (
		<>
			<section className="img-text-container" aria-label="Image Slider">
				<div className="img-container">
					<img
						className="img-slider-img"
						src={slide1}
						alt="Featured Slide"
						loading="eager"
					/>
					<div className="text-container">
						<p>
							Welcome to SkincareStore, your ultimate destination
							for all things skincare! Our online shop features a
							wide array of categories and brands, carefully
							curated to meet diverse skincare needs. Whether you
							are looking for hydrating serums, nourishing body
							lotions, or soothing scalp treatments, SkincareStore
							has you covered.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default ImageSlider;
