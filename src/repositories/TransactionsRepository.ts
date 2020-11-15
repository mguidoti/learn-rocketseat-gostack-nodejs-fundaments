import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {

  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {

    const { income, outcome } = this.transactions.reduce((acc: Omit<Balance, 'total'>, transaction: Transaction) => {
      switch (transaction.type) {
        case 'income':
          acc.income += transaction.value;
          break;
        case 'outcome':
          acc.outcome += transaction.value;
          break;
        default:
          break;
      }

      return acc;

    }, {
      income: 0,
      outcome: 0,
    });

    const total = income - outcome;

    return {
      income,
      outcome,
      total
    };

  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO

    const { total } = this.getBalance();

    if (type === 'outcome' && value > total) {
      throw Error('This costs more than you have.');
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
