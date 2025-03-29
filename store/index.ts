import duix from "duix";

type SubscribeCallback<T> = (newValue: T, oldValue: T) => void;

export const Store = {
  transfer: {
    setAccount: (account: string) => {
      duix.set("account", account, { checkForChangesInTheValue: true });
    },
    resetAccount: () => {
      duix.set("account", undefined, { checkForChangesInTheValue: true });
    },
    getAccount: (): string => {
      return duix.get("account");
    },
    subscribeAccount: (callback: SubscribeCallback<string>) => {
      return duix.subscribe("account", callback);
    },
    setRecipient: (recipient: string) => {
      duix.set("recipient", recipient, { checkForChangesInTheValue: true });
    },
    resetRecipient: () => {
      duix.set("recipient", undefined, { checkForChangesInTheValue: true });
    },
    getRecipient: () => {
      duix.get("recipient");
    },
    subscribeRecipient: (callback: SubscribeCallback<string>) => {
      return duix.subscribe("recipient", callback);
    },
    setTransferAmount: (amount: number) => {
      duix.set("amount", amount, { checkForChangesInTheValue: true });
    },
    resetTransferAmount: () => {
      duix.set("amount", 0, { checkForChangesInTheValue: true });
    },
    setNote: (note: string) => {
      duix.set("note", note, { checkForChangesInTheValue: true });
    },
    resetNote: () => {
      duix.set("note", "", { checkForChangesInTheValue: true });
    },
  },
};
