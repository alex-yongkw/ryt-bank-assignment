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
    recipient: {
      value: {
        set: (recipient: string) => {
          duix.set("recipient", recipient, { checkForChangesInTheValue: true });
        },
        reset: () => {
          duix.set("recipient", undefined, { checkForChangesInTheValue: true });
        },
        get: (): string => {
          return duix.get("recipient");
        },
        subscribe: (callback: SubscribeCallback<string>) => {
          return duix.subscribe("recipient", callback);
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
      set: (setting: string) => {
        duix.set("apiSettings", setting, {
          checkForChangesInTheValue: true,
        });
      },
      get: (): string => {
        return duix.get("apiSettings");
      },
      subscribe: (callback: SubscribeCallback<string>) => {
        return duix.subscribe("apiSettings", callback);
      },
    },
  },
};
