const updatePricingTables = () => {
  const stripePricingTables = document.querySelectorAll("stripe-pricing-table");
  if (window.tolt_referral !== null && stripePricingTables.length > 0) {
    stripePricingTables.forEach((stripePricingTable) => {
      stripePricingTable.setAttribute("client-reference-id", window.tolt_referral);
    });
  }
};
setTimeout(updatePricingTables, 1000);
setTimeout(updatePricingTables, 2200);
setTimeout(updatePricingTables, 3200);
window.addEventListener("tolt_referral_ready", () => {
  if (window.tolt_referral) {
    updatePricingTables();
  }
});
