# Normalization Notes

## What is normalization?
Normalization in databases allows us to maximize the database that we are currently using. When normalizing we think about the speed of queries, decreasing memory through relationships.  
This comes with its downsides though, and one being the complexity of tables that we create from this.

> Keep in mind that every new rule depends on the previous rule to work.

---

### 1NF - First Normal Form
- This rule says that no values in the cell should exceed more than 1 value.
- You shouldn’t have, for example, columns named `club1`, `club2`, `club3`, etc.

---

### 2NF - Second Normal Form
- We need to consider the effects of **composite primary keys**.
- A composite primary key is when we add two or more columns to create a unique key (e.g., `ColA + ColB`).
- All other values must depend on **the entire** composite primary key.
- Tables with **single primary keys** are automatically 2NF compliant.

---

### 3NF - Third Normal Form
- Removes values that depend on **non-key attributes**.
- Known as **transitive dependencies**:
  ```
  Primary Key → Non-Key A → Non-Key B
  ```
- Non-primary key values must depend **only** on the primary key.

---

### BCNF - Boyce-Codd Normal Form
- Stronger version of 3NF.
- If **any column** determines another column, and it's **not a candidate key**, the table should be split.
- In short: **Break the table if a non-unique column tells you unique things.**

---

### 4NF - Fourth Normal Form
- No column should have **independent sets of values for the same key**.
- It's **not the same as 1NF** (although it sounds similar).
- Example of a 1NF table that breaks 4NF:

#### A Possible 1NF Table (but NOT 4NF)
| StudentID | Club         | Skill             |
|-----------|--------------|-------------------|
| S101      | Chess Club   | Programming       |
| S101      | Chess Club   | Leadership        |
| S101      | Debate Club  | Programming       |
| S101      | Debate Club  | Leadership        |
| S102      | Art Club     | Painting          |
| S102      | Art Club     | Public Speaking   |
| S102      | Science Club | Painting          |
| S102      | Science Club | Public Speaking   |

#### 4NF Fix:
**Student_Clubs Table**
| StudentID | Club         |
|-----------|--------------|
| S101      | Chess Club   |
| S101      | Debate Club  |
| S102      | Art Club     |
| S102      | Science Club |

**Student_Skills Table**
| StudentID | Skill           |
|-----------|------------------|
| S101      | Programming      |
| S101      | Leadership       |
| S102      | Painting         |
| S102      | Public Speaking  |

> (You would still have a `Students` table with `StudentID` as PK.)

---

### 5NF - Fifth Normal Form
- Break down tables so they can be reconstructed with joins **without data loss**.
- Prevents anomalies from multiple joins.

---

### 6NF - Sixth Normal Form
- **Fully normalized**. Isolate **every single fact** into its own table.
- Mainly useful in **temporal databases** or **auditing**.
- Example: Tracking when a student **joined/left** a club.

---

### Summary Chart

| Normal Form | Fixes…                     | Main Benefit                       |
|-------------|----------------------------|------------------------------------|
| 1NF         | Repeating groups           | Data is atomic (clean rows)        |
| 2NF         | Partial dependencies       | Better separation of concerns      |
| 3NF         | Transitive dependencies    | Avoids indirect data redundancy    |
| BCNF        | All functional dependencies| Handles edge cases in 3NF          |
| 4NF         | Multi-valued dependencies  | Keeps facts independent            |
| 5NF         | Complex join dependencies  | Avoids redundancy in joins         |
| 6NF         | Temporal and minimal facts | Powerful historical tracking       |
