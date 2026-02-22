# Using MySQL with CyberArcade (e.g. SQL Workbench)

The app can use **MySQL** instead of SQLite so you can view and edit data in **MySQL Workbench** (or any MySQL client).

## 1. Create the database in MySQL

In MySQL Workbench (or command line):

```sql
CREATE DATABASE IF NOT EXISTS cyberarcade
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

## 2. Set environment variables

Before starting the app, set:

- **USE_MYSQL** – turn on MySQL (e.g. `1` or `true`)
- **MYSQL_HOST** – server (default `localhost`)
- **MYSQL_PORT** – port (default `3306`)
- **MYSQL_USER** – MySQL user name
- **MYSQL_PASSWORD** – MySQL password
- **MYSQL_DATABASE** – database name (default `cyberarcade`)

Example (Unix/macOS, in terminal):

```bash
export USE_MYSQL=1
export MYSQL_HOST=localhost
export MYSQL_USER=root
export MYSQL_PASSWORD=yourpassword
export MYSQL_DATABASE=cyberarcade
python run.py
```

Or use a `.env` file and load it (e.g. with `python-dotenv`) if you add that to the project.

## 3. Install PyMySQL

```bash
pip install PyMySQL
# or
pip install -r src/backend/requirements.txt
```

## 4. Run the app

From the **project root**:

```bash
python run.py
```

On first run with MySQL, the app will create these tables in `cyberarcade`:

- **users** – accounts, level, points, streak
- **achievements** – earned achievements
- **game_sessions** – game plays (game_type, score, duration)
- **learning_progress** – progress per module

## 5. Open in SQL Workbench

1. Connect to your MySQL server in MySQL Workbench.
2. Select the **cyberarcade** schema.
3. Use **Tables** → `users`, `game_sessions`, etc., or run:

```sql
SELECT * FROM users;
SELECT * FROM game_sessions ORDER BY completed_at DESC LIMIT 20;
SELECT * FROM learning_progress;
```

---

If **USE_MYSQL** is not set (or not `1`/`true`), the app keeps using **SQLite** and the `cyberarcade.db` file in the project directory.
