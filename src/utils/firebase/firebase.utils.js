import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	deleteDoc,
	updateDoc,
	where,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyACcOtWL7D8jSyeoOQRYx0GPQRaNl3SP1w",
	authDomain: "ecom-db-7196c.firebaseapp.com",
	projectId: "ecom-db-7196c",
	storageBucket: "ecom-db-7196c.appspot.com",
	messagingSenderId: "186818674219",
	appId: "1:186818674219:web:08c36ca04df124172f746e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const googlePopupSignIn = () => signInWithPopup(auth, googleProvider);
export const googleRedirectSignIn = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase()); //TODO
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("doneeeee!");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) {
		return;
	}

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			if (error === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log(
					"Error creating the user!! Here is the error message: ",
					error
				);
			}
		}
	}
	return userDocRef;
};

export const userAuthCreationWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const userAuthSignInWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => {
	signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
	onAuthStateChanged(auth, () => onAuthStateChanged(auth, callback));
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};

//---

export const addFieldToItems = async () => {
	const categoriesRef = collection(db, "categories");
	const categoriesSnapshot = await getDocs(categoriesRef);

	const batch = writeBatch(db);

	categoriesSnapshot.forEach((categoryDoc) => {
		const newItems = categoryDoc.data().items.map((item) => {
			return { ...item, brand: item.brand || "" };
		});

		const categoryDocRef = doc(db, "categories", categoryDoc.id);
		batch.update(categoryDocRef, { items: newItems });
	});

	await batch.commit();
	console.log(
		"Alle 'items' wurden erfolgreich aktualisiert mit 'sellingCount'."
	);
};

export const updateFieldValueForItems = async (
	collectionName,
	docName,
	key,
	oldValue,
	newValue,
	limit
) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log("Das Dokument existiert nicht.");
		return;
	}

	const itemsArray = docSnap.data().items;
	let updateCount = 0;

	const updatedItems = itemsArray.map((item) => {
		if (
			(item[key] === "" || item[key] === oldValue) &&
			updateCount < limit
		) {
			updateCount++;
			return { ...item, [key]: newValue };
		}
		return item;
	});

	await updateDoc(docRef, { items: updatedItems });
	console.log(`${updateCount} Items wurden zu '${newValue}' aktualisiert.`);
};
// Beispielaufuf:
//updateFieldValueForItems('categories', 'sneakers', 'brand', 'Adidas', 'Nike', 2);

export const updateDocumentNameAndTitleField = async (
	collectionName,
	oldDocName,
	newDocName
) => {
	const oldDocRef = doc(db, collectionName, oldDocName);
	const newDocRef = doc(db, collectionName, newDocName);

	try {
		const oldDocSnap = await getDoc(oldDocRef);
		if (!oldDocSnap.exists()) {
			console.log("Das zu umbenennende Dokument existiert nicht!");
			return;
		}

		const oldData = oldDocSnap.data();
		const newData = { ...oldData, title: newDocName };

		await setDoc(newDocRef, newData);

		await deleteDoc(oldDocRef);
		console.log(
			`Dokument wurde erfolgreich von '${oldDocName}' zu '${newDocName}' umbenannt.`
		);
	} catch (error) {
		console.error("Fehler beim Umbenennen des Dokuments:", error);
	}
};
// Beispielaufuf:
//updateDocumentNameAndTitleField("categories", "sneakers", "skinconcerns");

export const addNewDocumentWithSameFields = async (
	collectionName,
	newDocName,
	exampleDocName
) => {
	const exampleDocRef = doc(db, collectionName, exampleDocName);
	const newDocRef = doc(db, collectionName, newDocName);

	try {
		const exampleDocSnap = await getDoc(exampleDocRef);
		if (!exampleDocSnap.exists()) {
			console.log("Beispiel-Dokument existiert nicht!");
			return;
		}

		const newData = { ...exampleDocSnap.data(), title: newDocName };

		await setDoc(newDocRef, newData);
		console.log(
			"Neues Dokument mit aktualisiertem Titel erfolgreich hinzugefügt."
		);
	} catch (error) {
		console.error("Fehler beim Hinzufügen eines neuen Dokuments:", error);
	}
};
// Beispielaufuf:
//addNewDocumentWithSameFields("categories", "haircare", "skincare");

const updateImageForCategory = async (categoryTitle) => {
	const functionEndpoint = "/.netlify/functions/unsplash";
	try {
		const response = await fetch(functionEndpoint, {
			method: "POST",
			body: JSON.stringify({ searchTerm: categoryTitle }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const { imageUrls } = await response.json();
		return imageUrls;
	} catch (error) {
		console.error("Fehler beim Abrufen der Bilder: ", error);
		return [];
	}
};

export const updateCategoryImageUrls = async () => {
	const categoriesSnapshot = await getDocs(collection(db, "categories"));
	const batch = writeBatch(db);

	for (const categoryDoc of categoriesSnapshot.docs) {
		const categoryData = categoryDoc.data();
		const imageUrls = await updateImageForCategory(categoryData.title);

		if (imageUrls.length > 0) {
			const updatedItems = categoryData.items.map((item, index) => {
				const imageUrl = imageUrls[index % imageUrls.length];
				return { ...item, imageUrl };
			});

			batch.update(categoryDoc.ref, { items: updatedItems });
		} else {
			console.error(
				`Keine Bilder für Kategorie ${categoryData.title} gefunden, überspringe Update.`
			);
		}
	}
	await batch.commit();
	console.log("Kategoriebilder wurden aktualisiert.");
};

export const addMultipleItemsToDocument = async (
	collectionName,
	docName,
	numberOfItems
) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log(
			"Das Dokument existiert nicht und kann daher nicht aktualisiert werden."
		);
		return;
	}

	const itemsArray = docSnap.data().items;
	if (itemsArray.length === 0) {
		console.log("Keine Items zum Kopieren vorhanden.");
		return;
	}

	const lastItem = itemsArray[itemsArray.length - 1];
	const lastItemId = lastItem.id;

	let newItemId = lastItemId;

	for (let i = 0; i < numberOfItems; i++) {
		newItemId++;
		const newItem = {
			...lastItem,
			id: newItemId,
			name: `Neues Produkt ${newItemId}`,
		};
		itemsArray.push(newItem);
	}

	await updateDoc(docRef, { items: itemsArray });
	console.log(
		`Es wurden ${numberOfItems} neue Items zum Dokument "${docName}" hinzugefügt.`
	);
};
// Beispielaufuf:
//addMultipleItemsToDocument("categories", "bathandbody", 10);

export const reassignItemIDs = async (collectionName) => {
	const collectionRef = collection(db, collectionName);
	const batch = writeBatch(db);

	const querySnapshot = await getDocs(collectionRef);
	let currentId = 1;

	querySnapshot.forEach((docSnapshot) => {
		const items = docSnapshot.data().items.map((item) => {
			return { ...item, id: currentId++ };
		});

		batch.update(docSnapshot.ref, { items });
	});

	await batch.commit();
	console.log("Alle Item-IDs wurden neu zugewiesen.");
};
// Beispielaufuf:
//reassignItemIDs("categories");

export const deleteItemsInRange = async (
	collectionName,
	docName,
	startId,
	endId
) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log("Das Dokument existiert nicht.");
		return;
	}

	const itemsArray = docSnap.data().items;
	const filteredItems = itemsArray.filter((item) => {
		return !(item.id >= startId && item.id <= endId);
	});

	await updateDoc(docRef, { items: filteredItems });
	console.log(
		`Items von ID ${startId} bis ${endId} in ${docName} wurden erfolgreich gelöscht.`
	);
};
// Beispielaufruf der Funktion:
//deleteItemsInRange("categories", "spf", 78, 132);

export const getProductsByCategoryAndSubCategories = async (
	category,
	subcategories
) => {
	const categoryDocRef = doc(db, "categories", category);

	const categoryDocSnapshot = await getDoc(categoryDocRef);

	if (categoryDocSnapshot.exists()) {
		const categoryData = categoryDocSnapshot.data();

		const filteredProducts = categoryData.items.filter((item) =>
			subcategories.includes(item.subCategory)
		);
		console.log("Abgefragte Produkte:", filteredProducts);

		return filteredProducts;
	} else {
		console.log("Dokument nicht gefunden:", category);
		return [];
	}
};

export const fetchProductsBySubCategory = async (category, subCategory) => {
	const ref = collection(db, category);
	const q = query(ref, where("subCategory", "==", subCategory));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getBrands = async () => {
	const collectionRef = collection(db, "brands");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getOurBoxes = async () => {
	const docRef = doc(db, "categories", "boxes");
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		return docSnapshot.data().items;
	} else {
		console.log("Sorry, there is not a Document like this!");
		return [];
	}
};

export const getUsers = async () => {
	const docRef = doc(db, "users", "userDocumentId");
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		return docSnapshot.data().items;
	} else {
		console.log("No users");
		return [];
	}
};

export const addMultipleDocumentsToCollection = async (
	collectionName,
	exampleDocId,
	numberOfDocuments
) => {
	const exampleDocRef = doc(db, collectionName, exampleDocId);
	const exampleDocSnap = await getDoc(exampleDocRef);

	if (!exampleDocSnap.exists()) {
		console.log("Beispiel-Dokument existiert nicht!");
		return;
	}

	const exampleData = exampleDocSnap.data();
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionName);

	for (let i = 0; i < numberOfDocuments; i++) {
		const newDocRef = doc(collectionRef);
		batch.set(newDocRef, exampleData);
	}

	try {
		await batch.commit();
		console.log(`${numberOfDocuments} Dokumente erfolgreich erstellt.`);
	} catch (error) {
		console.error("Fehler beim Hinzufügen von Dokumenten:", error);
	}
};
// Beispielaufuf:
//addMultipleDocumentsToCollection("brands", "b", 3);

export const addDescriptionFieldToAllDocuments = async (collectionName) => {
	try {
		const collectionRef = collection(db, collectionName);
		const querySnapshot = await getDocs(collectionRef);
		const batch = writeBatch(db);

		querySnapshot.forEach((docSnapshot) => {
			const docRef = doc(db, collectionName, docSnapshot.id);
			batch.update(docRef, { description: "Default description" });
		});

		await batch.commit();
		console.log(
			"Feld 'description' wurde erfolgreich zu allen Dokumenten hinzugefügt."
		);
	} catch (error) {
		console.error(
			"Fehler beim Hinzufügen des Feldes 'description':",
			error
		);
	}
};
// Beispielaufuf:
//addDescriptionFieldToAllDocuments("brands");

export const getUserDocument = async (uid) => {
	if (!uid) return;

	const userDocRef = doc(db, "users", uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		console.log("No user data found");
		return null;
	}

	return { id: userSnapshot.id, ...userSnapshot.data() };
};

export const updateUserDocument = async (uid, updatedData) => {
	if (!uid || !updatedData) return;

	const userDocRef = doc(db, "users", uid);

	try {
		await updateDoc(userDocRef, updatedData);
	} catch (error) {
		console.log("Error updating user data: ", error);
	}
};
