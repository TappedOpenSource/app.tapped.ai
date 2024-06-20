import { applyForOpportunity, getOpportunityQuota } from "@/data/database";

export async function guardedApplyForOpportunity({
  userId,
  opportunityId,
  isPremium,
} : {
    userId: string;
    opportunityId: string;
    isPremium: boolean;
}) {
  if (!isPremium) {
    // check credits
    const opQuota = await getOpportunityQuota(userId);

    if (opQuota <= 0) {
      throw new Error("not enough credits");
    }
  }

  await applyForOpportunity({
    opId: opportunityId,
    userId,
    userComment: "",
  });
}
