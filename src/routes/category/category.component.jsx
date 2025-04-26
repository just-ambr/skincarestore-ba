import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import Slider from "../../components/routes-slider/routes-slider.component";

import {
	selectCategories,
	selectCategoriesMap,
	selectIsLoading,
	selectFilteredProducts,
} from "../../store/categories/categories.selector";

import { fetchProductsBySubCategoryStart } from "../../store/categories/categories.action";

import "./category.styles.scss";

const Category = () => {
	const { category, subcategory } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsLoading);
	const [products, setProducts] = useState(categoriesMap[category] || []);

	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const filteredProducts = useSelector(selectFilteredProducts);

	// useEffect(() => {
	// 	if (category && subcategory) {
	// 		const subcategories = subcategory.split(",");
	// 		dispatch(fetchProductsBySubCategoryStart(category, subcategories));
	// 	} else if (category) {
	// 		setProducts(categoriesMap[category] || []);
	// 	} else {
	// 		const allProducts = categories.flatMap((cat) => cat.items);
	// 		setProducts(allProducts);
	// 	}
	// }, [category, subcategory, categoriesMap, categories, dispatch]);

	// useEffect(() => {
	// 	if (subcategory) {
	// 		console.log(
	// 			"Gefilterte Produkte in der Komponente:",
	// 			filteredProducts
	// 		);
	// 		setProducts(filteredProducts);
	// 	} else if (category) {
	// 		setProducts(categoriesMap[category] || []);
	// 	}
	// }, [filteredProducts, subcategory, category, categoriesMap]);

	// useEffect(() => {
	// 	console.log("Products in state:", products);
	// }, [products]);

	// useEffect(() => {
	// 	console.log(
	// 		"Categories in Redux store after data loading:",
	// 		categoriesMap
	// 	);
	// 	console.log("Products for the category:", categoriesMap[category]);
	// }, [category, categoriesMap]);

	// useEffect(() => {
	// 	console.log(
	// 		"Kategorien im Redux-Store nach Datenladung:",
	// 		categoriesMap
	// 	);
	// 	console.log("Produkte für die Kategorie:", categoriesMap[category]);
	// 	if (categoriesMap[category]) {
	// 		setProducts(categoriesMap[category]);
	// 	}
	// }, [category, categoriesMap]);

	useEffect(() => {
		if (!categoriesMap || Object.keys(categoriesMap).length === 0) return;

		if (subcategory && filteredProducts.length > 0) {
			console.log("Setting filtered products (Subcategory active)");
			setProducts(filteredProducts);
		} else if (category && categoriesMap[category]) {
			console.log("Setting category products");
			setProducts(categoriesMap[category]);
		} else if (categories.length > 0) {
			console.log("Setting all products (no category)");
			const allProducts = categories.flatMap((cat) => cat.items);
			setProducts(allProducts);
		}
	}, [category, subcategory, categoriesMap, filteredProducts, categories]);

	const getStartIndex = () => {
		if (category === "skincare") return 0;
		if (category === "bodycare") return 1;
		if (category === "haircare") return 2;
		if (category === "accessoires") return 3;
		if (category === "boxes") return 4;
		if (category === "skinconcerns") return 5;
		return 0;
	};

	return (
		<Fragment>
			<h2 className="category-title">
				{subcategory
					? `${category.toUpperCase()} - ${subcategory.toUpperCase()}`
					: category.toUpperCase()}
			</h2>
			<Slider
				key={`${category}-${subcategory}`}
				startIndex={getStartIndex()}
			/>

			{isLoading ? (
				<Spinner />
			) : (
				<div className="category-container">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</Fragment>
	);
};

export default Category;
