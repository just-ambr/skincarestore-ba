import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { auth, googlePopupSignIn } from "./firebase.utils";

jest.mock("firebase/auth", () => {
	const actualAuth = jest.requireActual("firebase/auth");

	return {
		...actualAuth,
		getAuth: jest.fn(() => ({})),
		signInWithEmailAndPassword: jest.fn(),
		createUserWithEmailAndPassword: jest.fn(),
		signInWithPopup: jest.fn(),
	};
});

describe("Firebase Authentication", () => {
	const mockUserCredentials = {
		email: "test@example.com",
		password: "password123",
	};

	test("should successfully register a new user with email and password", async () => {
		createUserWithEmailAndPassword.mockResolvedValue({
			user: {
				uid: "12345",
				email: mockUserCredentials.email,
			},
		});

		const result = await createUserWithEmailAndPassword(
			auth,
			mockUserCredentials.email,
			mockUserCredentials.password
		);

		expect(result.user.email).toBe(mockUserCredentials.email);
		expect(result.user.uid).toBe("12345");
		expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
			auth,
			mockUserCredentials.email,
			mockUserCredentials.password
		);
	});

	test("should successfully login an existing user with email and password", async () => {
		signInWithEmailAndPassword.mockResolvedValue({
			user: {
				uid: "12345",
				email: mockUserCredentials.email,
			},
		});

		const result = await signInWithEmailAndPassword(
			auth,
			mockUserCredentials.email,
			mockUserCredentials.password
		);

		expect(result.user.email).toBe(mockUserCredentials.email);
		expect(result.user.uid).toBe("12345");
		expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
			auth,
			mockUserCredentials.email,
			mockUserCredentials.password
		);
	});

	test("should successfully login with Google Popup", async () => {
		signInWithPopup.mockResolvedValue({
			user: {
				uid: "67890",
				email: "googleuser@example.com",
			},
		});

		const result = await googlePopupSignIn();

		expect(result.user.email).toBe("googleuser@example.com");
		expect(result.user.uid).toBe("67890");
		expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
	});

	test("should fail to login with Google Popup if error occurs", async () => {
		signInWithPopup.mockRejectedValue(new Error("Google sign-in failed"));

		try {
			await googlePopupSignIn();
		} catch (error) {
			expect(error.message).toBe("Google sign-in failed");
		}

		expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
	});
});
