import { Link } from "react-router-dom";

import "./header.styles.scss";

import React, { useState } from "react";

const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<header className="header" style={{ backgroundColor: "#faf9f6" }}>
			<div className="header-brand"></div>
			<nav className="header-nav">
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>SKIN CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/skincare/cleansers">Cleansers</Link>
							<Link to="/shop/skincare/moisturizers">
								Moisturizers
							</Link>
							<Link to="/shop/skincare/serums">
								Serums and Essences
							</Link>
							<Link to="/shop/skincare/masks">
								Masks and Peelings
							</Link>
							<Link to="/shop/skincare/sunprotection">
								Sun Protection
							</Link>
							<Link to="/shop/skincare/lipoils,lipmasks">
								Lip Caree
							</Link>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>BODY CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/bodycare/showergel">
								Shower Gel
							</Link>
							<Link to="/shop/bodycare/bodylotion">
								Body Lotions
							</Link>
							<Link to="/shop/bodycare/handcare">
								Hand and Foot Care
							</Link>
							<Link to="/shop/bodycare/showergel">Body Oils</Link>
							<Link to="/shop/bodycare/showergel">
								Body Peelings
							</Link>
							<Link to="/shop/bodycare/showergel">
								Sun Protection
							</Link>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>HAIR CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/haircare/shampoo">Shampoos</a>
							<a href="/shop/haircare/shampoo">Conditioners</a>
							<a href="/shop/haircare/shampoo">
								Hair Masks & Hair Treatments
							</a>
							<a href="/shop/haircare/shampoo">
								Hair + Scalp Oils & Scalp Care
							</a>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>ACCESSOIRES</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/accessoires/">Tools</a>
							<a href="/shop/accessoires/">Techs</a>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>OUR BOXES</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/boxes">All Boxes</a>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>SKIN CONCERNS</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/skinconcerns/antiaging">
								Anti-Aging
							</a>
							<a href="/shop/skinconcerns/antiaging">
								Sensitive Skin
							</a>
							<a href="/shop/skinconcerns/antiaging">
								Acne Prone Skin
							</a>
							<a href="/shop/skinconcerns/antiaging">Dry Skin</a>
							<a href="/shop/skinconcerns/antiaging">Oily Skin</a>
						</div>
					)}
				</div>
			</nav>
			<div className="header-actions"></div>
		</header>
	);
};

export default Header;
