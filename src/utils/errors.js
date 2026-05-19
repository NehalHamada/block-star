// RATIONALE: Sanitize backend error messages to hide raw database, SQL, or framework crash details from normal users and display friendly translations instead.
export const getFriendlyErrorMessage = (error, t, defaultMsgKey = "studio.errorMsg") => {
  const rawMessage = error?.response?.data?.message || error?.message || "";

  // Common database exception patterns, SQL statements, and framework crash terms
  const sqlOrCrashPatterns = [
    /sqlstate/i,
    /integrity constraint/i,
    /foreign key/i,
    /syntax error/i,
    /queryexception/i,
    /database/i,
    /mysql/i,
    /connection refused/i,
    /insert into/i,
    /delete from/i,
    /select \* from/i,
    /cannot add or update a child row/i,
    /column not found/i,
    /table .* doesn't exist/i,
    /laravel/i,
    /symfony/i,
    /stack trace/i,
    /fatal error/i,
    /internal server error/i
  ];

  const isDatabaseOrCrash = sqlOrCrashPatterns.some((pattern) => pattern.test(rawMessage));

  if (isDatabaseOrCrash) {
    return t("errors.databaseError", "حدث خطأ غير متوقع في الخادم. يرجى المحاولة مرة أخرى لاحقاً.");
  }

  if (typeof rawMessage === "string" && rawMessage.trim() !== "") {
    return rawMessage;
  }

  return t(defaultMsgKey, "حدث خطأ ما. يرجى المحاولة مرة أخرى.");
};
