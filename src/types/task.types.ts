export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface CreateTaskDto {
  title: string;
  description?: string;
  deadline?: Date;
  priority?: Priority;
  status?: TaskStatus;
  subject?: string;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
