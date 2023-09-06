class MembersService {
  getMembers() {
    return fetch('/demo/data/members.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMembersShareCapitalTransactions(member_id: string) {
    console.log(member_id);
    return fetch('/demo/data/member-share-capital-transactions.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMembersShareCapitalPatronageHistory(member_id: string) {
    console.log(member_id);
    return fetch('/demo/data/member-share-capital-dividen.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMembersSavingsTransactionHistory(member_id: string) {
    console.log(member_id);
    return fetch('/demo/data/member-savings-transactions.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMemberLoanHistory(member_id: string) {
    console.log(member_id);
    return fetch('/demo/data/member-loan-history.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }
}

export default new MembersService();
