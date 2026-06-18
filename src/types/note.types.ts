export interface CreateNoteDto {
  title: string;
  content: string;
  subject?: string;
}
export interface UpdateNoteDto extends Partial<CreateNoteDto> {
  summary?: string;

}
