const initState = 0;

type Product = {
	id: number;
	category: string;
	title: string;
	description: string;
	price: number;
	texture: string;
	wash: string;
	place: string;
	note: string;
	story: string;
	main_image: string;
	images: string[];
	variants: { color_code: string; size: string; stock: number }[];
	colors: { code: string; name: string }[];
	sizes: string[];
};

type Variant = {
	color_code: string;
	size: string;
	stock: number;
};

export type Add = {
	type: 'ADD';
	payload: {
		selectedSize: string;
		selectedColorCode: string;
		product: Product;
		quantity: number;
	};
	state: number;
};

export type Delete = {
	type: 'deleteCart';
	payload: {
		curIndex: number;
	};
	state: number;
};
export type Change = {
	type: 'changeCart';
	payload: {
		curIndex: number;
		curQty: number;
	};
	state: number;
};
export type Done = {
	type: 'done';
};

const rootReducer = (
	state = initState,
	action: Add | Delete | Change | Done
) => {
	switch (action.type) {
		case 'ADD': {
			return addToCart(state);
		}
		case 'deleteCart': {
			return deleteItem(action.payload, state);
		}
		// case 'changeCart': {
		// 	return changeItemQuantity(action.payload, state);
		// }
		case 'done': {
			return [];
		}
		default: {
			return state;
		}
	}
};

// export function getProduct(
// 	cartItems: Cart,
// 	curProductId: number,
// 	colorCode: string,
// 	size: string
// ) {
// 	return cartItems.findIndex(
// 		item =>
// 			item.id === curProductId &&
// 			item.color.code === colorCode &&
// 			item.size === size
// 	);
// }

// export function getStock(
// 	product: Product,
// 	cartItems: Cart,
// 	colorCode: string,
// 	size: string
// ) {
// 	const getCurProduct = getProduct(cartItems, product.id, colorCode, size);
// 	if (getCurProduct !== -1) return cartItems[getCurProduct].stock;
// 	const getVariants = product.variants.find(
// 		variant => variant.color_code === colorCode && variant.size === size
// 	) as Variant;
// 	return getVariants.stock;
// }

// export function getQuantity(
// 	product: Product,
// 	cartItems: Cart,
// 	colorCode: string,
// 	size: string
// ) {
// 	const getCurProduct = getProduct(cartItems, product.id, colorCode, size);
// 	if (getCurProduct !== -1) {
// 		return cartItems[getCurProduct].qty;
// 	} else {
// 		return 0;
// 	}
// }

export function addToCart(state: number) {
	return (state += 1);
}

// export function changeItemQuantity(
// 	{
// 		curIndex,
// 		curQty
// 	}: {
// 		curIndex: number;
// 		curQty: number;
// 	},
// 	state: number
// ) {
// 	const updateCartItems = state.map((item: Object, index: number) =>
// 		index === curIndex
// 			? {
// 					...item,
// 					qty: curQty
// 			  }
// 			: item
// 	);
// 	return updateCartItems;
// }

export function deleteItem({ curIndex }: { curIndex: Number }, state: number) {
	return (state -= 1);
}

export default rootReducer;
