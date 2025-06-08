const request = require("supertest");
const app = require("../index");

jest.mock("../middlewares/verifyToken", () => (req, res, next) => next());
jest.mock("../middlewares/validationSchema", () => ({
  validationSchemaLogin: () => (req, res, next) => next(),
  validationSchemaEditCourse: () => (req, res, next) => next(),
  validationSchemaAddCourse: () => (req, res, next) => next(),
  validateRegisterCourse: () => (req, res, next) => next(),
}));

// jest.mock("../controllers/users.controller", () => ({
//   getAllUsers: (req, res) => res.status(200).json({ message: "كل اليوزرز" }),
//   signUp: (req, res) => res.status(201).json({ message: "تم التسجيل" }),
//   login: (req, res) => res.status(200).json({ message: "تم تسجيل الدخول" }),
//   // ممكن تضيفي بقيت الدوال لو حابة تختبريها
// }));

describe("اختبارات API للكورسات", () => {
  it("GET /api/courses - لازم يرجع كل الكورسات", async () => {
    const res = await request(app).get("/api/courses");
    expect(res.statusCode).toBe(200);
    // ممكن تتحقق من بيانات معينة في res.body حسب الكود الفعلي
  });

  it("POST /api/courses - لازم يضيف كورس جديد", async () => {
    const res = await request(app).post("/api/courses").send({
      title: "كورسا جديد",
      description: "تفاصيل الكورس",
      instructorId: "6845211865a6351f620aaf72", // معرف مُدرس صحيح

      // أضيف باقي الحقول المطلوبة حسب الـ controller
    });
    expect(res.statusCode).toBe(201);
    // تحقق من استجابة التسجيل
  });

  // ممكن تضيف باقي اختبارات الـ PUT, DELETE, POST register...
});
// إزاي Mock بيشتغل عمليًا؟
// لما في كودك الأصلي (زي الـ routes أو الـ app) بيعمل require للـ controller،

// Jest بيحول الـ require ده على الموك اللي انت عرفتيه بدل الكود الحقيقي.
