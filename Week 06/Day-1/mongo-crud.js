/**
 * Week 6 - Day 1: MongoDB CRUD Operations Demo Script
 * Executes and demonstrates all required MongoDB Shell operations:
 * - Insert One & Insert Many
 * - Find (all, single, filtered)
 * - Update One & Update Many
 * - Delete One & Delete Many
 */

// Simulated In-Memory MongoDB Collection for local execution & verification
class MongoCollection {
  constructor(name) {
    this.name = name;
    this.documents = [];
    this.idCounter = 1;
  }

  insertOne(doc) {
    const newDoc = { _id: `oid_${this.idCounter++}`, ...doc };
    this.documents.push(newDoc);
    console.log(`[insertOne] Inserted 1 document into ${this.name}:`, newDoc);
    return { acknowledged: true, insertedId: newDoc._id };
  }

  insertMany(docs) {
    const inserted = docs.map((d) => ({ _id: `oid_${this.idCounter++}`, ...d }));
    this.documents.push(...inserted);
    console.log(`[insertMany] Inserted ${inserted.length} documents into ${this.name}`);
    return { acknowledged: true, insertedCount: inserted.length };
  }

  find(filter = {}) {
    const results = this.documents.filter((doc) => {
      for (const [key, val] of Object.entries(filter)) {
        if (typeof val === "object" && val !== null) {
          if (val.$lt && !(doc[key] < val.$lt)) return false;
          if (val.$gt && !(doc[key] > val.$gt)) return false;
        } else if (doc[key] !== val) {
          return false;
        }
      }
      return true;
    });
    return {
      toArray: () => results,
      pretty: () => console.log(JSON.stringify(results, null, 2)),
    };
  }

  findOne(filter = {}) {
    return this.documents.find((doc) => {
      for (const [key, val] of Object.entries(filter)) {
        if (doc[key] !== val) return false;
      }
      return true;
    }) || null;
  }

  updateOne(filter, update) {
    const doc = this.findOne(filter);
    if (!doc) return { matchedCount: 0, modifiedCount: 0 };
    if (update.$set) {
      Object.assign(doc, update.$set);
    }
    console.log(`[updateOne] Updated document matching:`, filter, "-> new state:", doc);
    return { matchedCount: 1, modifiedCount: 1 };
  }

  updateMany(filter, update) {
    const matches = this.find(filter).toArray();
    matches.forEach((doc) => {
      if (update.$set) Object.assign(doc, update.$set);
    });
    console.log(`[updateMany] Updated ${matches.length} documents matching:`, filter);
    return { matchedCount: matches.length, modifiedCount: matches.length };
  }

  deleteOne(filter) {
    const index = this.documents.findIndex((doc) => {
      for (const [key, val] of Object.entries(filter)) {
        if (doc[key] !== val) return false;
      }
      return true;
    });
    if (index === -1) return { deletedCount: 0 };
    const deleted = this.documents.splice(index, 1)[0];
    console.log(`[deleteOne] Deleted document:`, deleted.Program_Name);
    return { deletedCount: 1 };
  }

  deleteMany(filter) {
    const initialCount = this.documents.length;
    this.documents = this.documents.filter((doc) => {
      for (const [key, val] of Object.entries(filter)) {
        if (doc[key] === val) return false;
      }
      return true;
    });
    const deletedCount = initialCount - this.documents.length;
    console.log(`[deleteMany] Deleted ${deletedCount} documents matching:`, filter);
    return { deletedCount };
  }
}

// Execute complete Day 1 workflow
function runMongoDay1Tasks() {
  console.log("=== Week 6 Day 1: MongoDB Shell CRUD Simulation ===");
  const db = {
    University_Programs: new MongoCollection("University_Programs"),
  };

  console.log("\n--- Step 1 & 2: Insert One ---");
  db.University_Programs.insertOne({
    Program_Name: "MCA",
    Department: "IT_CS",
    Fee: "65000",
  });

  console.log("\n--- Step 2: Insert Many (Programs across 3 departments) ---");
  db.University_Programs.insertMany([
    { Program_Name: "BCA", Department: "IT_CS", Fee: "55000" },
    { Program_Name: "DCA", Department: "IT_CS", Fee: "10000" },
    { Program_Name: "B.Tech CS", Department: "IT_CS", Fee: "75000" },
    { Program_Name: "M.Tech CS", Department: "IT_CS", Fee: "90000" },
    { Program_Name: "Cyber Security Diploma", Department: "IT_CS", Fee: "45000" },
    { Program_Name: "Data Science Certification", Department: "IT_CS", Fee: "35000" },
    { Program_Name: "MBA", Department: "Management", Fee: "85000" },
    { Program_Name: "BBA", Department: "Management", Fee: "60000" },
    { Program_Name: "Business Analytics PG", Department: "Management", Fee: "95000" },
    { Program_Name: "Hotel Management Diploma", Department: "Management", Fee: "40000" },
    { Program_Name: "B.Sc Agriculture", Department: "Agriculture", Fee: "70000" },
    { Program_Name: "M.Sc Agriculture", Department: "Agriculture", Fee: "95000" },
    { Program_Name: "Organic Farming Diploma", Department: "Agriculture", Fee: "30000" },
    { Program_Name: "Agriculture Marketing Certificate", Department: "Agriculture", Fee: "25000" },
  ]);

  console.log("\n--- Step 3: Read Data ---");
  console.log("Total Programs:", db.University_Programs.find().toArray().length);
  console.log("Find One Fee='10000':", db.University_Programs.findOne({ Fee: "10000" }));
  console.log("IT_CS Programs:", db.University_Programs.find({ Department: "IT_CS" }).toArray().map(p => p.Program_Name));

  console.log("\n--- Step 4: Update Data ---");
  db.University_Programs.updateOne({ Program_Name: "DCA" }, { $set: { Fee: "12000" } });
  db.University_Programs.updateMany({ Department: "IT_CS" }, { $set: { Fee: "75000" } });

  console.log("\n--- Step 5: Delete Data ---");
  db.University_Programs.deleteOne({ Program_Name: "DCA" });
  db.University_Programs.deleteMany({ Department: "Agriculture" });

  console.log("\nRemaining Departments:", [...new Set(db.University_Programs.find().toArray().map(p => p.Department))]);
  console.log("Final Document Count:", db.University_Programs.find().toArray().length);
  console.log("\n✔ Day 1 CRUD Tasks Completed Successfully.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { MongoCollection, runMongoDay1Tasks };
}

if (typeof require !== "undefined" && require.main === module) {
  runMongoDay1Tasks();
}

