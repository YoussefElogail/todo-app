export const asyncWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
        data: null,
      });
    }
  };
};
