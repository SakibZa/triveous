const {httpConstants} = require("../common/constant");
class LHTLogger {
  static info(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.INFO
    );
  }

  static debug(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.DEBUG
    );
  }

  static warn(functionName, message, payload = {}, devAlias = "") {
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.WARN
    );
  }

  static error(
    functionName,
    message,
    payload = {},
    errorStack = "",
    devAlias = ""
  ) {
    const errorOrigin = LHTLogger.parseErrorStack(errorStack);
    LHTLogger.log(
      functionName,
      message,
      payload,
      devAlias,
      httpConstants.LOG_LEVEL_TYPE.ERROR,
      errorOrigin
    );
  }

  static log(
    functionName,
    message,
    payload,
    devAlias,
    logType,
    errorOrigin = ""
  ) {
    let logString = ` ${logType} ${errorOrigin}: ${functionName}: ${message}: ${JSON.stringify(
      payload
    )}: Developer : ${devAlias}`;
    switch (logType) {
      case httpConstants.LOG_LEVEL_TYPE.WARN:
        console.warn(logString);
        break;
      case httpConstants.LOG_LEVEL_TYPE.DEBUG:
        console.debug(logString);
        break;
      case httpConstants.LOG_LEVEL_TYPE.ERROR:
        console.error(logString);
        break;
      default:
        console.log(logString);
    }
  }
}
module.exports = LHTLogger;
