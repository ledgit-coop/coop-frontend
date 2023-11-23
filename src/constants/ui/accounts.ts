export enum AccountStatus {
  ACTIVE = 'active',
  DORMANT = 'dormant',
}

export enum AccountType {
  REGULAR = 'regular',
  SAVINGS = 'savings',
  SHARE_CAPITAL = 'share-capita',
}

export enum AccountTransactionType {
  WITHDRAWAL = 'withdrawal',
  DEPOSIT = 'deposit',
}

export enum AccountMaintainingBalancePenaltyCycle {
  DAY = 'day',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

export enum AccountMaintainingBalancePenaltyMethod {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export enum MemberAccountTransactionType {
  INTEREST_EARNED = 'interest-earned',
  LOAN_PAYMENT = 'loan-payment',
  LOAN_FEES = 'loan-fees',
  LOAN_RELEASED = 'loan-released',
  LOAN_CREDIT = 'loan-credit',
  SHARE_CAPITAL = 'share-capital',
}
