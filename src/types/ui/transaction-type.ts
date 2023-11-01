export interface TransactionSubTypeSaveForm {
  name?: string;
  type?: string; // Changed from enum to string
}

export interface TransactionSubType extends TransactionSubTypeSaveForm {
  id: number;
  key: string;
  locked?: boolean;
  created_at: string; // Timestamp in ISO 8601 format
  updated_at: string; // Timestamp in ISO 8601 format
}
