const httpConstants = {
    METHOD_TYPE: {
      POST: 'POST',
      GET: 'GET',
      PUT: 'PUT',
    },
    RESPONSE_STATUS: {
      SUCCESS: true,
      FAILURE: false,
    },
    RESPONSE_CODES: {
      UNAUTHORIZED: 401,
      SERVER_ERROR: 500,
      NOT_FOUND: 404,
      OK: 200,
      NO_CONTENT_FOUND: 204,
      BAD_REQUEST: 400,
      FORBIDDEN: 403,
      GONE: 410,
      UNSUPPORTED_MEDIA_TYPE: 415,
      TOO_MANY_REQUEST: 429,
    },
    LOG_LEVEL_TYPE: {
      INFO: 'info',
      ERROR: 'error',
      WARN: 'warn',
      VERBOSE: 'verbose',
      DEBUG: 'debug',
      SILLY: 'silly',
      FUNCTIONAL: 'functional',
      HTTP_REQUEST: 'http request',
    },

   
  };

  const apiEndpoints = {
    //for User endpoints
   REGISTER: '/register',
    LOGIN: '/login',
    
    //For category endpoints
    ADD_CATEGORY :'/add-category',
    GET_LIST_CATEGORTIES : '/get-list-categories',
    UPDATE_CATEGORY :'/update-category/:id',

    //for products endpoints

    ADD_PRODUCT : '/add-product',
    UPDATE_PRODUCT : '/update-product/:id',
    GET_LIST_PRODUCTS : '/get-list-products/:id',
    GET_PRODUCT_DETAILS : '/get-product-details/:id',

    // for Cart endpoints 

    ADD_PRODUCT_TO_CART : '/add-product-to-cart',
    GET_CART_DETAILS : '/get-cart-details/:userID',
    UPDATE_CART_DETAILS : '/update-cart-details/:userID/:productID',
    REMOVE_CART_ITEM : '/remove-cart-details/:userID/:productID',

    //for order endpoints

    ORDER_PLACE : '/order-place/:userID',
    GET_ORDER_DETAILS : '/get-order-details/:userID',
    GET_ORDER_DETAILS_BY_ID : '/get-order-details-by-id/:orderID',

  };
  const apiSuccessMessage = {
    FETCH_SUCCESS:"Data Fetched Successfully",
    POST_SUCCESS_MESSAGE: 'Information added successfully',
  }
  const apiFailureMessage = {
    INVALID_PARAMS: 'Invalid Parameters',
  INVALID_REQUEST: 'Invalid Request',
  INVALID_SESSION_TOKEN: 'Invalid session token',
  INTERNAL_SERVER_ERROR: 'Internal server Error',
  BAD_REQUEST: 'Bad Request!',
  DEVICE_ID_OR_SESSION_TOKEN_EMPTY:
    'Device id or session token can not be empty or null',
  SESSION_GENERATION: 'Unable to generate session!',
  SESSION_EXPIRED: 'Session Expired!',
  DATA_DOES_NOT_EXIST: 'Data does not exist with the given inferenceId',
  }

  module.exports = {
    httpConstants,
    apiEndpoints,
    apiSuccessMessage,
    apiFailureMessage

  };