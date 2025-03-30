import { ApiSetting } from "@/types";
import duix from "duix";

type SubscribeCallback<T> = (newValue: T, oldValue: T) => void;

export const Store = {
  transfer: {
    account: {
      value: {
        set: (account: string) => {
          duix.set("account", account, { checkForChangesInTheValue: true });
        },
        reset: () => {
          duix.set("account", undefined, { checkForChangesInTheValue: true });
        },
        get: (): string => {
          return duix.get("account");
        },
        subscribe: (callback: SubscribeCallback<string>) => {
          return duix.subscribe("account", callback);
        },
      },
      error: {
        set: (msg: string) => {
          duix.set("accountErrorMsg", msg, { checkForChangesInTheValue: true });
        },
        clear: () => {
          duix.set("accountErrorMsg", "", { checkForChangesInTheValue: true });
        },
        get: (): string => {
          return duix.get("accountErrorMsg");
        },
        subscribe: (callback: SubscribeCallback<string>) => {
          return duix.subscribe("accountErrorMsg", callback);
        },
      },
    },
    recipientId: {
      value: {
        set: (recipient: string) => {
          duix.set("recipientId", recipient, {
            checkForChangesInTheValue: true,
          });
        },
        reset: () => {
          duix.set("recipientId", undefined, {
            checkForChangesInTheValue: true,
          });
        },
        get: (): string => {
          return duix.get("recipientId");
        },
        subscribe: (callback: SubscribeCallback<string>) => {
          return duix.subscribe("recipientId", callback);
        },
      },
      error: {
        set: (msg: string) => {
          duix.set("recipientErrorMsg", msg, {
            checkForChangesInTheValue: true,
          });
        },
        clear: () => {
          duix.set("recipientErrorMsg", "", {
            checkForChangesInTheValue: true,
          });
        },
        get: (): string => {
          return duix.get("recipientErrorMsg");
        },
        subscribe: (callback: SubscribeCallback<string>) => {
          return duix.subscribe("recipientErrorMsg", callback);
        },
      },
    },
    recipientName: {
      value: {
        set: (recipient: string) => {
          duix.set("recipientName", recipient, {
            checkForChangesInTheValue: true,
          });
        },
        get: (): string => {
          return duix.get("recipientName");
        },
      },
    },
    amount: {
      value: {
        set: (amount: number) => {
          duix.set("amount", amount, { checkForChangesInTheValue: true });
        },
        get: (): number => {
          return duix.get("amount");
        },
        subscribe: (callback: SubscribeCallback<number>) => {
          return duix.subscribe("amount", callback);
        },
      },
      error: {
        set: (msg: string) => {
          duix.set("amountErrorMsg", msg, {
            checkForChangesInTheValue: true,
          });
        },
        clear: () => {
          duix.set("amountErrorMsg", "", {
            checkForChangesInTheValue: true,
          });
        },
        get: (): string => {
          return duix.get("amountErrorMsg");
        },
        subscribe: (callback: SubscribeCallback<string>) => {
          return duix.subscribe("amountErrorMsg", callback);
        },
      },
    },
    note: {
      value: {
        set: (note: string) => {
          duix.set("note", note, { checkForChangesInTheValue: true });
        },
        reset: () => {
          duix.set("note", "", { checkForChangesInTheValue: true });
        },
        get: (): string => {
          return duix.get("note");
        },
      },
    },
  },
  apiSettings: {
    value: {
      set: (setting: ApiSetting) => {
        duix.set("apiSettings", setting, {
          checkForChangesInTheValue: true,
        });
      },
      get: (): ApiSetting => {
        return duix.get("apiSettings");
      },
      subscribe: (callback: SubscribeCallback<ApiSetting>) => {
        return duix.subscribe("apiSettings", callback);
      },
    },
  },
};
