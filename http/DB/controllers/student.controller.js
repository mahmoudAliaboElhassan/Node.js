// controllers/studentController.js
const Student = require("../models/student.model");

const redis = require("redis");
const redisClient = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});
redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err);
});
redisClient.connect().then(() => console.log("✅works Redis"));

const { faker } = require("@faker-js/faker");

const createStudents = async (req, res) => {
  try {
    const students = [];

    for (let i = 0; i < 10000; i++) {
      const age = Math.floor(Math.random() * 10) + 18;
      students.push({
        name: faker.name.firstName(),
        age,
        aged: age, // نفس القيمة من غير index
        grade: ["A", "B", "C"][Math.floor(Math.random() * 3)],
        marks: Math.floor(Math.random() * 100),
      });
    }

    await Student.insertMany(students);
    res.send("✅ Inserted 10,000 students!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 🔍 تجميع: متوسط الدرجات حسب الاسم
const averageMarksByName = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$name",
          avgMarks: { $avg: "$marks" },
        },
      },
      { $sort: { avgMarks: -1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const statsByGrade = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$grade",
          count: { $sum: 1 },
          students: { $push: "$name" },

          // هنا إحنا جوه مرحلة $group (تجميع).

          // $sum: 1 معناه: "عدّ كل عنصر جاي في المجموعة".

          // لما تجمّع حسب حاجة (مثلاً حسب الـ grade)، لكل مجموعة (زي A، B، C)، بتعد عدد العناصر اللي فيها.

          // يعني هنا العد بيكون لكل مجموعة على حدة.
          //     avgMarks: { $avg: "$marks" }
        },
      },
      { $sort: { avgMarks: -1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const topStudentsCount = async (req, res) => {
  try {
    const result = await Student.aggregate([
      { $match: { marks: { $gt: 80 } } },
      { $count: "highScorers" },
      // count here is in aggregation
      // ده مرحلة مستقلة في الـ aggregation pipeline.

      // $count بتحسب العدد الكلي لكل المستندات اللي وصلت للمرحلة دي.

      // مش بتقسم على مجموعات، ده بيحسب عدد المستندات الإجمالي اللي مرّوا بالتصفية.

      // الاسم "highScorers" هو اسم الحقل اللي هيظهر في النتيجة النهائية.
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const namesGroupedByGrade = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$grade",
          students: { $push: "$name" },
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const marksDistribution = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $bucket: {
          groupBy: "$marks",
          boundaries: [0, 60, 70, 80, 90, 100],
          default: "Other",
          output: {
            count: { $sum: 1 },
            students: { $push: "$name" },
          },
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const topOldestStudents = async (req, res) => {
  try {
    const result = await Student.aggregate([
      { $sort: { age: -1 } },
      { $limit: 3 },
      { $project: { name: 1, age: 1, _id: 0 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// ✅ استعلام باستخدام index على age
const getByAgeIndexed = async (req, res) => {
  try {
    const { bodyAge } = req.body;

    const result = await Student.find({ age: { $gte: +bodyAge } }).explain(
      "executionStats"
    );
    res.json({
      count: result.executionStats.nReturned,
      executionTime: result.executionStats.executionTimeMillis,
      totalDocsExamined: result.executionStats.totalDocsExamined,
      indexUsed: result.queryPlanner.winningPlan.stage == "IXSCAN",
      rawExplain: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ❌ استعلام بدون index على aged
const getByAgedNoIndex = async (req, res) => {
  try {
    const { bodyAge } = req.body;
    const result = await Student.find({ aged: { $gte: +bodyAge } }).explain(
      "executionStats"
    );
    res.json({
      count: result.executionStats.nReturned,
      totalDocsExamined: result.executionStats.totalDocsExamined,
      executionTime: result.executionStats.executionTimeMillis,

      indexUsed: result.queryPlanner.winningPlan.stage == "IXSCAN",
      rawExplain: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getStudents = async (req, res) => {
  try {
    const cachedData = await redisClient.get("students");

    if (cachedData) {
      console.log("📦 data comes from Redis");
      return res.json(JSON.parse(cachedData));
    }

    console.log("📥 data comes from MongoDB");
    const students = await Student.find({}); // ← دي الكويري

    // نحط البيانات في الكاش لمدة 5 دقايق (300 ثانية)
    await redisClient.setEx("students", 300, JSON.stringify(students));

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "❌ حصل خطأ", error });
  }
};

module.exports = {
  createStudents,
  averageMarksByName,
  statsByGrade,
  topStudentsCount,
  namesGroupedByGrade,
  marksDistribution,
  topOldestStudents,
  getByAgeIndexed,
  getByAgedNoIndex,
  getStudents,
};

// $match — "فلترة البيانات"
// دي أول خطوة في الـ pipeline، يعني بتقولي لـ MongoDB:
// "هاتلي الناس اللي عندهم الشرط الفلاني"
// { $match: { marks: { $gt: 80 } } }

// 🔹 $group — "تجميع البيانات"
// يعني:

// "اجمعلي الناس حسب حاجة معينة وطلعلي بيانات عن كل مجموعة"

// زي لما تقولي:

// "عايزة أشوف كل Grade فيها كام طالب ومتوسط درجاتهم"

// 🔹 $push — "خزنلي كل القيم في Array"
// يعني:

// "جمعلي أسماء الناس في كل مجموعة وحطهم في Array"

// {
//   $group: {
//     _id: "$grade",
//     students: { $push: "$name" }
//   }
// }
// 📌 المعنى:

// كل Grade هتكون مجموعة

// وخد كل الأسماء اللي في الـ group دي، وادفهم في Array اسمها students

// result as
// [
//   {
//     "_id": "A",
//     "students": ["Ahmed", "Mona", "Ahmed"]
//   },
//   {
//     "_id": "B",
//     "students": ["Sara"]
//   }
// ]

// [
//   {
//     $group: {
//       _id: "$grade",              // نجمع حسب الـ grade
//       count: { $sum: 1 },         // نعد كام طالب في كل مجموعة
//       avgMarks: { $avg: "$marks" } // نحسب المتوسط
//     }
//   }
// ]
