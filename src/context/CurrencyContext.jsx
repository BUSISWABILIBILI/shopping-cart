import { createContext, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const CURRENCY_STORAGE_KEY = "biliStoreCurrency";

const CURRENCY_OPTIONS = [
  { code: "USD", label: "USD", symbol: "$", rate: 1 },
  { code: "EUR", label: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", label: "GBP", symbol: "£", rate: 0.79 },
  { code: "ZAR", label: "ZAR", symbol: "R", rate: 18.5 },
];

const CurrencyContext = createContext();

function getStoredCurrency() {
  if (typeof window === "undefined") {
    return "USD";
  }

  const storedCurrency = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
  const isSupported = CURRENCY_OPTIONS.some(
    (option) => option.code === storedCurrency,
  );

  return isSupported ? storedCurrency : "USD";
}

function saveCurrency(currency) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(getStoredCurrency);

  useEffect(() => {
    saveCurrency(currency);
  }, [currency]);

  const value = useMemo(() => {
    const selectedCurrency = CURRENCY_OPTIONS.find(
      (option) => option.code === currency,
    );

    function formatPrice(price) {
      return `${selectedCurrency.symbol}${(price * selectedCurrency.rate).toFixed(
        2,
      )}`;
    }

    return {
      currency,
      currencyOptions: CURRENCY_OPTIONS,
      formatPrice,
      setCurrency,
    };
  }, [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside a CurrencyProvider");
  }

  return context;
}
