
export default function errorHandler(err, req, res, next) {
 
  if (!err) return next();

  // Mặc định
  let status = err.status || err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details = undefined;

  // Joi validation
  if (err.isJoi || err?.name === "ValidationError") {
    status = 400;
    message = "Validation error";
    details = err.details?.map(d => d.message) || [err.message];
  }

  // Multer (upload)
  if (err.name === "MulterError") {
    status = 400;
    message = err.code === "LIMIT_FILE_SIZE" ? "File quá lớn" : `Upload error: ${err.code}`;
  }

  // Prisma (P2002 unique, P2025 not found, …)
  if (err.code?.startsWith?.("P")) {
    status = 400;
    if (err.code === "P2002") message = "Dữ liệu trùng lặp (unique constraint)";
    if (err.code === "P2025") message = "Không tìm thấy bản ghi (record not found)";
  }

  // JWT
  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Token không hợp lệ";
  }
  if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token đã hết hạn";
  }

  // Trả JSON thống nhất
  const payload = { status: "error", message };
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
    if (details) payload.details = details;
  } else if (details) {
    payload.details = details;
  }

  res.status(status).json(payload);
}
