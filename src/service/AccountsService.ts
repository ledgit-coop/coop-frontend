class AccountsService {
  getMembersAccountTransactionHistory(member_id: string, account_id: string) {
    console.log(member_id, account_id);
    return fetch('/demo/data/member-account-transactions.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMemberAccounts(member_id: string) {
    console.log(member_id);
    return fetch('/demo/data/member-accounts.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }
}

export default new AccountsService();
