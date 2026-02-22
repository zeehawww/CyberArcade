# Using PostgreSQL with CyberArcade

The app uses **PostgreSQL** (recommended) instead of SQLite for production.

## 1. Install PostgreSQL

- **macOS**: `brew install postgresql` or download from postgresql.org
- **Windows**: Download installer from postgresql.org
- **Linux**: `sudo apt-get install postgresql` (Ubuntu/Debian) or `sudo yum install postgresql` (RHEL)

## 2. Create the database

In PostgreSQL (psql or pgAdmin):

```sql
CREATE DATABASE cyberarcade
  WITH ENCODING 'UTF8'
  LC_COLLATE='en_US.UTF-8'
  LC_CTYPE='en_US.UTF-8';
```

## 3. Set environment variables

Before starting the app:

```bash
export USE_POSTGRES=1
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=your_postgres_password
export POSTGRES_DATABASE=cyberarcade
python run.py
```

**Windows PowerShell:**
```powershell
$env:USE_POSTGRES="1"
$env:POSTGRES_HOST="localhost"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="your_password"
$env:POSTGRES_DATABASE="cyberarcade"
python run.py
```

## 4. Install Python driver

```bash
pip install psycopg2-binary
# or
pip install -r src/backend/requirements.txt
```

## 5. Run the app

From project root:

```bash
python run.py
```

On first run, the app creates tables:
- **users** (with `user_type`: student, enterprise, itpro, parent)
- **achievements**
- **game_sessions**
- **learning_progress**

## 6. View in pgAdmin or psql

Connect to PostgreSQL and query:

```sql
SELECT * FROM users;
SELECT * FROM game_sessions ORDER BY completed_at DESC LIMIT 20;
SELECT * FROM learning_progress;
```

---

If **USE_POSTGRES** is not set, the app uses **SQLite** (`cyberarcade.db` file).
