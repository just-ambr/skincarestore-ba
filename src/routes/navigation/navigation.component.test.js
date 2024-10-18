import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Navigation from "./navigation.component";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("Navigation Component", () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			user: {
				currentUser: null,
			},
			cart: {
				isCartOpen: false,
				cartItems: [],
			},
		});
	});

	test('should display "SIGN IN" when no user is logged in', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Navigation />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText("SIGN IN")).toBeInTheDocument();
		expect(screen.queryByText("MY PROFILE")).not.toBeInTheDocument();
	});

	test('should display "MY PROFILE" and "SIGN OUT" when user is logged in', () => {
		store = mockStore({
			user: {
				currentUser: { id: "123", name: "Test User" },
			},
			cart: {
				isCartOpen: false,
				cartItems: [],
			},
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Navigation />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText("MY PROFILE")).toBeInTheDocument();
		expect(screen.getByText("SIGN OUT")).toBeInTheDocument();
		expect(screen.queryByText("SIGN IN")).not.toBeInTheDocument();
	});

	test('should show "SIGN IN" and hide "MY PROFILE" after clicking "SIGN OUT"', () => {
		store = mockStore({
			user: {
				currentUser: { id: "123", name: "Test User" },
			},
			cart: {
				isCartOpen: false,
				cartItems: [],
			},
		});

		const { rerender } = render(
			<Provider store={store}>
				<BrowserRouter>
					<Navigation />
				</BrowserRouter>
			</Provider>
		);

		fireEvent.click(screen.getByText("SIGN OUT"));

		store = mockStore({
			user: {
				currentUser: null,
			},
			cart: {
				isCartOpen: false,
				cartItems: [],
			},
		});

		rerender(
			<Provider store={store}>
				<BrowserRouter>
					<Navigation />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText("SIGN IN")).toBeInTheDocument();

		expect(screen.queryByText("MY PROFILE")).not.toBeInTheDocument();
	});
});
