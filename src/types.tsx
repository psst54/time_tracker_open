interface TaskType {
  id: string | null;
  title: string;
  start: Date;
  end: Date;
  categoryId: string;
}

interface CategoryType {
  title: string;
  color: string;
  emoji: string;
  index: number;
  id: string;
}

interface SortDataType {
  title: string;
  func: (a: TaskType, b: TaskType) => number;
}

interface TaskInputType {
  id: string | null;
  title: string;
  startYearMonth: Date;
  startHour: string;
  startMinute: string;
  endYearMonth: Date;
  endHour: string;
  endMinute: string;
  categoryId: string;
}

export type { TaskType, CategoryType, SortDataType, TaskInputType };
