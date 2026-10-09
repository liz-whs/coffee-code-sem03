## Data to be persisted

Data stored in arrays/objects that must persist across page reloads:

### 1. Study Groups
- `id` (number): unique identifier (primary key).
- `subject` (string): subject name.
- `students` (number): number of students.
- `schedule` (string): day of the week (schedule).

### 2. User
- `name` (string): user's name.
- `email` (string): email address.
- `subjects` (number[]): array of group `id`s assigned to the user. (it will change to table)

## Supabase
- `project name`: learnplat
- `region`: us-east-1
