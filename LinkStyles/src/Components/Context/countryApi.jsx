import React, { createContext, useEffect, useState } from "react";

export const CountryContext = createContext();

export default function CountryContextProvider({ children }) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    deliveryNote: "",
  });

  // Fetch countries once
useEffect(() => {
  const fetchCountries = async () => {
    try {
      setCheckoutLoading(true);

      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );

      const data = await res.json();

      localStorage.setItem(
        "countries_cache",
        JSON.stringify({
          data: data.data || [],
          timestamp: Date.now()
        })
      );

      setCountries(data.data || []);

    } catch (err) {
      console.error("❌ Error fetching countries:", err);
    } finally {
      setCheckoutLoading(false);
    }
  }

  const cached = localStorage.getItem("countries_cache");

  if (cached) {
    const parsed = JSON.parse(cached);

    const now = Date.now();
    const cacheAge = now - parsed.timestamp;

    const DAY = 12 * 60 * 60 * 1000;

    if (cacheAge < DAY) {
      console.log("Using cached countries");
      setCountries(parsed.data);
      return; 
    }
  }

  fetchCountries();

}, []);

  // Handle country change and load states dynamically
  const handleCountryChange = async (e) => {
    const selected = e.target.value;
    setFormData((prev) => ({ ...prev, country: selected, state: "" }));

    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: selected }),
      });
      const data = await res.json();
      setStates(data.data?.states || []);
    } catch (err) {
      console.error("❌ Error fetching states:", err);
    }
  };

  const contextValues = {
    handleCountryChange,
    countries,
    states,
    checkoutLoading,
    formData,
    setFormData,
  };

  return (
    <CountryContext.Provider value={contextValues}>
      {children}
    </CountryContext.Provider>
  );
}
