import { Link } from "react-router-dom";

import "./header.styles.scss";

import React, { useState } from "react";

const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const openDropdown = () => setIsDropdownOpen(true);
	const closeDropdown = () => setIsDropdownOpen(false);

	return (
		<header className="header" style={{ backgroundColor: "#faf9f6" }}>
			<div className="header-brand"></div>
			<nav className="header-nav">
				<div
					className="nav-item"
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}>
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
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}>
					<span>BODY CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/bodycare/showergels">
								Shower Gels
							</Link>
							<Link to="/shop/bodycare/bodylotions">
								Body Lotions
							</Link>
							<Link to="/shop/bodycare/handcare">
								Hand and Foot Care
							</Link>
							<Link to="/shop/bodycare/bodyoils">Body Oils</Link>
							<Link to="/shop/bodycare/bodypeelings">
								Body Peelings
							</Link>
							<Link to="/shop/bodycare/sunprotection">
								Sun Protection
							</Link>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}>
					<span>HAIR CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/haircare/shampoos">Shampoos</Link>
							<Link to="/shop/haircare/conditioners">
								Conditioners
							</Link>
							<Link to="/shop/haircare/hairtreatments">
								Hair Masks & Treatments
							</Link>
							<Link to="/shop/haircare/scalpcare">
								Hair + Scalp Oils & Scalp Care
							</Link>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}>
					<span>ACCESSOIRES</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/accessoires/tools">Tools</Link>
							<Link to="/shop/accessoires/tech">Tech</Link>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}>
					<span>OUR BOXES</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/boxes/all">All Boxes</Link>
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={openDropdown}
					onMouseLeave={closeDropdown}>
					<span>SKIN CONCERNS</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/skinconcerns/antiaging">
								Anti-Aging
							</Link>
							<Link to="/shop/skinconcerns/sensitiveskin">
								Sensitive Skin
							</Link>
							<Link to="/shop/skinconcerns/acneprone">
								Acne Prone Skin
							</Link>
							<Link to="/shop/skinconcerns/dryskin">
								Dry Skin
							</Link>
							<Link to="/shop/skinconcerns/oilyskin">
								Oily Skin
							</Link>
						</div>
					)}
				</div>
			</nav>
			<div className="header-actions"></div>
		</header>
	);
};

export default Header;
