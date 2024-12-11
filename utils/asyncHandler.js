const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
    // Ensure the `success` flag is included for successful operations
    if (!res.headersSent) {
      res.json({ success: true, ...res.locals.data });
    }
  } catch (err) {
    next(err);
  }
};

export default asyncHandler;
