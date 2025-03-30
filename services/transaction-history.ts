// A mock singleton service to get transaction history from SQLite.

import { TransferType } from "@/types";
import * as Crypto from "expo-crypto";
import * as SQLite from "expo-sqlite";

const DB_NAME = "transactionHistory";
const TABLE_NAME = "transactionRecord";

type TransactionHistoryRow = {
  id: string;
  account: string;
  transferType: TransferType;
  userName: string;
  amount: number;
  note: string;
  createdOn: number; // unix timestamp in seconds
};

type Transaction = Omit<TransactionHistoryRow, "id" | "createdOn">;

export class TransactionHistoryService {
  private static instance: TransactionHistoryService;
  private db: SQLite.SQLiteDatabase;

  private constructor(database: SQLite.SQLiteDatabase) {
    this.db = database;
  }

  private async createTable() {
    try {
      await this.db.execAsync(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id TEXT PRIMARY KEY NOT NULL,
          account TEXT NOT NULL,
          transferType TEXT NOT NULL,
          userName TEXT NOT NULL,
          amount INTEGER NOT NULL,
          note TEXT,
          createdOn INTEGER NOT NULL
        );`
      );
    } catch (err) {
      // TODO -- send to log monitoring service.
      console.error(err);
    }
  }

  public static async getInstance(): Promise<TransactionHistoryService> {
    if (!TransactionHistoryService.instance) {
      const database = await SQLite.openDatabaseAsync(DB_NAME);

      TransactionHistoryService.instance = new TransactionHistoryService(
        database
      );
    }

    return TransactionHistoryService.instance;
  }

  public async getAll(): Promise<TransactionHistoryRow[]> {
    await this.createTable();

    return await this.db.getAllAsync(
      `SELECT * FROM ${TABLE_NAME} ORDER BY createdOn DESC`
    );
  }

  public async insertTransactionRow(transaction: Transaction) {
    await this.createTable();

    const statement = await this.db.prepareAsync(
      `INSERT INTO ${TABLE_NAME} (
        id, account, transferType, userName, amount, note, createdOn
      ) VALUES (
        $id, $account, $transferType, $userName, $amount, $note, $createdOn
      );`
    );

    try {
      return await statement.executeAsync({
        $id: Crypto.randomUUID(),
        $account: transaction.account,
        $transferType: transaction.transferType,
        $userName: transaction.userName,
        $amount: transaction.amount,
        $note: transaction.note,
        $createdOn: Date.now() / 1000, // unix time in seconds
      });
    } catch (err) {
      // TODO -- send to log monitoring service.
      console.error(err);
    } finally {
      await statement.finalizeAsync();
    }
  }
}
