export interface PollSettings {
  multipleChoice: boolean;
  requireLogin: boolean;
  endDate?: string;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: string[];
  votes: Record<string, number>; // Maps option text to vote count
  settings: PollSettings;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
  settings: PollSettings;
}

export interface EditPollData extends Partial<CreatePollData> {
  id: string;
  updatedAt: string;
}

export interface PollVote {
  pollId: string;
  selectedOptions: string[];
  votedAt: string;
  voterId?: string; // Optional for anonymous voting
}
