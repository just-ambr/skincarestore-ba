import { Fragment } from "react";
import React from "react";
import { Link } from "react-router-dom";

import "./top-category.styles.scss";

const Category = ({ imageSrc, title, route }) => (
	<Link to={route} className="category">
		<img src={imageSrc} alt={title} className="category-image" />
		<div className="category-title">{title}</div>
	</Link>
);

const TopCategories = ({ categories }) => {
	return (
		<Fragment>
			<h1 className="wavy-underline">Our Top Categories</h1>
			<div className="top-categories">
				{categories?.map((cat) => (
					<Category
						key={cat.id}
						imageSrc={cat.imageUrl}
						title={cat.title}
						route={cat.route}
					/>
				))}
			</div>
		</Fragment>
	);
};

export default TopCategories;
