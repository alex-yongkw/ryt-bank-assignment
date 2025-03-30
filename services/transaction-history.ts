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
  recipientId: string;
  recipientName: string;
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
      await this.db.execAsync(`DROP TABLE IF EXISTS ${TABLE_NAME};`);

      await this.db.execAsync(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id TEXT PRIMARY KEY NOT NULL,
          account TEXT NOT NULL,
          transferType TEXT NOT NULL,
          recipientId TEXT NOT NULL,
          recipientName TEXT NOT NULL,
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

  public async initTransctionHistoryTable() {
    await this.createTable();
  }

  public async getAll(): Promise<TransactionHistoryRow[]> {
    return await this.db.getAllAsync(
      `SELECT * FROM ${TABLE_NAME} ORDER BY createdOn DESC`
    );
  }

  public async insertTransactionRow(transaction: Transaction) {
    const statement = await this.db.prepareAsync(
      `INSERT INTO ${TABLE_NAME} (
        id, account, transferType, recipientId, recipientName, amount, note, createdOn
      ) VALUES (
        $id, $account, $transferType, $recipientId, $recipientName, $amount, $note, $createdOn
      );`
    );

    try {
      const id = Crypto.randomUUID();

      await statement.executeAsync({
        $id: id,
        $account: transaction.account,
        $transferType: transaction.transferType,
        $recipientId: transaction.recipientId,
        $recipientName: transaction.recipientName,
        $amount: transaction.amount,
        $note: transaction.note,
        $createdOn: Date.now() / 1000, // unix time in seconds
      });

      return id;
    } catch (err) {
      // TODO -- send to log monitoring service.
      console.error(err);
    } finally {
      await statement.finalizeAsync();
    }
  }
}
