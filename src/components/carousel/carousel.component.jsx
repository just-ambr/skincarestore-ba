import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "../button/button.component";

import { updateCategoryImageUrls } from "../../utils/firebase/firebase.utils";

import "./carousel.styles.scss";

const CarouselComponent = () => {
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 1024 },
			items: 4,
			slidesToSlide: 1,

			infinite: true,
		},
		desktop: {
			breakpoint: { max: 1024, min: 900 },
			items: 3,
			infinite: true,
			slidesToSlide: 1,
		},
		tablet: {
			breakpoint: { max: 900, min: 464 },
			items: 3,
			infinite: true,
			slidesToSlide: 1,
		},
	};

	const productData = [
		{
			id: 1,
			imageUrl:
				"https://images.unsplash.com/photo-1586264508495-d10fbde7360a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDM5Mg&ixlib=rb-4.0.3&q=60&w=500",
			name: "Niacinamide und Zinc",
			price: 20.0,
			description: "some description about product..",
		},
		{
			id: 2,
			imageUrl:
				"https://images.unsplash.com/photo-1708247899914-db888e0ce29a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDI2MA&ixlib=rb-4.0.3&q=80&w=300",
			name: "Anua Niacin Serum",
			price: 26.0,
			description: "some description about product..",
		},
		{
			id: 3,
			imageUrl:
				"https://images.unsplash.com/photo-1709038459992-f44881f89157?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDI3NQ&ixlib=rb-4.0.3&q=80&w=300",
			name: "Mixsoon Bean Cream",
			price: 16.0,
			description: "some description about product..",
		},
		{
			id: 4,
			imageUrl:
				"https://images.unsplash.com/photo-1707657282066-73137e51af56?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDI5MQ&ixlib=rb-4.0.3&q=80&w=300",
			name: "Hydro Boost Cleanser",
			price: 39.0,
			description: "some description about product..",
		},
		{
			id: 5,
			imageUrl:
				"https://images.unsplash.com/photo-1708384761254-32964bd16c49?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDMwOQ&ixlib=rb-4.0.3&q=80&w=300",
			name: "Kiehl’s Cream",
			price: 72.0,
			description: "some description about product..",
		},
		{
			id: 6,
			imageUrl:
				"https://images.unsplash.com/photo-1709038459992-f44881f89157?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDI3NQ&ixlib=rb-4.0.3&q=80&w=300",
			name: "Guasha",
			price: 16.0,
			description: "some description about product..",
		},
		{
			id: 7,
			imageUrl:
				"https://images.unsplash.com/photo-1707657282066-73137e51af56?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDI5MQ&ixlib=rb-4.0.3&q=80&w=300",
			name: "Real Barrier Cream",
			price: 39.0,
			description: "some description about product..",
		},
		{
			id: 8,
			imageUrl:
				"https://images.unsplash.com/photo-1708384761254-32964bd16c49?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIxMDMwOQ&ixlib=rb-4.0.3&q=80&w=300",
			name: "Glossier Shampoo",
			price: 72.0,
			description: "some description about product..",
		},
	];

	const handleUpdateImages = async () => {
		try {
			await updateCategoryImageUrls();
			alert("Bilder wurden erfolgreich aktualisiert.");
		} catch (error) {
			console.error("Fehler beim Aktualisieren der Bilder:", error);
			alert("Fehler beim Aktualisieren der Bilder.");
		}
	};

	return (
		<div className="carousel-contianer">
			<div className="text">
				<h1 className="wavy-underline">Most Loved Products</h1>
				<p>
					Here you'll find our best-selling products that have earned
					the love and trust of our customers. These top-rated items
					are the most popular in our collection, chosen for their
					exceptional quality and effectiveness. Discover why these
					products are favorites among skincare enthusiasts and see
					for yourself the difference they can make in your skincare
					routine.
				</p>
			</div>

			<Carousel
				responsive={responsive}
				infinite={true}
				arrows={false}
				autoPlay={true}
				showDots={true}
				dotListClass="custom-dot-list-style">
				{productData.map((item) => (
					<div className="card">
						<img
							alt="product"
							className="product--image"
							src={item.imageUrl}
						/>
						<h2>{item.name}</h2>
						<p className="price">{item.price}</p>
						<p>{item.description}</p>

						<Button buttonType="inverted">Add to Card</Button>
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default CarouselComponent;
