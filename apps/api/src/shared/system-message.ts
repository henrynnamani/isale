export const USER_EXIST = 'User Already Exist';
export const USER_CREATED_SUCCESSFULLY = 'User Created Successfully';
export const USER_DOES_NOT_EXIST = 'User does not exist';

export const DB_CONNECTION_ERROR = 'Error connecting to Database';
export const USER_WITH_EMAIL_EXIST = 'User with email already exist';

export const VENDOR_SUBACCOUNT_PAYLOAD_DESCRIPTION = 'Vendor payout subaccount';
export const VENDOR_EXISTS = 'Vendor already Exist';
export const VENDOR_ACTIVATED_SUCCESSFULLY = 'Vendor activated';
export const VENDOR_DEACTIVATED_SUCCESSFULLY = 'Vendor deactivated';
export const VENDOR_NOT_FOUND = 'Vendor Not Found';
export const VENDOR_PRODUCT_LIST = 'Vendor product list';

export const ERROR_UPLOADING_TO_CLOUDINARY =
  'Error encountered uploading to Cloudinary';

export const BRAND_EXISTS = (brand: string) => `Brand: ${brand} already exist`;
export const BRAND_CREATED_SUCCESSFULLY = 'Brand successfully created';
export const BRAND_DELETED_SUCCESSFULLY = 'Brand successfully deleted';
export const BRAND_DOES_NOT_EXIST = (brand: string) =>
  `Brand: ${brand} does not exist`;
export const BRAND_LIST_FETCHED_SUCCESSFULLY = 'Brands fetched successfully';

export const RAM_CREATED_SUCCESSFULLY = 'Ram successfully created';
export const RAM_ALREADY_EXIST = 'Ram already eixst';

export const ROM_CREATED_SUCCESSFULLY = 'Rom successfully created';
export const ROM_ALREADY_EXIST = 'Rom already exist';

export const COLOR_NOT_FOUND = (color: string) => `Color(${color}) not found`;
export const COLOR_ALREADY_EXIST = (color: string) =>
  `Color(${color}) already exist`;
export const COLOR_CREATED_SUCCESSFULLY = 'Color created successfully';
export const COLOR_DELETED_SUCCESSFULLY = 'Color deleted successfully';

export const CATEGORY_ALREADY_EXIST = 'Category already exists';
export const CATEGORY_SUCCESSFULLY_CREATED = 'Category successfully created';
export const CATEGORY_NOT_FOUND = (category: string) =>
  `Category(${category}}) not found`;

export const PRODUCT_CREATED_SUCCESSFULLY = 'Product successfully created';
export const PRODUCT_DOES_NOT_EXIST = 'Product does not exist';
export const PRODUCT_LIST = 'Successfully fetched product list';
export const PRODUCT_DETAIL_FETCHED_SUCCESSFULLY =
  'Product detail successfully fetched';
export const PRODUCT_DELETED_SUCCESSFULLY = 'Product successfully deleted';
export const PRODUCT_UPDATED_SUCCESSFULLY = 'Product updated successfully';

export const REVIEW_CREATED_SUCCESSFULLY = 'Review created successfully';
export const REVIEW_DELETED_SUCCESSFULLY = 'Review deleted successfully';
export const REVIEW_DOES_NOT_EXIST = 'Review does not exist';

export const CART_DOES_NOT_EXIST = 'Cart does not exist';
export const CART_UPDATED_SUCCESSFULLY = 'Cart updated';
export const CART_EMPTY = 'Cart is empty';
export const CART_CLEARED_SUCCESSFULLY = 'Cart cleared successfully';

export const ORDER_PLACED_SUCCESSFULLY = 'Order successfully placed';
export const ORDER_DETAIL_FETCHED = 'Order detail fetched';
export const ORDER_LIST_FETCHED = 'Order list fetched';
export const ORDER_NOT_FOUND = 'Order not found';
export const ORDER_UPDATED_SUCCESSFULLY = 'Order updated successfully';

export const PAYMENT_FAILED = 'Transaction failed';

export const CRYPTO_PAYMENT_INITIALIZATION_FAILED =
  'Crypto payment initialization failed';
export const NOWPAYMENT_API_UNAVAILABLE =
  'NowPayments service is currently unavailable.';
export const NOWPAYMENT_MINIMUM_AMOUNT = (
  estimated_amount: number,
  min_amount: number,
) =>
  `Estimated amount ${estimated_amount} is less than the minimum allowed ${min_amount}.`;

export const EXPIRED_OTP = 'Otp has expired';

export const INVALID_CREDENTIAL = 'Invalid credential';
export const SIGN_IN = 'Sign in successfully';
export const USER_EMAIL_UNVERIFIED = 'Email not verified';
export const INVALID_TOKEN = 'Invalid token';
