export class CreateLivestreamDto {
  userId: string;
  streamId: string;
  members?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
