// A mock account service to get/update bank accounts.
import * as Crypto from "expo-crypto";
import * as SQLite from "expo-sqlite";

const DB_NAME = "bankAccount";
const TABLE_NAME = "account";

type Account = {
  id: string;
  name: string;
  balance: number;
};

export class AccountService {
  private static instance: AccountService;
  private db: SQLite.SQLiteDatabase;

  private constructor(database: SQLite.SQLiteDatabase) {
    this.db = database;
  }

  private async createTable() {
    try {
      await this.db.execAsync(
        `
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          balance INTEGER NOT NULL
        );
        `
      );
    } catch (err) {
      // TODO -- send to log monitoring service.
      console.error(err);
    }
  }

  public static async getInstance(): Promise<AccountService> {
    if (!AccountService.instance) {
      const database = await SQLite.openDatabaseAsync(DB_NAME);

      AccountService.instance = new AccountService(database);
    }

    return AccountService.instance;
  }

  // Initialize default accounts
  public async initAccounts() {
    await this.createTable();

    const accounts = await this.getAll();

    // skip creating if account already exist
    if (accounts.length > 0) {
      return;
    }

    const statement = await this.db.prepareAsync(
      `INSERT INTO ${TABLE_NAME} (
        id, name, balance
      ) VALUES (
        $id, $name, $balance
      );`
    );

    try {
      await statement.executeAsync({
        $id: Crypto.randomUUID(),
        $name: "Checking Account",
        $balance: 2500.05,
      });

      await statement.executeAsync({
        $id: Crypto.randomUUID(),
        $name: "Saving Account",
        $balance: 200.5,
      });
    } catch (err) {
      // TODO -- send to log monitoring service.
      console.error(err);
    } finally {
      await statement.finalizeAsync();
    }
  }

  public async getAll(): Promise<Account[]> {
    return await this.db.getAllAsync(`SELECT * FROM ${TABLE_NAME};`);
  }

  public async updateBalance(id: string, balance: number) {
    const statement = await this.db.prepareAsync(
      `
      UPDATE ${TABLE_NAME}
      SET
        balance = $balance
      WHERE
        id = $id;
      `
    );

    try {
      return await statement.executeAsync({
        $id: id,
        $balance: balance,
      });
    } catch (err) {
      // TODO -- send to log monitoring service.
      console.error(err);
    } finally {
      await statement.finalizeAsync();
    }
  }
}
